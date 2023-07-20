import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdCatchingPokemon } from "react-icons/md";
import axios from "axios";
import image1 from "../assets/backgrounds/1.gif";
import image2 from "../assets/backgrounds/2.gif";
import image3 from "../assets/backgrounds/3.gif";
import image4 from "../assets/backgrounds/4.gif";

function PokemonDetail() {
  const [detailData, setDetailData] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [showElement, setShowElement] = useState(false);
  const { id } = useParams();
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();

  const pokemonImages = {
    1: image1, //bulbi
    2: image2, //carapuce
    3: image3, //salameche
    4: image4, //pika
  };

  const pokemonColors = {
    1: "black",
    2: "black",
    3: "white",
    4: "black",
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
    {/* const [showElement, setShowElement] = useState(false); */}
    {/* element invisible */}
    <button
    id="fixed-position-element"
    onMouseEnter={() => setShowElement(!showElement)}
    onMouseLeave={() => setShowElement(showElement)}
  >
    {showElement && (
        <p>
          Visible seulement au hover de la souris ????
        </p>
      )}
    
  </button>
  {/* element invisible */} 


    <div
      style={{
        backgroundImage: `url(${pokemonImages[id]})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "90px 0px 220px 0",
      }}
    >    

      <p id="details-title" style={{ color: pokemonColors[id] }}>
        Aide {detailData?.firstname} à trouver d'autres pokémons et note les
        ci-dessous !
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
          <p className="pokemon-firstname" style={{ color: informationColors[id] }}>{detailData?.firstname}</p>
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
        <h3 style={{ color: informationColors[id] }}>Pokémons capturés :</h3>
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
          <button type="submit" style={{ color: informationColors[id] }}>Pokéball, Go !</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default PokemonDetail;
