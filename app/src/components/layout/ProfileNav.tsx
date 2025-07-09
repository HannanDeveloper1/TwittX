import { View, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function ProfileNav() {
  return (
    <View className="bg-white flex flex-row items-center justify-between p-5 gap-3">
      <TouchableOpacity activeOpacity={0.4}>
        <AntDesign name="setting" size={26} />
      </TouchableOpacity>
      <View className="flex flex-row items-center gap-3">
        <TouchableOpacity activeOpacity={0.4}>
          <Feather name="edit" size={22} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.4}>
          <AntDesign
            name="logout"
            size={22}
            color={"#ef4444"}
            className="ml-3"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
