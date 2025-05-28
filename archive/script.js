// DOM elements used to manipulate the DOM later in the code.
const overview = document.querySelector(".overview"); // div element to display user info
const username = "nvsmith"; // GitHub username
const repoList = document.querySelector(".repo-list"); // ul element to display repositories
const allReposContainer = document.querySelector(".repos"); // div element containing all repositories
const repoData = document.querySelector(".repo-data"); // div element to display repository info
const viewReposButton = document.querySelector(".view-repos"); // button element to return to repository gallery
const filterInput = document.querySelector(".filter-repos"); // input element to search repositories

// Fetch user info from GitHub API
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
};
gitUserInfo();

// Display user info on the page
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");

    // Set the innerHTML of the div to display the user's info
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
    overview.append(div);
    gitRepos();
};

// Fetch repositories from the GitHub API
const gitRepos = async function () {
    // Fetch repositories from the GitHub API
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
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
    filterInput.classList.remove("hide");
};

// Listen for click events on the repo list
repoList.addEventListener("click", function (e) {
    // Check if the clicked element is an h3 element
    if (e.target.matches("h3")) {
        // Get the text content of the clicked h3 element
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
    console.log(repoInfo);
    // Grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    // Make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
};

// Display a specific repository's info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = ""; // Empty the repo data container
    repoData.classList.remove("hide"); // Show the repo data container
    allReposContainer.classList.add("hide"); // Hide the repository gallery
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${
            repoInfo.html_url
        }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoData.append(div);
    viewReposButton.classList.remove("hide"); // Show the "Back to Repo Gallery" button
};

// Listen for click events on the "Back to Repo Gallery" button
viewReposButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide"); // Show the repository gallery
    repoData.classList.add("hide"); // Hide the repo data container
    viewReposButton.classList.add("hide"); // Hide the "Back to Repo Gallery" button
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
