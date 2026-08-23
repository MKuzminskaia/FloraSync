import * as Notifications from "expo-notifications";

// Returns permission notification status
// If status has not been determinated - shows system request
// If user allowed/prohibited the notifications before -
// returns this status again, without new request
export async function requestNotificationPermission() {
  const result = await Notifications.getPermissionsAsync();

  if (result.status !== "undetermined") return result.status;

  const requested = await Notifications.requestPermissionsAsync();
  return requested.status;
}
