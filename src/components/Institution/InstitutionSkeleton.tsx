import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";
import { theme } from "@/Theme/theme";

const { width } = Dimensions.get("window");

const InstitutionSkeleton = () => {
  return (
    <>
      <View style={styles.container}>
        <Skeleton
          colorMode="light"
          colors={theme.skeletonColors}
          width={width}
          height={200}
        />
        <View style={styles.roundSkeletonWrapper}>
          <Skeleton
            radius="round"
            colors={theme.skeletonColors}
            height={90}
            width={90}
          />
        </View>
      </View>

      <View style={styles.skeletonBlockWrapper}>
        <Skeleton colors={theme.skeletonColors} height={22} width={180} />

        <View style={styles.skeleton}>
          <Skeleton colors={theme.skeletonColors} height={120} width={"100%"} />
        </View>

        <View style={styles.skeleton}>
          <Skeleton colors={theme.skeletonColors} height={22} width={180} />
        </View>

        {[140, 140, 140].map((height, index) => (
          <View key={index} style={styles.skeleton}>
            <Skeleton
              colors={theme.skeletonColors}
              height={height}
              width={"100%"}
            />
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  roundSkeletonWrapper: {
    position: "absolute",
    bottom: -55,
    left: 15,
  },
  skeletonBlockWrapper: {
    marginTop: 80,
    paddingHorizontal: 12,
  },
  skeleton: {
    marginTop: 20,
    marginBottom: 15,
  },
});

export default InstitutionSkeleton;
