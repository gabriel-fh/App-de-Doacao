import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/Theme/theme";

const FormHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
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
      {subtitle && (
        <Text
          style={{
            alignSelf: "center",
            marginTop: 10,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});

export default FormHeader;
