import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/Theme/theme";

const Badge = ({ text, selected }: { text: string; selected: boolean }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: selected ? theme.primary : "#E2E8F0" },
      ]}
    >
      <Text
        style={{
          color: selected ? "#fff" : "#000",
          fontFamily: "Montserrat_500Medium",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
});

export default Badge;
