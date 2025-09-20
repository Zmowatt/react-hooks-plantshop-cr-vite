import React from "react";

function PlantCard({ plant, onToggleSoldOut }) {
  const { id, name, image, price, soldOut } = plant;

  return (
    <li className="card" data-testid="plant-item">
      <img src={image || "https://via.placeholder.com/400"} alt={name || "plant name"} />
      <h4>{name || "plant name"}</h4>
      <p>Price: {price || "plant price"}</p>

      {soldOut ? (
        <button onClick={() => onToggleSoldOut(id)}>Out of Stock</button>
      ) : (
        <button className="primary" onClick={() => onToggleSoldOut(id)}>In Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
