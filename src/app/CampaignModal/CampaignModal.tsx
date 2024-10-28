import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
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
import CacheImage from "@/components/CacheImage";

const CampaignModal = () => {
  const { campaignId } = useLocalSearchParams();
  const authContext = useAuth();

  const { data: campaignInfo, isLoading } = useFetchCampaignById(
    Array.isArray(campaignId) ? campaignId[0] : campaignId
  );

  const [loading, setLoading] = useState<boolean>(false);

  const makeADonation = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    await authContext.verifyToken();
    if (authContext.authData) {
      setLoading(false);
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
          <View
            style={{
              gap: 12,
              marginTop: 5,
            }}
          >
            <Text style={styles.subtitle}>Instituição</Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
              }}
              onPress={() => {
                router.navigate({
                  pathname: "Institution/Institution",
                  params: {
                    institutionId: campaignInfo.institution.id,
                  },
                });
              }}
            >
              <CacheImage
                source={{
                  uri: campaignInfo.institution.avatar,
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Montserrat_500Medium",
                  overflow: "hidden",
                  width: "90%",
                }}
                numberOfLines={2}
              >
                {campaignInfo.institution.name}
              </Text>
            </TouchableOpacity>
          </View>
          <CampaignInfo
            addressess={campaignInfo.addressess}
            phone={campaignInfo.institution.phone}
          />
        </View>
      </ScrollView>
      <FloatButton text="Doar Agora" onPress={makeADonation} />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
