import { View, Text, Button, Alert } from "react-native";
import React from "react";
import { useAuth } from "@/state/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { signout } from "@/lib/fetchAPI/auth";
import { useRouter } from "expo-router";

export default function Index() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const onSignOut = async () => {
    try {
      await signout();
      logout();
      Alert.alert("Logged Out", "Signed out your account successfully");
      router.replace("/(auth)");
    } catch (error) {
      Alert.alert(
        "An error occured",
        "An error occured when trying to signout, please try again later",
        error.message
      );
    }
  };
  return (
    <SafeAreaView>
      <View className="h-full w-full items-center justify-center flex-col bg-[#f5f5f5]">
        <Text className="text-3xl font-bold font-sans text-center">
          Welcome, {user.name} ({user.username})
        </Text>
        <Button onPress={onSignOut} title="Sign Out" />
      </View>
    </SafeAreaView>
  );
}
