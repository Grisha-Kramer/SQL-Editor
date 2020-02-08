DROP DATABASE IF EXISTS EmployeeDB;

CREATE DATABASE EmployeeDB;

USE EmployeeDB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  Department_name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  Title VARCHAR(30) NULL,
  Salary DECIMAL(10,2) NULL,
  Department_id INT NULL,
  Roles_id INT NULL,
  PRIMARY KEY (id)
  
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  First_name VARCHAR(40) NULL,
  Last_name VARCHAR(40) NULL,
  Role_id INT NULL,
  Manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (First_name, Last_name, Role_id, Manager_id)
VALUES ("Sven", "Johansenburg", "2", "80");

INSERT INTO roles (Title, Salary, Department_id, Roles_id)
VALUES ("Lion Tamer", "35000", "2", "2");

INSERT INTO departments (Department_name)
VALUES ("Animal Resources");



INSERT INTO employees (First_name, Last_name, Role_id, Manager_id)
VALUES ("Heinrich", "Krautenstein", "3", "82");

INSERT INTO roles (Title, Salary, Department_id, Roles_id)
VALUES ("Private Jet Pilot", "80000", "2", "3");

INSERT INTO departments (Department_name)
VALUES ("Aircraft Etc");

INSERT INTO employees (First_name, Last_name, Role_id, Manager_id)
VALUES ("Sergei", "Russianovich", "3", "82");

INSERT INTO roles (Title, Salary, Department_id, Roles_id)
VALUES ("Reiki Wrangler", "35000", "4", "1");

INSERT INTO departments (Department_name)
VALUES ("Reiki etc");


INSERT INTO employees (First_name, Last_name,  Role_id, Manager_id)
VALUES ("Guis", "Leparis", "2", "82");

INSERT INTO roles (Title, Salary, Department_id, Roles_id)
VALUES ("Pizza Scientist", "100000", "5", "2");

INSERT INTO departments (Department_name)
VALUES ("Pizza ops");