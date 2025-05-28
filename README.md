<a id="readme-top"></a>

# Repo Gallery for GitHub

<a href="https://outpostwebstudio.com/" target="_blank" rel="author">Nate @ Outpost Web Studio</a> | Last Updated: 28 MAY 2025

-   [Repo Gallery for GitHub](#repo-gallery-for-github)
    -   [About The Project](#about-the-project)
        -   [Key Technologies \& Methods Used](#key-technologies--methods-used)
    -   [Development Notes](#development-notes)
        -   [Code Blocks Within Oxygen](#code-blocks-within-oxygen)
    -   [Development Process](#development-process)
        -   [Deployment Process](#deployment-process)

## About The Project

This project uses the GitHub REST API and vanilla JavaScript to populate web pages with a user's public GitHub repos as a gallery wall. It was crafted specifically to work within the Oxygen Builder UI.

<!-- <div align="center">

![screenshot1](screenshots/screenshot1.png "before")
![screenshot2](screenshots/screenshot2.png "after")

</div> -->

### Key Technologies & Methods Used

-   **CSS:** responsive styles that control the grid layout.
-   **HTML:** includes the search filter, repos container
-   **JavaScript:**
    -   Fetches user info and repo data from GitHub API.
    -   Dynamically inserts repos on the page by looping through the public repos.
    -   Listens for click events to show/hide the individual repos and gallery wall.
    -   Provides dynamic search for repos by title.

## Development Notes

> The basic rule: if it can be done via the Oxygen UI, do it there.

### Code Blocks Within Oxygen

The `Code Block - GitHub Repo Gallery` manages:

-   All scripting.
-   All CSS that controls the Gallery and Repo Info function/style (i.e., for any JS-generated DOM elements).

Elements that could be created/styed via the Oxygen UI were styled directly on said element.

> Note: the Repo Info section has a "hide" class applied by default.

Any custom HTML elements that could not be created directly via Oxygen were created in their own code blocks where relevant to the layout. But all custom-written CSS is managed within the `Code Block - GitHub Repo Gallery` to consolidate styles in a single location.

## Development Process

1. Check if styles have been applied to an element in Oxygen first before customizing anything manually in CSS or JavaScript.
    1. Oxygen UI should always take precedence.
2. If custom coding is necessary:
    1. Create/modify custom HTML elements, such as the search filter, within a code block where required.
        1. But note that all styles/functions should be handled within the first `Code Block - GitHub Repo Gallery`.
    2. Copy any custom HTML into the local **oxygenCodeBlocks.html** file for backup/reference.
    3. Develop on the local **oxygenScript.js** or **oxygenStyles.css** files.
    4. Test these changes within Oxygen fully before deployment.

### Deployment Process

1. Minify the the local CSS/JS files.
    1. CSS Minifier: https://www.toptal.com/developers/cssminifier
2. Copy the minified files to the `Code Block - GitHub Repo Gallery` within Oxygen.
3. Save and publish site.
4. Add, commit, and push the local repo files.
