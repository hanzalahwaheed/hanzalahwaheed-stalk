#!/usr/bin/env node

import inquirer from "inquirer";
import { QuestionCollection } from "inquirer";
import boxen from "boxen";
import chalk from "chalk";

// Update the type definition
type BoxenOptions = {
  margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
  padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  borderStyle?: 'single' | 'double' | 'round' | 'bold' | 'singleDouble' | 'doubleSingle' | 'classic';
  borderColor?: string;
};

// Define the options for the CLI
type Option = "Basic Info" | "Social Media" | "Projects" | "Exit";

// Define the question collection
const questions: QuestionCollection<{ option: Option }> = [
  {
    type: "list",
    name: "option",
    message: "What would you like to know about Hanzalah Waheed?",
    choices: ["Basic Info", "Social Media", "Projects", "Exit"],
  },
];

// Function to display content in a styled box
function displayBox(content: string, boxOptions?: BoxenOptions): void {
  const defaultOptions: BoxenOptions = {
    margin: 1,
    padding: 1,
    borderStyle: "round",
    borderColor: "green",
    ...boxOptions,
  };
  console.log(boxen(content, defaultOptions));
}

// Add version check
if (process.argv.includes('--version') || process.argv.includes('-v')) {
    console.log('v' + process.env.npm_package_version);
    process.exit(0);
}

// Main function to ask questions
function runStalker(): void {
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
      .prompt<{ askAgain: boolean }>([
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
        } else {
          console.log("Thanks for your interest!");
        }
      });
  });
}

runStalker();