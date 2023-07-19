import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
  const { handleSubmit, register, reset } = useForm();

  const pokemonImages = {
    1: image1, //bulbi
    2: image2, //carapuce
    3: image3, //salameche
    4: image4, //pika
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
        Aide {detailData?.firstname} à trouver d'autres pokémons et note les
        ci-dessous !
      </p>
      <div className="image-container-details">
        <img src={detailData?.picture} alt={detailData?.firstname} />
        <div className="allDetails">
          <p>{detailData?.firstname}</p>
          <p>Typeeee : {detailData?.type}</p>
          <p>Localisation : {detailData?.location}</p>
          <p>Caractéristiques : {detailData?.description}</p>
        </div>
      </div>

      <div className="captured-pokemon">
        <h3>Pokémons capturés :</h3>
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
          <button type="submit">Ajouter un pokémon</button>
        </form>
      </div>
    </div>
  );
}

export default PokemonDetail;
