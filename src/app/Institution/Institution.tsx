import CampaignCard from "@/components/CampaignCard";
import React from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";

const Institution = () => {
  return (
    <>
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: "https://picsum.photos/500/210" }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{ ...styles.container, ...styles.wrapper }}>
          <Text
            style={styles.title}
            children={"Ação Comunitária - Unilasalle RJ"}
          />
          <View style={styles.iconText}>
            <Entypo name={"location"} size={20} />
            <Text style={styles.text}>Niterói, Rio de Janeiro</Text>
          </View>
          <View style={styles.iconText}>
            <Foundation name={"telephone"} size={22} />
            <Text style={styles.text}>(21) 99999-9999</Text>
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
          <View>
            <Text style={styles.subtitle}>Campanhas Ativas</Text>
            <View style={{marginTop: 10}}>
              {Array.from({ length: 3 }).map((_, idx) => (
                <CampaignCard key={idx} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
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

export default Institution;
