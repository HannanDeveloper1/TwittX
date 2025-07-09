import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  icon: ReactNode;
};
export default function TabIcon({ icon }: Props) {
  return (
    <>
      <View className="flex flex-col items-center justify-center flex-1 top-2">
        {icon}
      </View>
    </>
  );
}
