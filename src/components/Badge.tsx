import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Badge = ({ text, selected }: { text: string; selected: boolean }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: selected ? "#0D62AD" : "#E2E8F0" },
      ]}
    >
      <Text style={{ color: selected ? "#E2E8F0" : "#000" }}>{text}</Text>
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
