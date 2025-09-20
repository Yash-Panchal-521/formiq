import React from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LightTheme, DarkTheme } from "./src/theme/themes";

const queryClient = new QueryClient();

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme} children={undefined}>
          {/* your stack navigators */}
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
