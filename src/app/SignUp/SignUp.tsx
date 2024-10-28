import { View, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
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
})

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

  const [isLoading, setisLoading] = useState<boolean>(false);

  const authContext = useAuth();

  const onSubmit = async (data: UserRegister) => {

    if (isLoading) {
      return;
    }

    setisLoading(true);
    const formattedPhone = `+55${data.phone.replace(/[\s()\-]/g, "")}`;
    const response = authContext.signUp({
      ...data,
      phone: formattedPhone,
    });

    console.log(formattedPhone);

    if (response) {
      setisLoading(false);
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

  const Inputs = [
    {
      name: "name",
      placeholder: "Digite seu nome",
      title: "Nome Completo *",
    },
    {
      name: "email",
      placeholder: "Digite seu e-mail",
      title: "E-mail *",
    },
    {
      name: "phone",
      placeholder: "(xx) xxxxx-xxxx",
      title: "Telefone *",
      mask: [
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
        /\d/
      ]
    },
    {
      name: "password",
      placeholder: "Minimo de 8 caracteres",
      title: "Senha *",
      isPassword: true,
    },
  ]

  const ControllerInput = ({ name, placeholder, title, mask, isPassword }) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <Input
            placeholder={placeholder}
            title={title}
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
            onBlur={onBlur}
            mask={mask}
            password={isPassword}
          />
        )}
      />
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.wrapper}>
        <FormHeader
          title={"Cadastre-se"}
          subtitle="Insira suas informações nos campos abaixo"
        />
        <View style={styles.inputContainer}>
          {Inputs.map((input, index) => (
            <ControllerInput
              key={index}
              name={input.name}
              placeholder={input.placeholder}
              title={input.title}
              mask={input.mask}
              isPassword={input.isPassword}
            />
          ))}
          <Button text="Continuar" onPress={handleSubmit(onSubmit)} isLoading={isLoading} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight: "90%",
    display: "flex",
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
    alignSelf: "center",
    // height: "100%",
    // alignItems: "center",
    // gap: 30,
  },
  inputContainer: {
    width: "100%",
    gap: 30,
  },
});

export default SignUp;
