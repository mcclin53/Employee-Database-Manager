DROP DATABASE IF EXISTS employeeManager_db;
CREATE DATABASE employeeManager_db;

\c employeeManager_db;

CREATE TABLE employees(
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id),
    manager_id INTEGER
);

CREATE TABLE departments(
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR (30) NOT NULL
);

CREATE TABLE roles(
    role_id SERIAL PRIMARY KEY, 
    job_title VARCHAR (30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
);