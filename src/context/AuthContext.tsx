import React, { createContext, useContext, useMemo, useState } from "react";

export type BirthGender = "Male" | "Female";
export type FitnessGoal =
  | "Get Stronger"
  | "Build Muscle"
  | "Get Lean"
  | "Reduce Body Weight"
  | "Improve Health"
  | "Improve Sports Performance";
export type FitnessLevel = "Beginner" | "Intermediate" | "Advanced";
export type EquipmentOption =
  | "Dumbbells"
  | "Kettlebells"
  | "Weight Machine"
  | "None";

export interface UserProfile {
  name: string;
  email: string;
  birthGender: BirthGender;
  fitnessGoal: FitnessGoal;
  heightCm?: string;
  heightFt?: string;
  heightIn?: string;
  currentWeight: string;
  targetWeight: string;
  fitnessLevel: FitnessLevel;
  equipment: EquipmentOption[];
}

export interface SignUpPayload extends Omit<UserProfile, "equipment"> {
  equipment: EquipmentOption[];
  password: string;
}

interface SignInPayload {
  email: string;
  password: string;
}

interface AuthContextType {
  isSignedIn: boolean;
  user: UserProfile | null;
  signUp: (payload: SignUpPayload) => void;
  signIn: (payload: SignInPayload) => void;
  signOut: () => void;
}

interface AccountRecord {
  user: UserProfile;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [accounts, setAccounts] = useState<Record<string, AccountRecord>>({});

  const signUp = (payload: SignUpPayload) => {
    const email = payload.email.trim().toLowerCase();
    if (!payload.name || !email) {
      throw new Error("Name and email are required");
    }
    if (accounts[email]) {
      throw new Error("An account with this email already exists");
    }

    const newUser: UserProfile = {
      name: payload.name,
      email,
      birthGender: payload.birthGender,
      fitnessGoal: payload.fitnessGoal,
      heightCm: payload.heightCm,
      heightFt: payload.heightFt,
      heightIn: payload.heightIn,
      currentWeight: payload.currentWeight,
      targetWeight: payload.targetWeight,
      fitnessLevel: payload.fitnessLevel,
      equipment: payload.equipment,
    };

    setAccounts((prev) => ({
      ...prev,
      [email]: { user: newUser, password: payload.password },
    }));
    setUser(newUser);
  };

  const signIn = ({ email, password }: SignInPayload) => {
    const lookupEmail = email.trim().toLowerCase();
    const account = accounts[lookupEmail];
    if (!account || account.password !== password) {
      throw new Error("Invalid email or password");
    }
    setUser(account.user);
  };

  const signOut = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isSignedIn: Boolean(user),
      user,
      signUp,
      signIn,
      signOut,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
