import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { theme } from "@/Theme/theme";

const IconText = ({
  text,
  children,
  arrow,
  onPress,
}: {
  text: string;
  children: React.ReactNode;
  arrow?: boolean;
  onPress?: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
      }}
    >
      {onPress ? (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
          onPress={onPress}
        >
          <View style={{ minWidth: 30, alignItems: "center" }}>{children}</View>
          <Text
            style={{ fontFamily: "Montserrat_500Medium" }}
            numberOfLines={2}
          >
            {text}
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={{ minWidth: 30, alignItems: "center" }}>{children}</View>
          <Text
            style={{ fontFamily: "Montserrat_500Medium", flex: 1 }}
            numberOfLines={2}
          >
            {text}
          </Text>
        </>
      )}
      {arrow && (
        <AntDesign name={"arrowright"} size={20} color={theme.primary} />
      )}
    </View>
  );
};

export default IconText;
