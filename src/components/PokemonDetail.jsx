import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PokemonDetail() {
  const [detailData, setDetailData] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5001/pokemon/${id}`)
      .then((response) => response.json())
      .then((res) => setDetailData(res))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <p> page de détail</p>
      <p> {detailData?.firstname}</p>
      <p> {detailData?.type}</p>
      <p> {detailData?.location}</p>
      <p> {detailData?.description}</p>
    </div>
  );
}

export default PokemonDetail;
