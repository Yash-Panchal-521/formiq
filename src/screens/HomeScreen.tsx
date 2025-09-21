import React, { useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../theme/ThemeProvider";
import { Text } from "../components/Text";
import type { MD3Theme } from "react-native-paper";
import type { createVariables } from "../theme/variables";

type ThemeVariables = ReturnType<typeof createVariables>;

type WorkoutPlanItem = {
  day: string;
  focus: string;
  duration: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

const WORKOUT_PLAN: WorkoutPlanItem[] = [
  {
    day: "Monday",
    focus: "Upper body strength & core stability",
    duration: "45 min",
    icon: "barbell-outline",
  },
  {
    day: "Wednesday",
    focus: "Lower body power & conditioning",
    duration: "50 min",
    icon: "walk-outline",
  },
  {
    day: "Friday",
    focus: "Mobility flow & recovery work",
    duration: "35 min",
    icon: "refresh-circle-outline",
  },
];

const CURRENT_STREAK_DAYS = 7;

function HomeScreen() {
  const { user, signOut } = useAuth();
  const { theme, variables } = useTheme();
  const styles = useMemo(
    () => createStyles(theme.colors, variables),
    [theme.colors, variables]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text variant="h2" style={styles.greeting}>
              Hi, {user?.name ?? "Athlete"}
            </Text>
            <Text
              variant="body"
              color={variables.colors.text.muted}
              style={styles.subGreeting}
            >
              Ready to keep the momentum going?
            </Text>
          </View>
          <View style={styles.avatarBadge}>
            <Ionicons
              name="person-circle-outline"
              size={36}
              color={theme.colors.onPrimary}
            />
          </View>
        </View>

        <View style={styles.streakCard}>
          <View style={styles.streakIconWrapper}>
            <Ionicons
              name="flame-outline"
              size={32}
              color={theme.colors.onPrimary}
            />
          </View>
          <View style={styles.streakTextGroup}>
            <Text variant="label" color={theme.colors.onPrimary}>
              Current Streak
            </Text>
            <Text variant="h2" color={theme.colors.onPrimary}>
              {CURRENT_STREAK_DAYS} days
            </Text>
            <Text
              variant="caption"
              color={theme.colors.onPrimary}
              style={styles.streakSubtitle}
            >
              Keep showing up — your coach is proud.
            </Text>
          </View>
        </View>

        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text variant="h2">This week&apos;s plan</Text>
            <Ionicons
              name="calendar-outline"
              size={24}
              color={theme.colors.primary}
            />
          </View>
          <Text
            variant="body"
            color={variables.colors.text.muted}
            style={styles.planSubtitle}
          >
            Structured sessions to match your goals.
          </Text>

          {WORKOUT_PLAN.map((session, index) => (
            <View
              key={session.day}
              style={[
                styles.planItem,
                index === WORKOUT_PLAN.length - 1 && styles.planItemLast,
              ]}
            >
              <View style={styles.planIconWrapper}>
                <Ionicons
                  name={session.icon}
                  size={22}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.planTextWrapper}>
                <Text variant="label">{session.day}</Text>
                <Text
                  variant="body"
                  color={variables.colors.text.muted}
                  style={styles.planFocus}
                >
                  {session.focus}
                </Text>
              </View>
              <Text
                variant="body"
                color={theme.colors.primary}
                style={styles.planDuration}
              >
                {session.duration}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color={theme.colors.onPrimary}
            style={styles.logoutIcon}
          />
          <Text variant="label" color={theme.colors.onPrimary}>
            Logout
          </Text>
        </TouchableOpacity>
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
    headerRow: {
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    greeting: {
      color: colors.onSurface,
    },
    subGreeting: {
      marginTop: variables.spacing.xs,
    },
    avatarBadge: {
      width: 56,
      height: 56,
      borderRadius: variables.radius.full,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    streakCard: {
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      flexDirection: "row",
      alignItems: "center",
      padding: variables.spacing.lg,
      borderRadius: variables.radius.lg,
      backgroundColor: colors.primary,
    },
    streakIconWrapper: {
      width: 48,
      height: 48,
      borderRadius: variables.radius.md,
      backgroundColor: colors.primaryContainer,
      alignItems: "center",
      justifyContent: "center",
      marginRight: variables.spacing.md,
    },
    streakTextGroup: {
      flex: 1,
    },
    streakSubtitle: {
      marginTop: variables.spacing.xs,
    },
    planCard: {
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      backgroundColor: colors.surface,
      borderColor: colors.outline,
      borderWidth: 1,
      borderRadius: variables.radius.lg,
      padding: variables.spacing.lg,
      gap: variables.spacing.md,
    },
    planHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    planSubtitle: {
      marginTop: -variables.spacing.xs,
    },
    planItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: variables.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.outline,
      gap: variables.spacing.sm,
    },
    planItemLast: {
      borderBottomWidth: 0,
    },
    planIconWrapper: {
      width: 40,
      height: 40,
      borderRadius: variables.radius.md,
      backgroundColor: colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
    },
    planTextWrapper: {
      flex: 1,
    },
    planFocus: {
      marginTop: 4,
    },
    planDuration: {
      fontWeight: "600" as const,
    },
    logoutButton: {
      marginTop: variables.spacing.md,
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      backgroundColor: colors.primary,
      borderRadius: variables.radius.md,
      paddingVertical: variables.spacing.sm + 6,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: variables.spacing.xs,
    },
    logoutIcon: {
      marginRight: variables.spacing.xs,
    },
  });

export default HomeScreen;
