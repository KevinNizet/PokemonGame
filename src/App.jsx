import {Routes, Route} from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import "./style/import.scss";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PokemonList/>}/>
        <Route path="/pokemon/:id" element={<PokemonDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
