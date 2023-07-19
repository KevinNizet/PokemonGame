/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function PokemonList() {

 
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/pokemon`)
      .then((response) => setPokemonData(response.data))
      .catch((error) => console.error(error.message));
  }, []);

  return (
    
      <div className="pokemonList">
        <p>Choisis ton starter pour partir à l'aventure ! </p>
        <div className="pokemonList_map">
          {pokemonData.map((pokemon) => (
            <li className="pokemonList_list" key={pokemon.id}>
              <NavLink to={`/pokemon/${pokemon.id}`}>
                <div className="image-container">
                  <img className="nofill" src={pokemon.picture} alt={pokemon.firstname} />
                  <h3>{pokemon.firstname}</h3>
                </div>
              </NavLink>
            </li>
          ))}
        </div>
      </div>
  );
}

export default PokemonList;
