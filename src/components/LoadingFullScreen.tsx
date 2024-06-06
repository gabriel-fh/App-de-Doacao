import { theme } from "@/Theme/theme";
import React from "react";
import { ActivityIndicator, View } from "react-native";

function LoadingFullScreen() {
  return (
    <View
      style={{
        zIndex: 999,
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
}

export default LoadingFullScreen;
