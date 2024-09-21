import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import ProgressBar from "@/components/ProgressBar";
import CloseModalButton from "@/components/CloseModalButton";
import FloatButton from "@/components/FloatButton";
import { router, useLocalSearchParams } from "expo-router";
import { useFetchCampaignById } from "@/hooks/Campaign/useFetchCampaignById";
import { useAuth } from "@/contexts/Auth";
import BannerAvatar from "@/components/BannerAvatar";
import CampaignInfo from "@/components/CampaignModal/CampaignInfo";
import CampaignSkeleton from "@/components/CampaignModal/CampaignSkeleton";
import SomethingWrong from "@/components/SomethingWrong";

const CampaignModal = () => {
  const { campaignId } = useLocalSearchParams();
  const authContext = useAuth();

  const { data: campaignInfo, isLoading } = useFetchCampaignById(
    Array.isArray(campaignId) ? campaignId[0] : campaignId
  );

  console.log(campaignInfo)

  const makeADonation = () => {
    if (authContext.authData) {
      router.navigate({
        pathname: "Donation/Donation",
        params: {
          campaignInfo: JSON.stringify(campaignInfo),
        },
      });
    } else {
      router.navigate("Login/Login");
    }
  };

  return isLoading ? (
    <CampaignSkeleton />
  ) : campaignInfo ? (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CloseModalButton />
      <ScrollView style={styles.container}>
        <BannerAvatar
          banner={campaignInfo.banner}
          avatar={campaignInfo.avatar}
          name={campaignInfo.name}
        />
        <View style={{ ...styles.container, ...styles.wrapper }}>
          <ProgressBar
            objective={campaignInfo.donated_items_objective}
            donated={campaignInfo.donated_items_quantity}
          />

          <View>
            <Text style={styles.subtitle}>Descrição</Text>
            <Text style={styles.description}>{campaignInfo.description}</Text>
          </View>

          <View style={{ gap: 12, width: "80%" }}>
            <Text style={styles.subtitle}>O que doar?</Text>
            {campaignInfo.necessary_items.map((item) => (
              <ProgressBar
                key={item.id}
                title={item.name}
                objective={item.quantity_objective}
                donated={item.donated_total}
              />
            ))}
          </View>
          <CampaignInfo addressess={campaignInfo.addressess} />
        </View>
      </ScrollView>
      <FloatButton text="Doar Agora" onPress={makeADonation} />
    </View>
  ) : (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <SomethingWrong />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    position: "relative",
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 15,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 4,
    fontFamily: "Montserrat_600SemiBold",
  },
  description: {
    fontSize: 14,
    color: "#595959",
    fontFamily: "Montserrat_500Medium",
    marginTop: 5,
    textAlign: "justify",
  },
});

export default CampaignModal;
