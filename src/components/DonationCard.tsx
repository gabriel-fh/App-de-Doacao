import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import CacheImage from "./CacheImage";
import { router } from "expo-router";
import { Donation } from "@/@types/app";

const DonationCard = ({ donation }: { donation: Donation }) => {
  const donationStatus = {
    agended: "Agendada",
    concluded: "Completa",
  };

  const handlePress = () => {
    router.navigate({
      pathname: "DonationDetails/DonationDetails",
      params: {
        donation: JSON.stringify(donation),
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, styles.shadow]}>
        <View
          style={{
            gap: 8,
            flexDirection: "row",
            //   alignItems: "center",
            width: "100%",
          }}
        >
          <CacheImage
            source={{ uri: donation.campaign.avatar }}
            style={styles.img}
            resizeMode="cover"
          />
          <View style={{ gap: 8 }}>
            <Text style={styles.title}>{donation.campaign.name}</Text>
            <Text style={styles.description} numberOfLines={1}>
              {donation.campaign.description}
            </Text>
            <Text style={{ fontFamily: "Montserrat_500Medium" }}>
              Situação:{" "}
              <Text
                style={{
                  fontFamily: "Montserrat_600SemiBold",
                  color: donation.status === "agended" ? "#d18d0f" : "#32CD32",
                }}
              >
                {donationStatus[donation.status]}
              </Text>
            </Text>
            <Text style={{ fontFamily: "Montserrat_500Medium" }}>
              Itens para doação:{" "}
              <Text style={{ fontFamily: "Montserrat_500Medium" }}>
                {donation.items.length}
              </Text>
            </Text>
          </View>
        </View>
        {/* <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: theme.primary,
          marginVertical: 8,
        }}
      /> */}
        {/* <View>
        <TouchableOpacity
          style={{
            padding: 8,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            backgroundColor: "#E2E8F0",
            width: "35%",
            marginTop: 12,
          }}
          onPress={() => router.navigate("DonationDetails/DonationDetails")}
        >
          <Text
            style={{
              color: theme.primary,
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            Ver detalhes
          </Text>
        </TouchableOpacity>
      </View> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 12,
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  description: {
    fontSize: 13,
    width: 210,
    color: "#595959",
    overflow: "hidden",
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

export default DonationCard;
