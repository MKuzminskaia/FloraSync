import { Text } from "@/components/ui/text";
import { getPlantById, Plant } from "@/lib/plants";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const plantId = Number(id);

  const plant: Plant | null = getPlantById(plantId);
  if (!plant) return <Text>Plant not found</Text>;
  return (
    // <ScrollView
    //   className="flex-1"
    //   contentContainerClassName="flex-grow items-center justify-center gap-4 p-4"
    // >
    <>
      <Stack.Screen options={{ title: plant.nickname }} />

      <View className="p-3 items-center">
        <Text className="text-2xl font-bold text-foreground ">
          {plant.nickname} details:
        </Text>
      </View>
      <View className="w-full rounded-2xl bg-card p-4 gap-2 shadow-sm">
        <Text className="text-muted-foreground">
          Location : {plant.location ?? "-"}
        </Text>
        <Text className="text-muted-foreground">
          Photo : {plant.photoUrl ?? "-"}
        </Text>
        <Text className="text-muted-foreground">
          Pot info : {plant.potChangedAt ?? "-"}
        </Text>
        <Text className="text-muted-foreground">
          Species info: {plant.speciesId ?? "-"}
        </Text>
      </View>
    </>
    //</ScrollView>
  );
}
