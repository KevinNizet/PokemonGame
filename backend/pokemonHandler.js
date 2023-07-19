/* eslint-disable no-undef */
const database = require("./database");

const getAllPokemon = (req, res) => {
  database
    .query("select * from pokemon")
    .then(([users]) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

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

const deletePokemon = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from pokemon where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the pokemon");
    });
};

const updatePokemon = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, type, location, description } = req.body;

  database
    .query(
      "update pokemon set firstname = ?, type = ?, location = ?, description = ? where id = ?",
      [firstname, type, location, description, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the movie");
    });
};

const createPokemon = (req, res) => {
  const { firstname, type, location, description } = req.body;

  database
    .query(
      "INSERT INTO pokemon (firstname, type, location, description) VALUES (?, ?, ?, ?)",
      [firstname, type, location, description]
    )
    .then(([result]) => {
      res.location(`/pokemon/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the pokemon");
    });
};

module.exports = {
  getAllPokemon,
  getPokemonById,
  deletePokemon,
  updatePokemon,
  createPokemon,
};
