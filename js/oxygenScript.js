// GitHub username
const username = "nvsmith";

// User Info DOM Elements
const githubAvatar = document.querySelector("#github-avatar");
const githubName = document.querySelector("#github-name");
const githubBio = document.querySelector("#github-bio");
const githubLocation = document.querySelector("#github-location");
const githubPublicRepos = document.querySelector("#github-public-repos");

// Repository Gallery DOM Elements
const reposContainer = document.querySelector("#repos-container"); // div element containing all repositories
const filterInput = document.querySelector("#filter-input"); // input element to search repositories
const githubRepoList = document.querySelector("#repo-list"); // ul element to display repositories

// Specific Repository DOM Elements
const repoDataContainer = document.querySelector("#repo-data-container"); // div element to display a specific repository info
const viewReposButton = document.querySelector("#view-repos"); // button element to return to repository gallery

// Fetch user info from GitHub API
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    // Parse the response as JSON
    const data = await userInfo.json();
    // Call functions dependent on fetched data below this line.
    displayUserInfo(data);
};
gitUserInfo();

// Display User Info on the page
const displayUserInfo = function (data) {
    // Set attributes for the avatar image
    githubAvatar.setAttribute("src", data.avatar_url);
    githubAvatar.setAttribute("alt", `Avatar of ${data.name}`);

    // Set the innerHTML of DOM elements to display the user's info
    githubName.innerHTML = `Name: <span class="span__user-info">${data.name}</span>`;
    githubBio.innerHTML = `Bio: <span class="span__user-info">${data.bio}</span>`;
    githubLocation.innerHTML = `Location: <span class="span__user-info">${data.location}</span>`;
    githubPublicRepos.innerHTML = `Public Repos: <span class="span__user-info">${data.public_repos}</span>`;

    // The `gitRepos` function, defined below, will execute after the user info has been displayed
    // This is done to ensure that the user info is displayed before the repositories are fetched and displayed
    gitRepos();
};

// Fetch repositories from the GitHub API
const gitRepos = async function () {
    // Fetch repositories from the GitHub API with sort and count parameters
    const fetchRepos = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    // Parse the response as JSON
    const repoData = await fetchRepos.json(); // GitHub scope
    // Call functions dependent on fetched data below this line.
    displayRepos(repoData);
};

// Display repositories on the page
const displayRepos = function (repos) {
    // Loop through the repositories and display them on the page
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        githubRepoList.append(repoItem);
    }
    filterInput.classList.remove("hide");
};
