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

router.get("/pokemon", pokemonHandler.getAllPokemon);
router.get("/pokemon/:id", pokemonHandler.getPokemonById);
router.delete("/pokemon/:id", pokemonHandler.deletePokemon);
router.put("/pokemon/:id", pokemonHandler.updatePokemon);
router.post("/pokemon", pokemonHandler.createPokemon);

module.exports = router;
