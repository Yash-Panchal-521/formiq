// theme/themes.ts
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6200EE",
    secondary: "#03DAC6",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceVariant: "#F5F5F5",
    text: "#000000",
    onPrimary: "#FFFFFF",
    onSurface: "#000000",
    outline: "#E0E0E0",
  },
};

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#BB86FC",
    secondary: "#03DAC6",
    background: "#121212",
    surface: "#1E1E1E",
    surfaceVariant: "#2C2C2C",
    text: "#FFFFFF",
    onPrimary: "#000000",
    onSurface: "#FFFFFF",
    outline: "#333333",
  },
};
