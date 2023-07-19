import React, { useState, useEffect } from "react";
import axios from "axios";

function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/pokemon`)
      .then((response) => setPokemonData(console.log(response.data)))
      .catch((error) => console.error(error.message));

  }, []);

  return <div className="pokemonList">
    <p>Choisi ton Pokémon </p>
  </div>;
}

export default PokemonList;
