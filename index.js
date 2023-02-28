const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const employees = []


console.log("Welcome to the -My Team- generator!"),
console.log("Please Create your Dream Team :");
// Create manager
inquirer
  .prompt([
    {
      type: 'input',
      message: "What is the manager's name?",
      name: 'name',
    },
    {
      type: 'input',
      message: "What is the manager's ID?",
      name: 'id',
    },
    {
      type: 'input',
      message: "What is the manager's email address?",
      name: 'email',
    },
    {
      type: 'input',
      message: "What is the manager's office number?",
      name: 'officeNumber',
    },
  ])
  .then((response) => { 
    const manager = new Manager(...Object.values(response))
    employees.push(manager);
    promptForNextEmployee() 
  })


  // Question to add more employees or not
const promptForNextEmployee = () => {
    inquirer.prompt([
      {
        type: 'list',
        message: 'What type of team member do you want to add?',
        name: 'function',
        choices: ['Engineer', 'Intern', 'Finish building the team',]
      },
  
    ]).then(response => {
      if (response.function === 'Engineer') {
        promptForEngineer()
      } else if (response.function === 'Intern') {
        promptForIntern()
      } else {
        buildPage()
      }
    })
  }
// Engineer questions
const promptForEngineer = () => {
    inquirer.prompt([
      {
        type: 'input',
        message: "What is the engineers's first name?",
        name: 'name',
      },
      {
        type: 'input',
        message: "Please What is the engineer's ID?",
        name: 'id',
      },
      {
        type: 'input',
        message: "What is the engineer's email address?",
        name: 'email',
      },
      {
        type: 'input',
        message: "What is the engineer's GitHub username?",
        name: 'github',
      },
  
    ])
      .then((response) => {
        const engineer = new Engineer(...Object.values(response))
        employees.push(engineer);
        promptForNextEmployee()
      })
  }

// Intern Questions 
const promptForIntern = () => {
    inquirer.prompt([
      {
        type: 'input',
        message: "What is the intern's name?",
        name: 'name',
      },
      {
        type: 'input',
        message: "What is the intern's ID?",
        name: 'id',
      },
      {
        type: 'input',
        message: "What is the intern's email address?",
        name: 'email',
      },
      {
        type: 'input',
        message: "What is the intern's school?",
        name: 'school',
      },
    ])
      .then((response) => {
        const intern = new Intern(...Object.values(response))
        employees.push(intern);
        promptForNextEmployee()
      })
  }
// CREATE HTML PAGE by rendering 
  const buildPage = () => {
    const html = render(employees)
    fs.writeFile(outputPath, html, (err) => {
      if (err) throw err;
      console.log('Page created successfully!');
    });
  };