import { View, Dimensions } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import { theme } from "@/Theme/theme";

const { width } = Dimensions.get("window");

const SkeletonLine = ({ width, height = 15, marginBottom = 15 }) => (
  <View style={{ marginBottom }}>
    <Skeleton colors={theme.skeletonColors} height={height} width={width} radius="square" />
  </View>
);

const NewsModalSkeleton = () => {
  return (
    <>
      <Skeleton
        colorMode="light"
        colors={theme.skeletonColors}
        width={width}
        height={200}
      />
      <View style={{ marginTop: 50, paddingHorizontal: 12 }}>
        {/* Título do esqueleto */}
        <Skeleton colors={theme.skeletonColors} height={22} width={180} />
        
        <View style={{ marginTop: 35 }}>
          {Array(5).fill(0).map((_, idx, arr) => (
            idx === arr.length - 1 ? (
              <SkeletonLine key={idx} width="100%" height={15} marginBottom={30} />
            ) : (
              <SkeletonLine key={idx} width="100%" height={15} marginBottom={15} />
            )
          ))}

          <SkeletonLine width="100%" height={150} marginBottom={15} />
        </View>
      </View>
    </>
  );
};

export default NewsModalSkeleton;
