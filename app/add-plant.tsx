import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { usePlants } from "@/hooks/use-plants";
import { parseIntervalDays } from "@/lib/watering-schedule";
import { useState } from "react";

import { ScrollView } from "react-native";

export default function AddNewPlant() {
  const [plantName, setPlantName] = useState("");
  const [plantLocation, setPlantLocation] = useState("");
  const [intervalDays, setIntervalDays] = useState("");
  const { addPlant } = usePlants();

  const handleSave = () => {
    const newPlant = {
      speciesId: null,
      nickname: plantName,
      location: plantLocation.trim() === "" ? null : plantLocation.trim(),
      photoUrl: null,
      potChangedAt: null,
      wateringIntervalDays: parseIntervalDays(intervalDays),
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
        value={plantName}
        onChangeText={setPlantName}
      />

      <Text>Enter the location of the new plant (Optional)</Text>
      <Input
        placeholder="New plant location (Where it is located)"
        value={plantLocation}
        onChangeText={setPlantLocation}
      />

      <Text>Enter watering interval (Optional)</Text>
      <Input
        placeholder="plant watering interval (how often to water)"
        keyboardType="numeric"
        value={intervalDays}
        onChangeText={setIntervalDays}
      />

      <Button onPress={handleSave}>
        <Text>Add</Text>
      </Button>
    </ScrollView>
  );
}
