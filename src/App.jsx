import {Routes, Route} from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import "./style/import.scss";

function App() {
  return (
    <div>
      <h1>Bonjour </h1>
      <Routes>
        <Route path="/" element={<PokemonList/>}/>
        <Route path="/pokemon/:id" element={<PokemonDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
