import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import { theme } from "@/Theme/theme";

const { width } = Dimensions.get("window");

const SkeletonBlock = ({ height }) => (
  <View style={styles.skeletonBlock}>
    <Skeleton colors={theme.skeletonColors} width={"100%"} height={height} />
  </View>
);

const CampaingScreenSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton colors={theme.skeletonColors} width={"100%"} height={45} />
      
      {Array(6).fill(0).map((_, index) => (
        <SkeletonBlock key={index} height={140} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: 20,
  },
  skeletonBlock: {
    marginTop: 20,
    marginBottom: 15,
  },
});

export default CampaingScreenSkeleton;
