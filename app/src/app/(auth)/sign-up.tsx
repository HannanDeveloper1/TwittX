import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/image";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="w-full min-h-full flex justify-center gap-10 px-6">
        <View className="flex items-center">
          <Image source={images.logo} className="size-20" />
          <Text className="text-6xl font-special text-blue-500">TwittX</Text>
        </View>
        <View className="flex flex-col gap-8">
          <View>
            <Text className="text-4xl font-sans font-bold text-gray-900">
              Get Started,
            </Text>
            <Text className="text-lg font-sans text-gray-800">
              Create your account
            </Text>
          </View>
          <View className="flex flex-col gap-6">
            <View className="flex flex-col gap-2">
              <Text className="text-lg font-sans font-medium">Name</Text>
              <TextInput
                className={`p-4 bg-gray-50 rounded-xl border border-gray-200 font-sans ${
                  focusedInput.name ? "border-blue-500" : ""
                }`}
                placeholder="John Doe"
                autoCorrect={false}
                autoComplete="name"
                autoFocus
                textContentType="name"
                onFocus={() =>
                  setFocusedInput({
                    name: true,
                    password: false,
                    confirmPassword: false,
                    email: false,
                  })
                }
                onBlur={() => setFocusedInput({ ...focusedInput, name: false })}
              />
              <View className="flex flex-col gap-6">
                <View className="flex flex-col gap-2">
                  <Text className="text-lg font-sans font-medium">Email</Text>
                  <TextInput
                    className={`p-4 bg-gray-50 rounded-xl border border-gray-200 font-sans ${
                      focusedInput.email ? "border-blue-500" : ""
                    }`}
                    placeholder="me@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    textContentType="emailAddress"
                    onFocus={() =>
                      setFocusedInput({
                        name: false,
                        password: false,
                        confirmPassword: false,
                        email: true,
                      })
                    }
                    onBlur={() =>
                      setFocusedInput({ ...focusedInput, email: false })
                    }
                  />
                </View>
                <View className="flex flex-col gap-2">
                  <Text className="text-lg font-sans font-medium">
                    Password
                  </Text>
                  <View>
                    <TextInput
                      className={`p-4 bg-gray-50 rounded-xl border border-gray-200 font-sans ${
                        focusedInput.password ? "border-blue-500" : ""
                      }`}
                      placeholder="********"
                      autoComplete="password"
                      secureTextEntry={!showPassword}
                      textContentType="password"
                      onFocus={() =>
                        setFocusedInput({
                          name: false,
                          email: false,
                          password: true,
                          confirmPassword: false,
                        })
                      }
                      onBlur={() =>
                        setFocusedInput({
                          ...focusedInput,
                          password: false,
                        })
                      }
                    />
                    {showPassword ? (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        className="absolute right-4 top-4"
                        onPress={() => setShowPassword(false)}
                      >
                        <Ionicons
                          name="eye-off-outline"
                          size={24}
                          color={"#3b82f6"}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        className="absolute right-4 top-4"
                        onPress={() => setShowPassword(true)}
                      >
                        <Ionicons
                          name="eye-outline"
                          size={24}
                          color={"#3b82f6"}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View className="flex flex-col gap-2">
                  <Text className="text-lg font-sans font-medium">
                    Confirm Password
                  </Text>
                  <TextInput
                    className={`p-4 bg-gray-50 rounded-xl border border-gray-200 font-sans ${
                      focusedInput.confirmPassword ? "border-blue-500" : ""
                    }`}
                    placeholder="********"
                    autoComplete="password"
                    secureTextEntry={!showPassword}
                    textContentType="password"
                    onFocus={() =>
                      setFocusedInput({
                        name: false,
                        email: false,
                        password: false,
                        confirmPassword: true,
                      })
                    }
                    onBlur={() =>
                      setFocusedInput({
                        ...focusedInput,
                        confirmPassword: false,
                      })
                    }
                  />
                </View>
                <View className="mt-4">
                  <TouchableOpacity
                    className="bg-blue-600 p-4 rounded-full w-full flex flex-row items-center gap-2 justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
                    activeOpacity={0.8}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <ActivityIndicator size="small" color="#fff" />
                        <Text className="text-center text-white font-sans font-medium text-lg">
                          Signing Up
                        </Text>
                      </>
                    ) : (
                      <Text className="text-center text-white font-sans font-medium text-lg">
                        Sign Up
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center">
                  <Text className="text-lg font-sans text-gray-800">
                    Already have an account?{" "}
                  </Text>
                  <Link href="/sign-in">
                    <Text className="text-lg font-sans text-blue-600 underline underline-offset-8 font-medium">
                      Sign In
                    </Text>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
