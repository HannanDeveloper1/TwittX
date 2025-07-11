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
  onDelete?: (idx: number) => void;
};

export default function ImageViewer({
  images,
  visible,
  initialIndex = 0,
  onClose,
  showDelete = false,
  onDelete,
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
      transparent={false}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="bg-black/90 flex-1 justify-center items-center">
        <View style={{ position: "absolute", top: 40, right: 24, zIndex: 10 }}>
          <TouchableOpacity
            onPress={onClose}
            className="p-2 bg-black/60 rounded-full"
          >
            <Ionicons name="close-outline" size={28} color="#fff" />
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
              e.nativeEvent.contentOffset.x / Dimensions.get("screen").width
            );
            setCurrentIndex(idx);
          }}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").height * 1,
              }}
              className="bg-transparent flex justify-center items-center"
            >
              <Image
                source={{ uri: item.uri }}
                resizeMode="contain"
                className="self-center rounded-2xl h-[75%] w-[75%]"
              />
            </View>
          )}
        />
        {/* Indicator */}
        {images.length > 1 && (
          <View className="absolute bottom-[92%] left-0 right-0 flex-row justify-center items-center">
            {images.map((_, idx) => (
              <View
                key={idx}
                style={{
                  backgroundColor: idx === currentIndex ? "#fff" : "#888",
                }}
                className="w-2.5 h-2.5 rounded-full mx-1"
              />
            ))}
          </View>
        )}
        {showDelete && onDelete && (
          <View className="absolute bottom-7 left-0 right-0 items-center">
            <TouchableOpacity
              className="border border-red-500 bg-transparent p-3 rounded-full min-w-32 flex-row items-center justify-center"
              activeOpacity={0.7}
              onPress={() => onDelete(currentIndex)}
            >
              <Ionicons name="trash-outline" size={18} color="#ef4444" />
              <Text className="font-sans text-red-500 font-bold text-lg ml-2">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}
