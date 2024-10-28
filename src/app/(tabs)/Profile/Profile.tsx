import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import UserInfos from "@/components/UserInfos";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { useAuth } from "@/contexts/Auth";
import { theme } from "@/Theme/theme";
import Button from "@/components/Button";
import CacheImage from "@/components/CacheImage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ActionButton from "@/components/Profile/ActionButton";

const Profile = () => {
  const authContext = useAuth();

  const profileTabs = [
    {
      icon: <FontAwesome name={"heart"} size={25} color={theme.primary} />,
      title: "Minhas Doações",
      onPress: () => router.navigate("MyDonations/MyDonations"),
    },
    // {
    //   icon: <FontAwesome name={"trophy"} size={27} color={theme.primary} />,
    //   title: "Conquistas",
    //   onPress: () => console.log,
    // },
    // {
    //   title: "Termos de uso",
    //   icon: (
    //     <FontAwesome5 name={"clipboard-list"} size={25} color={theme.primary} />
    //   ),
    //   onPress: () => router.navigate("Terms/Terms"),
    // },
    {
      title: "Política de privacidade",
      icon: (
        <MaterialIcons name={"privacy-tip"} size={25} color={theme.primary} />
      ),
      onPress: () => router.navigate("PrivacyPolicy/PrivacyPolicy"),
    },
    // {
    //   title: "Sobre o app",
    //   icon: (
    //     <FontAwesome6 name={"circle-info"} size={25} color={theme.primary} />
    //   ),
    //   onPress: () => router.navigate("About/About"),
    // },
    {
      icon: <Ionicons name={"settings"} size={27} color={theme.primary} />,
      title: "Configurações",
      onPress: () => router.navigate("Settings/Settings"),
    },
    {
      icon: <FontAwesome name={"sign-out"} size={30} color={"#f00"} />,
      title: "Sair",
      onPress: () => authContext.signOut(),
    },
  ];

  if (authContext.authData) {
    return (
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <UserInfos data={authContext.authData} />
        </View>
        <View style={styles.wrapperContainer}>
          <View style={styles.wrapper}>
            {profileTabs.map((tab, index) => (
              <ActionButton
                key={index}
                index={index}
                profileTabs={profileTabs}
                tab={tab}
              />
            ))}
          </View>
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

          <CacheImage
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
  header: {
    width: "100%",
    backgroundColor: theme.primary,
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 48,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  wrapperContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: -20,
    zIndex: 1,
    height: 400,
  },
  wrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  loginContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
  image: {
    width: 230,
    height: 230,
    alignSelf: "center",
  },
  signupText: {
    color: theme.primary,
    marginTop: 10,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  unauthenticatedContainer: {
    flex: 1,
    position: "relative",
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flex: 1,
  },
});

export default Profile;
