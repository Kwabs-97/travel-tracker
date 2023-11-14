/** @format */

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world ",
  password: "0607",
  port: 5432,
});

db.connect();

let country_code = [];
let countries = [];

db.query("SELECT country_code FROM visited_countries", (err, res) => {
  if (err) {
    console.log("error quering visited countries", err.stack);
  } else {
    country_code = res.rows;
    console.log(country_code);
  }
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  res.render("index.ejs", {
    total: country_code.length,
    countries: country_code.map((country) => country.country_code),
  });
});

app.get("/add", async (req, res) => {
  const enteredCountry = req.body.name;
  const result = await db.query('SELECT country FROM country WHERE country_code = $1', [enteredCountry])
  if (result.rows !== 0) {
    const data = result.rows[0]
  }
 })

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
