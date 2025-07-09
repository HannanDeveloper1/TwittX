import { useAuth } from "@/state/authStore";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isAuthentictated } = useAuth();

  if (isAuthentictated) {
    return <Redirect href="/(root)/(tabs)/" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
