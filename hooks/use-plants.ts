import { addNewPlant, getAllPlants, Plant } from "@/lib/plants";
import { useState } from "react";

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>(() => getAllPlants());

  const addPlant = (plant: Omit<Plant, "id">) => {
    addNewPlant(plant);
    setPlants(getAllPlants());
  };
  return { plants, addPlant };
}
