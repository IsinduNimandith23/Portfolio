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

export function useGithubPinned(username) {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!username) return undefined;

		let cancelled = false;
		const controller = new AbortController();

		(async () => {
			try {
				setLoading(true);
				const data = await fetchFirstNonEmpty(username, controller.signal);
				if (!cancelled) {
					setRepos(data);
					setError(null);
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
