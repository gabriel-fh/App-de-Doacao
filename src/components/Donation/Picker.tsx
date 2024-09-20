import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { theme } from "@/Theme/theme";

const Picker = ({
  title,
  placeholder,
  icon,
  iconSize,
  onPress,
}: {
  title: string;
  placeholder: string;
  icon: string;
  iconSize: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconText}>
        <Text style={{ color: "#666", fontFamily: "Montserrat_500Medium" }}>
          {placeholder}
        </Text>
        <FontAwesome name={icon} size={iconSize} color={theme.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.primary,
    width: 140,
    height: 50,
    borderRadius: 10,
  },
  title: {
    position: "absolute",
    top: -14,
    backgroundColor: "#ffffff",
    paddingHorizontal: 5,
    left: 15,
    fontSize: 17,
    color: theme.primary,
    fontFamily: "Montserrat_600SemiBold",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default Picker;
