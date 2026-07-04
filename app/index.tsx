import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function firstStack() {
  const router = useRouter();

  return (
    <View>
      <Button onPress={() => router.push("/plants")} title="Go to Plants" />
      <Button
        onPress={() => router.push("/add-plant")}
        title="Add a new plant"
      />
      <Button
        onPress={() => router.push("/calendar")}
        title="Show plant's calendar"
      />
      <Button
        onPress={() => router.push("/notifications")}
        title="Show notifications"
      />
    </View>
  );
}
