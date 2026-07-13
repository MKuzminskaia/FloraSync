import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { usePlants } from "@/hooks/use-plants";
import { useState } from "react";

import { ScrollView } from "react-native";

export default function AddNewPlant() {
  const [plantNickname, setPlantName] = useState<string>("");
  const [plantLocation, setPlantLocation] = useState<string>("");
  const { addPlant } = usePlants();

  const handleSave = () => {
    const newPlant = {
      speciesId: null,
      nickname: plantNickname,
      location: plantLocation,
      photoUrl: null,
      potChangedAt: null,
    };

    addPlant(newPlant);
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="flex-grow items-center justify-center gap-4 p-4"
    >
      <Text>Enter information about the new plant</Text>

      <Text>Enter the name of the new plant *</Text>
      <Input
        placeholder="New plant name"
        value={plantNickname}
        onChangeText={setPlantName}
      />

      <Text>Enter the location of the new plant (Optional)</Text>
      <Input
        placeholder="New plant location (Where it is located)"
        value={plantLocation}
        onChangeText={setPlantLocation}
      />

      <Button onPress={handleSave}>
        <Text>Add</Text>
      </Button>
    </ScrollView>
  );
}
