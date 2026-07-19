import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import "../global.css";

import "../lib/db";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { NAV_THEME } from "@/lib/theme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
      <Stack>
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <PortalHost />
      <StatusBar style="auto" />
      <Toast />
    </ThemeProvider>
  );
}
