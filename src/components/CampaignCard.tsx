import { View, Image, StyleSheet, Text } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";

const CampaignCard = () => {
  const metaTest = [82, 100];

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://picsum.photos/150" }} style={styles.img} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          Campanha do Agasalho
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          Nesta campanha nosso foco é arrecadar roupas de frio para ajudar n
          inverno sombrio{" "}
        </Text>
        <View style={styles.goal}>
          <Text style={styles.current}>
            Meta {metaTest[0]} {metaTest[1]}
          </Text>
          <ProgressBar objective={metaTest[1]} donated={metaTest[0]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    marginBottom: 12,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  info: {
    gap: 10,
    height: "100%",
    justifyContent: "flex-start",
    flex: 1,
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
