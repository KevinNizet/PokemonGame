/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function generateRandomNickname() {
  const nicknames = [
    "Sparky",
    "Fluffy",
    "Spike",
    "Blaze",
    "Bubbles",
    "Rocky",
    "Frosty",
    "Pebbles",
    "Whiskers",
    "Tornado",
    "Milky",
    "Moustache",
    "Bubulle",
    "PikPik",
    "Loulou",
    "Salto",
    "Loulou",
    "Doudou",
    "Kéké",
    "Juju",
    "Scooby",
    "Nemo",
    "Dory",
    "Simba",
  ];
  const randomIndex = Math.floor(Math.random() * nicknames.length);
  return nicknames[randomIndex];
}

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = () => {
    axios
      .get("http://localhost:5001/pokemon")
      .then((response) => setPokemonData(response.data))
      .catch((error) => console.error(error.message));
  };

  const updatePokemonNickname = (pokemonId) => {
    const updatedPokemonData = {
      firstname: generateRandomNickname(),
    };

    axios
      .put(`http://localhost:5001/pokemon/${pokemonId}`, updatedPokemonData)
      .then(() => {
        console.log("Nickname updated successfully!");
        // Fetch the updated data again after successful update
        fetchPokemonData();
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <motion.div
      className="pokemonList"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1.5 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      <p>Choisis ton starter pour partir à l'aventure !</p>
      <div className="pokemonList_map">
        {pokemonData.map((pokemon) => (
          <li className="pokemonList_list" key={pokemon.id}>
            <NavLink to={`/pokemon/${pokemon.id}`}>
              <div className="image-container">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  className="nofill"
                  src={pokemon.picture}
                  alt={pokemon.firstname}
                />
                <h3>{pokemon.firstname}</h3>
              </div>
            </NavLink>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => {}}
              onHoverEnd={() => {}}
              id="randomeName"
              onClick={() => updatePokemonNickname(pokemon.id)}
            >
              Surnom
            </motion.button>
          </li>
        ))}
      </div>
    </motion.div>
  );
}

export default PokemonList;
