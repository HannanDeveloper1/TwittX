import {
  View,
  Image,
  ImageSourcePropType,
  Modal,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  image: ImageSourcePropType;
  visible: boolean;
  onClose: () => void;
};

const { width, height } = Dimensions.get("screen");
export default function ImageViewer({ image, visible, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      className="flex-1 bg-black/70 relative"
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
        <View
          className="rounded-2xl"
          style={{
            width: width * 0.9,
            height: height * 0.6,
            justifyContent: "center",
            alignItems: "center",
          }}
          // Prevent closing when pressing the image
          onStartShouldSetResponder={() => true}
        >
          <Image
            source={image}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
            className="rounded-2xl"
          />
        </View>
      </Pressable>
    </Modal>
  );
}
