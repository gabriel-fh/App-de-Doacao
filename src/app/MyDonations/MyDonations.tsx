import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { useFetchDonation } from "@/hooks/Donation/useFetchDonation";
import DonationCard from "@/components/DonationCard";
import Button from "@/components/Button";
import { router } from "expo-router";
import CacheImage from "@/components/CacheImage";
import MyDonationsSkeleton from "@/components/MyDonations/MyDonationsSkeleton";

const MyDonations = () => {
  const { data: donations, isLoading } = useFetchDonation();

  if (isLoading) {
    return <MyDonationsSkeleton />;
  }

  if (!isLoading && donations?.length === 0) {
    return (
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
          <CacheImage
            source={require("assets/Charity-rafiki.png")}
            style={{
              width: 230,
              height: 230,
              alignSelf: "center",
            }}
          />
          <Button
            text="Doar agora"
            onPress={() => router.navigate("Campaign/Campaign")}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {
        <View style={{ gap: 10, flex: 1 }}>
          {donations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
            />
          ))}
        </View>
      }
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
