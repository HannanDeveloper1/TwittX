import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/image";
import { Link, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinUser } from "@/lib/fetchAPI/auth";
import { useAuth } from "@/state/authStore";

export const signinSchema = z.object({
  email: z
    .string({ required_error: "*Email is required" })
    .min(1, "*Email is required")
    .email("Invalid Email"),
  password: z
    .string({ required_error: "*Password is required" })
    .min(1, "*Password is required"),
});
export type SignInSchemaType = z.infer<typeof signinSchema>;
export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    setIsSubmitting(true);
    try {
      const res: ServerResponse = await signinUser(data);
      if (!res.success) {
        Alert.alert("Error", res.message);
      } else {
        login(res.user);
        Alert.alert("Success", res.message);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerClassName="w-full min-h-full flex justify-center gap-10 px-6">
          <View className="flex items-center">
            <Image source={images.logo} className="size-20" />
            <Text className="text-6xl font-special text-blue-500">TwittX</Text>
          </View>
          <View className="flex flex-col gap-8">
            <View>
              <Text className="text-4xl font-sans font-bold text-gray-900">
                Welcome back,
              </Text>
              <Text className="text-lg font-sans text-gray-800">
                Login to your account
              </Text>
            </View>
            <View className="flex flex-col gap-6">
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
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
                      value={value}
                      onChangeText={onChange}
                      onFocus={() =>
                        setFocusedInput({
                          password: false,
                          email: true,
                        })
                      }
                      onBlur={() => {
                        setFocusedInput((prev) => ({ ...prev, email: false }));
                        onBlur();
                      }}
                    />
                    {errors.email && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="flex flex-col gap-2">
                    <Text className="text-lg font-sans font-medium">
                      Password
                    </Text>
                    <View>
                      <TextInput
                        className={`p-4 bg-gray-50 rounded-xl border border-gray-200 font-sans pr-12 ${
                          focusedInput.password ? "border-blue-500" : ""
                        }`}
                        placeholder="********"
                        autoComplete="password"
                        secureTextEntry={!showPassword}
                        textContentType="password"
                        value={value}
                        onChangeText={onChange}
                        onFocus={() =>
                          setFocusedInput({
                            email: false,
                            password: true,
                          })
                        }
                        onBlur={() => {
                          onBlur();
                          setFocusedInput((prev) => ({
                            ...prev,
                            password: false,
                          }));
                        }}
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
                    {errors.password && (
                      <Text className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
            <View className="mt-4">
              <TouchableOpacity
                className="bg-blue-600 p-4 rounded-full w-full flex flex-row items-center gap-2 justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
                activeOpacity={0.8}
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
              >
                {isSubmitting ? (
                  <>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text className="text-center text-white font-sans font-medium text-lg">
                      Signing In
                    </Text>
                  </>
                ) : (
                  <Text className="text-center text-white font-sans font-medium text-lg">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center">
              <Text className="text-lg font-sans text-gray-800">
                Don&apos;t have an account?{" "}
              </Text>
              <Link href="/sign-up">
                <Text className="text-lg font-sans text-blue-600 underline underline-offset-8 font-medium">
                  Sign Up
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
