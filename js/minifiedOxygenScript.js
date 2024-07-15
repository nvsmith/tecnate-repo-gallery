const username = "nvsmith",
    githubAvatar = document.querySelector("#github-avatar"),
    githubName = document.querySelector("#github-name"),
    githubBio = document.querySelector("#github-bio"),
    githubLocation = document.querySelector("#github-location"),
    githubPublicRepos = document.querySelector("#github-public-repos"),
    gallery = document.querySelector("#gallery"),
    reposContainer = document.querySelector("#repos-container"),
    filterInput = document.querySelector("#filter-input"),
    githubRepoList = document.querySelector("#repo-list"),
    repoInfoSection = document.querySelector("#repo-info"),
    repoDataContainer = document.querySelector("#repo-data-container"),
    githubRepoName = document.querySelector("#github-repo-name"),
    githubRepoDescription = document.querySelector("#github-repo-description"),
    githubRepoLanguages = document.querySelector("#github-repo-languages"),
    viewOnGithubButton = document.querySelector("#view-on-github"),
    viewReposButton = document.querySelector("#view-repos"),
    gitUserInfo = async function () {
        let e = await fetch(`https://api.github.com/users/${username}`),
            t = await e.json();
        displayUserInfo(t);
    };
gitUserInfo();
const displayUserInfo = function (e) {
        githubAvatar.setAttribute("src", e.avatar_url),
            githubAvatar.setAttribute("alt", `Avatar of ${e.name}`),
            (githubName.innerHTML = `Name: <span class="span__user-info">${e.name}</span>`),
            (githubBio.innerHTML = `Bio: <span class="span__user-info">${e.bio}</span>`),
            (githubLocation.innerHTML = `Location: <span class="span__user-info">${e.location}</span>`),
            (githubPublicRepos.innerHTML = `Public Repos: <span class="span__user-info">${e.public_repos}</span>`),
            gitRepos();
    },
    gitRepos = async function () {
        let e = await fetch(
                `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
            ),
            t = await e.json();
        displayRepos(t);
    },
    displayRepos = function (e) {
        for (let t of (gallery.classList.remove("hide"),
        filterInput.classList.remove("hide"),
        e)) {
            let i = document.createElement("li");
            i.classList.add("repo"),
                (i.innerHTML = `<h4>${t.name}</h4>`),
                githubRepoList.append(i);
        }
    };
githubRepoList.addEventListener("click", function (e) {
    if (e.target.matches("h4")) {
        let t = e.target.innerText;
        getRepoInfo(t);
    }
});
const getRepoInfo = async function (e) {
        let t = await fetch(`https://api.github.com/repos/${username}/${e}`),
            i = await t.json(),
            n = await fetch(i.languages_url),
            a = await n.json(),
            o = [];
        for (let r in a) o.push(r);
        displayRepoInfo(i, o);
    },
    displayRepoInfo = function (e, t) {
        gallery.classList.add("hide"),
            repoInfoSection.classList.remove("hide"),
            (repoDataContainer.innerHTML = ""),
            (githubRepoName.innerHTML = `Repo Name: <span class="span__repo-info">${e.name}</span>`),
            (githubRepoDescription.innerHTML = `Description: <span class="span__repo-info">${e.description}</span>`),
            (githubRepoLanguages.innerHTML = `Languages: <span class="span__repo-info">${t.join(
                ", "
            )}</span>`),
            viewOnGithubButton.setAttribute("href", e.html_url),
            repoDataContainer.append(githubRepoName),
            repoDataContainer.append(githubRepoDescription),
            repoDataContainer.append(githubRepoLanguages),
            repoDataContainer.append(viewReposButton),
            repoDataContainer.append(viewOnGithubButton);
    };
viewReposButton.addEventListener("click", function (e) {
    e.preventDefault(),
        repoInfoSection.classList.add("hide"),
        gallery.classList.remove("hide");
}),
    filterInput.addEventListener("input", function (e) {
        e.preventDefault();
        let t = e.target.value,
            i = document.querySelectorAll(".repo"),
            n = t.toLowerCase();
        for (let a of i) {
            let o = a.innerText.toLowerCase();
            o.includes(n)
                ? a.classList.remove("hide")
                : a.classList.add("hide");
        }
    });
