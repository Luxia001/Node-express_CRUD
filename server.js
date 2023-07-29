var express = require("express");
var cors = require("cors");
var app = express();

const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "mydb",
});

app.use(cors());
app.use(express.json())

app.get("/", function (req, res, next) {
  res.json("hello");
});

app.get("/user", function (req, res, next) {
  // simple query
  connection.query("SELECT * FROM `user2`", function (err, results, fields) {
    res.json({ results });
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  });
});

app.get("/user/:id", function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM `user2` WHERE `id` = ? ",
    [id],
    function (err, results) {
      res.json(results);
    }
  );
});

app.post("/user", function (req, res, next) {
  connection.query(
    "INSERT INTO `user2`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?,?,?,?,?) ",
    [req.body.fname,req.body.lname,req.body.username,req.body.password,req.body.avatar],
    function (err, results) {
      res.json(results);
    }
  );
})

app.put("/user", function (req, res, next) {
    connection.query(
      "UPDATE `user2` SET `fname`=?,`lname`=?,`username`=?,`password`=?,`avatar`=? WHERE id = ?",
      [req.body.fname,req.body.lname,req.body.username,req.body.password,req.body.avatar,req.body.id],
      function (err, results) {
        res.json(results);
      }
    );
  })

  app.delete("/user", function (req, res, next) {
    connection.query(
      "DELETE FROM `user2` WHERE id =? ",
      [req.body.id],
      function (err, results) {
        res.json(results);
      }
    );
  })

app.listen(5000, function () {
  console.log("CORS-enabled http://localhost:5000");
});
