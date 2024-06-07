import { User, UserRegister } from "@/@types/app";
import { useFetchUser } from "@/hooks/User/useFetchUser";
import {
  useMutateUser,
  useMutateRegisterUser,
} from "@/hooks/User/useMutateUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext } from "react";
import Toast from "react-native-toast-message";

interface AuthContextData {
  authData?: User;
  isLoading: boolean;
  signIn: (data: { email: string; password: string }) => Promise<boolean>;
  signUp: (data: UserRegister) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: authData, isLoading } = useFetchUser();
  const { mutate: mutateUser } = useMutateUser();
  const { mutate: mutateRegisterUser } = useMutateRegisterUser();

  const signIn = async (data: { email: string; password: string }) => {
    try {
      const { token } = await mutateUser(data);

      await AsyncStorage.setItem(
        "@app-doacao:AuthToken",
        JSON.stringify({ token })
      );
      return true;
    } catch (err) {
      console.error(err?.response?.data);
      return false;
    }
  };

  const signOut = async () => {};

  const signUp = async (data: UserRegister) => {
    try {
      const { token } = await mutateRegisterUser(data);

      await AsyncStorage.setItem(
        "@app-doacao:AuthToken",
        JSON.stringify({ token })
      );
      return true;
    } catch (err) {
      console.error(err?.response?.data);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        isLoading,
        signIn,
        signOut,
        signUp,
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
