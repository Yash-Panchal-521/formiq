import React from "react";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAuth } from "../context/AuthContext";

function RootNavigator() {
  const { isSignedIn } = useAuth();

  return !isSignedIn ? <AuthNavigator /> : <AppNavigator />;
}

export default RootNavigator;
