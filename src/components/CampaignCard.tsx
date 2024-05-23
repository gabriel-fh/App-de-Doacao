import { View, Image, StyleSheet, Text } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";
const CampaignCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={styles.img}
      />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          Campanha do Agasalho
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          Nesta campanha nosso foco é arrecadar roupas de frio para ajudar n
          inverno sombrio{" "}
        </Text>
        <View style={styles.goal}>
          <Text style={styles.current}>Meta 82/100</Text>
          <ProgressBar />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5fcff",
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 10,
    width: "100%",
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  info: {
    gap: 10,
    height: "100%",
    width: "64%",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    color: "#666",
    overflow: "hidden",
  },
  goal: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  current: {
    fontSize: 14,
    color: "#8e98de",
    fontWeight: "500",
  },
});

export default CampaignCard;
