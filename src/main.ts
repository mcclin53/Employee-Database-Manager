import inquirer from 'inquirer';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;


dotenv.config();

console.log('Welcome to the Employee Tracker!');
console.log('---------------------------------');




const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'WHAT WOULD YOU LIKE TO DO?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
    },
  ]);

  switch (answers.mainMenu) {
    case 'View all departments':
      await viewDepartments();
      break;
    case 'View all roles':
      await viewRoles();
      break;
    case 'View all employees':
      await viewEmployees();
      break;
    case 'Add a department':
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'Update an employee role':
      await updateEmployee();
      break;
    case 'Exit':
      process.exit(0);
  }

  // Show the menu again after completing the action
  await mainMenu();
};

const viewDepartments = async () => {
  const result = await pool.query('SELECT * FROM departments');
  console.table(result.rows);
};

const viewRoles = async () => {
  const result = await pool.query('SELECT * FROM roles');
  console.table(result.rows);
};

const viewEmployees = async () => {
  const result = await pool.query('SELECT * FROM employees');
  console.table(result.rows);
};

const addDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the department name',
    },
  ]);

  const { departmentName } = answers;
  await pool.query(
    `INSERT INTO departments (department_name) VALUES ($1)`,
    [departmentName]
  );
};

const addRole = async () => {
  const departments = await pool.query('SELECT department_id, department_name FROM departments');
  const departmentChoices = departments.rows.map(departments => ({
    name: departments.department_name,
    value: departments.department_id,
  }));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'jobTitle',
      message:'Enter the job title',
    },
    {
      type: 'input',
      name: 'salary',
      message:'Enter the salary',
    },
    {
      type: 'list',
      name: 'roleDepartment',
      message:'Choose a department for the role',
      choices: departmentChoices,
    },
  ]);

  const { jobTitle, salary, roleDepartment } = answers;
  await pool.query(
    `INSERT INTO roles (job_title, salary, department_id) VALUES ($1, $2, $3)`,
    [jobTitle, salary, roleDepartment]
  );
};

const addEmployee = async () => {
  const roles = await pool.query('SELECT role_id, job_title FROM roles');
  const roleChoices = roles.rows.map(role => ({
    name: role.job_title,
    value: role.role_id,
  }));

  const employees = await pool.query('SELECT employee_id, first_name, last_name FROM employees');
  const managerChoices = employees.rows.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.employee_id,
  }));

  managerChoices.push({ name: 'None', value: null });

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message:'Enter the first name',
    },
    {
      type: 'input',
      name: 'lastName',
      message:'Enter the last name',
    },
    {
      type: 'list',
      name: 'employeeRole',
      message:'Enter the employee role',
      choices: roleChoices,
    },
        {
      type: 'list',
      name: 'employeeManager',
      message:'Enter the employee manager',
      choices: managerChoices,
    },
  ]);

  const { firstName, lastName, employeeRole, employeeManager} = answers;
  await pool.query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,
    [firstName, lastName, employeeRole, employeeManager]
  );
};

const updateEmployee = async () => {
  const employees = await pool.query('SELECT employee_id, first_name, last_name FROM employees');
  const employeeChoices = employees.rows.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.employee_id,
  }));

  const roles = await pool.query('SELECT role_id, job_title FROM roles');
  const roleChoices = roles.rows.map(role => ({
    name: role.job_title,
    value: role.role_id,
  }));

  const managerChoices = employees.rows.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.employee_id,
  }));

  managerChoices.push({ name: 'None', value: null });

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'updateEmployee',
      message:'Choose an employee to update',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'updateRole',
      message:'Enter new employee role',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'updateManager',
      message:'Enter the new employee manager',
      choices: managerChoices
    },    
  ]);

  const { updateEmployee, updateRole, updateManager } = answers;
  await pool.query(
    `UPDATE employees SET role_id = $1, manager_id = $2 WHERE employee_id = $3`,
    [updateRole, updateManager, updateEmployee]
  );
};

connectToDb().then(() => {
  mainMenu();
});