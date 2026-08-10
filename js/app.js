import { fetchGithubUser,fetchUserRepos } from "./githubApi.js";
import { displayInformation,repoFilters,repoStats } from "./analytic.js";

let currentUser = null;
let currentRepos = [];

async function fetchGithubUser(username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error(`GitHub user not found (${res.status})`);
    return res.json();
}

async function fetchUserRepos(username) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!res.ok) throw new Error(`Repositories not found (${res.status})`);
    return res.json();
}

function renderProfile(user) {
    document.getElementById('avatar').src = user.avatar_url;
    document.getElementById('userName').textContent = user.name || user.login;
    document.getElementById('userBio').textContent = user.bio || '';
    document.getElementById('userLocation').textContent = user.location || '';
    document.getElementById('userUrl').href = user.html_url;
    document.getElementById('profileSection').classList.remove('hidden');
}

function renderStats(repos) {
    const total = repos.length;
    const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const forks = repos.reduce((s, r) => s + r.forks_count, 0);
    const watchers = repos.reduce((s, r) => s + r.watchers_count, 0);
    document.getElementById('totalRepos').textContent = total;
    document.getElementById('totalStars').textContent = stars;
    document.getElementById('totalForks').textContent = forks;
    document.getElementById('totalWatchers').textContent = watchers;
    document.getElementById('statsSection').classList.remove('hidden');
}

function renderRepos(repos) {
    const container = document.getElementById('repoList');
    if (!repos.length) {
        container.innerHTML = '<p>No repositories found.</p>';
        return;
    }
    const sortBy = document.getElementById('sortSelect').value;
    const sorted = [...repos];
    if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'stars') sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    else if (sortBy === 'forks') sorted.sort((a, b) => b.forks_count - a.forks_count);

    container.innerHTML = sorted.map(repo => `
                <div class="repo-item">
                    <div class="repo-name"><a href="${repo.html_url}" target="_blank">${repo.name}</a></div>
                    <div class="repo-meta">
                        ${repo.language ? `Language: ${repo.language} · ` : ''}
                        ⭐ ${repo.stargazers_count} · 🍴 ${repo.forks_count} · 👀 ${repo.watchers_count}
                    </div>
                    ${repo.description ? `<p>${repo.description}</p>` : ''}
                </div>
            `).join('');
    document.getElementById('reposSection').classList.remove('hidden');
}

function showLoader(active) {
    document.getElementById('loader').classList.toggle('active', active);
}

function displayInformation(username) {
    showLoader(true);
    Promise.all([fetchGithubUser(username), fetchUserRepos(username)])
        .then(([user, repos]) => {
            currentUser = user;
            currentRepos = repos;
            renderProfile(user);
            renderStats(repos);
            renderRepos(repos);
        })
        .catch(err => {
            alert(err.message);
        })
        .finally(() => showLoader(false));
}

function repoStats(username) {
    if (!currentRepos.length) {
        alert('No repository data. Fetch a user first.');
        return;
    }
    renderStats(currentRepos);
}

function repoFilters(username, language) {
    if (!currentRepos.length) {
        alert('No repository data. Fetch a user first.');
        return;
    }
    const filtered = language
        ? currentRepos.filter(repo => repo.language && repo.language.toLowerCase() === language.toLowerCase())
        : currentRepos;
    renderRepos(filtered);
}

fetchGithubUser("octocat");
fetchUserRepos("octocat");
console.log(fetchGithubUser("octocat"));
console.log(fetchUserRepos("octocat"));
displayInformation("octocat");
repoStats("octocat");
repoFilters("octocat", "Ruby");

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('usernameInput');
    const fetchBtn = document.getElementById('fetchBtn');
    const filterBtn = document.getElementById('filterBtn');
    const filterLang = document.getElementById('filterLang');
    const resetFilterBtn = document.getElementById('resetFilterBtn');
    const sortSelect = document.getElementById('sortSelect');

    function fetchUser() {
        const username = input.value.trim();
        if (!username) {
            alert('Please enter a GitHub username.');
            return;
        }
        displayInformation(username);
    }

    fetchBtn.addEventListener('click', fetchUser);
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') fetchUser();
    });

    filterBtn.addEventListener('click', function() {
        const lang = filterLang.value.trim();
        repoFilters(null, lang);
    });

    resetFilterBtn.addEventListener('click', function() {
        filterLang.value = '';
        repoFilters(null, '');
    });

    sortSelect.addEventListener('change', function() {
        const lang = filterLang.value.trim();
        const filtered = lang
            ? currentRepos.filter(repo => repo.language && repo.language.toLowerCase() === lang.toLowerCase())
            : currentRepos;
        renderRepos(filtered);
    });
});