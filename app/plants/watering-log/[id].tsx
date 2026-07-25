import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePlant } from "@/hooks/use-plants";
import { useWateringForPlant } from "@/hooks/use-watering";
import { WATERING_LOG_TYPE, type WateringLogType } from "@/lib/care-events";
import type { WateringLogEntry } from "@/lib/watering-log";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function WateringLogScreen() {
  const { id } = useLocalSearchParams();
  const plantId = Number(id);
  const [selectedType, setSelectedType] = useState<WateringLogType>(
    WATERING_LOG_TYPE.WATERING,
  );

  const { log, addWatering } = useWateringForPlant(plantId);

  const { activePlant } = usePlant(plantId);

  const handleAdd = () => {
    const newEntry: Omit<WateringLogEntry, "id"> = {
      plantId,
      type: selectedType,
      doneAt: new Date().toISOString(),
    };
    addWatering(newEntry);

    Toast.show({
      type: "success",
      text1: "Watered!",
    });
  };

  if (!activePlant) {
    return <Text>Plant not found</Text>;
  }
  return (
    <>
      <Stack.Screen options={{ title: activePlant.nickname }} />

      <View className="w-full rounded-2xl bg-card p-4 gap-2 shadow-sm">
        <ToggleGroup
          type="single"
          value={selectedType}
          onValueChange={(value) => {
            if (value === "watering" || value === "misting") {
              setSelectedType(value);
            }
          }}
        >
          <ToggleGroupItem value="watering" isFirst>
            <Text>Watering</Text>
          </ToggleGroupItem>
          <ToggleGroupItem value="misting" isLast>
            <Text>Misting</Text>
          </ToggleGroupItem>
        </ToggleGroup>

        <Button onPress={handleAdd}>
          <Text>Water now</Text>
        </Button>
        <Text> Watering diary: </Text>

        {log.length === 0 ? (
          <Text>No watering records yet</Text>
        ) : (
          log.map((rec) => (
            <Text key={rec.id}>
              {rec.type} - {rec.doneAt}
            </Text>
          ))
        )}
      </View>
    </>
  );
}
