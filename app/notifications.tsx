import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { requestNotificationPermission } from "@/lib/notifications";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function Notifications() {
  const handleRequest = async () => {
    const status = await requestNotificationPermission();
    const statusText =
      status === "denied"
        ? "user denied notifications"
        : status === "granted"
          ? "notifications allowed"
          : "Undefined status";
    Toast.show({
      type: "success",
      text1: statusText,
    });
  };
  return (
    <View className="w-full rounded-2xl bg-card p-4 gap-2 shadow-sm">
      <Text>Notifications</Text>
      <Button onPress={handleRequest}>
        <Text>Request</Text>
      </Button>
    </View>
  );
}
