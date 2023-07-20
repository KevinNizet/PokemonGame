import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import "./style/import.scss";

function App() {
  useEffect(() => {
    // Code pour forcer le curseur personnalisé sur les éléments interactifs
    const setCustomCursor = () => {
      const interactiveElements = document.querySelectorAll("a, button");
      for (const element of interactiveElements) {
        element.style.cursor =
          'url("https://1.bp.blogspot.com/-NmbnDADABUE/XSfhUk_X2yI/AAAAAAAAFFw/5Tp7zt_8erg2AJ-aQ1VhYdH_l4nTReY7wCLcBGAs/s1600/cursor.png"), default';
      }
    };

    setCustomCursor(); // Appel de la fonction pour s'assurer que le curseur est défini au montage initial

    // Vérifie que curseur est également défini lorsqu'un nouvel élément interactif est ajouté à la page (dynamiquement)
    document.addEventListener("DOMNodeInserted", setCustomCursor);

    // Reset de l'écouteur d'événement lorsque le composant est démonté
    return () => {
      document.removeEventListener("DOMNodeInserted", setCustomCursor);
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemonList" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;
