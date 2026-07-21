import { addNewPlant, getAllPlants, getPlantById, Plant } from "@/lib/plants";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

//All-plants in DB Hook
export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>([]);

  // Saving actual information about list of plants
  useFocusEffect(
    useCallback(() => {
      setPlants(getAllPlants());
    }, []),
  );

  //Add plant and refresh
  const addPlant = (plant: Omit<Plant, "id">) => {
    addNewPlant(plant);
    setPlants(getAllPlants());
  };

  return { plants, addPlant };
}

//One-plant in DB Hook
export function usePlant(id: number) {
  const [activePlant, setActivePlant] = useState<Plant | null>(() =>
    getPlantById(id),
  );

  // Saving actual information about active plant
  useFocusEffect(
    useCallback(() => {
      setActivePlant(getPlantById(id));
    }, [id]),
  );

  return { activePlant };
}
