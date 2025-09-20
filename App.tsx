import React from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LightTheme, DarkTheme, getNavigationTheme } from "./src/theme/themes";

const queryClient = new QueryClient();

export default function App() {
  const scheme = useColorScheme();
  const paperTheme = scheme === "dark" ? DarkTheme : LightTheme;
  const navigationTheme = getNavigationTheme(
    scheme === "dark" ? "dark" : "light"
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme} children={undefined}>
          {/* Add your stack navigators here */}
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
