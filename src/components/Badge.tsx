import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Badge = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E2E8F0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
});

export default Badge;
