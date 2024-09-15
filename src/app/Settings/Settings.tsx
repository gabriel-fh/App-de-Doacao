import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "@/Theme/theme";
import { router } from "expo-router";

const Settings = () => {
  const tabs = [
    {
      title: "Termos de uso",
      icon: (
        <FontAwesome5 name={"clipboard-list"} size={25} color={theme.primary} />
      ),
      onPress: () => router.navigate("Terms/Terms"),
    },
    {
      title: "Política de privacidade",
      icon: (
        <MaterialIcons name={"privacy-tip"} size={25} color={theme.primary} />
      ),
      onPress: () => console.log("Política de privacidade"),
    },
    {
      title: "Sobre o app",
      icon: (
        <FontAwesome6 name={"circle-info"} size={25} color={theme.primary} />
      ),
      onPress: () => console,
    },
    {
      title: "Exclur conta",
      icon: (
        <FontAwesome name={"trash"} size={25} color={'#f00'} />
      ),
      onPress: () => console,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, idx) => {
        return (
          <TouchableOpacity
            key={idx}
            style={[
              styles.item,
              idx < tabs.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
              },
            ]}
            onPress={() => tab?.onPress()}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              {tab.icon}
              <Text
                style={{
                  fontFamily: "Montserrat_600SemiBold",
                  fontSize: 16,
                }}
              >
                {tab.title}
              </Text>
            </View>
            <FontAwesome name={"angle-right"} size={30} color={"#666"} />
          </TouchableOpacity>
        );
      })}
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
    alignSelf: "center",
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default Settings;
