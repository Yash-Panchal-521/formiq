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
  disabled,
  ...props
}) => {
  const { variables } = useTheme();

  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isOutline = variant === "outline";
  const isGhost = variant === "ghost";

  const bg = isPrimary
    ? variables.colors.button.primary
    : isSecondary
    ? variables.colors.button.secondary
    : "transparent";

  const borderColor = isOutline
    ? variables.colors.button.primary
    : "transparent";

  const txt =
    isPrimary || isSecondary
      ? variables.colors.button.onPrimary ?? variables.colors.text.onPrimary
      : isOutline
      ? variables.colors.button.primary
      : variables.colors.text.primary;

  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[
        styles.base,
        {
          backgroundColor: isGhost ? "transparent" : bg,
          borderColor,
          opacity,
        },
        isGhost && { borderWidth: 0 },
        style,
      ]}
      activeOpacity={0.85}
    >
      <Text style={[styles.text, { color: txt }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
