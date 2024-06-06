import { View, Text, StyleSheet } from "react-native";
import React from "react";
import TextInputMask from "react-native-mask-input";

type InputProps = {
  placeholder: string;
  mask?: any;
  required?: boolean;
  email?: boolean;
  password?: boolean;
  title: string;
};

const Input = ({...props}: InputProps) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={[styles.subTitle, styles.absoluteText]}>{props.title}</Text>
        <TextInputMask
          style={styles.input}
          placeholder={props.placeholder}
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    borderColor: "#0D62AD",
    borderRadius: 10,
    position: "relative",
  },
  subTitle: {
    fontSize: 17,
    fontFamily: "Montserrat_600SemiBold",
  },
  absoluteText: {
    position: "absolute",
    top: -14,
    paddingHorizontal: 5,
    left: 15,
    fontSize: 17,
    color: "#0D62AD",
    backgroundColor: "#fff",
  },
  input: {
    margin: 12,
    fontFamily: "Montserrat_400Regular",
  },
});

export default Input;
