// GitHub username
const username = "nvsmith";

// User Info DOM Elements
const githubAvatar = document.querySelector("#github-avatar");
const githubName = document.querySelector("#github-name");
const githubBio = document.querySelector("#github-bio");
const githubLocation = document.querySelector("#github-location");
const githubPublicRepos = document.querySelector("#github-public-repos");

// Fetch user info from GitHub API
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};
gitUserInfo();

// Display user info on the page
const displayUserInfo = function (data) {
    // Set attributes and values to User Info DOM Elements
    githubAvatar.setAttribute("src", data.avatar_url);
    githubName.textContent = `Name: ${data.name}`;
    githubBio.textContent = `Bio: ${data.bio}`;
    githubLocation.textContent = `Location: ${data.location}`;
    githubPublicRepos.textContent = `Public Repos: ${data.public_repos}`;

    // gitRepos();
};
