import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({text, onPress}: {text: string, onPress: () => void}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default Button;
