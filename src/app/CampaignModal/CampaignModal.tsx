import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";
import ProgressBar from "@/components/ProgressBar";
import IconText from "@/components/IconText";
import ProgressBarTitle from "@/components/ProgressBarTitle";
import CloseModalButton from "@/components/CloseModalButton";

const CampaignModal = () => {
  return (
    <View style={{ position: "relative", flex: 1 }}>
      <CloseModalButton />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: "https://picsum.photos/500/210" }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{ ...styles.container, ...styles.wrapper }}>
          <Text style={styles.title}>Campanha do Agasalho</Text>

          <View style={{ gap: 4 }}>
            <ProgressBar objective={700} donated={500} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>
                <Text style={{ color: "#0D62AD", fontFamily: "Poppins-Bold" }}>
                  700 Doações{" "}
                </Text>
                Coletadas
              </Text>
              <Text>20 dias atrás</Text>
            </View>
          </View>

          <View>
            <Text style={styles.subtitle}>Descrição</Text>
            <Text style={{ ...styles.text, fontFamily: "Poppins-Regular" }}>
              Lorem Ipsum simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make.
            </Text>
          </View>

          <View style={{ gap: 4 }}>
            <Text style={styles.subtitle}>Onde realizar as Doações?</Text>

            <IconText text="07:00 - 16:30">
              <AntDesign name="clockcircle" size={20} color="#0D62AD" />
            </IconText>

            <IconText text="R. Gastão Gonçalves, 79 - Santa Rosa, Niterói - RJ, 24240-030">
              <MaterialIcons name="location-pin" size={28} color="#0D62AD" />
            </IconText>

            <IconText text="(21) 99999-9999">
              <Foundation name="telephone" size={28} color="#0D62AD" />
            </IconText>
          </View>

          <View style={{ gap: 4, width: "55%" }}>
            <Text style={styles.subtitle}>Oque doar?</Text>

            <ProgressBarTitle />
            <ProgressBarTitle />
            <ProgressBarTitle />
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
  image: {
    height: 200,
    width: "100%",
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 10,
  },
  title: {
    fontSize: 19,
    fontFamily: "Poppins-SemiBold",
  },
  subtitle: {
    fontSize: 17,
    fontFamily: "Poppins-Medium",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  text: {
    fontFamily: "Poppins-Medium",
    color: "#666",
  },
});

export default CampaignModal;
