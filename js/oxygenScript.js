/**
 * This script fetches user info and repository data from GitHub API,
 * and dynamically displays it on a web page.
 *
 * Use this script for development; minify this script and import the minified version to the site for best performance.
 *
 * JS Minifier: https://www.toptal.com/developers/javascript-minifier
 */

// GitHub username
const username = "nvsmith";

// User Info DOM Elements
const githubAvatar = document.querySelector("#github-avatar");
const githubName = document.querySelector("#github-name");
const githubBio = document.querySelector("#github-bio");
const githubLocation = document.querySelector("#github-location");
const githubPublicRepos = document.querySelector("#github-public-repos");

// Repository Gallery DOM Elements
const gallery = document.querySelector("#gallery"); // section element to display repository gallery
const reposContainer = document.querySelector("#repos-container"); // div element containing all repositories
const filterInput = document.querySelector("#filter-input"); // input element to search repositories
const githubRepoList = document.querySelector("#repo-list"); // ul element to display repositories

// Specific Repository DOM Elements
const repoInfoSection = document.querySelector("#repo-info"); // Section to display info about a specific repository
const repoDataContainer = document.querySelector("#repo-data-container"); // div element to display a specific repository info
const githubRepoName = document.querySelector("#github-repo-name"); // heading element to display repo name
const githubRepoDescription = document.querySelector(
    "#github-repo-description"
); // heading element to display repo description
const githubRepoLanguages = document.querySelector("#github-repo-languages"); // heading element to display languages
const viewOnGithubButton = document.querySelector("#view-on-github"); // button element to view repo on GitHub
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

    gitRepos(); // Fetch and display repositories
};

// Fetch repositories from the GitHub API
const gitRepos = async function () {
    // Fetch repositories from the GitHub API with sort and count parameters
    const fetchRepos = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const repoData = await fetchRepos.json(); // GitHub scope
    // Call functions dependent on fetched data below this line.
    displayRepos(repoData);
};

// Display all repositories on the page
const displayRepos = function (repos) {
    gallery.classList.remove("hide"); // Show the gallery section
    filterInput.classList.remove("hide"); // Show the search/filter input

    // Loop through the repositories and display them on the page
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h4>${repo.name}</h4>`;
        githubRepoList.append(repoItem);
    }
};

// Listen for click events on the repo list
githubRepoList.addEventListener("click", function (e) {
    if (e.target.matches("h4")) {
        // Get the text content of the clicked h4 element
        const repoName = e.target.innerText;
        // Fetch the specific repo info from the GitHub API
        getRepoInfo(repoName);
    }
});

// Fetch a specific repository's info
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(
        `https://api.github.com/repos/${username}/${repoName}`
    );
    const repoInfo = await fetchInfo.json();
    const fetchLanguages = await fetch(repoInfo.languages_url); // Get info about languages
    const languageData = await fetchLanguages.json();
    // Make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    // Call functions dependent on fetched data below this line.
    displayRepoInfo(repoInfo, languages);
};

// Display a specific repository's info
const displayRepoInfo = function (repoInfo, languages) {
    gallery.classList.add("hide"); // Hide the gallery section
    repoInfoSection.classList.remove("hide"); // Show the repo info section
    repoDataContainer.innerHTML = ""; // Empty the repo data container

    // Set the innerHTML of DOM elements to display the repo's info
    githubRepoName.innerHTML = `Repo Name: <span class="span__repo-info">${repoInfo.name}</span>`;
    githubRepoDescription.innerHTML = `Description: <span class="span__repo-info">${repoInfo.description}</span>`;
    githubRepoLanguages.innerHTML = `Languages: <span class="span__repo-info">${languages.join(
        ", "
    )}</span>`;

    // Set the href attribute of the "View on GitHub" button
    viewOnGithubButton.setAttribute("href", repoInfo.html_url);

    // Append the innerHTML elements within the repo data container
    repoDataContainer.append(githubRepoName);
    repoDataContainer.append(githubRepoDescription);
    repoDataContainer.append(githubRepoLanguages);
    repoDataContainer.append(viewReposButton); // Add the "Back to Repo Gallery" back to DOM
    repoDataContainer.append(viewOnGithubButton); // Add the "View on GitHub" back to DOM
};

// Listen for click events on the "Back to Repo Gallery" button
viewReposButton.addEventListener("click", function () {
    repoInfoSection.classList.add("hide"); // Hide the repo info section
    gallery.classList.remove("hide"); // Show the gallery section
});

// Dynamic search
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
