const inquirier = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql")

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Grishinka7",
  database: "top_songsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});


function start() {
  inquirer
    .prompt({
      name: "task",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add new employee", "Add new department", "Add new role", "View employees", "View roles", "View departments", "Update employee roles"]
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
      } else if (answer.task === "Update employee roles") {
        viewRole();
      }

      else {
        connection.end();
      }
    });
}

function addNew() {
    inquirer
      .prompt({
        name: "addWhat",
        type: "list",
        choices: ["Department", "Role", "Employee"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.addWhat === "Department") {
          addDep();
        } else if (answer.addWhat === "Role") {
          addRole();
        } else if (answer.addWhat === "Employee") {
          addEmp();
        } else {
          connection.end();
        }
      });
}



function addDep() { 
    inquirer.prompt([
      {
        name: "addDPT",
        type: "input",
        message: "Department name?"
    },
      {
        name: "addDPTID",
        type: "input",
        message: "Department ID?"
      }
    ])
    .then(function(answer) {
        connection.query(
          "INSERT INTO departments SET ?",
          {
            department_name: answer.addDPT
          },
          function(err) {
            if (err) throw err;
            console.log("Department Updated");
          
          }
        );
    })
    .then(function(answer) {
      connection.query(
        "INSERT INTO departments SET ?",
        {
        department_id: answer.addDPTID
        },
        function(err) {
            if (err) throw err;
            console.log("Department ID Updated");
            start();
          }
      )
    })
}  



function addRole() {
  inquirer
    .prompt({
      name: addROLE,
      type: "input",
      message: "Role name?"
    })
    .then(function(answer) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          department: answer
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
    {
        name: "salary",
        type: "input",
        message: "Input"
    }

    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          First_name: answer.fname,
          Last_name: answer.lname,
          Role_id: answer.role
        },
        function(err) {
          if (err) throw err;
          console.log("Role Updated");
          start();
        }
      );
    });
}



function upDep() {
  inquirer
  .prompt({
    name: upDPT,
    type: "input",
    message: "Which department would you like to update?"
  }


  )

}

function viewEmp() {
  var sqlStr = "SELECT first_name, last_name, title, salary FROM employee ";
  sqlStr += "LEFT JOIN role ";
  sqlStr += "ON employee.role_id = role.id";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    runSearch();
  });
}

function viewDep() {
  var sqlStr = "SELECT * from department";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    runSearch();
  });
}

function viewRole() {
  var sqlStr = "SELECT * from role";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    runSearch();
  });
}

function viewRole() {
  var sqlStr = "SELECT * from role";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    runSearch();
  });
}

function viewEmp() {
  var sqlStr = "SELECT * from role";
  connection.query(sqlStr, function(err, result) {
    if (err) throw err;

    console.table(result);
    runSearch();
  });
}

function delEmp() {
  console.log("Deleting an employee");

  var query = `SELECT *
      FROM employee`;

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

        start();
      });
    });
}



app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});