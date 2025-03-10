INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Tom', 'Spencer', 2, 1),
        ('Ramona', 'Henderson', 3, 1),
        ('Ian', 'Adams', 2, 2),
        ('Bill', 'Stevens', 3, 1),
        ('Nancy', 'Williamson', 1, 2),
        ('Aiden', 'Thomas', 2, 2),
        ('Priscilla', 'Buckley', 1, 1);

INSERT INTO departments (department_name)
VALUES  ('Administration'),
        ('Sales'),
        ('Human Resources');

INSERT INTO roles (job_title, salary, department_id)
VALUES  ('Sales Representative', 50000, 2),
        ('Benefits Specialist', 70000, 3),
        ('Clerk', 30000, 1),
