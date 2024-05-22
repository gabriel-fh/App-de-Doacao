import { View, StyleSheet } from "react-native";
import React from "react";

const ProgressBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <View style={styles.secondProgress}></View>
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
    width: "90%",
    height: 3,
    borderRadius: 10,
  },
});

export default ProgressBar;
