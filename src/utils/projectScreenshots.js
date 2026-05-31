// Map a repo name to a custom screenshot of the actual project homepage.
//
// 1. Put your screenshot files in: public/assets/images/projects/
// 2. Add an entry below, keyed by the EXACT repo name (case-sensitive).
//
// Any repo not listed here falls back to GitHub's auto-generated social
// preview card. The keys must match the repo name shown on the card
// (e.g. "IsinduNimandith23/DRVSCAN" -> key is "DRVSCAN").
const SCREENSHOTS = {
	DRVSCAN: "./assets/images/projects/DRVSCAN.png",
	Fallowkind: "./assets/images/projects/Fallowkind.png",
	NewSagarikaDrivingSchool: "./assets/images/projects/NewSagarikaDrivingSchool.png",
	Portfolio: "./assets/images/projects/Portfolio.png",
	"Alumni-API": "./assets/images/projects/Alumni-API.png",
	"Online-Shopping-Management-System": "./assets/images/projects/Online-Shopping-Management-System.png",
};

export const screenshotForRepo = (repoName) => SCREENSHOTS[repoName] || null;
