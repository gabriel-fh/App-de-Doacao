import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import FormHeader from "@/components/FormHeader";

const SignUp = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <FormHeader title={"Cadastrar"}/>
        <View style={styles.inputContainer}>
          <Input placeholder={"Digite seu nome"} title={"Nome completo *"} />
          <Input placeholder={"Digite seu e-mail"} title={"E-mail *"} />
          <Input placeholder={"(DD) xxxxx-xxxx"} title={"Telefone *"} />
          <Input placeholder={"Minimo de 8 caracteres"} title={"Senha *"} />
          <Input placeholder={"Digite sua senha novamente"} title={"Confirme sua senha *"} />
        <Button text="Continuar" onPress={() => console.log}></Button>
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
  }
});

export default SignUp;
