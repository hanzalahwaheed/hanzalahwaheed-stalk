#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import boxen from "boxen";
import chalk from "chalk";
// Define the question collection
const questions = [
    {
        type: "list",
        name: "option",
        message: "What would you like to know about Hanzalah Waheed?",
        choices: ["Basic Info", "Social Media", "Projects", "Exit"],
    },
];
// Function to display content in a styled box
function displayBox(content, boxOptions) {
    const defaultOptions = Object.assign({ margin: 1, padding: 1, borderStyle: "round", borderColor: "green" }, boxOptions);
    console.log(boxen(content, defaultOptions));
}
// Add version check
if (process.argv.includes('--version') || process.argv.includes('-v')) {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const packageJson = yield import('../package.json', {
            assert: { type: 'json' }
        });
        console.log('v' + packageJson.default.version);
        process.exit(0);
    }))();
}
// Main function to ask questions
function runStalker() {
    inquirer.prompt(questions).then((answers) => {
        let output = ""; // Store the output to be displayed in the box
        switch (answers.option) {
            case "Basic Info":
                output = `
${chalk.bold.green("Name:")} Hanzalah Waheed
${chalk.bold.green("Profession:")} Full Stack Developer
${chalk.bold.green("Location:")} [Your Location]
        `;
                break;
            case "Social Media":
                output = `
${chalk.bold.blue("GitHub:")} https://github.com/your-profile
${chalk.bold.blue("LinkedIn:")} https://linkedin.com/in/your-profile
        `;
                break;
            case "Projects":
                output = `
${chalk.bold.yellow("Project 1:")} Knowledge Base Search
${chalk.dim("Description:")} A semantic search system leveraging AI and GraphQL.
        
${chalk.bold.yellow("Project 2:")} Swipe Decision App
${chalk.dim("Description:")} A group-based decision-making app using WebSockets.
        `;
                break;
            case "Exit":
                console.log("Thanks for your interest!");
                return; // Exit the program
        }
        // Display the output in a box
        displayBox(output);
        // Ask if the user wants to know more
        inquirer
            .prompt([
            {
                type: "confirm",
                name: "askAgain",
                message: "Would you like to know more?",
                default: true,
            },
        ])
            .then((response) => {
            if (response.askAgain) {
                runStalker(); // Call the function recursively
            }
            else {
                console.log("Thanks for your interest!");
            }
        });
    });
}
runStalker();
