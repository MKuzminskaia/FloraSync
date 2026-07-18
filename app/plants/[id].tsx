import { Text } from "@/components/ui/text";
import { getPlantById, Plant } from "@/lib/plants";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const plantId = Number(id);

  const plant: Plant | null = getPlantById(plantId);
  if (!plant) return <Text>Plant not found</Text>;
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="flex-grow items-center justify-center gap-4 p-4"
    >
      <Stack.Screen options={{ title: plant.nickname }} />
      <Text>{plant.nickname} details:</Text>
      <Text>Location : {plant.location ?? "-"}</Text>
      <Text>Photo : {plant.photoUrl ?? "-"}</Text>
      <Text>Pot info : {plant.potChangedAt ?? "-"}</Text>
      <Text>Species info: {plant.speciesId ?? "-"}</Text>
    </ScrollView>
  );
}
