import { Text } from "@/components/ui/text";
import { getPlantById, Plant } from "@/lib/plants";
import { useLocalSearchParams } from "expo-router";

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const plantId = Number(id);

  const plant: Plant | null = getPlantById(plantId);
  if (!plant) return <Text>Plant not found</Text>;
  return <Text>This is your plant : {plant.nickname}</Text>;
}
