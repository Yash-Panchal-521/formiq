import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { AuthStackParamList } from "../navigation/types";
import { useTheme } from "../theme/ThemeProvider";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

type Props = NativeStackScreenProps<AuthStackParamList, "SignIn">;

function SignInScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const { variables } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    try {
      signIn({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: variables.colors.background },
      ]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: variables.colors.surface,
                borderColor: variables.colors.border,
              },
            ]}
          >
            <Text variant="h1">Welcome back</Text>
            <Text
              variant="body"
              color={variables.colors.text.muted}
              style={styles.subtitle}
            >
              Sign in to access your training plan.
            </Text>

            <View style={styles.field}>
              <Text variant="label">Email</Text>
              <Input
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="you@example.com"
                containerStyle={styles.inputContainer}
                label="Email"
              />
            </View>

            <View style={styles.field}>
              <Text variant="label">Password</Text>
              <Input
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter your password"
                containerStyle={styles.inputContainer}
                label="Password"
              />
            </View>

            {error ? (
              <Text
                variant="label"
                color={variables.colors.error}
                style={styles.errorText}
              >
                {error}
              </Text>
            ) : null}

            <Button
              title="Sign In"
              onPress={handleSubmit}
              style={styles.submitButton}
            />

            <Text style={styles.linkText}>Need to create an account?</Text>
            <Button
              title="Sign up."
              variant="ghost"
              onPress={() => navigation.replace("SignUp")}
              style={styles.linkButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderWidth: 1,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 8,
  },
  errorText: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
  },
  linkText: {
    marginTop: 16,
    textAlign: "center",
  },
  linkButton: {
    marginTop: 0,
  },
});

export default SignInScreen;
