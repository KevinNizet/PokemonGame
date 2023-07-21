import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";

import { AnimatePresence } from "framer-motion";

/* "framer-motion/dist/framer-motion" */

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemonList" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
