const overview = document.querySelector(".overview"); // Profile information
const username = "nvsmith"; // GitHub username
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

// GitHub API: fetch user info
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    // Resolve response as JSON or text.
    const data = await userInfo.json();
    console.log(data); // Verify data retrieval.

    // Call functions dependent on fetched data below this line.
    displayUserInfo(data);
};

gitUserInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
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

// GitHub API: fetch repos
const gitRepos = async function () {
    const fetchRepos = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    // Resolve response as JSON or text.
    const repoData = await fetchRepos.json();
    console.log(repoData); // Verify data retrieval.

    // Call functions dependent on fetched data below this line.
    displayRepos(repoData);
};
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

// Display repo information on click
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

// GitHub API: get specific repo information
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(
        `https://api.github.com/repos/${username}/${repoName}`
    );
    // Resolve response as JSON or text.
    const repoInfo = await fetchInfo.json();
    // console.log(repoInfo); // Verify data retrieval.

    // Get repo language data
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);

    // Make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    console.log(languages);

    // Call functions dependent on fetched data below this line.
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = ""; // empty the container
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a 
        class="visit" 
        href="${repoInfo.html_url}" 
        target="_blank" 
        rel="noreferrer noopener"
        >View Repo on GitHub!
        </a>
    `;
    repoData.append(div);
    viewReposButton.classList.remove("hide");
};

viewReposButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

// Dynamic Search
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    console.log(searchText);
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
