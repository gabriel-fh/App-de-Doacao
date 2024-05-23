import { View, StyleSheet } from "react-native";
import React from "react";

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
      <View style={[styles.progress, { width: `${percentage}%` }]}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cecece",
    width: "100%",
    height: 7,
    borderRadius: 10,
  },
  progress: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#8e98de",
    height: 7,
    borderRadius: 10,
  },
});

export default ProgressBar;
