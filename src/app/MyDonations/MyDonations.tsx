import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useFetchDonation } from "@/hooks/Donation/useFetchDonation";
import DonationCard from "@/components/DonationCard";

const MyDonations = () => {
  const { data: donations, isLoading } = useFetchDonation();

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : donations?.length > 0 ? (
        <View style={{gap: 10, flex: 1}}>
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
        <Text>Você não possui doações</Text>
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
});

export default MyDonations;
