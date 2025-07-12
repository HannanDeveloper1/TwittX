import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Avatar from "./Avatar";
import {
  format,
  isToday,
  isYesterday,
  differenceInHours,
  parseISO,
  differenceInMinutes,
} from "date-fns";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ImageViewer from "./ImageViewer";
import { useAuth } from "@/state/authStore";
import { useRouter } from "expo-router";

type Props = {
  post: Post;
  author: User;
};

export default function PostCard({ post, author }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);

  // Format post date
  let postDate =
    typeof post.createdAt === "string"
      ? parseISO(post.createdAt)
      : new Date(post.createdAt);
  let dateLabel = "";
  if (isToday(postDate)) {
    const hours = differenceInHours(new Date(), postDate);
    const minutes = differenceInMinutes(new Date(), postDate);
    dateLabel =
      hours < 1
        ? minutes < 1
          ? "Just now"
          : `${minutes}m ago`
        : `${hours}h ago`;
  } else if (isYesterday(postDate)) {
    dateLabel = "Yesterday";
  } else if (postDate.getFullYear() === new Date().getFullYear()) {
    dateLabel = format(postDate, "MMM d");
  } else {
    dateLabel = format(postDate, "MMM d, yyyy");
  }

  const navigateToProfile = () => {
    if (author._id === user._id) {
      router.push("/(tabs)/profile");
    } else {
      router.push(`/(root)/profile/${author._id}`);
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        className="px-4 py-1 bg-white my-4 gap-1 rounded-lg"
      >
        <View className="flex flex-row items-center justify-between gap-3 py-1 px-1.5">
          <TouchableOpacity
            onPress={navigateToProfile}
            activeOpacity={0.6}
            className="flex items-center flex-row gap-2"
          >
            <Avatar image={author.profilePicture} size={30} />
            <View className="flex flex-col items-start">
              <View className="flex flex-row items-center gap-2">
                <Text className="font-medium text-gray-700 text-lg">
                  {author.name}
                </Text>
                {author.verified && (
                  <SimpleLineIcons name="check" size={16} color="#2563eb" />
                )}
              </View>
              <View className="flex flex-row items-center gap-1">
                <Text className="text-gray-500 text-sm">{dateLabel}</Text>
                {post.privacy === "private" ? (
                  <MaterialIcons
                    name="lock-outline"
                    size={16}
                    color="#6b7280"
                  />
                ) : post.privacy === "friends" ? (
                  <Feather name="users" size={16} color="#6b7280" />
                ) : (
                  <MaterialIcons name="public" size={16} color="#6b7280" />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity activeOpacity={0.6}>
              <Feather name="more-vertical" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-2">
          <Text>{post.content}</Text>
        </View>
        <View className="py-2">
          {post.media && post.media[0] && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setImageViewerIndex(0);
                setIsImageViewerOpen(true);
              }}
            >
              <Image
                source={{ uri: post.media[0] }}
                className="h-72 w-full overflow-hidden"
              />
            </TouchableOpacity>
          )}
        </View>
        <View className="flex flex-row gap-2 items-center justify-between">
          <Text className="text-gray-500 text-sm">
            {post.likes?.length} likes
          </Text>
          <Text className="text-gray-500 text-sm">
            {post.comments?.length} comments
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            className="flex flex-row items-center gap-2 flex-1 w-full justify-center px-2 py-4"
            activeOpacity={0.6}
          >
            <SimpleLineIcons name="like" size={19} color="#6b7280" />
            <Text className="text-gray-600">Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center gap-2 flex-1 w-full justify-center px-2 py-4"
            activeOpacity={0.6}
          >
            <FontAwesome name="comment-o" size={20} color="#6b7280" />
            <Text className="text-gray-600">Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row items-center gap-2 flex-1 w-full justify-center px-2 py-4"
            activeOpacity={0.6}
          >
            <Feather name="share-2" size={20} color="#6b7280" />
            <Text className="text-gray-600">Share</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <ImageViewer
        visible={isImageViewerOpen}
        images={post.media.map((img) => ({ uri: img }))}
        initialIndex={imageViewerIndex}
        onClose={() => setIsImageViewerOpen(false)}
      />
    </>
  );
}
