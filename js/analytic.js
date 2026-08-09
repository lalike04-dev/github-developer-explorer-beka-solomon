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


//fetchGithubUser("torvalds")
