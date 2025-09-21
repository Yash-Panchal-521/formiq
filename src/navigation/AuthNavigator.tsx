import React, { lazy } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const SignInScreen = lazy(() => import("../screens/SignInScreen"));
const SignUpScreen = lazy(() => import("../screens/SignUpScreen"));

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
