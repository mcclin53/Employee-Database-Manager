import inquirer from 'inquirer';
import { pool } from '../src/connection.js';

pool.connect();

function displayDepartments() {
    pool.query('SELECT * FROM departments', (err, result) => {
    if (err) {
    console.log(err);
    } else {
    console.log(result.rows);
    }
    });
}

function displayRoles() {
    pool.query('SELECT * FROM roles', (err, result) => {
        if (err) {
        console.log(err);
        } else {
        console.log(result.rows);
        }
        });
    }

  function displayEmployees() {
    pool.query('SELECT * FROM employees', (err, result) => {
        if (err) {
        console.log(err);
        } else {
        console.log(result.rows);
        }
        });
    }

function addDepartment(departmentName) {
    pool.query('INSERT INTO departments (department_name) VALUES ($1)', [departmentName], (err, result) => {
        if (err) {
        console.log(err);
        } else {
        console.log('Department added: ', result.rows);
        }
        });
    }

function addRole(jobTitle, salary, departmentId) {
    pool.query('INSERT INTO roles (job_title, salary, department_id) VALUES ($1, $2, $3)', [jobTitle, salary, departmentId], (err, result) => {
        if (err) {
        console.log(err);
        } else {
        console.log('Role added: ', result.rows);
        }
        });
    }

function addEmployee(firstName, lastName, roleId) {
    pool.query('INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3),', [firstName, lastName, roleId], (err, result) => {
        if (err) {
        console.log(err);
        } else {
        console.log(result.rows);
        }
        });
    }

function updateEmployee(employeeId, newRoleId) {
    pool.query('UPDATE INTO employees SET role_id = $1 WHERE id = $2', [employeeId, newRoleId], (err, result) => {
        if (err) {
        console.log(err);
        } else {
        console.log(result.rows);
        }
        });
    }
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: ['View all departments','View all roles','View all employees','Add a department','Add a role', 'Add an employee', 'Update an employee role'],
        }    
    ])
    .then((answer) => {
        switch (answer.menu) {
            case 'View all departments':
                displayDepartments();
            break;
            case 'View all roles':
                displayRoles();
            break;
            case 'View all employees':
                displayEmployees();
            break;
            case 'Add a department':
                inquirer.prompt([{ type: 'input', name: 'departmentName', message: 'Enter the department name:' }])
                .then(({ departmentName }) => addDepartment(departmentName));
            break;
            case 'Add a role':
                inquirer.prompt([
                    { type: 'input', name: 'jobTitle', message: 'Enter the job title:' },
                    { type: 'input', name: 'salary', message: 'Enter the salary:' },
                    { type: 'input', name: 'departmentId', message: 'Enter the department ID:' }
                ])
                .then(({ jobTitle, salary, departmentId }) => addRole(jobTitle, salary, departmentId));
            break;
            case 'Add an employee':
                inquirer.prompt([
                    { type: 'input', name: 'firstName', message: 'Enter the first name:' },
                    { type: 'input', name: 'lastName', message: 'Enter the last name:' },
                    { type: 'input', name: 'roleId', message: 'Enter the role ID:' }
                ])
                .then(({ firstName, lastName, roleId }) => addEmployee(firstName, lastName, roleId));
            break;
            case 'Update an employee role':
                inquirer.prompt([
                    { type: 'input', name: 'employeeId', message: 'Enter the employee ID:' },
                    { type: 'input', name: 'newRoleId', message: 'Enter the new role ID:' }
                ])
                .then(({ employeeId, newRoleId }) => updateEmployee(employeeId, newRoleId));
            break;
        }
    });