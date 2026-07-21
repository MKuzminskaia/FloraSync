import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { usePlant } from "@/hooks/use-plants";
import { deletePlant } from "@/lib/plants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const plantId = Number(id);
  const router = useRouter();

  const { activePlant } = usePlant(plantId);

  const handleDelete = () => {
    deletePlant(plantId);
    Toast.show({
      type: "success",
      text1: "Plant deleted",
    });
    router.back();
  };

  if (!activePlant) return <Text>Plant not found</Text>;
  return (
    <>
      <Stack.Screen options={{ title: activePlant.nickname }} />

      <View className="p-3 items-center">
        <Text className="text-2xl font-bold text-foreground ">
          {activePlant.nickname} details:
        </Text>
      </View>
      <View className="w-full rounded-2xl bg-card p-4 gap-2 shadow-sm">
        <Text className="text-muted-foreground">
          Location : {activePlant.location ?? "-"}
        </Text>
        <Text className="text-muted-foreground">
          Photo : {activePlant.photoUrl ?? "-"}
        </Text>
        <Text className="text-muted-foreground">
          Pot info : {activePlant.potChangedAt ?? "-"}
        </Text>
        <Text className="text-muted-foreground">
          Species info: {activePlant.speciesId ?? "-"}
        </Text>
        <Button onPress={handleDelete}>
          <Text>Delete</Text>
        </Button>
        <Button onPress={() => router.push(`/plants/edit/${plantId}`)}>
          <Text>Edit</Text>
        </Button>
      </View>
    </>
  );
}
