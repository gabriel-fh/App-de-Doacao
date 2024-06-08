import { theme } from "@/Theme/theme";
import CampaignCard from "@/components/CampaignCard";
import CloseModalButton from "@/components/CloseModalButton";
import IconText from "@/components/IconText";
import LoadingFullScreen from "@/components/LoadingFullScreen";
import { useFetchInstitutionById } from "@/hooks/Institutions/useFetchInstitutionById";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";

const Institution = () => {
  const { institutionId } = useLocalSearchParams();

  const { data: institutionInfo, isLoading } = useFetchInstitutionById(
    Array.isArray(institutionId) ? institutionId[0] : institutionId
  );

  if (isLoading) {
    return <LoadingFullScreen />;
  }

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <CloseModalButton />

      <ScrollView style={styles.container}>
        {institutionInfo.banner && (
          <Image
            source={{ uri: institutionInfo.banner }}
            style={styles.banner}
            resizeMode="cover"
          />
        )}
        <View style={{ ...styles.container, ...styles.wrapper }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <LinearGradient
              colors={[theme.acaoUni.blue, theme.acaoUni.red]}
              style={styles.imageBorder}
            >
              <Image
                source={{ uri: institutionInfo.avatar }}
                style={styles.image}
              />
            </LinearGradient>

            <Text
              style={styles.title}
              children={"Ação Comunitária - Unilasalle RJ"}
              numberOfLines={2}
            />
          </View>

          <View style={{ gap: 12, marginVertical: 10 }}>
            <IconText
              text={
                institutionInfo.address?.street +
                " - " +
                institutionInfo.address?.city
              }
            >
              <Entypo name={"location"} size={20} color={"#0D62AD"} />
            </IconText>

            <IconText
              text={institutionInfo.phone
                .replace("+55", "")
                .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
            >
              <Foundation name={"telephone"} size={22} color={"#0D62AD"} />
            </IconText>
          </View>
          <View>
            <Text style={styles.subtitle}>Descrição</Text>
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: 200,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10000,
  },
  imageBorder: {
    width: 60,
    height: 60,
    borderRadius: 10000,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    overflow: "hidden",
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    flex: 1,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
  },
  description: {
    fontSize: 14,
    color: "#595959",
    fontFamily: "Montserrat_500Medium",
    marginVertical: 5,
    textAlign: "justify",
    marginTop: 10,
  },
});

export default Institution;
