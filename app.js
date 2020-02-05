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
      choices: ["Add new", "Update", "View", "Delete"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.task === "Add new") {
        addNew();
      } else if (answer.task === "Update") {
        update();  
      } else if (answer.task === "View") {
        view();
      } else if (answer.task === "Delete") {
        del();
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

function update() {
  inquirer
    .prompt({
      name: "upWhat",
      type: "list",
      choices: ["Department", "Role", "Employee"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.upWhat === "Department") {
        upDep();
      } else if (answer.upWhat === "Role") {
        upRole();
      } else if (answer.upWhat === "Employee") {
        upEmp();
      } else {
        connection.end();
      }
    });
}


function view() {
  inquirer
    .prompt({
      name: "viewWhat",
      type: "list",
      choices: ["Department", "Role", "Employee"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.viewWhat === "Department") {
        viewDep();
      } else if (answer.viewWhat === "Role") {
        viewRole();
      } else if (answer.viewWhat === "Employee") {
        viewEmp();
      } else {
        connection.end();
      }
    });
}

function del() {
  inquirer
    .prompt({
      name: "delWhat",
      type: "list",
      choices: ["Department", "Role", "Employee"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.delWhat === "Department") {
        delDep();
      } else if (answer.delWhat === "Role") {
        delRole();
      } else if (answer.delWhat === "Employee") {
        delEmp();
      } else {
        connection.end();
      }
    });
}


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
            department: answer
          },
          function(err) {
            if (err) throw err;
            console.log("Department Updated");
            start();
          }
        );
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




app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});