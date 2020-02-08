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
  Role_id INT NULL,
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

INSERT INTO departments (Department_name)
VALUES ("Animal Resources");

INSERT INTO employees (First_name, Last_name, Salary, Role_id, Manager_id)
VALUES ("Sven", "Johansenburg", "40000", "3", "80");

INSERT INTO employees (First_name, Last_name, Salary, Role_id, Manager_id)
VALUES ("Heinrich", "Krautenstein", "50000", "2", "82");

INSERT INTO employees (First_name, Last_name, Salary, Role_id, Manager_id)
VALUES ("Sergei", "Russianovich", "43000", "2", "82");

