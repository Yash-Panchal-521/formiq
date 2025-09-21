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
  const map = {
    h1: variables.typography.h1,
    h2: variables.typography.h2,
    body: variables.typography.body,
    caption: variables.typography.caption,
    label: variables.typography.label,
  };

  return (
    <RNText
      {...props}
      style={[
        map[variant],
        { color: color ?? variables.colors.text.primary },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};
