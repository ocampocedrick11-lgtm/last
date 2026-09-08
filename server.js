const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const pool = mysql.createPool({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "employee",
  host: "sql.freedb.tech",
  user: "u_VKoFso",
  password: "zRzQM0uVXPLS",
  database: "freedb_ENfkgVTy",
  ///
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});
//REPORT
app.get("/api/members", (req, res) => {
  pool.query("SELECT * FROM userdata", (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
});
//CREATE
app.post("/api/members", (req, res) => {
  const student_id = req.body.student_id;
  const full_name = req.body.full_name;
  const course = req.body.course;
  const year_level = req.body.year_level;
  const email = req.body.email;
  const contact_number = req.body.contact_number;
  pool.query(
    "INSERT INTO userdata (student_id, full_name, course, year_level, email, contact_number) VALUES (?, ?, ?, ?, ?, ?)",
    [student_id, full_name, course, year_level, email, contact_number],
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: `Successfully inserted!` });
    },
  );
});
//SEARCH
app.get("/api/members/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM userdata WHERE id = ?", [id], (err, rows, fields) => {
      if (err) throw err;
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(400).json({ msg: `${id} id not found!` });
      }
    },
  );
});
//UPDATE
app.put("/api/members", (req, res) => {
  const id = req.body.id;
  const student_id = req.body.student_id;
  const full_name = req.body.full_name;
  const course = req.body.course;
  const year_level = req.body.year_level;
  const email = req.body.email;
  const contact_number = req.body.contact_number;

  pool.query(
    "UPDATE userdata SET student_id = ?, full_name = ?, course = ?, year_level = ?, email = ?, contact_number = ? WHERE id = ?",
    [student_id, full_name, course, year_level, email, contact_number, id],
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: `Successfully updated` });
    },
  );
});
//DELETE
app.delete("/api/members", (req, res) => {
  const id = req.body.id;
  pool.query("DELETE FROM userdata WHERE id = ?", [id], (err, rows, fields) => {
    if (err) throw err;
    res.json({ msg: `Successfully deleted` });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
