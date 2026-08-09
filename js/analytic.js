import { fetchGithubUser, fetchUserRepos } from "./githubApi.js";

async function displayInformation(username) {
    if(username==null || username==undefined){
        console.log("Please enter a User name!")
    }
    else{
         try{
        const userAccountInfo = await fetchGithubUser(username);
        if(!userAccountInfo.ok){
            switch(userAccountInfo.status){
            case 404: throw new Error (`User Not Found!`)
            break;
            case 429: throw new Error (`Too many tries!`)
            break;
            case 403: throw new Error (`Account is Forbidden to search!`)
            break;
            default:
                break;
        }
        }
        console.log(`Avatar: \nname:${userAccountInfo.name ?? `not provided`}\nuser name:${username}\nbio:${userAccountInfo.bio ?? `not provided`}\ncompany:${userAccountInfo.company ?? `not provided`}\nlocation:${userAccountInfo.location ?? `not provided`}\nfollowers:${userAccountInfo.followers}\nfollowing:${userAccountInfo.following}\npublic repository count:${userAccountInfo.public_repos}\nCreated at:${userAccountInfo.created_at}\n link:https://api.github.com/users/${username}`)
    }
    catch(error){
        console.log(error)
    }
    }
}
//displayInformation("to");