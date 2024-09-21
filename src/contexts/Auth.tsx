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
import { createContext, useContext, useEffect } from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";

interface AuthContextData {
  authData?: User;
  isLoading: boolean;
  signIn: (data: { email: string; password: string }) => Promise<boolean>;
  signUp: (data: UserRegister) => Promise<boolean>;
  changeData: (data: Omit<User, "id">) => Promise<boolean>;
  signOut: () => Promise<void>;
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
    verifyToken();
  }, []);

  const signIn = async (data: { email: string; password: string }) => {
    try {
      const { token } = await mutateUser(data);

      await AsyncStorage.setItem(
        "@app-doacao:AuthToken",
        JSON.stringify({ token })
      );

      invalidateRefresh();

      return true;
    } catch (err) {
      Alert.alert(
        "Ops! Ocorreu um erro ao entrar na sua conta: ",
        `${err?.response?.data.message}`
      );
      console.error(err?.response?.data);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("@app-doacao:AuthToken");
      queryClient.refetchQueries({
        queryKey: [QueryKeys.UserData],
      });

      invalidateRefresh();

      router.navigate("/");
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
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const signUp = async (data: UserRegister) => {
    try {
      const { token } = await mutateRegisterUser(data);

      await AsyncStorage.setItem(
        "@app-doacao:AuthToken",
        JSON.stringify({ token })
      );

      invalidateRefresh();

      return true;
    } catch (err) {
      Alert.alert(
        "Ops! Ocorreu um erro ao criar sua conta: ",
        `${err?.response?.data.message}`
      );
      console.error(err?.response?.data);
      throw err;
    }
  };

  const changeData = async (data: Omit<User, "id">): Promise<boolean> => {
    try {
      const res = await mutateEditUser(data);
      return res ? true : false;
    } catch (err) {
      Alert.alert(
        "Ops! Ocorreu um erro ao editar seus dados: ",
        `${err?.response?.data.message}`
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
      return null;
    }

    const expirationDate = new Date(expiration_date);
    const now = new Date();

    if (expirationDate < now) {
      try {
        const response = await authedApi.post("/clientes/refresh");

        if (response.data) {
          const { token, expiration_date } = response.data;

          await AsyncStorage.setItem(
            "@app-doacao:AuthToken",
            JSON.stringify({ token, expiration_date })
          );

          return response.data;
        }
      } catch (error) {
        console.log("AuthContext error: verifyToken", error.response.data);
        return null;
      }
    }
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
