import { View, StyleSheet } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import { theme } from "@/Theme/theme";

const MyDonationsSkeleton = () => {
  return (
    <View style={{
      paddingHorizontal: 20,
      paddingVertical: 20,
    }}>
      {[110, 110, 110, 110, 110, 110, 110].map((height, index) => (
        <View key={index} style={styles.skeleton}>
          <Skeleton
            colors={theme.skeletonColors}
            height={height}
            width={"100%"}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    marginTop: 10,
    marginBottom: 15,
  },
});

export default MyDonationsSkeleton;
