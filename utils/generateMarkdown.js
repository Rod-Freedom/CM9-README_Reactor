'use strict'
// This func will render the badge based on the users input.
const renderLicBadge = (userN, repo, style) => {
  const badgeURL = `https://img.shields.io/github/license/${userN}/${repo}?style=${style}`;

  return badgeURL;
};

// This func will render the license URL based on the users input.
const renderLicLink = (licStatus) => {
  const licenseURL = licStatus;

  return licenseURL;
};

// This func will render the whole license section depending on the existense of a license in the user's repo.
const renderLicense = (userN, repo, style, licStatus) => {
  const licBadge = renderLicBadge(userN, repo, style);

  // The licStatus will either be a url for the repo's license or a simple "false".
  if (licStatus) {
    return `
> ![GitHub](${licBadge})<br>
> See the **[\`LICENSE\`](${licStatus})** for more details.
    `;
  } else {
    return `
> ![GitHub](${licBadge})<br>
    `;
  };
};

// Next, this func will take the user input and put it toghether with the md file format.
function generateMarkdown(data) {
  const license = renderLicense(data.userN, data.repo, data.style, data.licStatus);
  
  const content = `<header style="background: rgb(30 41 59 / 0.8); text-align: center; border-radius: 5px; padding-bottom: 14px; color: rgb(226 232 240/ .9);">
<span style="font-weight: bold; font-size: xxx-large;">${data.title}</span><br>
<span style="font-style: italic; font-weight: 100; font-size: x-large">${data.slogan}</span>
</header>
<br>
<br>
<br>

## **ABOUT THE PROJECT**
### **Overview**
${data.intro}
<br>
<br>

## Table of Contents
- [License](#license)
- [Resources](#resources)
- [Usage](#usage)
- [Get Started](#get-started)
- [Credits](#credits)
- [Contact](#contact)

<br>

[(Back to the Top)](#about-the-project)

## License
${license}

<br>

[(Back to the Top)](#about-the-project)
## Resources
> <span style="color: lightseagreen;">**ATTENTION**</span><br>
Don't forget to add the technologies/resources you used in your project.

* Resource one
* Resource two
* Resource three
* Resource four

<br>

[(Back to the Top)](#about-the-project)
## Usage
${data.usage}

<br>

[(Back to the Top)](#about-the-project)
## Get Started
${data.instructions}

<br>

[(Back to the Top)](#about-the-project)
## Credits
${data.credits}

<br>

[(Back to the Top)](#about-the-project)
## Contact
The owner of this repo is [${data.userN}](https://github.com/${data.userN}).
`;

  return content;
};

// This file will only return the md file format.
module.exports = {generateMarkdown};

