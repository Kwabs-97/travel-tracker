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

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => countries.push(country.country_code));

  res.render("index.ejs", { countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const enteredCountry = req.body.country;
  const result = await db.query("SELECT country_code FROM countries WHERE country_name = $1", [
    enteredCountry,
  ]);

  if (result.rows.length !== 0) {
    const data = result.rows[0];
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
