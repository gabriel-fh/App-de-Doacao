import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import FormHeader from "@/components/FormHeader";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    full_name: z
      .string()
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .regex(/^[^0-9]*$/, "Por favor, insira um nome válido"),
    email: z.string().email("Por favor, insira um e-mail válido"),
    telephone: z
      .string()
      .regex(
        /^\(\d{3}\) \d{5}-\d{4}$/,
        "Por favor, insira um telefone válido no formato (DDD) 99999-9999"
      ),
    password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não são iguais",
    path: ["confirm_password"],
  });

const SignUp = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      telephone: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <FormHeader title={"Cadastrar"} />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name={"full_name"}
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
            name={"telephone"}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Input
                placeholder={"(DDD) xxxxx-xxxx"}
                title={"Telefone *"}
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
                onBlur={onBlur}
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
          <Controller
            control={control}
            name={"confirm_password"}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Input
                placeholder={"Digite sua senha novamente"}
                title={"Confirme sua senha *"}
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
