import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";
import ProgressBar from "@/components/ProgressBar";
import IconText from "@/components/IconText";
import ProgressBarTitle from "@/components/ProgressBarTitle";
import CloseModalButton from "@/components/CloseModalButton";
import FloatButton from "@/components/FloatButton";
import { StatusBar } from "expo-status-bar";
import PopUp from "@/components/PopUp";
import { router } from "expo-router";
import DonateDetails from "@/components/DonateDetails";

const CampaignModal = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const campaignInfo = {
    name: "Campanha do Agasalho",
    institution: {
      name: "acao.comunitaria.unilasalle",
      image: "https://picsum.photos/20",
    },
  };

  return (
    <View style={{ position: "relative", flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden />

      <CloseModalButton />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: "https://picsum.photos/500/210" }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{ ...styles.container, ...styles.wrapper }}>
          <View>
            <Text style={styles.title}>Campanha do Agasalho</Text>
            <TouchableOpacity
              style={styles.userContainer}
              onPress={() => router.navigate("Institution/Institution")}
            >
              <Image
                source={{ uri: "https://picsum.photos/20" }}
                style={styles.avatar}
                resizeMode="contain"
              />
              <Text style={styles.username}>acao.comunitaria.unilasalle</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 4 }}>
            <ProgressBar objective={700} donated={500} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>
                <Text style={{ color: "#0D62AD" }}>700 Doações </Text>
                Coletadas
              </Text>
              <Text>20 dias atrás</Text>
            </View>
          </View>

          <View>
            <Text style={styles.subtitle}>Descrição</Text>
            <Text style={{ ...styles.text }}>
              Lorem Ipsum simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make.
            </Text>
          </View>
          <View style={{ gap: 4, width: "100%" }}>
            <Text style={styles.subtitle}>O que doar?</Text>
            <ProgressBarTitle />
            <ProgressBarTitle />
            <ProgressBarTitle />
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
              <IconText text="R. Gastão Gonçalves, 79 - Santa Rosa, Niterói - RJ, 24240-030">
                <MaterialIcons name="location-pin" size={30} color="#0D62AD" />
              </IconText>
            </View>
          </View>
        </View>
      </ScrollView>
      <FloatButton
        text="Doar Agora"
        onPress={() => setOpenModal((prev) => !prev)}
      />
      <PopUp
        isVisible={openModal}
        closePopUp={() => setOpenModal((prev) => !prev)}
      >
        <DonateDetails
          campaignInfo={campaignInfo}
          closePopUp={() => setOpenModal((prev) => !prev)}
        />
      </PopUp>
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
    gap: 20,
  },
  title: {
    fontSize: 19,
  },
  subtitle: {
    fontSize: 17,
    marginTop: 4,
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  text: {
    color: "#666",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    height: 21,
    width: 21,
    borderRadius: 50,
  },
  username: {},
});

export default CampaignModal;
