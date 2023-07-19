/* eslint-disable no-undef */


const database = require("./database");

const getPokemonById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from pokemon where id = ?", [id])
      .then(([pokemons]) => {
        if (pokemons[0] != null) {
          res.json(pokemons[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  module.exports = {
    getPokemonById
  }