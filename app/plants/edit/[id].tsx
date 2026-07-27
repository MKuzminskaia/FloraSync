//A page with editing plant form

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { usePlant } from "@/hooks/use-plants";
import { Plant, updatePlant } from "@/lib/plants";
import { parseIntervalDays } from "@/lib/watering-schedule";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function EditPlant() {
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const plantId = Number(id);

  const { activePlant } = usePlant(plantId);

  const [plantNickname, setPlantNickname] = useState(
    activePlant?.nickname ?? "",
  );
  const [plantLocation, setPlantLocation] = useState(
    activePlant?.location ?? "",
  ); // location is nullable in DB, but Input needs a string

  const [intervalDays, setIntervalDays] = useState<string>(
    activePlant?.wateringIntervalDays?.toString() ?? "",
  );

  const handleUpdate = () => {
    const updatedPlant: Omit<Plant, "id"> = {
      nickname: plantNickname,
      location: plantLocation.trim() === "" ? null : plantLocation.trim(),
      photoUrl: activePlant?.photoUrl ?? null, //keep existing values: UPDATE overwrites the whole row, so untouched fields must be re-sent or they'd become null
      speciesId: activePlant?.speciesId ?? null,
      potChangedAt: activePlant?.potChangedAt ?? null,
      wateringIntervalDays: parseIntervalDays(intervalDays),
    };
    updatePlant(plantId, updatedPlant);
    router.back();
    Toast.show({
      type: "success",
      text1: "Plant updated",
    });
  };

  if (!activePlant) return <Text> Plant not found </Text>;
  return (
    <>
      <Stack.Screen options={{ title: activePlant.nickname }} />

      <View className="w-full rounded-2xl bg-card p-4 gap-2 shadow-sm">
        <Text> Nickname: </Text>
        <Input value={plantNickname} onChangeText={setPlantNickname} />

        <Text> Location: </Text>
        <Input value={plantLocation} onChangeText={setPlantLocation} />

        <Text> Watering interval: </Text>
        <Input value={intervalDays} onChangeText={setIntervalDays} />
        <Button onPress={handleUpdate}>
          <Text>Save</Text>
        </Button>
      </View>
    </>
  );
}
