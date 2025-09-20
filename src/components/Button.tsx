// components/Button.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface Props extends TouchableOpacityProps {
  variant?: Variant;
  title: string;
}

export const Button: React.FC<Props> = ({
  variant = "primary",
  title,
  style,
  ...props
}) => {
  const { variables } = useTheme();

  const background =
    variant === "primary"
      ? variables.colors.button.primary
      : variant === "secondary"
      ? variables.colors.button.secondary
      : "transparent";

  const border =
    variant === "outline" ? variables.colors.button.primary : "transparent";

  const textColor =
    variant === "primary"
      ? variables.colors.text.onPrimary
      : variables.colors.text.primary;

  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.base,
        { backgroundColor: background, borderColor: border },
        style,
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
