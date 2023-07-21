import React, { useState } from "react";
import Pokeball from "../assets/pokeball.gif";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const redirectToPokemonListPage = () => {
    setIsClicked(true); // Met à jour l'état pour activer l'effet de grossissement
    setTimeout(() => {
      navigate("/pokemonlist"); // Redirige après un court délai pour que l'effet soit visible
    }, 1100); // Délai en millisecondes pour la transition (ajustez selon vos besoins)
  };

  return (
    <div className="home-page">
      <p>Clique sur la Poké Ball</p>
      <img
        onClick={redirectToPokemonListPage}
        role="button"
        tabIndex={0}
        src={Pokeball}
        alt="pokeball"
        className={isClicked ? "pokeball-clicked" : ""}
      />
    </div>
  );
}

export default HomePage;
