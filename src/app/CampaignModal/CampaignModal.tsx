import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";
import ProgressBar from "@/components/ProgressBar";
import IconText from "@/components/IconText";
import ProgressBarTitle from "@/components/ProgressBarTitle";
import CloseModalButton from "@/components/CloseModalButton";
import FloatButton from "@/components/FloatButton";
import { router, useLocalSearchParams } from "expo-router";
import { useFetchCampaignById } from "@/hooks/Campaign/useFetchCampaignById";
import { useAuth } from "@/contexts/Auth";
import { theme } from "@/Theme/theme";
import CacheImage from "@/components/CacheImage";
import BannerAvatar from "@/components/CapaingModalComponents/BannerAvatar";

const CampaignModal = () => {
  const { campaignId } = useLocalSearchParams();
  const authContext = useAuth();

  const { data: campaignInfo, isLoading } = useFetchCampaignById(
    Array.isArray(campaignId) ? campaignId[0] : campaignId
  );

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const openTelephone = () => {
    Linking.openURL(`tel: (21) 99999-9999`);
  };

  return (
    <View style={{ position: "relative", flex: 1, backgroundColor: "#fff" }}>
      <CloseModalButton />
      <ScrollView style={styles.container}>
        <BannerAvatar
          banner={campaignInfo.banner}
          avatar={campaignInfo.avatar}
          name={campaignInfo.name}
        />
        <View style={{ ...styles.container, ...styles.wrapper }}>
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={styles.title}>{DATA.name}</Text>
            <TouchableOpacity
              style={styles.userContainer}
              onPress={() => router.navigate("Institution/Institution")}
            >
              <CacheImage
                source={{ uri: campaignInfo.avatar }}
                style={styles.avatar}
                resizeMode="contain"
              />
              <Text style={styles.username}>{campaignInfo.name}</Text>
            </TouchableOpacity>
          </View> */}

          <View style={{ gap: 4 }}>
            <ProgressBar
              objective={campaignInfo.donated_items_objective}
              donated={campaignInfo.donated_items_quantity}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: 2,
                }}
              >
                <Text
                  style={{
                    color: "#0D62AD",
                    fontFamily: "Montserrat_600SemiBold",
                  }}
                >
                  {campaignInfo.donated_items_quantity} Doações{" "}
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat_500Medium",
                  }}
                >
                  Coletadas
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.subtitle}>Descrição</Text>
            <Text style={{ ...styles.description }}>
              {campaignInfo.description}
            </Text>
          </View>
          <View style={{ gap: 12, width: "80%", marginTop: -9 }}>
            <Text style={styles.subtitle}>O que doar?</Text>
            {campaignInfo.necessary_items.map((item) => {
              return (
                <ProgressBarTitle
                  key={item.id}
                  title={item.name}
                  objective={item.quantity_objective}
                  donated={item.donated_total}
                />
              );
            })}
          </View>
          <View style={{ gap: 12, marginTop: 9 }}>
            <Text style={styles.subtitle}>Onde realizar as Doações?</Text>

            <View style={{ gap: 16, marginTop: 6 }}>
              <IconText text="07:00 - 16:30">
                <AntDesign name="clockcircle" size={20} color="#0D62AD" />
              </IconText>

              <IconText text="(21) 99999-9999" onPress={openTelephone}>
                <Foundation name="telephone" size={28} color="#0D62AD" />
              </IconText>

              <View>
                <IconText text="Endereços de entrega" arrow>
                  <MaterialIcons
                    name="location-pin"
                    size={30}
                    color="#0D62AD"
                  />
                </IconText>
                <View style={{ paddingLeft: 8, marginTop: 10 }}>
                  {campaignInfo.addressess.map((item) => {
                    return (
                      <Text style={styles.addressess} key={item.id}>
                        {item.street} - {item.city}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <FloatButton
        text="Doar Agora"
        onPress={() => {
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
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    position: "relative",
  },
  image: {
    height: 200,
    width: "100%",
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 15,
  },
  textImage: {
    // position: "absolute",
    // top: 120,
    left: 0,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
    marginTop: 70,
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
    // backgroundColor: 'red'
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 7,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
    position: "absolute",
    top: -35,
    left: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  addressess: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    color: "#595959",
  },
});

export default CampaignModal;
