/* eslint-disable no-undef */
const express = require("express");

const router = express.Router();


//importer le handler
const pokemonHandler = require("./pokemonHandler");
const commentHandler = require("./commentHandler");
//routes à renseigner ensuite

router.get("/", (req, res) => {
  console.log("New request sent to server");
  res.send("Hello world, server is OK");
});

//gestion des starter
router.get("/pokemon", pokemonHandler.getAllPokemon);
router.get("/pokemon/:id", pokemonHandler.getPokemonById);
router.delete("/pokemon/:id", pokemonHandler.deletePokemon);
router.put("/pokemon/:id", pokemonHandler.updatePokemon);
router.post("/pokemon", pokemonHandler.createPokemon);

//gestion des nouveaux pokemon rencontrés
router.get("/comment", commentHandler.getAllComment);
router.get("/comment/:id", commentHandler.getCommentById);
router.delete("/comment/:id", commentHandler.deleteComment);
router.put("/comment/:id", commentHandler.updateComment);
router.post("/comment", commentHandler.createComment);

module.exports = router;
