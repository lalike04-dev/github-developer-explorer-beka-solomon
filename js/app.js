import { fetchGithubUser,fetchUserRepos } from "./githubApi.js";
import { repoFilters,repoStats,displayInformation } from "./analytic.js";

//here is how to fetch user and their repo data from github
fetchGithubUser("octocat")
fetchUserRepos("octocat")
console.log(fetchGithubUser("octocat"))
console.log(fetchUserRepos("octocat"))
//here is how to display information of a selected user
displayInformation("octocat")
