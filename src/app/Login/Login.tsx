import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { theme } from "@/Theme/theme";
import { KeyboardAvoidingView } from "react-native";
import { router } from "expo-router";
import FormHeader from "@/components/FormHeader";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/Auth";
import { showMessage } from "react-native-flash-message";

const formSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido"),
  password: z.string(),
});

const Login = () => {
  const authContext = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    const response = await authContext.signIn(data);
    if (response) {
      router.canGoBack() ? router.back() : router.navigate("/");

      showMessage({
        message: "Conectado com sucesso!",
        type: "none",
        style: {
          backgroundColor: "#13a709",
          height: 60,
          marginTop: 20,
        },
        floating: true,
        titleStyle: {
          color: "white",
          fontSize: 18,
          fontFamily: "Montserrat_600SemiBold",
          marginTop: 7,
          textAlign: "center",
        },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.loginContainer}>
        <FormHeader title="Login" />
        <View
          style={{
            gap: 30,
          }}
        >
          <Controller
            control={control}
            name={"email"}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Input
                placeholder={"Digite seu e-mail"}
                title={"E-mail"}
                value={value}
                email
                onChangeText={onChange}
                errorMessage={error?.message}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name={"password"}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={"Digite sua senha"}
                password
                title={"Senha"}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Button text={"Entrar"} onPress={handleSubmit(onSubmit)}></Button>
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
          <TouchableOpacity onPress={() => router.navigate("SignUp/SignUp")}>
            <Text
              style={{
                color: theme.primary,
                marginTop: 10,
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 16,
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
