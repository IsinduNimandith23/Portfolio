// Map a repo name to its live / hosted site URL.
//
// The pinned-repos API does not return a repo's "Website" field, and the
// GitHub REST API call that would fetch it is rate-limited (403) for
// unauthenticated visitors. So we keep an explicit map here instead.
//
// Add an entry below, keyed by the EXACT repo name (case-sensitive), e.g.
// "IsinduNimandith23/Fallowkind" -> key is "Fallowkind".
// Any repo not listed falls back to its GitHub repo page.
// Leave a value as "" to fall back to the GitHub repo page for that project.
const LIVE_URLS = {
	DRVSCAN: "https://drvscan-project-fd5ed.web.app/",
	Fallowkind: "https://www.fallowkind.com/",
	NewSagarikaDrivingSchool: "https://newsagarikadrivingschool.vercel.app/",
	Portfolio: "https://isindu-nimandith.vercel.app/",
	"Alumni-API": "",
	"Online-Shopping-Management-System": "",
};

export const liveUrlForRepo = (repoName) => LIVE_URLS[repoName] || null;
