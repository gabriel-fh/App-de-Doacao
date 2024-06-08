import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";
import { router } from "expo-router";
import { Campaign } from "@/@types/app";

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const handlePress = () => {
    router.navigate({
      pathname: "CampaignModal/CampaignModal",
      params: {
        campaignId: campaign.id,
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ ...styles.container, ...styles.shadow }}
    >
      <Image
        source={{ uri: campaign.avatar }}
        style={styles.img}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {campaign.name}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {campaign.description}
        </Text>
        <View style={styles.goal}>
          <Text style={styles.current}>
            Meta {campaign.donated_items_quantity} /{" "}
            {campaign.donated_items_objective}
          </Text>
          <ProgressBar
            donated={campaign.donated_items_quantity}
            objective={campaign.donated_items_objective}
          />
        </View>
      </View>
    </TouchableOpacity>
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
    width: "100%",
    flex: 1,
    height: "100%",
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  info: {
    gap: 10,
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  description: {
    fontSize: 13,
    color: "#595959",
    overflow: "hidden",
    fontFamily: "Montserrat_500Medium",
  },
  goal: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  current: {
    fontSize: 14,
    color: "#0D62AD",
    fontFamily: "Montserrat_500Medium",
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
