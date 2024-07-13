# Tecnate Website - Internal Notes

<a href="https://tecnate.dev" target="_blank" rel="author">Tecnate</a> | Last Updated: 2024.07.13

## Table of Contents

-   [Tecnate Website - Internal Notes](#tecnate-website---internal-notes)
    -   [Table of Contents](#table-of-contents)
    -   [About](#about)
    -   [Usage](#usage)
        -   [Repo Gallery Construction](#repo-gallery-construction)
        -   [Development Process](#development-process)
        -   [Deployment Process](#deployment-process)

## About

This document is for development notes to serve as a reminder for how the GitHub Repo Gallery was created and how to implement future changes.

## Usage

The basic rule is:

> If it can be done via the Oxygen UI, do it there.

### Repo Gallery Construction

The first Oxygen `Code Block - GitHub Repo Gallery` manages:

-   All JS functionality, including fetching data from the GitHub API.
-   All CSS that is specific to the Gallery and Repo Info function/style (i.e., for any JS-generated DOM elements).
    -   Note: much of the default theme styling, especially section layouts, is already managed by global stylesheets.

<br>

Elements that could be created/styed via the Oxygen UI were styled directly on said element.

-   Note: the Repo Info section has a "hide" class applied by default.

<br>

Any custom HTML elements that could not be created directly via Oxygen were created in their own code blocks where relevant to the page layout.

-   All CSS is managed within the top level `Code Block - GitHub Repo Gallery` to consolidate styles.

### Development Process

1. Check if styles have been applied to an element in Oxygen first before customizing anything manually. Oxygen should always take precedence.
2. If custom coding is necessary:
    1. Create/modify custom HTML elements within a code block where required, but all styles/functions should be handled within the `Code Block - GitHub Repo Gallery`.
    2. Copy any custom HTML into the local **oxygenCodeBlocks.html** file for backup/reference.
    3. Develop on the local **oxygenScript.js** or **oxygenStyles.css** files.
    4. Test these changes within Oxygen fully before deployment.

### Deployment Process

1. Minify the the local CSS/JS files.
2. Copy the minified files to the `Code Block - GitHub Repo Gallery` within Oxygen.
3. Save and publish site.
4. Add, commit, and push the local files.
