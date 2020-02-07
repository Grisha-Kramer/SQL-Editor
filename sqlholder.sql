DROP DATABASE IF EXISTS EmployeeDB;

CREATE DATABASE EmployeeDB;

USE EmployeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  Department_name VARCHAR(30) NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  Title VARCHAR(30) NULL,
  Salary DECIMAL(10,2) NULL,
  Department_id INT NULL,
  PRIMARY KEY (id)
  
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  First_name VARCHAR(40) NULL,
  Last_name VARCHAR(40) NULL,
  Role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO departments (Department)
VALUES (DPNT);

INSERT INTO roles (Title, Salary, Department_id)
VALUES ("{title}", 3.25, 75);


INSERT INTO employee (First_name, Last_name, Role_id)
VALUES ("{fname}", "{lname}", roleid)

UPDATE roles SET newrole WHERE id = id;

SELECT * WHERE manager_id = mgmt_id

DELETE 