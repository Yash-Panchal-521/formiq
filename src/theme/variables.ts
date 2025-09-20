// theme/variables.ts
import { MD3Theme } from "react-native-paper";

export const createVariables = (theme: MD3Theme) => ({
  colors: {
    button: {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
    },
    text: {
      primary: theme.colors.onSurface,
      onPrimary: theme.colors.onPrimary,
      muted: theme.colors.onSurfaceVariant,
    },
    surface: theme.colors.surface,
    surfaceVariant: theme.colors.surfaceVariant,
    border: theme.colors.outline,
    success: "#4CAF50",
    error: "#F44336",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 28, fontWeight: "700" },
    h2: { fontSize: 22, fontWeight: "600" },
    body: { fontSize: 16, fontWeight: "400" },
    caption: { fontSize: 12, fontWeight: "400" },
    label: { fontSize: 14, fontWeight: "500" },
  },
});
