import { addNewPlant, getAllPlants, Plant } from "@/lib/plants";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useFocusEffect(
    useCallback(() => {
      setPlants(getAllPlants());
    }, []),
  );

  const addPlant = (plant: Omit<Plant, "id">) => {
    addNewPlant(plant);
    setPlants(getAllPlants());
  };

  return { plants, addPlant };
}
