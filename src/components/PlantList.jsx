import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleSoldOut }) {
  if (!plants || plants.length === 0){
    return <p>No plants found.</p>
  }

  return (
    <ul className="cards">{
      /* render PlantCards components in here */
      plants.map((plant) => (
          <PlantCard 
            key={plant.id}
            plant={plant} 
            onToggleSoldOut={onToggleSoldOut} 
          />
       ))}
      </ul>
  );
}

export default PlantList;
