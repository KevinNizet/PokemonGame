import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

function PokemonDetail() {
  const [detailData, setDetailData] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { id } = useParams();
  const { handleSubmit, register, reset } = useForm();

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
    <div>
      <img src={detailData?.picture} alt={detailData?.firstname} />
      <p>Type : {detailData?.type}</p>
      <p>Localisation : {detailData?.location}</p>
      <p>Caractéristique : {detailData?.description}</p>
      <p>
        Aide {detailData?.firstname} à trouver d'autres pokémons et note les
        ci-dessous !
      </p>

      <form onSubmit={handleSubmit((formData) => addPokemon(formData))}>
        <input
          type="text"
          name="comment"
          defaultValue=""
          {...register("comment")}
        />
        <button type="submit">Ajouter le pokémon</button>
      </form>

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
                  {el.comment}
                  <AiFillDelete onClick={() => handleDelete(el.id)} />
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PokemonDetail;

//vérifier que tout fonctionne bien dans toute l'appli
//supprimer le handleupdate en plein milieu qui sert à rien
// voir pour setEditingCommentId ??? quelle utilité ?
