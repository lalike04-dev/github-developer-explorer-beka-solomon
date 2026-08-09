export async function fetchGithubUser(username) {
  try {
    console.log("Loading Developer Information")
    const user = await fetch(`https://api.github.com/users/${username}`, {
  headers: {
    'User-Agent': 'MyApp'
  }});
    if (!user.ok) {
      throw new Error(`HTTP error! status: ${user.status}`);
    }
    const userjson = await user.json();
    console.log("Developer Retrieved Successfully!")
    return userjson;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUserRepos(username){
    try {
    console.log("Loading Repo Information")
    const repo = await fetch(`https://api.github.com/users/${username}/repos`, {
  headers: {
    'User-Agent': 'project'
  }});
    if (!repo.ok) {
      throw new Error(`HTTP error! status: ${repo.status}`);
    }
    const repojson = await repo.json();
    console.log("Repos Retrieved Successfully!")
    return repojson;
  } catch (error) {
    console.error(error);
  }
}

//fetchUserRepos("gaearon")
//fetchGithubUser("torvalds")