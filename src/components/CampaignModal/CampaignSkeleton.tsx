import { View, Dimensions } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";
import { theme } from "@/Theme/theme";

const { width } = Dimensions.get("window");

const CampaignSkeleton = () => {
  return (
    <>
      <View
        style={{
          position: "relative",
        }}
      >
        <Skeleton
          colorMode="light"
          colors={theme.skeletonColors}
          width={width}
          height={200}
        />
        <View
          style={{
            position: "absolute",
            bottom: -55,
            left: 12,
          }}
        >
          <Skeleton
            radius="round"
            colors={theme.skeletonColors}
            height={90}
            width={90}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 80,
          paddingHorizontal: 12,
        }}
      >
        <Skeleton colors={theme.skeletonColors} height={22} width={180} />
        <View style={{
          marginTop: 15,
          marginBottom: 15,
        }}>
          <Skeleton colors={theme.skeletonColors} height={12} width={'90%'} />
        </View>
        <View style={{
          marginTop: 25,
          marginBottom: 15,
        }}>
          <Skeleton colors={theme.skeletonColors} height={22} width={150} />
        </View>
        <View style={{
          marginBottom: 15,
        }}>
          <Skeleton colors={theme.skeletonColors} height={12} width={'70%'} />
        </View>
        <View style={{
          marginTop: 25,
          marginBottom: 15,
        }}>
          <Skeleton colors={theme.skeletonColors} height={22} width={150} />
        </View>
        <View style={{
          marginBottom: 15,
        }}>
          <Skeleton colors={theme.skeletonColors} height={12} width={'70%'} />
        </View>
        <View style={{
          marginTop: 25,
          marginBottom: 15,
        }}>
          <Skeleton colors={theme.skeletonColors} height={22} width={150} />
        </View>
        <View style={{
          marginBottom: 15,
        }}>
          <Skeleton colors={theme.skeletonColors} height={140} width={'80%'} />
        </View>
      </View>
    </>
  );
};

export default CampaignSkeleton;
