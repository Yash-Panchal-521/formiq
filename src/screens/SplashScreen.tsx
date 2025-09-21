import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LogoMark from "../components/LogoMark";

type Props = {
  tagline?: string;
};

export default function SplashScreen({
  tagline = "AI-Powered Workouts",
}: Props) {
  const scale = useRef(new Animated.Value(0.96)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, fade]);

  return (
    <View style={styles.root} accessibilityLabel="Splash screen">
      <LinearGradient
        colors={["#0A2037", "#071A2E"]}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[styles.center, { opacity: fade, transform: [{ scale }] }]}
      >
        <LogoMark size={128} />
        <Text style={styles.brand}>Formiq</Text>
        <Text style={styles.tagline}>{tagline}</Text>
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.dotRow}>
          <View style={styles.dot} />
          <View style={[styles.dot, { opacity: 0.5 }]} />
          <View style={[styles.dot, { opacity: 0.25 }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0A2037" },
  center: { alignItems: "center", justifyContent: "center", flex: 1, gap: 8 },
  brand: {
    marginTop: 14,
    fontSize: 40,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  tagline: { color: "#C8D5E8", marginTop: 2, fontSize: 14 },
  footer: { paddingBottom: 36, alignItems: "center" },
  dotRow: { flexDirection: "row", gap: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFFFFF" },
});
