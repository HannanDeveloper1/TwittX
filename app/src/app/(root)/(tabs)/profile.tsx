import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/state/authStore";
import { images } from "@/constants/image";
import { SafeAreaView } from "react-native-safe-area-context";
import Seperator from "@/components/shared/Seperator";
import { Link, useRouter } from "expo-router";
import ImageViewer from "@/components/shared/ImageViewer";
import { signout } from "@/lib/fetchAPI/auth";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import * as Clipboard from "expo-clipboard";
import Ionicons from "@expo/vector-icons/Ionicons";

function ProfileNav() {
  const { user, logout } = useAuth();

  const router = useRouter();
  const onSignOut = async () => {
    try {
      await signout();
      logout();
      Alert.alert("Logged Out", "Signed out your account successfully");
      router.replace("/(auth)");
    } catch (error) {
      Alert.alert(
        "An error occured",
        "An error occured when trying to signout, please try again later",
        error.message
      );
    }
  };
  return (
    <View className="bg-white flex flex-row items-center justify-between p-5 gap-3">
      <TouchableOpacity activeOpacity={0.4}>
        <AntDesign name="setting" size={26} />
      </TouchableOpacity>
      <View className="flex flex-row items-center gap-3">
        <TouchableOpacity activeOpacity={0.4}>
          <Feather name="edit" size={22} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.4} onPress={onSignOut}>
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

export default function Profile() {
  const { user } = useAuth();

  const [profilePic, setProfilePic] = useState(
    user.profilePicture || images.user
  );
  const [viewerVisible, setViewerVisible] = useState(false);
  const [copyied, setCopyied] = useState(false);

  const copyUsername = async () => {
    await Clipboard.setStringAsync(user.username);
    setCopyied(true);
    setTimeout(() => {
      setCopyied(false);
    }, 800);
  };

  return (
    <>
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerClassName="w-full min-h-full"
          stickyHeaderIndices={[0]}
        >
          <ProfileNav />
          <View className="flex items-center justify-center gap-5 p-5 bg-white">
            <TouchableOpacity
              onPress={() => setViewerVisible(true)}
              activeOpacity={0.8}
            >
              <Image source={profilePic} className="size-32" />
            </TouchableOpacity>
            <View className="flex flex-col items-center gap-1">
              <Text
                className="text-3xl font-medium font-sans text-center"
                numberOfLines={1}
              >
                {user.name}
              </Text>
              <TouchableOpacity
                onPress={copyUsername}
                className="flex flex-row items-center gap-1.5"
                activeOpacity={0.6}
              >
                <Text
                  className="text-center text-gray-700 text-lg"
                  numberOfLines={1}
                >
                  @{user.username}
                </Text>
                {copyied ? (
                  <Ionicons name="checkmark-sharp" size={16} color="#3b82f6" />
                ) : (
                  <Ionicons name="copy-outline" size={16} />
                )}
              </TouchableOpacity>
              {user.bio && (
                <Text
                  className="text-center text-gray-500 text-sm"
                  numberOfLines={2}
                >
                  {user.bio}
                </Text>
              )}
            </View>
            <View>
              <View className="flex flex-row items-center justify-center gap-5">
                <Text className="font-sans">
                  {user.posts?.length || 0} Posts
                </Text>
                <Seperator />
                <Link
                  href={`/profile/${user._id}/followers`}
                  className="font-medium"
                >
                  {user.followers?.length || 0} Followers
                </Link>
                <Seperator />
                <Link
                  href={`/profile/${user._id}/following`}
                  className="font-medium"
                >
                  {user.following?.length || 0} Following
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
        <ImageViewer
          visible={viewerVisible}
          images={(() => {
            if (typeof profilePic === "string") return [{ uri: profilePic }];
            if (profilePic && profilePic.uri) return [profilePic];
            // If images.user is a number (require), convert to uri
            return [{ uri: Image.resolveAssetSource(profilePic).uri }];
          })()}
          initialIndex={0}
          onClose={() => setViewerVisible(false)}
        />
      </SafeAreaView>
    </>
  );
}
