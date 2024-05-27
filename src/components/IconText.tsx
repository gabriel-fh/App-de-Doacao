import { View, Text } from "react-native";
import React from "react";

const IconText = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
      }}
    >
      <View style={{ minWidth: 30, alignItems: "center" }}>{children}</View>
      <Text
        style={{ width: "80%", fontFamily: "Montserrat_500Medium"}}
        numberOfLines={2}
      >
        {text}
      </Text>
    </View>
  );
};

export default IconText;