import { TouchableOpacity } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

const CloseModalButton = () => {
  const top = useSafeAreaInsets().top;

  const handlePress = () => {
    router.canGoBack() ? router.back() : router.push("/");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 1000,
        width: 30,
        height: 30,
        position: "absolute",
        top: 25,
        right: 15,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Feather name="x" size={20} color="#fff" />
    </TouchableOpacity>
  );
};

export default CloseModalButton;
