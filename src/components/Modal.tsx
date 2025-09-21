// components/Modal.tsx
import React from "react";
import { Modal as RNModal, View, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ visible, onClose, children }) => {
  const { variables } = useTheme();
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: variables.colors.surface,
            },
          ]}
        >
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
  },
});
