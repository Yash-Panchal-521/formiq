// components/Checkbox.tsx
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";

interface Props {
  checked: boolean;
  onChange: () => void;
}

export const Checkbox: React.FC<Props> = ({ checked, onChange }) => {
  const { variables } = useTheme();
  return (
    <TouchableOpacity style={styles.box} onPress={onChange}>
      {checked && (
        <MaterialCommunityIcons
          name="check"
          size={20}
          color={variables.colors.text.onPrimary}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
