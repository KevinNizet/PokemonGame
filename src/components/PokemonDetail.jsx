import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdCatchingPokemon } from "react-icons/md";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import image1 from "../assets/backgrounds/1.gif";
import image2 from "../assets/backgrounds/2.gif";
import image3 from "../assets/backgrounds/3.gif";
import image4 from "../assets/backgrounds/4.gif";
import Mew from "../assets/mew.gif";
import Voltali from "../assets/voltali.gif";
import Papilusion from "../assets/papilusion.gif";
import Ronflex from "../assets/ronflex.gif";
import Fantominus from "../assets/fantominus.gif";
import Magicarpe from "../assets/magicarpe.gif";
import Dracofeu from "../assets/dracofeu.gif";
import Draco from "../assets/draco.gif";
import Miaous from "../assets/miaous.gif";
import Smogogo from "../assets/smogogo.gif";
import Noctali from "../assets/noctali.gif";
import Raichu from "../assets/raichu.gif";
import Arcanin from "../assets/arcanin.gif";
import Rocket from "../assets/rocket.gif";

function PokemonDetail() {
  const [detailData, setDetailData] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);

  //-----------------pokemons invisibles--------------------//
  const [showMew, setShowMew] = useState(false);
  const [showVoltali, setShowVoltali] = useState(false);
  const [showPapilusion, setShowPapilusion] = useState(false);
  const [showRonflex, setShowRonflex] = useState(false);
  const [showFantominus, setShowFantominus] = useState(false);
  const [showMagicarpe, setShowMagicarpe] = useState(false);
  const [showDracofeu, setShowDracofeu] = useState(false);
  const [showDraco, setShowDraco] = useState(false);
  const [showNoctali, setShowNoctali] = useState(false);
  const [showRaichu, setShowRaichu] = useState(false);
  const [showArcanin, setShowArcanin] = useState(false);
  const [showKirby, setShowKirby] = useState(false);
  const [showKirby2, setShowKirby2] = useState(false);
  //-----------------pokemons invisibles--------------------//

  // confetti
  const [width, height] = useWindowSize();

  const { id } = useParams();
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();

  const pokemonImages = {
    1: image1, //bulbi
    2: image2, //carapuce
    3: image3, //salameche
    4: image4, //pika
  };

  const informationColors = {
    1: "#17594A",
    2: "#090580",
    3: "#B70404",
    4: "#E7B10A",
  };

  //récupère les pokémons de la BDD
  useEffect(() => {
    fetch(`http://localhost:5001/pokemon/${id}`)
      .then((response) => response.json())
      .then((res) => setDetailData(res))
      .catch((err) => console.error(err));
  }, [id]);

  //récupére les commentaires de la BDD
  useEffect(() => {
    fetchCommentData();
  }, [comments]);

  const fetchCommentData = () => {
    axios
      .get(`http://localhost:5001/comment`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.error(error.message));
  };

  //ajoute un commentaire dans la BDD
  const addPokemon = (formData) => {
    axios
      .post(`http://localhost:5001/comment`, formData)
      .then((response) => {
        const newComment = { id: response.data.id, comment: formData.comment };
        setComments((prevComments) => [...prevComments, newComment]);
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (commentId) => {
    axios
      .delete(`http://localhost:5001/comment/${commentId}`)
      .then(() => {
        // Filtrez les commentaires pour supprimer le commentaire supprimé
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <>
      <div
        className={`${
          showKirby || showKirby2 || showMew ? "globalDetailsDiv" : ""
        }`}
      >
        {/* //-----------------pokemons invisibles--------------------// */}

        <button
          id="mew"
          disabled={showKirby || showKirby2}
          onMouseEnter={() => setShowMew(true)}
        ></button>
        <button
          id="voltali"
          disabled={showKirby || showKirby2 || showMew}
          onMouseEnter={() => setShowVoltali(true)}
          onMouseLeave={() => setShowVoltali(false)}
        >
          {showVoltali && <img src={Voltali} alt="Voltali" />}
        </button>
        <button
          id="papilusion"
          disabled={showKirby || showKirby2 || showMew}
          onMouseEnter={() => setShowPapilusion(true)}
          onMouseLeave={() => setShowPapilusion(false)}
        >
          {showPapilusion && <img src={Papilusion} alt="papilusion" />}
        </button>
        <button
          id="ronflex"
          disabled={showKirby || showKirby2 || showMew}
          onMouseEnter={() => setShowRonflex(true)}
          onMouseLeave={() => setShowRonflex(false)}
        >
          {showRonflex && <img src={Ronflex} alt="ronflex" />}
        </button>
        <button
          id="fantominus"
          disabled={showKirby || showKirby2 || showMew}
          onMouseEnter={() => setShowFantominus(true)}
          onMouseLeave={() => setShowFantominus(false)}
        >
          {showFantominus && <img src={Fantominus} alt="fantominus" />}
        </button>
        <button
          id="magicarpe"
          disabled={showKirby || showKirby2 || showMew}
          onMouseEnter={() => setShowMagicarpe(true)}
          onMouseLeave={() => setShowMagicarpe(false)}
        >
          {showMagicarpe && <img src={Magicarpe} alt="fantominus" />}
        </button>
        <button
          id="dracofeu"
          disabled={showKirby || showKirby2 || showMew}
          onMouseEnter={() => setShowDracofeu(true)}
          onMouseLeave={() => setShowDracofeu(false)}
        >
          {showDracofeu && <img src={Dracofeu} alt="dracofeu" />}
        </button>
        <button
          id="draco"
          disabled={showKirby || showKirby2 || showMew}
          onMouseEnter={() => setShowDraco(true)}
          onMouseLeave={() => setShowDraco(false)}
        >
          {showDraco && <img src={Draco} alt="draco" />}
        </button>
        <button
          id="noctali"
          disabled={showKirby || showKirby2 || showMew}
          onMouseEnter={() => setShowNoctali(true)}
          onMouseLeave={() => setShowNoctali(false)}
        >
          {showNoctali && <img src={Noctali} alt="noctali" />}
        </button>
        <button
          id="raichu"
          disabled={showKirby || showKirby2 || showMew}
          onMouseEnter={() => setShowRaichu(true)}
          onMouseLeave={() => setShowRaichu(false)}
        >
          {showRaichu && <img src={Raichu} alt="raichu" />}
        </button>
        <button
          id="arcanin"
          disabled={showKirby || showKirby2 || showMew}
          onMouseEnter={() => setShowArcanin(true)}
          onMouseLeave={() => setShowArcanin(false)}
        >
          {showArcanin && <img src={Arcanin} alt="arcanin" />}
        </button>

        {/* // boutons team rocket - game over */}
        <button
          id="kirby"
          disabled={showMew}
          onMouseEnter={() => setShowKirby(true)}
        ></button>
        <button
          id="kirby2"
          disabled={showMew}
          onMouseEnter={() => setShowKirby2(true)}
        ></button>
        {/* // boutons team rocket - game over */}

        {/* //-----------------pokemons invisibles--------------------// */}

        <div
          style={{
            backgroundImage: `url(${pokemonImages[id]})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            padding: "90px 0px 220px 0",
          }}
        >
          <p id="details-title">
            Aide {detailData?.firstname} à retrouver le Pokémon légendaire. ✨{" "}
            <br /> Note les pokémons rencontrés dans ton Pokédex mais fais très
            attention... La Team Rocket prépare un mauvais coup. 😈
          </p>
          <div className="image-container-details">
            <img
              onClick={() => navigate(-1)}
              role="button"
              tabIndex={0}
              src={detailData?.picture}
              alt={detailData?.firstname}
            />
            <div className="allDetails">
              <p
                className="pokemon-firstname"
                style={{ color: informationColors[id] }}
              >
                {detailData?.firstname}
              </p>
              <p>
                <span>Type :</span> {detailData?.type}
              </p>
              <p>
                <span>Localisation :</span> {detailData?.location}
              </p>
              <p id="last-detail">
                <span>Caractéristique :</span> {detailData?.description}
              </p>
            </div>
          </div>

          <div className="captured-pokemon">
            <h3 style={{ color: informationColors[id] }}>Pokédex :</h3>
            <ul>
              {comments &&
                comments.map((el) => (
                  <li key={el.id}>
                    {editingCommentId === el.id ? (
                      <form>
                        <input
                          type="text"
                          name="comment"
                          defaultValue={el.comment}
                          {...register("comment")}
                        />
                        <button type="submit">Save</button>
                      </form>
                    ) : (
                      <>
                        <div className="comment">
                          <MdCatchingPokemon
                            className="icone"
                            size={22}
                            onClick={() => handleDelete(el.id)}
                          />
                          {el.comment}
                        </div>
                      </>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          <div className="pokemon-form">
            <form onSubmit={handleSubmit((formData) => addPokemon(formData))}>
              <input
                type="text"
                name="comment"
                defaultValue=""
                {...register("comment")}
              />
              <button
                type="submit"
                disabled={showMew || showKirby || showKirby2}
                style={{ color: informationColors[id] }}
              >
                Pokéball, Go !
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* logique du pop up game over au survol de la team rocket ! */}
      {showKirby && (
        <div className="gameOver">
          <p>Oh non... la Team Rocket est là ! </p>
          <div id="looser">
            <img src={Miaous} alt="miaous" height={120} />
            <img src={Smogogo} alt="smogogo" height={130} />
          </div>
          <p>Recommencer ? </p>
          <button onClick={() => navigate("/pokemonList")} type="button">
            Oui
          </button>
          <button onClick={() => navigate("/")} type="button">
            Non
          </button>
        </div>
      )}
      {showKirby2 && (
        <div className="gameOver">
          <p>Oh non... la Team Rocket est là ! </p>
          <div id="looser">
            <img src={Rocket} alt="smogogo" height={160} />
            {/* <img src={Miaous} alt="miaous" height={120} />
            <img src={Smogogo} alt="smogogo" height={130} /> */}
          </div>
          <p>Recommencer ? </p>
          <button onClick={() => navigate("/pokemonList")} type="button">
            Oui
          </button>
          <button onClick={() => navigate("/")} type="button">
            Non
          </button>
        </div>
      )}

      {showMew && (
        <div className="congrats">
          <Confetti width={width} height={height} />
          <p>Bravo ! Tu as retrouvé Mew ✨ </p>
          <img src={Mew} alt="mew" height={400} width={400} />
          <p>Recommencer ? </p>
          <button
            className="congrats-button"
            onClick={() => navigate("/pokemonList")}
            type="button"
          >
            Oui
          </button>
          <button
            className="congrats-button"
            onClick={() => navigate("/")}
            type="button"
          >
            Non
          </button>
        </div>
      )}
    </>
  );
}

export default PokemonDetail;
