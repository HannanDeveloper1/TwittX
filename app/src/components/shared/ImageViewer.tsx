import {
  View,
  Image,
  Modal,
  Dimensions,
  Pressable,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import React, { useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type ImageType = { uri: string };
type Props = {
  images: ImageType[];
  visible: boolean;
  initialIndex?: number;
  onClose: () => void;
  showDelete?: boolean;
};

const { width, height } = Dimensions.get("screen");

export default function ImageViewer({
  images,
  visible,
  initialIndex = 0,
  onClose,
  showDelete = false,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList>(null);

  React.useEffect(() => {
    if (visible && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
        setCurrentIndex(initialIndex);
      }, 10);
    }
  }, [visible, initialIndex]);

  if (!images || images.length === 0) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      className="flex items-center justify-center"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        className="flex-1 bg-black/80 justify-center items-center"
        onPress={onClose}
      >
        <View className="absolute top-8 right-6 z-10">
          <TouchableOpacity
            onPress={onClose}
            className="p-2 bg-black/60 rounded-full"
          >
            <Ionicons name="close-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          initialScrollIndex={initialIndex}
          onMomentumScrollEnd={(e) => {
            const idx = Math.round(
              e.nativeEvent.contentOffset.x / (width * 0.9)
            );
            setCurrentIndex(idx);
          }}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View
              className="rounded-2xl justify-center items-center"
              style={{
                width: width * 0.9,
                height: height * 0.6,
              }}
              onStartShouldSetResponder={() => true}
            >
              <Image
                source={{ uri: item.uri }}
                style={{ width: "100%", height: "100%", borderRadius: 16 }}
                resizeMode="contain"
              />
            </View>
          )}
        />
        {/* Indicator */}
        {images.length > 1 && (
          <View className="absolute bottom-10 left-0 right-0 flex flex-row justify-center items-center gap-1">
            {images.map((_, idx) => (
              <View
                key={idx}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 2,
                  backgroundColor: idx === currentIndex ? "#fff" : "#888",
                }}
              />
            ))}
          </View>
        )}
      </Pressable>

      <View>
        <TouchableOpacity
          className="border border-white bg-none p-4 rounded-full w-full flex flex-row items-center gap-2 justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="basket-outline" size={22} color="#fff" />
          <Text className="text-center text-white font-medium text-lg">
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
