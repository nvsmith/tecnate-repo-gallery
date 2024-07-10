const overview = document.querySelector(".overview"); // Profile information
const username = "nvsmith"; // GitHub username

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
};
