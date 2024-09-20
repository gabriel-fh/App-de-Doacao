import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/Auth";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { theme } from "@/Theme/theme";

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
});

const ChangeData = () => {
  const { authData } = useAuth();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: authData.name || "",
      email: authData.email || "",
      phone:
        authData.phone
          .replace("+55", "")
          .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") || "",
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const renderInput = (
    name: "name" | "email" | "phone",
    title: string,
    placeholder: string,
    mask?: any
  ) => (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <Input
          title={title}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          errorMessage={error?.message}
          mask={mask}
        />
      )}
    />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.userInfoContainer}>
          <FontAwesome name="user-circle-o" size={100} color={theme.primary} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{authData.name}</Text>
            <Text style={styles.userEmail}>{authData.email}</Text>
            <Text style={styles.userPhone}>
              {authData.phone
                .replace("+55", "")
                .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.formContainer}>
          {renderInput("name", "Nome Completo *", "Digite seu nome")}
          {renderInput("email", "E-mail *", "Digite seu e-mail")}
          {renderInput("phone", "Telefone *", "(xx) xxxxx-xxxx", [
            "(",
            /\d/,
            /\d/,
            ") ",
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
          ])}
          <Button text="Alterar Dados" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  userInfoContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    paddingVertical: 20,
  },
  userDetails: {
    width: "90%",
  },
  userName: {
    fontSize: 23,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "center",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    textAlign: "center",
  },
  userPhone: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    textAlign: "center",
  },
  separator: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.primary,
    marginVertical: 10,
  },
  formContainer: {
    width: "100%",
    gap: 30,
    paddingHorizontal: 30,
    marginTop: 30,
  },
});

export default ChangeData;
