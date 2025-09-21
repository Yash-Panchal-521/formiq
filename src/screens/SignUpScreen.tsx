import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { TextStyle } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import {
  BirthGender,
  EquipmentOption,
  FitnessGoal,
  FitnessLevel,
  useAuth,
} from "../context/AuthContext";
import { AuthStackParamList } from "../navigation/types";
import { useTheme } from "../theme/ThemeProvider";
import type { MD3Theme } from "react-native-paper";
import type { createVariables } from "../theme/variables";
import { Button } from "../components/Button";

type ThemeVariables = ReturnType<typeof createVariables>;
type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
type HeightUnit = "metric" | "imperial";

type OptionMeta<T> = {
  value: T;
  label: string;
  icon: IoniconName;
};

const TOTAL_STEPS = 8;

const birthGenderOptions: OptionMeta<BirthGender>[] = [
  { value: "Male", label: "Male", icon: "male-outline" },
  { value: "Female", label: "Female", icon: "female-outline" },
];

const fitnessGoalOptions: OptionMeta<FitnessGoal>[] = [
  { value: "Get Stronger", label: "Get Stronger", icon: "barbell-outline" },
  { value: "Build Muscle", label: "Build Muscle", icon: "fitness-outline" },
  { value: "Get Lean", label: "Get Lean", icon: "walk-outline" },
  {
    value: "Reduce Body Weight",
    label: "Reduce Body Weight",
    icon: "scale-outline",
  },
  { value: "Improve Health", label: "Improve Health", icon: "heart-outline" },
  {
    value: "Improve Sports Performance",
    label: "Improve Sports Performance",
    icon: "medal-outline",
  },
];

const fitnessLevelOptions: OptionMeta<FitnessLevel>[] = [
  { value: "Beginner", label: "Beginner", icon: "leaf-outline" },
  { value: "Intermediate", label: "Intermediate", icon: "bicycle-outline" },
  { value: "Advanced", label: "Advanced", icon: "flash-outline" },
];

const equipmentOptions: OptionMeta<EquipmentOption>[] = [
  { value: "Dumbbells", label: "Dumbbells", icon: "barbell-outline" },
  { value: "Kettlebells", label: "Kettlebells", icon: "basketball-outline" },
  {
    value: "Weight Machine",
    label: "Weight Machine",
    icon: "construct-outline",
  },
  { value: "None", label: "None", icon: "remove-circle-outline" },
];

type Props = NativeStackScreenProps<AuthStackParamList, "SignUp">;

