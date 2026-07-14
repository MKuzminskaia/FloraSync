import { Text } from "@/components/ui/text";
import { usePlants } from "@/hooks/use-plants";
import { ScrollView } from "react-native";

export default function ListOfPlants() {
  const { plants } = usePlants();

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="flex-grow items-center justify-center gap-4 p-4"
    >
      <Text>List of the plants:</Text>
      {plants.map((plant) => (
        <Text key={plant.id}> Plant {plant.nickname} </Text>
      ))}
    </ScrollView>
  );
}
