import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/state/authStore";
import { images } from "@/constants/image";
import { SafeAreaView } from "react-native-safe-area-context";
import Seperator from "@/components/shared/Seperator";
import { Link } from "expo-router";
import ProfileNav from "@/components/layout/ProfileNav";
import ImageViewer from "@/components/shared/ImageViewer";

export default function Profile() {
  const { user } = useAuth();

  const [profilePic, setProfilePic] = useState(
    user.profilePicture || images.user
  );
  const [viewerVisible, setViewerVisible] = useState(false);

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
              <Text
                className="text-center text-gray-700 text-lg"
                numberOfLines={1}
              >
                @{user.username}
              </Text>
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
          images={typeof profilePic === "string" ? profilePic : images.user}
          onClose={() => setViewerVisible(false)}
        />
      </SafeAreaView>
    </>
  );
}
