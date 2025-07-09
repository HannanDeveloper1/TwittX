import React from "react";
import { Redirect, Tabs, useRouter } from "expo-router";
import { useAuth } from "@/state/authStore";
import TabIcon from "@/components/shared/TabIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import ActionButton from "@/components/layout/ActionButton";
import { StatusBar } from "react-native";

export default function TabsLayout() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <>
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
            tabBarIcon: ({ color, size }) => (
              <TabIcon
                icon={
                  <Ionicons name="home-outline" size={size} color={color} />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="chats"
          options={{
            tabBarIcon: ({ color, size }) => (
              <TabIcon
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
                onPress={() => router.push("/createpost")}
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
            tabBarIcon: ({ color, size }) => (
              <TabIcon
                icon={<AntDesign name="bells" size={size} color={color} />}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <TabIcon
                icon={<AntDesign name="user" size={size} color={color} />}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar
        barStyle="dark-content"
        animated
        translucent
        backgroundColor={"white"}
      />
    </>
  );
}
