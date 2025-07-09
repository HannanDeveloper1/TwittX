import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label?: string;
  focused: boolean;
  color: string;
  isBtn?: boolean;
};
export default function TabIcon({
  icon,
  label,
  focused,
  color,
  isBtn = false,
}: Props) {
  return (
    <>
      {isBtn ? (
        <TouchableOpacity>{icon}</TouchableOpacity>
      ) : (
        <View className="flex flex-col items-center justify-center flex-1 top-2">
          {icon}
        </View>
      )}
    </>
  );
}
