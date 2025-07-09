import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import second from "";

type Props = {
  icon: ReactNode;
  onPress?: () => void;
};
export default function ActionButton({ icon, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="absolute -top-8 left-1/2 tranform -translate-x-[40px] bg-blue-500 w-[5.5rem] h-[5.5rem] rounded-full flex items-center justify-center border-8 border-[#f5f5f5]"
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
}
