import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { theme } from "@/Theme/theme";
import { KeyboardAvoidingView } from "react-native";

const Login = () => {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.loginContainer}>
        <View style={styles.loginHeader}>
          <View
            style={{
              height: 2,
              backgroundColor: theme.primary,
              flex: 1,
            }}
          />
          <Text
            style={{
              fontFamily: "Montserrat_700Bold",
              fontSize: 30,
              color: theme.primary,
            }}
          >
            Login
          </Text>
          <View
            style={{
              height: 2,
              flex: 1,
              backgroundColor: theme.primary,
            }}
          />
        </View>
        <View
          style={{
            gap: 30,
          }}
        >
          <Input placeholder={"Digite seu e-mail"} title={"E-mail"} />
          <Input placeholder={"Digite sua senha"} title={"Senha"} />
          <Button text={"Entrar"} onPress={() => console.log}></Button>
        </View>
        <View style={{ marginTop: 15, alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Montserrat_500Medium",
              fontSize: 14,
            }}
          >
            Ainda não possui uma conta?
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: theme.primary,
                marginTop: 10,
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 16
              }}
            >
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  loginHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 40,
  },
});

export default Login;
