import { useEffect, useState } from "react";

const ENDPOINTS = [
	(u) => `https://pinned.berrysauce.dev/get/${encodeURIComponent(u)}`,
	(u) => `https://gh-pinned-repos.egoist.dev/?username=${encodeURIComponent(u)}`,
];

async function fetchFirstNonEmpty(username, signal) {
	let lastError = null;
	for (const buildUrl of ENDPOINTS) {
		try {
			const res = await fetch(buildUrl(username), { signal });
			if (!res.ok) {
				lastError = new Error(`Request failed (${res.status})`);
				continue;
			}
			const data = await res.json();
			if (Array.isArray(data) && data.length > 0) return data;
		} catch (err) {
			if (err.name === "AbortError") throw err;
			lastError = err;
		}
	}
	if (lastError) throw lastError;
	return [];
}

// Unauthenticated api.github.com calls are limited to 60/hr per IP. Cache the
// fully enriched result so normal page loads don't re-hit the API (and trigger
// 403 rate-limit errors) every time.
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

function cacheKey(username) {
	return `gh-pinned:${username}`;
}

function readCache(username) {
	try {
		const raw = localStorage.getItem(cacheKey(username));
		if (!raw) return null;
		const { timestamp, repos } = JSON.parse(raw);
		if (!Array.isArray(repos) || Date.now() - timestamp > CACHE_TTL_MS) return null;
		return repos;
	} catch {
		return null;
	}
}

function writeCache(username, repos) {
	try {
		localStorage.setItem(
			cacheKey(username),
			JSON.stringify({ timestamp: Date.now(), repos })
		);
	} catch {
		/* localStorage unavailable or full — ignore */
	}
}

// Enrich each pinned repo with its GitHub "Website" (homepage) field so the
// project cards can link to the live/hosted site instead of the repo page.
async function enrichWithHomepage(repos, signal) {
	return Promise.all(
		repos.map(async (repo) => {
			const owner = repo.owner || repo.author;
			const name = repo.repo || repo.name;
			if (!owner || !name) return repo;

			try {
				const res = await fetch(
					`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
					{ signal, headers: { Accept: "application/vnd.github+json" } }
				);
				if (!res.ok) return repo;
				const details = await res.json();
				const homepage = (details.homepage || "").trim();
				return homepage ? { ...repo, homepage } : repo;
			} catch (err) {
				if (err.name === "AbortError") throw err;
				return repo;
			}
		})
	);
}

export function useGithubPinned(username) {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!username) return undefined;

		let cancelled = false;
		const controller = new AbortController();

		const cached = readCache(username);
		if (cached) {
			setRepos(cached);
			setError(null);
			setLoading(false);
			return () => {
				cancelled = true;
				controller.abort();
			};
		}

		(async () => {
			try {
				setLoading(true);
				const data = await fetchFirstNonEmpty(username, controller.signal);
				const enriched = await enrichWithHomepage(data, controller.signal);
				if (!cancelled) {
					setRepos(enriched);
					setError(null);
					writeCache(username, enriched);
				}
			} catch (err) {
				if (!cancelled && err.name !== "AbortError") {
					setError(err);
					setRepos([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();

		return () => {
			cancelled = true;
			controller.abort();
		};
	}, [username]);

	return { repos, loading, error };
}
