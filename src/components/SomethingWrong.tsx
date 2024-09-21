import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CacheImage from "./CacheImage";
import { theme } from "@/Theme/theme";
import Button from "./Button";
import { router } from "expo-router";

const SomethingWrong = () => {
  return (
    <View style={styles.container}>
      <CacheImage
        source={require("../../public/errorImage/somethingwrong.png")}
        style={{
          width: "100%",
          height: 215,
          alignSelf: "center",
        }}
        objectFit="contain"
      />
      <Text style={styles.title}>Ops! Algo deu errado</Text>
      <Text style={styles.caption}>
        Você não quebrou a internet, mas não conseguimos encontrar o que você
        está procurando.
      </Text>
      <View style={{
        marginTop: 20,
        height: 50,
      }}>
        <Button
          text={"Ir para a tela inicial"}
          onPress={() => router.push("/")}
          style={{
            paddingVertical: 10,
          }}
          textStyle={{
            fontSize: 18,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    paddingTop: 40,
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    textAlign: "center",
    color: theme.primary,
    marginTop: 40,
  },
  caption: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    textAlign: "center",
    color: "#595959",
    marginTop: 12,
  },
});

export default SomethingWrong;
