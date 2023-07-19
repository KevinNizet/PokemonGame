/* eslint-disable no-undef */
const express = require("express");

const router = express.Router();

//importer le handler
const pokemonHandler = require("./pokemonHandler");
//routes à renseigner ensuite

router.get("/", (req, res) => {
  console.log("New request sent to server");
  res.send("Hello world, server is OK");
});

router.get("/pokemon/:id", pokemonHandler.getPokemonById);

module.exports = router;
