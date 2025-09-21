// src/theme/themes.ts
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

/**
 * Brand palette (single source of truth)
 * Navy core matches your splash: #0A2037 → #071A2E
 */
export const Brand = {
  // Core brand
  primaryNavy: "#0A2037",
  primaryNavyHover: "#0E2A46",
  primaryNavyTint: "#123553",

  // Complementary accents
  accentTeal: "#22D1B2", // modern fitness vibe; great on dark & light
  accentTealShade: "#12B69A",

  // Surfaces / backgrounds
  lightBg: "#F7FAFF",
  lightSurface: "#FFFFFF",
  lightSurfaceVariant: "#ECF2F8",

  darkBg: "#0A0F17",
  darkSurface: "#101826",
  darkSurfaceVariant: "#172235",

  // Text / outline
  lightText: "#0B1220",
  lightOutline: "#D5DFEA",
  darkText: "#E6EEF8",
  darkOutline: "#2C3A4A",

  // Feedback
  error: "#E53935",
  errorDark: "#FF6B6B",
};

/**
 * LIGHT THEME
 * Primary is deep navy; CTAs pop with white on primary.
 */
export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    // Brand
    primary: Brand.primaryNavy,
    onPrimary: "#FFFFFF",
    primaryContainer: Brand.primaryNavyTint,
    onPrimaryContainer: "#FFFFFF",

    secondary: Brand.accentTeal,
    onSecondary: "#05221B",
    secondaryContainer: "#CFF7EF",
    onSecondaryContainer: "#02201B",

    // Surfaces
    background: Brand.lightBg,
    surface: Brand.lightSurface,
    surfaceVariant: Brand.lightSurfaceVariant,
    onSurface: Brand.lightText,
    onSurfaceVariant: "#334155",

    // Outlines / borders
    outline: Brand.lightOutline,
    outlineVariant: "#E6EEF7",

    // Text shortcut (convenience for your code)
    text: Brand.lightText,

    // Feedback
    error: Brand.error,
    onError: "#FFFFFF",
    errorContainer: "#FDE7E7",
    onErrorContainer: "#3B0A0A",
  },
};

/**
 * DARK THEME
 * We slightly lift primary so it stands out on dark surfaces.
 * Still reads as “navy” and matches your splash gradient.
 */
export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,

    // Brand
    primary: "#1F4D77", // lifted navy for contrast on dark surfaces
    onPrimary: "#FFFFFF",
    primaryContainer: "#274E78",
    onPrimaryContainer: "#EAF2FA",

    secondary: Brand.accentTeal,
    onSecondary: "#05221B",
    secondaryContainer: "#0B3A33",
    onSecondaryContainer: "#BFF1E8",

    // Surfaces
    background: Brand.darkBg,
    surface: Brand.darkSurface,
    surfaceVariant: Brand.darkSurfaceVariant,
    onSurface: Brand.darkText,
    onSurfaceVariant: "#C1CCDA",

    // Outlines / borders
    outline: Brand.darkOutline,
    outlineVariant: "#1E2935",

    // Text shortcut
    text: Brand.darkText,

    // Feedback
    error: Brand.errorDark,
    onError: "#1A0B0B",
    errorContainer: "#541B1B",
    onErrorContainer: "#FFDADB",
  },
};

/**
 * Navigation theme bridge → keeps RN Navigation in sync with Paper
 */
export const getNavigationTheme = (scheme: "light" | "dark") => {
  const paperTheme = scheme === "dark" ? DarkTheme : LightTheme;
  const baseNavigationTheme =
    scheme === "dark" ? NavigationDarkTheme : NavigationDefaultTheme;

  return {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,

      // Align with Paper
      primary: paperTheme.colors.primary,
      background: paperTheme.colors.background,
      card: paperTheme.colors.surface,
      text: paperTheme.colors.onSurface, // use onSurface for accessibility
      border: paperTheme.colors.outline,
      notification: paperTheme.colors.error,
    },
  };
};
