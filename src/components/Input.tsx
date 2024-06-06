import { View, Text, StyleSheet } from "react-native";
import React from "react";
import TextInputMask from "react-native-mask-input";
import { theme } from "@/Theme/theme";

type InputProps = {
  title: string;
  value: string;
  placeholder: string;
  mask?: any;
  required?: boolean;
  email?: boolean;
  password?: boolean;
  errorMessage?: string;
  onBlur?: () => void;
  onChangeText: (masked: string, unmasked: string) => void;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
};

const Input = ({ ...props }: InputProps) => {
  const handleChange = (masked: string, unmasked: string) => {
    if (props.onChangeText) {
      props.onChangeText(masked, unmasked);
    }
    if (props.setValue) {
      props.setValue(masked);
    }
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={[styles.subTitle, styles.absoluteText]}>
          {props.title}
        </Text>
        <TextInputMask
          style={styles.input}
          placeholder={props.placeholder}
          placeholderTextColor="#999"
          value={props.value}
          onChangeText={handleChange}
          mask={props.mask}
          selectionColor={theme.primary}
          autoCapitalize={props.email ? "none" : "sentences"}
          autoCorrect={false}
        />
      </View>
      {props.errorMessage && (
        <Text style={styles.error}>{props.errorMessage}</Text>
      )}
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
  error: {
    color: "red",
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    marginTop: 5,
  },
});

export default Input;
