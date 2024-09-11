import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/Theme/theme";

type ProgressBarProps = {
  objective: number;
  donated: number;
  title?: string;
  isCard?: boolean;
};

const ProgressBar = (progressProperty: ProgressBarProps) => {
  const { objective, donated, title, isCard } = progressProperty;

  const percentage =
    (donated / objective) * 100 > 100 ? 100 : (donated / objective) * 100;

  const getStyles = (isCard) => {
    return StyleSheet.create({
      title: isCard
        ? {
            fontSize: 14,
            color: theme.primary,
            fontFamily: "Montserrat_500Medium",
          }
        : {
            fontSize: 14.5,
            fontFamily: "Montserrat_600SemiBold",
          },
    });
  };

  const textStyle = getStyles(isCard);

  return (
    <View style={styles.container}>
      {title && <Text style={textStyle.title}>{title}</Text>}
      <View style={styles.progressContainer}>
        <LinearGradient
          colors={[theme.primary, theme.secondary]}
          style={[styles.progress, { width: `${percentage}%` }]}
        />
      </View>
      {!isCard && (
        <View style={styles.captionContainer}>
          <View style={styles.captionWrapper}>
            <Text style={styles.bold}>
              {donated} {donated > 0 && donated < 2 ? "Doação" : "Doações"}{" "}
            </Text>
            <Text style={styles.text}>
              {donated > 0 && donated < 2 ? "coletada" : "coletadas"}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  title: {
    fontSize: 14.5,
    fontFamily: "Montserrat_600SemiBold",
  },
  progressContainer: {
    backgroundColor: "#e5e5e5",
    width: "100%",
    height: 7,
    borderRadius: 10,
  },
  progress: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: theme.primary,
    height: 7,
    borderRadius: 10,
  },
  captionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  captionWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  bold: {
    fontFamily: "Montserrat_600SemiBold",
    color: theme.primary,
  },
  text: {
    fontFamily: "Montserrat_500Medium",
  },
});

export default ProgressBar;
