// theme/variables.ts
import { MD3Theme } from "react-native-paper";

export const createVariables = (theme: MD3Theme) => ({
  colors: {
    button: {
      primary: theme.colors.primary, // navy background, white text
      onPrimary: theme.colors.onPrimary, // ensure text/icons on button are correct
      secondary: theme.colors.secondary, // teal accent button
      onSecondary: theme.colors.onSecondary,
    },
    text: {
      primary: theme.colors.onSurface, // default text on surfaces
      onPrimary: theme.colors.onPrimary, // text/icons on primary elements
      muted: theme.colors.onSurfaceVariant, // low-emphasis text
      error: theme.colors.error, // errors inline
      success: "#22B07D", // brand-aligned green (modern, accessible)
    },
    surface: theme.colors.surface, // card & appbar backgrounds
    surfaceVariant: theme.colors.surfaceVariant,
    border: theme.colors.outline,
    background: theme.colors.background,
    error: theme.colors.error,
    success: "#22B07D", // brand-aligned green (modern, accessible)
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  radius: {
    sm: 6, // slightly rounded
    md: 12, // more modern feel
    lg: 20, // cards & modals
    full: 9999, // circular pills/avatars
  },

  typography: {
    h1: { fontSize: 32, fontWeight: "800", letterSpacing: 0.3 }, // hero headers
    h2: { fontSize: 24, fontWeight: "700" },
    h3: { fontSize: 20, fontWeight: "600" },
    body: { fontSize: 16, fontWeight: "400" },
    label: { fontSize: 14, fontWeight: "500", letterSpacing: 0.5 },
    caption: {
      fontSize: 12,
      fontWeight: "400",
      color: theme.colors.onSurfaceVariant,
    },
  },
});
