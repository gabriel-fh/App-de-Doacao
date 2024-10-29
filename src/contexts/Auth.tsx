import { AuthStorageData, User, UserRegister } from "@/@types/app";
import { useFetchUser } from "@/hooks/User/useFetchUser";
import {
  useMutateUser,
  useMutateRegisterUser,
  useMutateEditUser,
} from "@/hooks/User/useMutateUser";
import { authedApi } from "@/setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";

export type ChangeDataType = {
  name?: string;
  phone?: string;
  email?: string;
};

interface AuthContextData {
  authData?: User;
  isLoading: boolean;
  signIn: (data: { email: string; password: string }) => Promise<boolean>;
  signUp: (data: UserRegister) => Promise<boolean>;
  changeData: (data: ChangeDataType) => Promise<boolean>;
  signOut: () => Promise<void>;
  verifyToken: () => Promise<boolean | null>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: authData, isLoading, invalidateRefresh } = useFetchUser();
  const { mutate: mutateUser } = useMutateUser();
  const { mutate: mutateRegisterUser } = useMutateRegisterUser();
  const { mutate: mutateEditUser } = useMutateEditUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    const verifyRefresh = async () => {
      const response = await verifyToken();
      if (!response) {
        await signOut(true);
      }
    };
    verifyRefresh();
  }, []);

  const signIn = async (data: { email: string; password: string }) => {
    try {
      const { token, expiration_date } = await mutateUser(data);

      await AsyncStorage.setItem(
        "@app-doacao:AuthToken",
        JSON.stringify({ token, expiration_date })
      );

      invalidateRefresh();

      return true;
    } catch (err) {
      Alert.alert(
        "Ops! Ocorreu um erro ao entrar na sua conta: ",
        `${err?.response?.data?.message}`
      );
      console.error(err?.response?.data);
      throw err;
    }
  };

  const signOut = async (message?: boolean) => {
    try {
      await AsyncStorage.removeItem("@app-doacao:AuthToken");
      queryClient.refetchQueries({
        queryKey: [QueryKeys.UserData],
      });

      invalidateRefresh();

      router.navigate("/");
      if (!message) {
        showMessage({
          message: "Desconectado com sucesso!",
          type: "none",
          style: {
            backgroundColor: "#b50606",
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
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const signUp = async (data: UserRegister) => {
    try {
      const { token, expiration_date } = await mutateRegisterUser(data);

      await AsyncStorage.setItem(
        "@app-doacao:AuthToken",
        JSON.stringify({ token, expiration_date })
      );

      invalidateRefresh();

      return true;
    } catch (err) {
      Alert.alert(
        "Ops! Ocorreu um erro ao criar sua conta: ",
        `${err?.response?.data?.message}`
      );
      console.error(err?.response?.data);
      throw err;
    }
  };

  const changeData = async (data: ChangeDataType): Promise<boolean> => {
    try {
      const res = await mutateEditUser(data);
      return res ? true : false;
    } catch (err) {
      Alert.alert(
        "Ops! Ocorreu um erro ao editar seus dados: ",
        `${err?.response?.data?.message}`
      );
      console.error(err?.response?.data);
      throw err;
    }
  };

  async function verifyToken() {
    const _auth_data = await AsyncStorage.getItem("@app-doacao:AuthToken");

    const { expiration_date, token } = JSON.parse(
      _auth_data
    ) as AuthStorageData;

    if (!expiration_date || !token) {
      console.log('sss')
      return null;
    }
    const expirationDate = new Date(expiration_date);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(
      expirationDate
    );
    const formattedNow = new Intl.DateTimeFormat("pt-BR", options).format(
      new Date()
    );

    function parseDateString(dateString) {
      const [datePart, timePart] = dateString.split(", ");
      const [day, month, year] = datePart.split("/").map(Number);
      const [hours, minutes, seconds] = timePart.split(":").map(Number);

      return [year, month, day, hours, minutes, seconds];
    }

    const nowParsed = parseDateString(formattedNow);
    const expirationParsed = parseDateString(formattedDate);

    if (nowParsed > expirationParsed) {
      try {
        const response = await authedApi.post("/donators/refresh");

        if (response.data) {
          const { token, expiration_date } = response.data;

          await AsyncStorage.setItem(
            "@app-doacao:AuthToken",
            JSON.stringify({ token, expiration_date })
          );

          return true;
        } else {
          return null;
        }
      } catch (error) {
        console.log("AuthContext error: verifyToken", error.response.data);
        return null;
      }
    }

    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        authData,
        isLoading,
        signIn,
        signOut,
        signUp,
        changeData,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
