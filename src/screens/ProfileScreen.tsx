import React, { useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../components/Text";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../theme/ThemeProvider";
import type { MD3Theme } from "react-native-paper";
import type { createVariables } from "../theme/variables";

type ThemeVariables = ReturnType<typeof createVariables>;

type ProfileRow = {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

function ProfileScreen() {
  const { user } = useAuth();
  const { theme, variables } = useTheme();
  const styles = useMemo(
    () => createStyles(theme.colors, variables),
    [theme.colors, variables]
  );

  const heightValue = user?.heightCm
    ? `${user.heightCm} cm`
    : user?.heightFt
    ? `${user.heightFt} ft${user.heightIn ? ` ${user.heightIn} in` : ""}`
    : "—";

  const personalRows: ProfileRow[] = [
    { label: "Name", value: user?.name ?? "—", icon: "person-outline" },
    { label: "Email", value: user?.email ?? "—", icon: "mail-outline" },
    { label: "Height", value: heightValue, icon: "accessibility-outline" },
    {
      label: "Current weight",
      value: user?.currentWeight ? `${user.currentWeight}` : "—",
      icon: "scale-outline",
    },
    {
      label: "Target weight",
      value: user?.targetWeight ? `${user.targetWeight}` : "—",
      icon: "flag-outline",
    },
  ];

  const trainingRows: ProfileRow[] = [
    {
      label: "Primary goal",
      value: user?.fitnessGoal ?? "—",
      icon: "trophy-outline",
    },
    {
      label: "Fitness level",
      value: user?.fitnessLevel ?? "—",
      icon: "stats-chart-outline",
    },
    {
      label: "Equipment",
      value:
        user && user.equipment.length > 0
          ? user.equipment.join(", ")
          : "None",
      icon: "cube-outline",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text variant="h2">Profile overview</Text>
          <Text
            variant="body"
            color={variables.colors.text.muted}
            style={styles.subtitle}
          >
            Fine tune your training details anytime.
          </Text>
        </View>

        <Card title="Personal details" rows={personalRows} styles={styles} iconColor={theme.colors.primary} />
        <Card title="Training preferences" rows={trainingRows} styles={styles} iconColor={theme.colors.primary} />
      </ScrollView>
    </SafeAreaView>
  );
}

type ProfileCardProps = {
  title: string;
  rows: ProfileRow[];
  styles: ReturnType<typeof createStyles>;
  iconColor: string;
};

function Card({ title, rows, styles, iconColor }: ProfileCardProps) {
  return (
    <View style={styles.card}>
      <Text variant="label" style={styles.cardTitle}>
        {title}
      </Text>
      {rows.map((row, index) => (
        <View
          key={row.label}
          style={[
            styles.row,
            index === rows.length - 1 && styles.rowLast,
          ]}
        >
          <View style={styles.rowIconWrapper}>
            <Ionicons name={row.icon} size={18} color={iconColor} />
          </View>
          <View style={styles.rowContent}>
            <Text variant="label" style={styles.rowLabel}>
              {row.label}
            </Text>
            <Text variant="body" style={styles.rowValue}>
              {row.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const createStyles = (
  colors: MD3Theme["colors"],
  variables: ThemeVariables
) => {
  const base = StyleSheet.create({
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
    subtitle: {
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
      paddingHorizontal: variables.spacing.lg,
      paddingVertical: variables.spacing.lg,
      gap: variables.spacing.sm,
    },
    cardTitle: {
      color: colors.onSurface,
      fontSize: variables.typography.body.fontSize + 2,
      fontWeight: "600" as const,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: variables.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.outline,
      gap: variables.spacing.sm,
    },
    rowLast: {
      borderBottomWidth: 0,
    },
    rowIconWrapper: {
      width: 36,
      height: 36,
      borderRadius: variables.radius.md,
      backgroundColor: colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
    },
    rowContent: {
      flex: 1,
      gap: 4,
    },
    rowLabel: {
      color: colors.onSurfaceVariant,
    },
    rowValue: {
      color: colors.onSurface,
    },
  });

  return base;
};

export default ProfileScreen;