import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "@/constants/image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
export default function Index() {
  const router = useRouter();
  return (
    <>
      <SafeAreaView className="flex-1">
        <ScrollView className="w-full min-h-full">
          <View className="min-h-full w-full">
            <LinearGradient
              colors={["#2563eb", "#1d4ed8"]}
              className="flex-1 -z-10 absolute w-full h-full top-0 left-0 right-0 bottom-0"
            />
            <View className="flex-1 flex flex-col items-center justify-between py-12 px-4">
              <View className="flex flex-col items-center gap-6">
                <Text className="text-center text-4xl font-sans text-white font-medium">
                  Welcome to,
                </Text>
                <View className="flex flex-row items-center justify-center gap-4">
                  <Image
                    source={images.logo}
                    className="size-20"
                    tintColor={"#fff"}
                  />
                  <Text className="text-6xl font-special text-white">
                    TwittX
                  </Text>
                </View>
              </View>
              <View>
                <Image source={images.auth2} className="size-[28rem]" />
              </View>
              <View className="w-full">
                <TouchableOpacity
                  className="bg-white p-4 rounded-full w-full flex flex-row items-center gap-2 justify-center"
                  activeOpacity={0.8}
                  onPress={() => {
                    router.push("/(auth)/sign-in");
                  }}
                >
                  <Text className="text-center text-blue-600 font-medium text-lg">
                    Get Started
                  </Text>
                  <Ionicons name="arrow-forward" size={22} color="#2563eb" />
                </TouchableOpacity>
                <View className="flex flex-row items-center gap-2 relative justify-center my-4">
                  <Text className="text-center text-white font-medium bg-blue-600 px-2 py-1 rounded-lg">
                    OR
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    className="border border-white bg-none p-4 rounded-full w-full flex flex-row items-center gap-2 justify-center"
                    activeOpacity={0.8}
                  >
                    <Ionicons name="logo-google" size={22} color="#fff" />
                    <Text className="text-center text-white font-medium text-lg">
                      Continue with Google
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        translucent
        animated
        backgroundColor="#2563eb"
      />
    </>
  );
}
