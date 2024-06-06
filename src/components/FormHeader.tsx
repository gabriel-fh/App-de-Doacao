import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/Theme/theme";

const FormHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 2,
          backgroundColor: theme.primary,
          flex: 1,
        }}
      />
      <Text
        style={{
          fontFamily: "Montserrat_700Bold",
          fontSize: 27,
          color: theme.primary,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          height: 2,
          flex: 1,
          backgroundColor: theme.primary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 40,
  },
});

export default FormHeader;
