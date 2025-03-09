import inquirer from 'inquirer';
import { pool } from '../src/connection.js';

pool.connect();

const displayTable = async (tableName) => {
    try {
        const res = await pool.query(`SELECT * FROM ${tableName}`);
        console.table(res.rows);
    } catch (err) {
        console.error('Error executing query');
    }
};

function displayDepartments = pool.query('SELECT * FROM departments', (err: Error, result: QueryResult) => {
  if (err) {
    console.log(err);
  } else if (result) {
    console.log(result.rows);
  }
});

function displayRoles = pool.query('SELECT * FROM roles', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  });

  function displayEmployees {
    pool.query('SELECT * FROM employees', (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result.rows);
    }
  });

function addDepartment() {
    pool.query('INSERT INTO departments department_name', (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
          console.log(result.rows);

});

function addROle() {
    pool.query('INSERT INTO roles role_id, job_title, salary, department_id', (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
          console.log(result.rows);

});

function addEmployee() {
    pool.query('INSERT INTO employees first_name, last_name, role_id, ', (err: Error, result: QueryResult) => {
        if (err) {
          console.log(err);
        } else if (result) {
          console.log(result.rows);

});

inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: ['View all departments','View all roles','View all employees','Add a department','Add a role', 'Add an employee', 'Update an employee role'],
        }    
    ])
    .then((answer) =>
        switch (answer.menu) {
            case 'View all departments';
                return displayDepartments;
            case 'View all roles';
                return displayRoles;
            case 'View all employees';
                return displayEmployees;
            case 'Add a department';
                return addDepartment;
            case 'Add a role';
                return addROle;
            case 'Add an employee';
                return addEmployee;

        }
    )};