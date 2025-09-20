// components/Toast.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

interface Props {
  message: string;
  type?: "success" | "error" | "info";
}

export const Toast: React.FC<Props> = ({ message, type = "info" }) => {
  const { variables } = useTheme();
  const bg =
    type === "success"
      ? variables.colors.success
      : type === "error"
      ? variables.colors.error
      : variables.colors.surfaceVariant;

  return (
    <View style={[styles.toast, { backgroundColor: bg }]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});
