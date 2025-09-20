import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchPlants() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:6001/plants");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const normalized = data.map((p) => ({soldOut: false, ...p}));
        setPlants(normalized);
      } catch (err) {
        console.error("Error fetching plants:", err);
        setPlants([])
      } finally {
        setLoading(false);
      }
    }
    fetchPlants();
  }, []);

  async function handleAddPlant(newPlant) {
    try {
      const res = await fetch("http://localhost:6001/plants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlant),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created = await res.json();
      setPlants((prev) => [{soldOut: false, ...created }, ...prev]);
    } catch(err) {
      console.error("Error adding plant:", err);
    }
  }

  function handleToggleSoldOut(id) {
    setPlants((prev) => 
      prev.map((p) => (p.id === id ? { ...p, soldOut: !p.soldOut } : p))
    );
  }

  const filteredPlants = plants.filter((p) => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search query={query} onQueryChange={setQuery} />
      {loading ? (
        <p>Loading...</p>
      ) : (
      <PlantList plants={filteredPlants} onToggleSoldOut={handleToggleSoldOut} />
      )}
    </main>
  );
}

export default PlantPage;
