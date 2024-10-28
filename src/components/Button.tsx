import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import { theme } from "@/Theme/theme";
import { ActivityIndicator } from "react-native";

const Button = ({
  text,
  onPress,
  style,
  textStyle,
  isLoading,
}: {
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  isLoading?: boolean;
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={"#fff"} />
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: theme.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default Button;
