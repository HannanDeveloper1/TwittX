import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import {
  format,
  isToday,
  isYesterday,
  differenceInHours,
  parseISO,
} from "date-fns";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  post: Post;
  author: User;
};

export default function PostCard({ post, author }: Props) {
  // Format post date
  let postDate =
    typeof post.createdAt === "string"
      ? parseISO(post.createdAt)
      : new Date(post.createdAt);
  let dateLabel = "";
  if (isToday(postDate)) {
    const hours = differenceInHours(new Date(), postDate);
    dateLabel = hours < 1 ? "Just now" : `${hours}h ago`;
  } else if (isYesterday(postDate)) {
    dateLabel = "Yesterday";
  } else if (postDate.getFullYear() === new Date().getFullYear()) {
    dateLabel = format(postDate, "MMM d");
  } else {
    dateLabel = format(postDate, "MMM d, yyyy");
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="px-4 py-3 bg-white my-4 gap-1 rounded-lg"
    >
      <View className="flex flex-row items-center justify-between gap-3 py-1 px-1.5">
        <View className="flex items-center flex-row gap-2">
          <Avatar image={author.profilePicture} size={30} />
          <Text className="font-medium text-gray-700 text-lg">
            {author.name}
          </Text>
          <Text className="text-gray-500 text-sm">{dateLabel}</Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.6}>
            <Feather name="more-vertical" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-2">
        <Text>{post.content}</Text>
      </View>
      <View className="p-2">
        {post.media && post.media[0] && (
          <Image
            source={{ uri: post.media[0] }}
            className="h-72 w-full overflow-hidden"
          />
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
          className="flex flex-row items-center gap-2 flex-1 w-full justify-center p-2"
          activeOpacity={0.6}
        >
          <SimpleLineIcons name="like" size={19} color="#6b7280" />
          <Text className="text-gray-600">Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center gap-2 flex-1 w-full justify-center p-2"
          activeOpacity={0.6}
        >
          <FontAwesome name="comment-o" size={20} color="#6b7280" />
          <Text className="text-gray-600">Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center gap-2 flex-1 w-full justify-center p-2"
          activeOpacity={0.6}
        >
          <Feather name="share-2" size={20} color="#6b7280" />
          <Text className="text-gray-600">Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
