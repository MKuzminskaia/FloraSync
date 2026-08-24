import * as Notifications from "expo-notifications";

//The setup is done once when the module imported first time
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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

//Test notification in 5 seconds
export async function scheduleTestNotification() {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Title of test notification",
      body: "Body of test notification",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
      repeats: false,
    },
  });
  return id;
}
