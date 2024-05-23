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
      <View style={styles.progress}>
        <View
          style={[styles.secondProgress, { width: `${percentage}%` }]}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#cecece",
    width: "100%",
    height: 7,
    borderRadius: 10,
  },
  progress: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#8e98de",
    width: "100%",
    height: 7,
    borderRadius: 10,
  },
  secondProgress: {
    backgroundColor: "#b7bded",
    height: 3,
    borderRadius: 10,
  },
});

export default ProgressBar;
