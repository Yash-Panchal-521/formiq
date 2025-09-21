import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back{user ? `, ${user.name}` : ""}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    color: "#f8fafc",
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#f97316",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 999,
  },
  logoutText: {
    color: "#0f172a",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default HomeScreen;
