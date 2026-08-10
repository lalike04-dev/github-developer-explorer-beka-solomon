# GitHub Developer Explorer

A lightweight, single-page application built with vanilla JavaScript that lets you search for GitHub users and view their profile, repository statistics, and a filterable/sortable repo list – no external libraries required.

---

## Features

- **User Search** – Enter any GitHub username and fetch profile + repos.
- **Profile Display** – Shows avatar, name, bio, location, and link to GitHub.
- **Repository Statistics** – Total repos, combined stars, forks, and watchers.
- **Filter by Language** – Show only repos written in a specific language.
- **Sort by Name, Stars, or Forks** – Reorder the list dynamically.
- **Loading State** – Visual spinner during API calls.
- **Input Validation** – Prevents empty submissions.
- **Instant Reset** – Clear filters with one click.

---

## How It Works

1.  User enters a GitHub username.
2.  Validation checks for non‑empty input.
3.  A loading spinner appears.
4.  Two parallel requests fetch user profile and repositories.
5.  Responses are validated and parsed as JSON.
6.  Profile information is displayed.
7.  Repository statistics are calculated and shown.
8.  The repo list is rendered with sorting (default by name).
9.  User can filter by language or change the sort order.
10. User can enter a new username and repeat the process.

---

## Project Structure

```
github-developer-explorer-beka-solomon/
├── index.html          # Main HTML + embedded CSS
├── script.js           # All JavaScript logic (vanilla)
└── README.md           # This file
```

*No external dependencies – only native browser APIs.*

---

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- An active internet connection (to reach the GitHub API)

### Installation
Clone the repository and open `index.html` in your browser:

```bash
git clone https://github.com/lalike04-dev/github-developer-explorer-beka-solomon.git
cd github-developer-explorer-beka-solomon
open index.html   # or double‑click the file
```

No build tools, servers, or package managers are required.

---

## Usage

1.  Type a GitHub username into the input field (e.g., `octocat`).
2.  Click **Fetch** or press **Enter**.
3.  Wait for the loading spinner to disappear.
4.  View the profile, statistics, and the full list of repositories.
5.  **Filter** – type a language (e.g., `Ruby`) and click **Filter** to see only matching repos.
6.  **Sort** – use the dropdown to reorder by Name, Stars, or Forks.
7.  **Reset** – click **Reset** to clear the filter and show all repos again.
8.  Enter another username and repeat.

---

## API Reference

The app uses the public GitHub REST API (no authentication required):

| Endpoint | Purpose |
|----------|---------|
| `GET /users/{username}` | Fetch user profile information |
| `GET /users/{username}/repos?per_page=100` | Fetch user repositories (up to 100) |

All requests are made with the native `fetch()` API, and errors (e.g., user not found) are displayed via `alert()`.

---

## Key Functions (preserved from original code)

| Function | Description |
|----------|-------------|
| `fetchGithubUser(username)` | Returns the user profile JSON. |
| `fetchUserRepos(username)`  | Returns the list of repositories JSON. |
| `displayInformation(username)` | Orchestrates the full fetch‑and‑render flow. |
| `repoStats(username)`        | (Re‑)calculates and shows statistics using cached data. |
| `repoFilters(username, language)` | Filters the cached repos by language and re‑renders the list. |

---

## Browser Support

Works in all modern browsers that support:
- `fetch()` API
- `async`/`await`
- `classList` and `template literals`

---

## License

This project is open source and available under the **MIT License**.

---

## Acknowledgments

- Built as a learning exercise for integrating with the GitHub API.
- Thanks to the GitHub REST API for providing the data.