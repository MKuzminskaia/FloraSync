import { Text } from "@/components/ui/text";
import { usePlants } from "@/hooks/use-plants";
import { useRouter } from "expo-router";
import { Pressable, ScrollView } from "react-native";

export default function ListOfPlants() {
  const { plants } = usePlants();

  const router = useRouter();

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="flex-grow items-center justify-center gap-4 p-4"
    >
      <Text>List of the plants:</Text>

      {plants.map((plant) => (
        <Pressable
          key={plant.id}
          onPress={() => router.push(`/plants/${plant.id}`)}
        >
          <Text> Plant {plant.nickname} </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
