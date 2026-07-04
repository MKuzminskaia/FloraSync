import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export const NAV_THEME = {
  light: {
    ...DefaultTheme,
    colors: {
      background: "hsl(0 0% 100%)",
      border: "hsl(183 8.3% 93.1%)",
      card: "hsl(0 0% 98.9%)",
      notification: "hsl(22.1 87.5% 41.9%)",
      primary: "hsl(183 15.7% 41.1%)",
      text: "hsl(183 59% 3%)",
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: "hsl(183.1 46% 2%)",
      border: "hsl(183 8.7% 15%)",
      card: "hsl(183 43.3% 3%)",
      notification: "hsl(22 87.1% 57%)",
      primary: "hsl(183 15.7% 41.1%)",
      text: "hsl(183 19.3% 97%)",
    },
  },
} satisfies Record<"light" | "dark", Theme>;
