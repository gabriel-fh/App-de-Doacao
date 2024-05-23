import { View, Image, StyleSheet, Text } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";

const CampaignCard = () => {
  const metaTest = [82, 100];

  return (
    <View style={{...styles.container, ...styles.shadow}}>
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
            Meta {metaTest[0]} / {metaTest[1]}
          </Text>
          <ProgressBar objective={metaTest[1]} donated={metaTest[0]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 12,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  info: {
    gap: 10,
    height: "100%",
    justifyContent: "flex-start",
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  description: {
    fontSize: 12,
    color: "#666",
    overflow: "hidden",
    fontFamily: "Poppins-Medium",
  },
  goal: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  current: {
    fontSize: 14,
    color: "#8e98de",
    fontFamily: "Poppins-SemiBold",
  },
  shadow: {
    backgroundColor: "#fff",
    shadowColor: "#999",
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.54,
    elevation: 10,
  },
});

export default CampaignCard;
