import { fetchGithubUser, fetchUserRepos } from "./githubApi.js";

export async function displayInformation(username) {
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

export async function repoStats(username){
    if(username==null || username==undefined){
        console.log("Please enter a User name!")
    }
    else{
        try{
            const userRepoInfo = await fetchUserRepos(username);
            if(!userRepoInfo.ok){
               switch(userRepoInfo.status){
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
        const repocount=userRepoInfo.length;
        const starcount=userRepoInfo.reduce((accumulator, value)=>{
            return accumulator + value.stargazers_count
        },0);
        const forkcount=userRepoInfo.reduce((accumulator, value)=>{
            return accumulator + value.forks_count
        },0);
        const moststarred=[...userRepoInfo].sort((a,b)=>b?.stargazers_count-a?.stargazers_count);
        
        const languages=[];
        const languagesCount= new Map()

        for(let i=0;i<userRepoInfo.length;i++){
            if(!languages.includes(userRepoInfo[i]?.language)){
                languages.push(userRepoInfo[i].language)
            }}
        for(let i=0;i<userRepoInfo.length;i++){
            let count=0;
            for(let j=0;j<languages.length;j++){
                if(userRepoInfo[i].language==languages[j])
                    count++;
            }
                languagesCount.set(userRepoInfo[i].language,count);
        }
        console.log("Repo REport\n")
        console.log(`repo count:${repocount}`)
        console.log(`star count:${starcount}`)
        console.log(`fork count:${forkcount}`)
        console.log(`most starred repos from 1-5`)
        for(let i=0;i<5;i++)
            console.log(`${i+1})${moststarred[i].name}`);
        console.log(`languages available in the repos and their count`)
        languagesCount.forEach((value, key) => {
                console.log(`${key}: ${value}`);
                });
        
        }
        catch(error){
            console.log(error);
        }
    }
}
repoStats("octocat");