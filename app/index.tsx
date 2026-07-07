import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { useRouter } from "expo-router";
import { View } from "react-native";

export default function firstStack() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Button onPress={() => router.push("/plants")}>
        <Text>Go to Plants</Text>
      </Button>
      <Button onPress={() => router.push("/add-plant")}>
        <Text>Add a new plant</Text>
      </Button>
      <Button onPress={() => router.push("/calendar")}>
        <Text>Show plant's calendar</Text>
      </Button>
      <Button onPress={() => router.push("/notifications")}>
        <Text>Show notifications</Text>
      </Button>
    </View>
  );
}
