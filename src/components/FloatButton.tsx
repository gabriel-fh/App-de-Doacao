import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const FloatButton = ({ onPress, text }: { onPress: () => void, text: string }) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f1f1f1",
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#0D62AD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  shadow: {
    shadowColor: "#999",
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.54,
    elevation: 10,
  },
});

export default FloatButton;
