// components/Text.tsx
import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type Variant = "h1" | "h2" | "body" | "caption" | "label";

interface Props extends TextProps {
  variant?: Variant;
  color?: string;
}

export const Text: React.FC<Props> = ({
  variant = "body",
  color,
  style,
  children,
  ...props
}) => {
  const { variables } = useTheme();
  return (
    <RNText
      {...props}
      style={[
        styles[variant],
        { color: color ?? variables.colors.text.primary },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: "700" },
  h2: { fontSize: 22, fontWeight: "600" },
  body: { fontSize: 16, fontWeight: "400" },
  caption: { fontSize: 12, fontWeight: "400" },
  label: { fontSize: 14, fontWeight: "500" },
});
