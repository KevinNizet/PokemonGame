/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//Midleware indispensable pour les requêtes POST
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

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
