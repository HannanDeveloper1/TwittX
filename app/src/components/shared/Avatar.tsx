import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { images } from "@/constants/image";

type Props = {
  image?: string;
  size: number;
  rounded?: boolean;
};
export default function Avatar({ image, size, rounded = true }: Props) {
  return (
    <View>
      <Image
        source={image ? { uri: image } : images.user}
        style={{
          width: size,
          height: size,
          borderRadius: rounded ? size / 2 : 0,
        }}
      />
    </View>
  );
}
