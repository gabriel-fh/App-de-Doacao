import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import FormHeader from "@/components/FormHeader";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/Auth";
import { UserRegister } from "@/@types/app";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .regex(/^[^0-9]*$/, "Por favor, insira um nome válido"),
  email: z.string().email("Por favor, insira um e-mail válido"),
  phone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "Por favor, insira um telefone válido no formato (99) 99999-9999"
    ),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

const SignUp = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const authContext = useAuth();

  const onSubmit = async (data: UserRegister) => {
    const { phone } = data;
    const response = authContext.signUp({
      ...data,
      phone: `+55${phone
        .replaceAll(" ", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("-", "")}`,
    });

    if (response) {
      router.navigate("/");
      showMessage({
        message: "Conta criada com sucesso!",
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <FormHeader title={"Cadastrar"} />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name={"name"}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Input
                placeholder={"Digite seu nome"}
                title={"Nome Completo *"}
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name={"email"}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Input
                placeholder={"Digite seu e-mail"}
                title={"E-mail *"}
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
            name={"phone"}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Input
                placeholder={"(xx) xxxxx-xxxx"}
                title={"Telefone *"}
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
                onBlur={onBlur}
                mask={[
                  "(",
                  /\d/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name={"password"}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Input
                placeholder={"Minimo de 8 caracteres"}
                title={"Senha *"}
                value={value}
                password
                onChangeText={onChange}
                errorMessage={error?.message}
                onBlur={onBlur}
              />
            )}
          />
          <Button text="Continuar" onPress={handleSubmit(onSubmit)}></Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "Montserrat_600SemiBold",
  },
  wrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    width: "90%",
    padding: 20,
    alignItems: "center",
    // gap: 30,
  },
  inputContainer: {
    width: "100%",
    gap: 30,
  },
});

export default SignUp;
