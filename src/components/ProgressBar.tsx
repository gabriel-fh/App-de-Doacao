import { View, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/Theme/theme";

const ProgressBar = ({
  objective,
  donated,
}: {
  objective: number;
  donated: number;
}) => {
  const percentage =
    (donated / objective) * 100 > 100 ? 100 : (donated / objective) * 100;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.primary, theme.secondary]}
        style={[styles.progress, { width: `${percentage}%` }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    width: "100%",
    height: 7,
    borderRadius: 10,
  },
  progress: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#0D62AD",
    height: 7,
    borderRadius: 10,
  },
});

export default ProgressBar;
