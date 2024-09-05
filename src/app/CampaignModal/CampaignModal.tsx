import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";
import ProgressBar from "@/components/ProgressBar";
import IconText from "@/components/IconText";
import ProgressBarTitle from "@/components/ProgressBarTitle";
import CloseModalButton from "@/components/CloseModalButton";
import FloatButton from "@/components/FloatButton";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { useFetchCampaignById } from "@/hooks/Campaign/useFetchCampaignById";
import { useAuth } from "@/contexts/Auth";
import { theme } from "@/Theme/theme";
import { CampaignById } from "@/@types/app";

const CampaignModal = () => {
  const DATA: CampaignById = {
    id: 1,
    name: "Campanha 1",
    description: "Descrição da campanha 1",
    avatar: "https://picsum.photos/150",
    donated_items_quantity: 10,
    donated_items_objective: 100,
    date: "2021-09-01",
    banner: "https://picsum.photos/500/210",
    necessary_items: [
      {
        id: 1,
        name: "item 1",
        status: "active",
        donated_total: 15,
        quantity_objective: 20,
        quantity: 5,
      },
      {
        id: 2,
        name: "item 2",
        status: "active",
        donated_total: 10,
        quantity_objective: 20,
        quantity: 10,
      },
    ],
    addressess: [
      {
        id: 1,
        street: "Rua 1",
        city: "Cidade 1",
        state: "Estado 1",
        zipcode: "00000-000",
        latitude: 0.0,
        longitude: 0.0,
      },
    ],
    start_date: "2021-09-01",
    end_date: "2021-09-30",
  };

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

  return (
    <View style={{ position: "relative", flex: 1, backgroundColor: "#fff" }}>
      <CloseModalButton />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: DATA.banner }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{ ...styles.container, ...styles.wrapper }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              source={{ uri: DATA.avatar }}
              style={styles.avatar}
              resizeMode="contain"
            />
            <Text style={styles.title}>{DATA.name}</Text>
            {/* <TouchableOpacity
              style={styles.userContainer}
              onPress={() => router.navigate("Institution/Institution")}
            >
              <Image
                source={{ uri: campaignInfo.avatar }}
                style={styles.avatar}
                resizeMode="contain"
              />
              <Text style={styles.username}>{campaignInfo.name}</Text>
            </TouchableOpacity> */}
          </View>

          <View style={{ gap: 4 }}>
            <ProgressBar
              objective={DATA.donated_items_objective}
              donated={DATA.donated_items_quantity}
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
                  {DATA.donated_items_quantity} Doações{" "}
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
              {DATA.description}
            </Text>
          </View>
          <View style={{ gap: 8, width: "80%" }}>
            <Text style={styles.subtitle}>O que doar?</Text>
            {DATA.necessary_items.map((item) => {
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
          <View style={{ gap: 8 }}>
            <Text style={styles.subtitle}>Onde realizar as Doações?</Text>

            <View style={{ gap: 10, marginTop: 4 }}>
              <IconText text="07:00 - 16:30">
                <AntDesign name="clockcircle" size={20} color="#0D62AD" />
              </IconText>

              <IconText text="(21) 99999-9999">
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
                <View style={{ paddingLeft: 8 }}>
                  {DATA.addressess.map((item) => {
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
                campaignInfo: JSON.stringify(DATA),
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
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 4,
    fontFamily: "Montserrat_600SemiBold",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  description: {
    fontSize: 14,
    color: "#595959",
    fontFamily: "Montserrat_500Medium",
    marginVertical: 5,
    textAlign: "justify",
    marginTop: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 7,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#0D62AD",
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
