// theme/ThemeProvider.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider as PaperProvider } from "react-native-paper";
import { LightTheme, DarkTheme } from "./themes";
import { createVariables } from "./variables";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
  theme: typeof LightTheme;
  variables: ReturnType<typeof createVariables>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const theme = mode === "light" ? LightTheme : DarkTheme;
  const variables = useMemo(() => createVariables(theme), [theme]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme, variables }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
