/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function PokemonDetail() {
  const [detailData, setDetailData] = useState(undefined);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    fetch(`http://localhost:5001/pokemon/${id}`)
      .then((response) => response.json())
      .then((res) => setDetailData(res))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/comment`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  const addPokemon = (formData) => {
    axios
      .post(`http://localhost:5001/comment`, formData)
      .then((response) => {
        // Ajouter le nouveau commentaire à l'array existant
        const newComment = { id: response.data.id, comment: formData.comment };
        setComments((prevComments) => [...prevComments, newComment]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <p> page de détail</p>
      <img src={detailData?.picture} alt={detailData?.firstname} />

      <p> Type : {detailData?.type}</p>
      <p> Localisation : {detailData?.location}</p>
      <p> Caractéristique : {detailData?.description}</p>
      <p> Aide {detailData?.firstname} à trouver d'autres pokémons et note les ci-dessous !</p>

      <form onSubmit={handleSubmit((formData) => addPokemon(formData))}>
        <input
          type="text"
          name="comment"
          defaultValue=""
          {...register("comment")}
        ></input>
        <button type="submit"> Ajouter le pokémon </button>
      </form>

      <h3>Commentaires :</h3>
      <ul>
        {comments &&
          comments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
      </ul>
    </div>
  );
}

export default PokemonDetail;
