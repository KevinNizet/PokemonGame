/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const app = express();

//Midleware indispensable pour les requêtes POST
app.use(express.json());

const port = process.env.APP_PORT ?? 5001;

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const router = require("./router.js");
app.use(router);

module.exports = app;
