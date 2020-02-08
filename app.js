var inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql")



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
      choices: ["Add new employee", "Add new department", "Add new role", "View employees", "View roles", "View departments", "Update employees", "Update roles", "Update departments", "Delete employees", "Quit"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.task === "Add new employee") {
        addEmp();
      } else if (answer.task === "Add new department") {
        addDep();  
      } else if (answer.task === "Add new role") {
        addRole();
      } else if (answer.task === "View employees") {
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
      }
       else if (answer.task === "Quit") {
        quit();
      }
      // else {
      //   connection.end();
      // }
    });
}
//Quit function
function quit() {
  connection.end()
}



 // Add functions to insert sql
function addDep() { 
    inquirer.prompt({
      
        name: "addDPT",
        type: "input",
        message: "Department name?"
    
    })
    .then(function(answer) {
        connection.query(
          "INSERT INTO departments SET ?",
          {
            department_name: answer.addDPT,
      
          },
          function(err) {
            if (err) throw err;
            console.log("Department Updated");
          start()
          }
        );
    })
    
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
          start();
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
    
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          First_name: answer.fname,
          Last_name: answer.lname,
          Role_id: answer.role,
        },
        function(err) {
          if (err) throw err;
          console.log("Role Updated");
          start();
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
  var sqlStr = "SELECT * from employees";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    start();
  });
}

// Update code
function upEmp() {

}


function upRole() {


}

function upDep() {


}

function delEmp() {
  console.log("Deleting an employee");

  var query = `SELECT *
      FROM employees`;

  connection.query(query, function(err, res) {
    if (err) throw err;

    const delwho = res.map(({ id, First_name, Last_name }) => ({
      value: id,
      name: `${id} ${First_name} ${Last_name}`
    }));

    console.table(res);
    console.log("ArrayToDelete!\n");

    delWho(delwho);
  });
}

function delWho(delwho) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "empId",
        message: "Which employee do you want to remove?",
        choices: delwho
      }
    ])
    .then(function(answer) {
      var query = `DELETE FROM employee WHERE ?`;
      // when finished prompting, insert a new item into the db with that info
      connection.query(query, { id: answer.empId }, function(err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + "Deleted!\n");

        // start();
      });
    });
}


