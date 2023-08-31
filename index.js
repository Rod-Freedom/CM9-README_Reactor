// TODO: Include packages needed for this application
'use strict';
const inquirer = require('inquirer');
const generateMd = require('./utils/generateMarkdown');
const fs = require('fs');
const errMsg = '\u001b[31m\u001b[1mSorry, something\'s wrong... Try again.\u001b[0m'; // Error message for prompt and fetch funcs.

let inputData = {}; // To store the user input as a global object.
let mdContent = ''; // To store the newly created md file as a global variable.

// There are two rows of questions during the execution, this corresponds to the first prompts the user will receive.
const questions = [
    {
        type: 'input',
        name: 'userN',
        message: 'Firstly, tell me what\'s your GitHub user name!\n'
    },
    {
        type: 'input',
        name: 'repo',
        message: 'For which repo do you need your awesome README.\n'
    },
    {
        type: 'input',
        name: 'title',
        message: 'Let\'s choose a title... Your product name should fit nicely!\n'
    },
    {
        type: 'input',
        name: 'slogan',
        message: 'Now, think about an unforgettable slogan!\nSomething that defines your project.\n'
    },
    {
        type: 'input',
        name: 'intro',
        message: 'Great! Let\'s write a great intro.\nExplain what your project does; remember, it\'s an intro,\nkeep it simple.\n'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Awesome! Describe how to use your product,\nso that people use it as you\'ve imagined!\n'
    },
    {
        type: 'input',
        name: 'instructions',
        message: 'Almost there!\nGive the user some instructions on how to\ninstall/start-up your product.\nPlease be thoughtful of your user!\n'
    },
    {
        type: 'input',
        name: 'credits',
        message: 'Lastly, credit where credit is due! Who\'s to thank for your incredible product?\n'
    }
];

// This one corresponds to one last question if the user's repo has a license.
const questLast = {
    type: 'list',
    name: 'style',
    message: 'One last thing! Select a style for your license badge.\nMy favorite is \'for-the-badge\'!\n',
    choices: [
        'for-the-badge',
        'flat',
        'flat-square',
        'plastic'
    ]
};

// The following func will create a new folder and an .md file inside it. 
const mdReactor = (data) => {
    const mdCreate = () => {
        console.log('Voila!'); // Some messages to spice it up.
        // The README file will be written inside a newly created folder.
        fs.writeFile('./AwesomeREADME/README.md', mdContent, (err) =>
        err ? console.log(errMsg) : setTimeout(() => console.log('\'Hope you like it!\u001b[0m'), 1000));
    };
    
    // A folder to contain the new README, referenced in the function above.
    const folderCreate = () => {
        fs.mkdirSync('./AwesomeREADME', (err) => console.log(errMsg))
    };
    
    // Messages with timeouts to give the feeling that something great is cooking up.
    console.log('\u001b[35m\u001b[1mOk! I\'ll do my magic now.');
    mdContent = generateMd.generateMarkdown(data);
    setTimeout(() => console.log('Wait...'), 2000);
    setTimeout(() => console.log('And...'), 3000);
    setTimeout(folderCreate, 4000);
    setTimeout(mdCreate, 5000);
};

// If the repo has a license, this function will be called.
const styleBadgeFunc = () => {
    inquirer.prompt(questLast) // This last question will only ask for the license badge style.
    .then(answer => {
        inputData.style = answer.style // Then store it in the global object.
    })
    .then(() => mdReactor(inputData)) // To finally call for the md generator func.
    .catch(err => console.log(errMsg))
};

// This will be the first func executed, called at first.
const promptFunc = (questions) => {
    inquirer.prompt(questions)
        .then(answers => inputData = answers) // To store the answers in the global object.
        .then(() => getStatus(inputData.userN, inputData.repo)) // To check if the repo has a license.
        .catch(err => console.log(errMsg))
};

// The following function will fetch data from GitHub API to check if the user's repo has a license.
const getStatus = (userN, repo) => {
    const getLicense = `https://api.github.com/repos/${userN}/${repo}/license`;
  
    fetch(getLicense)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.message == 'Not Found') {
                inputData.licStatus = false;
                inputData.style = 'for-the-badge';
                console.log('\u001b[1mOh! It seems like your repo has no \u001b[31mLICENSE\u001b[0m...\u001b[1m It\'s a good practice to have one!\u001b[0m');
                setTimeout(() => mdReactor(inputData), 1000);
            } else {
                inputData.licStatus = data.html_url; // To store the license URL into the global object.
                styleBadgeFunc();
            };
        })
        .catch(err => { return false });
};

// This will execute on load.
(() => {
    console.log('\u001b[33m\u001b[1mHi there! Welcome to the README Reactor! I\'ll make the .md of your dreams come to life.\u001b[0m');
    setTimeout(() => promptFunc(questions), 3000);
})()