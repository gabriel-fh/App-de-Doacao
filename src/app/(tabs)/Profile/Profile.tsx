import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import UserInfos from "@/components/UserInfos";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useAuth } from "@/contexts/Auth";
import { theme } from "@/Theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";

const Profile = () => {
  const authContext = useAuth();

  const profileTabs = [
    {
      icon: <FontAwesome name={"heart"} size={25} color={"#0D62AD"} />,
      title: "Minhas Doações",
      onPress: () => router.navigate("MyDonations/MyDonations"),
    },
    {
      icon: <FontAwesome name={"trophy"} size={27} color={"#0D62AD"} />,
      title: "Conquistas",
      onPress: () => console.log,
    },
    {
      icon: <Ionicons name={"settings"} size={27} color={"#0D62AD"} />,
      title: "Configurações",
      onPress: () => console.log,
    },
    {
      icon: <FontAwesome6 name={"circle-info"} size={25} color={"#0D62AD"} />,
      title: "Sobre",
      onPress: () => console.log,
    },
    {
      icon: <FontAwesome name={"sign-out"} size={30} color={"#f00"} />,
      title: "Sair",
      onPress: authContext.signOut,
    },
  ];

  if (authContext.authData) {
    return (
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 12,
        }}
      >
        <UserInfos data={authContext.authData} />

        <View
          style={{
            marginTop: 20,
          }}
        >
          {profileTabs.map((tab, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.item,
                  idx < profileTabs.length - 1 && {
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
                {idx !== profileTabs.length - 1 && (
                  <FontAwesome name={"angle-right"} size={30} color={"#666"} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 12,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          flex: 1,
        }}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Você não está autenticado!</Text>

          <Image
            source={require("../../../../assets/Mobile-login-amico.png")}
            style={{
              width: 230,
              height: 230,
              alignSelf: "center",
            }}
          />
          <Button
            text={"Entrar"}
            onPress={() => router.navigate("Login/Login")}
          />
          <TouchableOpacity onPress={() => router.navigate("SignUp/SignUp")}>
            <Text
              style={{
                color: theme.primary,
                marginTop: 10,
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  loginContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default Profile;
