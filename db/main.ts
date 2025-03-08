import inquirer from 'inquirer';

inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: ['View all departments','View all roles','View all employees','Add a department','Add a role', 'Add an employee', 'Update an employee role'],
        },
        {
            type: 'confirm',
            message: 'deptTable',
            name: 'department table',
            default: true
        },
        {
            type: 'confirm',
            message: 'roleTable',
            name: 'roles table',
            default: true
        },
        {
            type: 'confirm',
            message: 'employeeTable',
            name: 'employee table',
            default: true
        },
    ])
    .then((answer) =>
        if (answer.deptTable) {
            displayTable(departments)
        } else if {
            (answer.roleTable) {
                displayTable(roles)
            } else if {
                (answer.employeeTable) {
                    displayTable(employees)
                }
            }
        }
    ));