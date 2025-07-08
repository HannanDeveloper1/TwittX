import React from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/state/authStore";

export default function TabsLayout() {
  const { isAuthentictated } = useAuth();

  if (!isAuthentictated) {
    return <Redirect href="/(auth)" />;
  }

  return <Slot />;
}
