// components/Input.tsx
import React from "react";
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({ style, containerStyle, ...props }) => {
  const { variables } = useTheme();

  return (
    <TextInput
      {...props}
      placeholderTextColor={variables.colors.text.muted}
      style={[
        styles.input,
        {
          backgroundColor: variables.colors.surface,
          borderColor: variables.colors.border,
          color: variables.colors.text.primary,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
});
