var inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Grishinka7",
  database: "EmployeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
//Menu to

function start() {
  inquirer
    .prompt({
      name: "task",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add new employee",
        "Add new department",
        "Add new role",
        "View employees & roles",
        "View roles",
        "View departments",
        "Update employees",
        "Update roles",
        "Update departments",
        "Delete employees",
        "Quit"
      ]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.task === "Add new employee") {
        addEmp();
      } else if (answer.task === "Add new department") {
        addDep();
      } else if (answer.task === "Add new role") {
        addRole();
      } else if (answer.task === "View employees & roles") {
        viewEmp();
      } else if (answer.task === "View departments") {
        viewDep();
      } else if (answer.task === "View roles") {
        viewRole();
      } else if (answer.task === "Update employees") {
        upEmp();
      } else if (answer.task === "Update roles") {
        upRole();
      } else if (answer.task === "Update departments") {
        upDep();
      } else if (answer.task === "Delete Employees") {
        delEmp();
      } else if (answer.task === "Quit") {
        quit();
      }
      // else {
      //   connection.end();
      // }
    });
}
//Quit function
function quit() {
  connection.end();
}

// Add functions to insert sql
function addDep() {
  inquirer
    .prompt({
      name: "addDPT",
      type: "input",
      message: "Department name?"
    })
    .then(function(answer) {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: answer.addDPT
        },
        function(err) {
          if (err) throw err;
          console.log("Department Updated");
          start();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "addTITLE",
        type: "input",
        message: "Input title"
      },
      {
        name: "addSALARY",
        type: "input",
        message: "Input salary"
      },
      {
        name: "addID",
        type: "input",
        message: "Input correct department ID"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          Title: answer.addTITLE,
          Salary: answer.addSALARY,
          Department_id: answer.addID
        },
        function(err) {
          if (err) throw err;
          console.log("Role Updated");
          addDep();
        }
      );
    });
}

function addEmp() {
  inquirer
    .prompt([
      {
        name: "fname",
        type: "input",
        message: "Employee first name?"
      },
      {
        name: "lname",
        type: "input",
        message: "Employee last name?"
      },
      {
        name: "role",
        type: "input",
        message: "Employee role ID#?"
      },
      {
        name: "MGMT",
        type: "input",
        message: "Enter Manager ID#"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          First_name: answer.fname,
          Last_name: answer.lname,
          Role_id: answer.role,
          Manager_id: answer.MGMT
        },
        function(err) {
          if (err) throw err;
          console.log("Employee Updated");
          addRole();
        }
      );
    });
}

// View functions using console.table

function viewDep() {
  var sqlStr = "SELECT * from departments";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    start();
  });
}

function viewRole() {
  var sqlStr = "SELECT * from roles";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    start();
  });
}

function viewEmp() {
  var sqlStr = "SELECT employees.*, roles.* FROM employees LEFT JOIN roles ON employees.role_id = roles.Roles_id";
  // sqlStr += "LEFT JOIN roles ";
  // sqlStr += "ON employees.role_id = roles.Roles_id";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    start();
  });
}

// Update code
function upRole() {
  var sqlStr = "SELECT employees.*, roles.* FROM employees LEFT JOIN roles ON employees.role_id = roles.Roles_id";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    upRole2();
  });
}
function upRole2() {
  inquirer
    .prompt([
      {
        name: "updateId",
        type: "input",
        message: "Input the role ID"
      },
      {
        name: "updateRole",
        type: "input",
        message: "Input updated role"
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE roles SET ? WHERE ?",
        [
          {
            Title: answer.updateRole
          },
          {
            Roles_id: answer.updateId
          }
        ],
        function(err) {
          if (err) throw err;
          console.log("Role Updated");
          start();
        }
      );
    });
  
}

// function upRole() {

// }

function upDep() {
  var sqlStr =
    "SELECT employees.*, departments.* FROM employees LEFT JOIN departments ON employees.id = departments.id";
  // sqlStr += "LEFT JOIN roles ";
  // sqlStr += "ON employees.role_id = roles.Roles_id";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    upDep2();
  });
}

function upDep2() {
  inquirer
    .prompt([
      {
        name: "updateId",
        type: "input",
        message: "Input the department ID"
      },
      {
        name: "updateDep",
        type: "input",
        message: "Input updated department"
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE departments SET ? WHERE ?",
        [
          {
            department_name: answer.updateDep
          },
          {
            id: answer.updateId
          }
        ],
        function(err) {
          if (err) throw err;
          console.log("Department Updated");
          start();
        }
      );
    });


function upEmp() {
  var sqlStr =
    "SELECT employees.*, roles.* FROM employees LEFT JOIN roles ON employees.role_id = roles.Roles_id";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    upRole2();
  });
}
function upRole2() {
  inquirer
    .prompt([
      {
        name: "updateId",
        type: "input",
        message: "Input the Employee ID"
      },
      {
        name: "updateEmp",
        type: "input",
        message: "Input updated role"
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE roles SET ? WHERE ?",
        [
          {
            Title: answer.updateEmp
          },
          {
            Roles_id: answer.updateId
          }
        ],
        function(err) {
          if (err) throw err;
          console.log("Role Updated");
          start();
        }
      );
    });
}

}