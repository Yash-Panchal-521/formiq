import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import WorkoutsScreen from "../screens/WorkoutsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { AppTabParamList } from "./types";
import { useTheme } from "../theme/ThemeProvider";

const Tab = createBottomTabNavigator<AppTabParamList>();

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<keyof AppTabParamList, IoniconName> = {
  Home: "home-outline",
  Workouts: "barbell-outline",
  Profile: "person-circle-outline",
};

function AppNavigator() {
  const { theme } = useTheme();

  const tabBarStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.outline,
      height: 64,
      paddingBottom: 10,
      paddingTop: 6,
    }),
    [theme.colors.surface, theme.colors.outline]
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle,
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={TAB_ICONS[route.name as keyof AppTabParamList]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workouts" component={WorkoutsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
