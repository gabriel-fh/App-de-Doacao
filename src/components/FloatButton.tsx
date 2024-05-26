import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Button from "./Button";

const FloatButton = ({ onPress, text }: { onPress: () => void, text: string }) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <Button text={text} onPress={onPress}/>
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
