import React from "react";
import { Redirect, Tabs, useRouter } from "expo-router";
import { useAuth } from "@/state/authStore";
import TabIcon from "@/components/shared/TabIcon";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import ActionButton from "@/components/layout/ActionButton";
import { Alert } from "react-native";

export default function TabsLayout() {
  const router = useRouter();
  const { isAuthentictated } = useAuth();

  if (!isAuthentictated) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#111",
        tabBarActiveTintColor: "#3b82f6",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "transparent",
          height: 70,
          position: "relative",
          display: "flex",
          alignItems: "center",
          borderTopWidth: 0,
        },
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              focused={focused}
              color={color}
              label="Home"
              icon={<Ionicons name="home-outline" size={size} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              focused={focused}
              color={color}
              label="Chats"
              icon={
                <Ionicons
                  name="chatbubbles-outline"
                  size={size}
                  color={color}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarButton: () => (
            <ActionButton
              icon={<Ionicons name="add" size={24} color="white" />}
              onPress={() => router.push("(root)/createpost")}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            null;
          },
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              focused={focused}
              color={color}
              label="Notifications"
              icon={<AntDesign name="bells" size={size} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              focused={focused}
              color={color}
              label="Me"
              icon={<AntDesign name="user" size={size} color={color} />}
            />
          ),
        }}
      />
    </Tabs>
  );
}
