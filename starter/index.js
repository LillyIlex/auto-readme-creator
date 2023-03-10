const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

//question prompt function with inquirer
const promptUser = () => {

    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is your project title?"
            },
            {
                type: "input",
                name: "description",
                message: "Enter project description:"
            },
            {
                type: "input",
                name: "installation",
                message: "Enter instructions for installation:"
            },
            {
                type: "input",
                name: "usage",
                message: "Enter instruction on usage:"
            },
            {
                type: "rawlist",
                name: "license",
                message: "Select license type:",
                choices: ["None", "MIT", "GPL", "Apache"]
            },
            {
                type: "input",
                name: "credit",
                message: "Enter the contributors you would like to give credit to:"
            },
            {
                type: "input",
                name: "tests",
                message: "Enter what tests you ran:"
            },
            {
                type: "input",
                name: "userQuestions",
                message: "Enter an email address for questions:"
            },
            {
                type: "input",
                name: "github",
                message: "Enter your GitHub link:"
            },
            {
                type: "input",
                name: "deployedLink",
                message: "Enter the link to the deployed webpage:"
            }
            //.then promise to get answers
        ]).then((answers) => {
//if else statement to display different license badges depending on user input
            if (answers.license == "MIT") {
                answers.license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  'A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.'"
               } else if (answers.license == "GPL" ) {
                 answers.license = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) 'Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.'"
               }  else if (answers.license == "Apache") {
                answers.license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)  'A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.'"
               } else {
                 answers.license = "None"
               }
// Process working directory, join the path to dist folder, and write Readme file in there. 
// Call generate markdown function, passing in answers as data.
// error function incase not functional
             fs.writeFile(path.join(process.cwd() + "/dist/",'readme.md'), generateMarkdown(answers), (err) => err && console.error(err))
        });

    }

promptUser()