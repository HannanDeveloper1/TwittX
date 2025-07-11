import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/lib/fetchAPI/post";
import ImageViewer from "@/components/shared/ImageViewer";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@/components/shared/Avatar";
import { useAuth } from "@/state/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { z } from "zod";
import { Picker } from "@react-native-picker/picker";

export const createPostSchema = z.object({
  content: z
    .string()
    .max(1000, "Content must be at most 1000 characters")
    .optional(),
  media: z.string().optional(),
  visibility: z.enum(["public", "private", "friends"]).default("public"),
});

export type CreatePostSchemaType = z.infer<typeof createPostSchema>;

function CreatePostNav() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <View className="bg-white p-4 flex flex-row items-center justify-between">
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => router.canGoBack() && router.back()}
      >
        <Ionicons name="arrow-back" size={26} />
      </TouchableOpacity>

      <Text className="font-medium text-xl text-center">Create Post</Text>

      <TouchableOpacity
        className="bg-blue-600 p-2 px-4 rounded-full flex flex-row items-center gap-2 justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
        activeOpacity={0.8}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <ActivityIndicator size="small" color="#fff" />
            <Text className="text-center text-white font-sans font-medium text-lg">
              Posting
            </Text>
          </>
        ) : (
          <Text className="text-center text-white font-sans font-medium text-lg">
            Post
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default function CreatePost() {
  const router = useRouter();
  const { user } = useAuth();

  // State for images
  const [images, setImages] = useState<any[]>([]); // [{ uri, ... }]
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePostSchemaType>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
      media: undefined,
      visibility: "public",
    },
  });

  const visibility = watch("visibility");
  const content = watch("content");

  // Image picking
  async function pickImage(fromCamera = false) {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 10 - images.length,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 10 - images.length,
      });
    }
    if (!result.canceled && result.assets) {
      setImages((prev) => [
        ...prev,
        ...result.assets.slice(0, 10 - prev.length),
      ]);
    }
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  async function onSubmit(data: CreatePostSchemaType) {
    if (!data.content && images.length === 0) {
      alert("Please enter some content or select at least one image.");
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (data.content) formData.append("content", data.content);
      formData.append("visibility", data.visibility);
      images.forEach((img, idx) => {
        formData.append("media", {
          uri: img.uri,
          name: `image${idx}.jpg`,
          type: "image/jpeg",
        } as any);
      });
      await createPost(formData);
      setIsSubmitting(false);
      setImages([]);
      router.replace("/(root)/profile");
    } catch (e) {
      setIsSubmitting(false);
      alert("Failed to create post. Please try again.");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerClassName="w-full min-h-full p-2"
        stickyHeaderIndices={[0]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top nav */}
        <View className="bg-white p-4 flex flex-row items-center justify-between">
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => router.canGoBack() && router.back()}
          >
            <Ionicons name="arrow-back" size={26} />
          </TouchableOpacity>
          <Text className="font-medium text-xl text-center">Create Post</Text>
          <TouchableOpacity
            className="bg-blue-600 p-2 px-4 rounded-full flex flex-row items-center gap-2 justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
            activeOpacity={0.8}
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <>
                <ActivityIndicator size="small" color="#fff" />
                <Text className="text-center text-white font-sans font-medium text-lg">
                  Posting
                </Text>
              </>
            ) : (
              <Text className="text-center text-white font-sans font-medium text-lg">
                Post
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* User info */}
        <TouchableOpacity
          onPress={() => router.replace("/(root)/profile")}
          className="p-2 bg-white flex flex-row items-center gap-3"
        >
          <Avatar size={40} image={user.profilePicture} />
          <View className="flex flex-row items-center gap-1.5">
            <Text className="text-lg font-sans font-medium">{user.name}</Text>
            {user.verified && (
              <Ionicons
                name="checkmark-circle-outline"
                size={19}
                color={"#3b82f6"}
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Content input */}
        <View className="p-2">
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                placeholder="What's on your mind?"
                className="flex-1 font-sans font-medium text-base h-full"
                autoFocus
                autoCorrect
                multiline
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                maxLength={1000}
              />
            )}
          />
          {errors.content && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.content.message}
            </Text>
          )}
        </View>

        {/* Image preview */}
        {images.length > 0 && (
          <ScrollView horizontal className="flex flex-row gap-2 px-2 py-1">
            {images.map((img, idx) => (
              <TouchableOpacity
                key={img.uri}
                onPress={() => {
                  setImageViewerIndex(idx);
                  setIsImageViewerOpen(true);
                }}
                onLongPress={() => removeImage(idx)}
                className="relative mr-2"
              >
                <Image
                  source={{ uri: img.uri }}
                  style={{ width: 80, height: 80, borderRadius: 10 }}
                />
                <View className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5">
                  <Ionicons name="close" size={16} color="#fff" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <ImageViewer
          visible={isImageViewerOpen}
          images={images.map((img) => ({ uri: img.uri }))}
          initialIndex={imageViewerIndex}
          onClose={() => setIsImageViewerOpen(false)}
        />

        {/* Image pickers and visibility */}
        <View className="flex flex-row items-center justify-between gap-6 px-4 py-2">
          <View className="flex flex-row items-center gap-4">
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => pickImage(true)}
            >
              <Ionicons name="camera-outline" size={26} color={"#3b82f6"} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => pickImage(false)}
            >
              <Ionicons name="image-outline" size={25} color={"#3b82f6"} />
            </TouchableOpacity>
          </View>
          <View>
            <Controller
              control={control}
              name="visibility"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  activeOpacity={0.4}
                  className="flex flex-row items-center gap-10"
                  onPress={() => {}}
                >
                  <View className="flex flex-row items-center gap-1.5">
                    <Ionicons
                      name="globe-outline"
                      size={24}
                      color={"#3b82f6"}
                    />
                    <Text className="font-sans font-medium text-blue-500">
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </Text>
                  </View>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    dropdownIconColor={"#3b82f6"}
                  >
                    <Picker.Item label="Public" value="public" />
                    <Picker.Item label="Private" value="private" />
                    <Picker.Item label="Friends" value="friends" />
                  </Picker>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
