import axios from "axios";
import React from "react";
import DeleteButton from "../DeleteButton";
import ToggleButton from "../ToggleButton";
import "./index.css";

const AreaCard = ({ area, onChange }) => {
  const toggleArea = () => {
    axios
      .put(`/areas/${area._id}`, {
        on: !area.on,
      })
      .then((res) => {
        onChange();
      })
      .catch((err) => console.log(err));
  };

  const deleteArea = () => {
    axios
      .delete(`/areas/${area._id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    onChange();
  };
  return (
    <div className="area-card-container">
      <DeleteButton onClick={deleteArea} />
      <div className="area-card-title">{area?.name}</div>
      <ToggleButton state={area.on} onClick={toggleArea} />
    </div>
  );
};

export default AreaCard;
