// components/Toast.tsx
import React from "react";
import { View, Text as RNText, StyleSheet } from "react-native";
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

  const color =
    type === "info"
      ? variables.colors.text.primary
      : variables.colors.text.onPrimary;

  return (
    <View style={[styles.toast, { backgroundColor: bg }]}>
      <RNText style={[styles.text, { color }]}>{message}</RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    alignItems: "center",
  },
  text: {
    fontWeight: "700",
  },
});
