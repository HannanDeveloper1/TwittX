import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@/state/authStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuth();
  return (
    <SafeAreaView>
      <View className="h-full w-full items-center justify-center">
        <Text className="text-3xl font-bold font-sans text-center">
          Welcome, {user.name} ({user.username})
        </Text>
      </View>
    </SafeAreaView>
  );
}
