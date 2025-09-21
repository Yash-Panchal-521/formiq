import React from "react";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { LightTheme, DarkTheme, getNavigationTheme } from "./src/theme/themes";
import RootNavigator from "./src/navigation/RootNavigator";
import SplashScreen from "./src/screens/SplashScreen";
import { AuthProvider } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/theme/ThemeProvider";

const queryClient = new QueryClient();

export default function App() {
  const scheme = useColorScheme();
  const paperTheme = scheme === "dark" ? DarkTheme : LightTheme;
  const navigationTheme = getNavigationTheme(
    scheme === "dark" ? "dark" : "light"
  );

  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const bootstrap = async () => {
      await new Promise((r) => setTimeout(r, 900)); // subtle hold for the splash
      setReady(true);
    };
    bootstrap();
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={paperTheme}>
          {ready ? (
            <AuthProvider>
              <NavigationContainer theme={navigationTheme}>
                <RootNavigator />
              </NavigationContainer>
            </AuthProvider>
          ) : (
            <SplashScreen />
          )}
        </PaperProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
