import React, { useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../components/Text";
import { useTheme } from "../theme/ThemeProvider";
import type { MD3Theme } from "react-native-paper";
import type { createVariables } from "../theme/variables";

type ThemeVariables = ReturnType<typeof createVariables>;

type WorkoutCollectionItem = {
  title: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

const WORKOUT_COLLECTION: WorkoutCollectionItem[] = [
  {
    title: "Strength Builder",
    description: "Progressive overload sessions focused on compound lifts and tempo control.",
    icon: "fitness-outline",
  },
  {
    title: "Athletic Conditioning",
    description: "High-energy intervals blending agility, plyometrics, and core stability.",
    icon: "pulse-outline",
  },
  {
    title: "Mobility & Recovery",
    description: "Guided flows to improve range of motion and accelerate recovery days.",
    icon: "sparkles-outline",
  },
];

function WorkoutsScreen() {
  const { theme, variables } = useTheme();
  const styles = useMemo(
    () => createStyles(theme.colors, variables),
    [theme.colors, variables]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text variant="h2">Workout library</Text>
          <Text
            variant="body"
            color={variables.colors.text.muted}
            style={styles.headerSubtitle}
          >
            Explore ready-to-go sessions curated by your AI coach.
          </Text>
        </View>

        {WORKOUT_COLLECTION.map((plan) => (
          <View key={plan.title} style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={plan.icon}
                size={24}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.cardBody}>
              <Text variant="label" style={styles.cardTitle}>
                {plan.title}
              </Text>
              <Text
                variant="body"
                color={variables.colors.text.muted}
                style={styles.cardDescription}
              >
                {plan.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (
  colors: MD3Theme["colors"],
  variables: ThemeVariables
) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      paddingHorizontal: variables.spacing.lg,
      paddingVertical: variables.spacing.xl,
      gap: variables.spacing.lg,
      alignItems: "center",
    },
    header: {
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      gap: variables.spacing.xs,
    },
    headerSubtitle: {
      marginTop: variables.spacing.xs,
    },
    card: {
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      borderRadius: variables.radius.lg,
      borderWidth: 1,
      borderColor: colors.outline,
      backgroundColor: colors.surface,
      padding: variables.spacing.lg,
      flexDirection: "row",
      gap: variables.spacing.md,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: variables.radius.md,
      backgroundColor: colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
    },
    cardBody: {
      flex: 1,
      gap: variables.spacing.xs,
    },
    cardTitle: {
      color: colors.onSurface,
      fontSize: variables.typography.body.fontSize + 2,
      fontWeight: "600" as const,
    },
    cardDescription: {
      lineHeight: 20,
    },
  });

export default WorkoutsScreen;