interface FormState {
  birthGender: BirthGender | null;
  fitnessGoal: FitnessGoal | null;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  currentWeight: string;
  targetWeight: string;
  fitnessLevel: FitnessLevel | null;
  equipment: EquipmentOption[];
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormState = {
  birthGender: null,
  fitnessGoal: null,
  heightCm: "",
  heightFt: "",
  heightIn: "",
  currentWeight: "",
  targetWeight: "",
  fitnessLevel: null,
  equipment: [],
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpScreen({ navigation }: Props) {
  const { signUp } = useAuth();
  const { theme, variables } = useTheme();
  const styles = useMemo(
    () => createStyles(theme.colors, variables),
    [theme.colors, variables]
  );

  const [form, setForm] = useState<FormState>(initialState);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("metric");

  const accentPalette = useMemo(
    () =>
      [
        {
          background: theme.colors.primaryContainer,
          foreground: theme.colors.onPrimaryContainer,
        },
        {
          background: theme.colors.secondaryContainer,
          foreground: theme.colors.onSecondaryContainer,
        },
        {
          background: theme.colors.errorContainer,
          foreground: theme.colors.onErrorContainer,
        },
        {
          background: theme.colors.surfaceVariant,
          foreground: theme.colors.onSurfaceVariant,
        },
      ] as const,
    [theme.colors]
  );

  const stepTitle = useMemo(() => {
    switch (step) {
      case 1:
        return "What's your birth gender?";
      case 2:
        return "Choose your main fitness goal";
      case 3:
        return "Tell us your height";
      case 4:
        return "What's your current weight?";
      case 5:
        return "What's your target weight?";
      case 6:
        return "How would you rate your fitness level?";
      case 7:
        return "Which equipment do you have access to?";
      case 8:
        return "Tell us about you";
      default:
        return "";
    }
  }, [step]);

  const updateForm = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleEquipment = (option: EquipmentOption) => {
    setForm((prev) => {
      const alreadySelected = prev.equipment.includes(option);
      if (option === "None") {
        return {
          ...prev,
          equipment: alreadySelected ? [] : ["None"],
        };
      }

      const filtered = prev.equipment.filter(
        (item) => item !== option && item !== "None"
      );
      return {
        ...prev,
        equipment: alreadySelected ? filtered : [...filtered, option],
      };
    });
  };

  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        if (!form.birthGender) {
          return "Please select your birth gender.";
        }
        return null;
      case 2:
        if (!form.fitnessGoal) {
          return "Select the goal you're focusing on.";
        }
        return null;
      case 3:
        if (heightUnit === "metric" && !form.heightCm) {
          return "Please provide your height in centimetres.";
        }
        if (heightUnit === "imperial" && !form.heightFt) {
          return "Please provide your height in feet.";
        }
        return null;
      case 4:
        if (!form.currentWeight) {
          return "Enter your current weight.";
        }
        return null;
      case 5:
        if (!form.targetWeight) {
          return "Enter your target weight.";
        }
        return null;
      case 6:
        if (!form.fitnessLevel) {
          return "Select your current fitness level.";
        }
        return null;
      case 7:
        if (!form.equipment.length) {
          return "Let us know what equipment you have, or choose None.";
        }
        return null;
      case 8:
        if (!form.name.trim()) {
          return "Please tell us your name.";
        }
        if (!form.email.trim()) {
          return "Email is required.";
        }
        if (!form.password) {
          return "Password is required.";
        }
        if (form.password !== form.confirmPassword) {
          return "Passwords do not match.";
        }
        return null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
    } else {
      try {
        signUp({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          birthGender: form.birthGender!,
          fitnessGoal: form.fitnessGoal!,
          heightCm: form.heightCm || undefined,
          heightFt: form.heightFt || undefined,
          heightIn: form.heightIn || undefined,
          currentWeight: form.currentWeight,
          targetWeight: form.targetWeight,
          fitnessLevel: form.fitnessLevel!,
          equipment: form.equipment,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to sign up");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      setError(null);
    }
  };

  const renderOptionCard = <T extends string | null>(
    option: OptionMeta<T>,
    selected: boolean,
    onPress: () => void,
    index: number,
    layout: "half" | "full"
  ) => {
    const accent = accentPalette[index % accentPalette.length];
    return (
      <OptionCard
        key={option.value ?? option.label}
        label={option.label}
        iconName={option.icon}
        selected={selected}
        onPress={onPress}
        accentColor={accent.background}
        accentForeground={accent.foreground}
        selectedColor={theme.colors.primary}
        selectedTextColor={theme.colors.onPrimary}
        textColor={theme.colors.onSurface}
        borderColor={theme.colors.outline}
        surfaceColor={theme.colors.surfaceVariant}
        layout={layout}
      />
    );
  };

  const renderHeightInputs = () => (
    <View style={styles.stepBody}>
      <View style={styles.toggleRow}>
        <ToggleButton
          label="Centimetres"
          iconName="resize-outline"
          active={heightUnit === "metric"}
          onPress={() => setHeightUnit("metric")}
          themeColors={theme.colors}
          variables={variables}
        />
        <ToggleButton
          label="Feet & Inches"
          iconName="footsteps-outline"
          active={heightUnit === "imperial"}
          onPress={() => setHeightUnit("imperial")}
          themeColors={theme.colors}
          variables={variables}
        />
      </View>
      {heightUnit === "metric" ? (
        <View style={styles.field}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={form.heightCm}
            onChangeText={(value) => updateForm("heightCm", value)}
            placeholder="e.g. 175"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            keyboardType="numeric"
          />
        </View>
      ) : (
        <View style={styles.field}>
          <Text style={styles.label}>Height (ft / in)</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={form.heightFt}
              onChangeText={(value) => updateForm("heightFt", value)}
              placeholder="ft"
              placeholderTextColor={theme.colors.onSurfaceVariant}
              keyboardType="numeric"
            />
            <View style={styles.spacer} />
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={form.heightIn}
              onChangeText={(value) => updateForm("heightIn", value)}
              placeholder="in"
              placeholderTextColor={theme.colors.onSurfaceVariant}
              keyboardType="numeric"
            />
          </View>
        </View>
      )}
    </View>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepBody}>
            <View style={styles.optionsRow}>
              {birthGenderOptions.map((option, index) =>
                renderOptionCard(
                  option,
                  form.birthGender === option.value,
                  () => updateForm("birthGender", option.value),
                  index,
                  "half"
                )
              )}
            </View>
            <Text style={styles.signInText}>Already our user?</Text>
            <Button
              variant="ghost"
              title="Continue with your account."
              onPress={() => navigation.navigate("SignIn")}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepBody}>
            <View style={styles.optionsGrid}>
              {fitnessGoalOptions.map((option, index) =>
                renderOptionCard(
                  option,
                  form.fitnessGoal === option.value,
                  () => updateForm("fitnessGoal", option.value),
                  index,
                  "half"
                )
              )}
            </View>
          </View>
        );
      case 3:
        return renderHeightInputs();
      case 4:
        return (
          <View style={styles.stepBody}>
            <View style={styles.illustrationBubble}>
              <Ionicons
                name="scale-outline"
                size={52}
                color={theme.colors.primary}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Current weight</Text>
              <TextInput
                style={styles.input}
                value={form.currentWeight}
                onChangeText={(value) => updateForm("currentWeight", value)}
                placeholder="Add your current weight"
                placeholderTextColor={theme.colors.onSurfaceVariant}
                keyboardType="numeric"
              />
            </View>
          </View>
        );
      case 5:
        return (
          <View style={styles.stepBody}>
            <View style={styles.illustrationBubble}>
              <Ionicons
                name="flag-outline"
                size={52}
                color={theme.colors.secondary}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Target weight</Text>
              <TextInput
                style={styles.input}
                value={form.targetWeight}
                onChangeText={(value) => updateForm("targetWeight", value)}
                placeholder="Add your target weight"
                placeholderTextColor={theme.colors.onSurfaceVariant}
                keyboardType="numeric"
              />
            </View>
          </View>
        );
      case 6:
        return (
          <View style={styles.stepBody}>
            <View style={styles.optionsGrid}>
              {fitnessLevelOptions.map((option, index) =>
                renderOptionCard(
                  option,
                  form.fitnessLevel === option.value,
                  () => updateForm("fitnessLevel", option.value),
                  index,
                  "half"
                )
              )}
            </View>
          </View>
        );
      case 7:
        return (
          <View style={styles.stepBody}>
            <View style={styles.optionsGrid}>
              {equipmentOptions.map((option, index) =>
                renderOptionCard(
                  option,
                  form.equipment.includes(option.value),
                  () => toggleEquipment(option.value),
                  index,
                  "half"
                )
              )}
            </View>
          </View>
        );
      case 8:
        return (
          <View style={styles.stepBody}>
            <View style={styles.field}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={(value) => updateForm("name", value)}
                placeholder="Full name"
                placeholderTextColor={theme.colors.onSurfaceVariant}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={form.email}
                onChangeText={(value) => updateForm("email", value)}
                placeholder="you@example.com"
                placeholderTextColor={theme.colors.onSurfaceVariant}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={form.password}
                onChangeText={(value) => updateForm("password", value)}
                placeholder="Create a password"
                placeholderTextColor={theme.colors.onSurfaceVariant}
                secureTextEntry
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Confirm password</Text>
              <TextInput
                style={styles.input}
                value={form.confirmPassword}
                onChangeText={(value) => updateForm("confirmPassword", value)}
                placeholder="Re-enter password"
                placeholderTextColor={theme.colors.onSurfaceVariant}
                secureTextEntry
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentCard}>
            <View style={styles.header}>
              <TouchableOpacity
                style={[
                  styles.backButton,
                  step === 1 && styles.backButtonDisabled,
                ]}
                onPress={handleBack}
                disabled={step === 1}
              >
                <Ionicons
                  name="arrow-back"
                  size={22}
                  color={
                    step === 1
                      ? theme.colors.onSurfaceVariant
                      : theme.colors.onSurface
                  }
                />
              </TouchableOpacity>
              <View style={styles.headerTextWrapper}>
                <Text style={styles.stepCounter}>
                  Step {step} of {TOTAL_STEPS}
                </Text>
                <Text style={styles.title}>{stepTitle}</Text>
              </View>
            </View>

            {renderStep()}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.actions}>
              {step > 1 ? (
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleBack}
                >
                  <Text style={styles.secondaryText}>Back</Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleNext}
              >
                <Text style={styles.primaryText}>
                  {step === TOTAL_STEPS ? "Create Account" : "Continue"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function OptionCard({
  label,
  iconName,
  selected,
  onPress,
  accentColor,
  accentForeground,
  selectedColor,
  selectedTextColor,
  textColor,
  borderColor,
  surfaceColor,
  layout,
}: {
  label: string;
  iconName: IoniconName;
  selected: boolean;
  onPress: () => void;
  accentColor: string;
  accentForeground: string;
  selectedColor: string;
  selectedTextColor: string;
  textColor: string;
  borderColor: string;
  surfaceColor: string;
  layout: "half" | "full";
}) {
  const sizeStyle =
    layout === "half"
      ? {
          width: "48%" as const,
        }
      : { width: "100%" as const };

  const cardBackground = selected ? selectedColor : surfaceColor;
  const cardBorder = selected ? selectedColor : borderColor;
  const badgeBackground = selected ? selectedTextColor : accentColor;
  const iconColor = selected ? selectedColor : accentForeground;
  const labelColor = selected ? selectedTextColor : textColor;

  return (
    <TouchableOpacity
      style={[
        optionStyles.card,
        sizeStyle,
        {
          backgroundColor: cardBackground,
          borderColor: cardBorder,
        },
      ]}
      onPress={onPress}
    >
      <View
        style={[optionStyles.iconBadge, { backgroundColor: badgeBackground }]}
      >
        <Ionicons name={iconName} size={24} color={iconColor} />
      </View>
      <Text style={[optionStyles.label, { color: labelColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

type ToggleButtonProps = {
  label: string;
  iconName: IoniconName;
  active: boolean;
  onPress: () => void;
  themeColors: MD3Theme["colors"];
  variables: ThemeVariables;
};

function ToggleButton({
  label,
  iconName,
  active,
  onPress,
  themeColors,
  variables,
}: ToggleButtonProps) {
  const backgroundColor = active
    ? themeColors.primary
    : themeColors.surfaceVariant;
  const borderColor = active ? themeColors.primary : themeColors.outline;
  const iconColor = active ? themeColors.onPrimary : themeColors.primary;
  const labelColor = active
    ? themeColors.onPrimary
    : themeColors.onSurfaceVariant;

  return (
    <TouchableOpacity
      style={[
        toggleStyles.button,
        {
          backgroundColor,
          borderColor,
        },
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={iconName}
        size={18}
        color={iconColor}
        style={{ marginRight: variables.spacing.xs }}
      />
      <Text
        style={[
          toggleStyles.label,
          {
            color: labelColor,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const optionStyles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 18,
    minWidth: 140,
    maxWidth: 240,
    marginBottom: 12,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});

const toggleStyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    minWidth: 140,
    maxWidth: 220,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});

const createStyles = (
  colors: MD3Theme["colors"],
  variables: ThemeVariables
) => {
  const labelTypography = variables.typography.label as TextStyle;
  const headingTypography = variables.typography.h2 as TextStyle;

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    flex: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      alignItems: "center",
      paddingHorizontal: variables.spacing.lg,
      paddingTop: variables.spacing.xl,
      paddingBottom: variables.spacing.xl,
    },
    contentCard: {
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      backgroundColor: colors.surface,
      borderRadius: variables.radius.lg,
      padding: variables.spacing.lg,
      borderWidth: 1,
      borderColor: colors.outline,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      marginBottom: variables.spacing.md,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: variables.radius.md,
      borderWidth: 1,
      borderColor: colors.outline,
      alignItems: "center",
      justifyContent: "center",
      marginRight: variables.spacing.sm,
      backgroundColor: colors.surfaceVariant,
    },
    backButtonDisabled: {
      opacity: 0.45,
    },
    headerTextWrapper: {
      flex: 1,
      maxWidth: 460,
      minWidth: 240,
    },
    stepCounter: {
      ...labelTypography,
      color: colors.onSurfaceVariant,
      marginBottom: variables.spacing.xs,
    },
    title: {
      ...headingTypography,
      color: colors.onSurface,
      flexWrap: "wrap",
    },
    stepBody: {
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      marginTop: variables.spacing.md,
    },
    optionsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
    },
    optionsGrid: {
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: variables.spacing.sm,
    },
    signInLink: {
      marginTop: variables.spacing.lg,
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      alignItems: "center",
    },
    signInText: {
      textAlign: "center",
      color: colors.onSurfaceVariant,
      fontSize: variables.typography.body.fontSize,
      marginTop: variables.spacing.md,
    },
    linkText: {
      textAlign: "center",
      color: colors.secondary,
      fontSize: variables.typography.body.fontSize,
      marginTop: variables.spacing.xs,
    },
    field: {
      marginBottom: variables.spacing.md,
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
    },
    label: {
      ...labelTypography,
      color: colors.onSurface,
      marginBottom: variables.spacing.xs,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.outline,
      backgroundColor: colors.surfaceVariant,
      color: colors.onSurface,
      borderRadius: variables.radius.md,
      paddingHorizontal: variables.spacing.md,
      paddingVertical: variables.spacing.sm + 4,
      fontSize: variables.typography.body.fontSize,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
    },
    spacer: {
      width: variables.spacing.sm,
    },
    halfInput: {
      flex: 1,
    },
    error: {
      color: colors.error,
      marginTop: variables.spacing.md,
      fontSize: variables.typography.label.fontSize,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: variables.spacing.sm,
      marginTop: variables.spacing.xl,
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
    },
    secondaryButton: {
      borderRadius: variables.radius.md,
      paddingHorizontal: variables.spacing.lg,
      paddingVertical: variables.spacing.sm + 4,
      borderWidth: 1,
      borderColor: colors.outline,
      backgroundColor: colors.surfaceVariant,
    },
    secondaryText: {
      color: colors.onSurface,
      fontWeight: "600",
    },
    primaryButton: {
      borderRadius: variables.radius.md,
      paddingHorizontal: variables.spacing.xl,
      paddingVertical: variables.spacing.sm + 6,
      backgroundColor: colors.primary,
    },
    primaryText: {
      color: colors.onPrimary,
      fontWeight: "700",
      fontSize: variables.typography.body.fontSize,
    },
    toggleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: variables.spacing.sm,
      marginBottom: variables.spacing.lg,
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
    },
    illustrationBubble: {
      width: "100%" as const,
      maxWidth: 520,
      minWidth: 280,
      alignItems: "center",
      marginBottom: variables.spacing.lg,
    },
  });
};

export default SignUpScreen;
