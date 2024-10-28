import { useAuth } from "@/contexts/Auth";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Settings = () => {

  const authData = useAuth();

  const tabs = [
    {
      title: "Exclur conta",
      icon: <FontAwesome name={"trash"} size={25} color={"#f00"} />,
      onPress: () =>
        Alert.alert(
          "Tem certeza que deseja excluir sua conta?",
          "Ao proseguir seus dados serão excluidos dentro de 30 dias",
          [
            {
              text: "Cancelar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => authData.signOut() },
          ]
        ),
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
    paddingHorizontal: 20,
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
