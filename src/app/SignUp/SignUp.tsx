import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import FormHeader from "@/components/FormHeader";
import { useForm, Controller, set } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/Auth";
import { UserRegister } from "@/@types/app";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";
import { theme } from "@/Theme/theme";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .regex(/^[^0-9]*$/, "Por favor, insira um nome válido"),
  email: z.string().email("Por favor, insira um e-mail válido"),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Por favor, insira um telefone válido no formato (99) 99999-9999"),
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

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const authContext = useAuth();

  const onSubmit = async (data: UserRegister) => {
    if (isLoading) {
      return;
    }

    if (!checked) {
      setError("Você precisa concordar com a política de privacidade para continuar.");
      return;
    } else {
      setError(null);
    }

    setisLoading(true);
    const formattedPhone = `+55${data.phone.replace(/[\s()\-]/g, "")}`;
    const response = authContext.signUp({
      ...data,
      phone: formattedPhone,
      email: data.email.toLowerCase(),
    });

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
      mask: ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
    },
    {
      name: "password",
      placeholder: "Minimo de 8 caracteres",
      title: "Senha *",
      isPassword: true,
    },
  ];

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
            email={name === "email"}
          />
        )}
      />
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.wrapper}>
        <FormHeader title={"Cadastre-se"} subtitle="Insira suas informações nos campos abaixo" />
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
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <TouchableOpacity
                style={[styles.checkBox, checked && { backgroundColor: theme.primary }]}
                onPress={() => setChecked(!checked)}
              >
                {checked && <View style={styles.checked} />}
              </TouchableOpacity>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text>Li e concordo com a </Text>
                <TouchableOpacity onPress={() => router.navigate("PrivacyPolicy/PrivacyPolicy")}>
                  <Text
                    style={{
                      color: theme.primary,
                      textDecorationLine: "underline",
                    }}
                  >
                    política de privacidade.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {error && (
              <Text
                style={{
                  color: "#f00",
                  fontSize: 12,
                  fontFamily: "Montserrat_400Regular",
                  marginTop: 10,
                }}
              >
                {error}
              </Text>
            )}
          </View>

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
  checkBox: {
    height: 17,
    width: 17,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: theme.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: 7,
    height: 13,
    borderColor: "#fff",
    borderBottomWidth: 2,
    borderRightWidth: 2,
    transform: [{ rotate: "45deg" }],
    marginBottom: 4,
  },
});

export default SignUp;
