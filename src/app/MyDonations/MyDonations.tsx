import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { useFetchDonation } from "@/hooks/Donation/useFetchDonation";
import DonationCard from "@/components/DonationCard";
import Button from "@/components/Button";
import { router } from "expo-router";

const MyDonations = () => {
  const { data: donations, isLoading } = useFetchDonation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={donations?.length < 0 && styles.center}
    >
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : donations?.length > 0 ? (
        <View style={{ gap: 10, flex: 1 }}>
          {donations.map((donation) => (
            <DonationCard
              key={donation.id}
              status={donation.status}
              title={donation.campaign.name}
              donatedItems={donation.items.length}
              image={donation.campaign.avatar}
              description={donation.campaign.description}
            />
          ))}
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <View style={styles.wrapper}>
            <Text style={styles.title}>Você não possui doações</Text>
            <Image
              source={require("assets/Charity-rafiki.png")}
              style={{
                width: 230,
                height: 230,
                alignSelf: "center",
              }}
            />
            <Button text="Doar agora" onPress={() => router.navigate("Campaign/Campaign")}/>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  wrapper: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default MyDonations;
