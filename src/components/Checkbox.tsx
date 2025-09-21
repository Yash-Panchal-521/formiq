// components/Checkbox.tsx
import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";

interface Props {
  checked: boolean;
  onChange: () => void;
}

export const Checkbox: React.FC<Props> = ({ checked, onChange }) => {
  const { variables } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.box,
        {
          borderColor: variables.colors.border,
          backgroundColor: checked
            ? variables.colors.button.primary
            : "transparent",
        },
      ]}
      onPress={onChange}
    >
      {checked ? (
        <MaterialCommunityIcons
          name="check"
          size={18}
          color={variables.colors.text.onPrimary}
        />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
