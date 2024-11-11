import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TextInputMask from "react-native-mask-input";
import { theme } from "@/Theme/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

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
          secureTextEntry={props.password && !passwordVisible}
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
        {props.password && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <FontAwesome
              name={!passwordVisible ? "eye" : "eye-slash"}
              size={20}
              color={theme.primary}
            />
          </TouchableOpacity>
        )}
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
    borderColor: theme.primary,
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
    color: theme.primary,
    backgroundColor: "#fff",
  },
  input: {
    margin: 12,
    fontFamily: "Montserrat_400Regular",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    marginTop: 5,
  },
});

export default Input;
