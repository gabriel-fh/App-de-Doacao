import { theme } from "@/Theme/theme";
import BannerAvatar from "@/components/BannerAvatar";
import CacheImage from "@/components/CacheImage";
import CampaignCard from "@/components/CampaignCard";
import CloseModalButton from "@/components/CloseModalButton";
import IconText from "@/components/IconText";
import InstitutionSkeleton from "@/components/Institution/InstitutionSkeleton";
import LoadingFullScreen from "@/components/LoadingFullScreen";
import SomethingWrong from "@/components/SomethingWrong";
import { useFetchInstitutionById } from "@/hooks/Institutions/useFetchInstitutionById";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";

const Institution = () => {
  const { institutionId } = useLocalSearchParams();

  const { data: institutionInfo, isLoading } = useFetchInstitutionById(
    Array.isArray(institutionId) ? institutionId[0] : institutionId
  );

  return isLoading ? (
    <InstitutionSkeleton />
  ) : institutionInfo ? (
    <>
      <CloseModalButton />
      <ScrollView style={styles.container}>
        <BannerAvatar
          banner={institutionInfo.banner}
          avatar={institutionInfo.avatar}
          name={institutionInfo.name}
        />
        <View style={{ ...styles.container, ...styles.wrapper }}>
          <View>
            <Text style={{ ...styles.description }}>
              {institutionInfo.description}
            </Text>
          </View>
          <View>
            <Text style={styles.subtitle}>Campanhas Ativas</Text>
            <View style={{ marginTop: 10 }}>
              {institutionInfo.campaigns.map((item, idx) => (
                <CampaignCard key={idx} campaign={item} />
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.subtitle}>Contato</Text>
            <View style={{ gap: 12, marginVertical: 10 }}>
              <IconText
                text={institutionInfo.phone
                  .replace("+55", "")
                  .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
              >
                <Foundation name={"telephone"} size={22} color={"#0D62AD"} />
              </IconText>
              <IconText
                text={
                  institutionInfo.address?.street +
                  " - " +
                  institutionInfo.address?.city
                }
              >
                <Entypo name={"location"} size={20} color={"#0D62AD"} />
              </IconText>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
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
    paddingBottom: 20,
  },
  banner: {
    height: 200,
    width: "100%",
  },
  wrapper: {
    paddingHorizontal: 12,
    gap: 15,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
  },
  description: {
    fontSize: 14,
    color: "#595959",
    fontFamily: "Montserrat_500Medium",
    marginBottom: 5,
    textAlign: "justify",
    marginTop: 10,
  },
});

export default Institution;
