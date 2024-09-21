import { Donation } from "@/@types/app";
import BannerAvatar from "@/components/BannerAvatar";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

function DonationDetails() {
  const { donation } = useLocalSearchParams<{ donation: string }>();

  const parsedDonationInfo: Donation = JSON.parse(donation);

  const donationStatus = {
    agended: "Agendada",
    concluded: "Completa",
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          width: "100%",
        },
      ]}
    >
      <BannerAvatar
        banner={parsedDonationInfo.campaign.banner}
        avatar={parsedDonationInfo.campaign.avatar}
        name={parsedDonationInfo.campaign.name}
      />

      <View style={{ gap: 8, paddingHorizontal: 12 }}>
        <Text style={styles.description}>
          {parsedDonationInfo.campaign.description}
        </Text>
        <Text style={{ fontFamily: "Montserrat_500Medium", fontSize: 18 }}>
          Status:{" "}
          <Text
            style={{
              fontFamily: "Montserrat_600SemiBold",
              color:
                parsedDonationInfo.status === "agended" ? "#d18d0f" : "#32CD32",
            }}
          >
            {donationStatus[parsedDonationInfo.status]}
          </Text>
        </Text>
        <View>
          {/* <Text style={{ fontFamily: "Montserrat_600SemiBold", fontSize: 18 }}>
            Data da Doação:{" "} {parsedDonationInfo.campaign.}
          </Text> */}
          <Text style={{ fontFamily: "Montserrat_600SemiBold", fontSize: 18 }}>
            Itens selecionados:{" "}
          </Text>
          {parsedDonationInfo.items.map((item) => {
            return (
              <Text
                style={{ fontFamily: "Montserrat_500Medium" }}
                key={item.id + "donatedItem"}
              >
                {item.quantity} x {item.id}
              </Text>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    // paddingHorizontal: 10,
    // paddingVertical: 12,
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
    width: "100%",
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
export default DonationDetails;
