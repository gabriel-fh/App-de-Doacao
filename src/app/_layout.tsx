import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { theme } from "@/Theme/theme";
import { AuthProvider } from "@/contexts/Auth";
import FlashMessage from "react-native-flash-message";
import { useVerifyConnetion } from "@/hooks/Verifications/Connection";
import { useUpdate } from "@/hooks/Verifications/Update";

const RootLayoutNav = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  const queryClient = new QueryClient();

  const asyncStoragePersistor = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  persistQueryClient({
    queryClient,
    persister: asyncStoragePersistor,
  });

  const { isConnected, showFlashMessage } = useVerifyConnetion();
  const { checkForUpdate } = useUpdate();

  useEffect(() => {
    if (!isConnected) {
      showFlashMessage();
    }
    onlineManager.setEventListener(
      (setOnline) => () => setOnline(!!isConnected)
    );
  }, [isConnected]);

  useEffect(() => {
    if(!__DEV__) {
      checkForUpdate();
    }
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FlashMessage position="top" />
          <StatusBar style="light" />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="Institution/Institution"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CampaignModal/CampaignModal"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Donation/Donation"
              options={{
                presentation: "modal",
                headerTitle: "Quero Doar",
                headerStyle: { backgroundColor: theme.primary },
                headerTitleStyle: { color: "#fff" },
                headerTitleAlign: "center",
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="NewsModal/NewsModal"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login/Login"
              options={{
                title: "Login",
                headerStyle: { backgroundColor: theme.primary },
                headerTitleStyle: { color: "#fff" },
                headerTitleAlign: "center",
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="SignUp/SignUp"
              options={{
                title: "Cadastre-se",
                headerStyle: { backgroundColor: theme.primary },
                headerTitleStyle: { color: "#fff" },
                headerTitleAlign: "center",
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="MyDonations/MyDonations"
              options={{
                title: "Minhas Doações",
                headerStyle: { backgroundColor: theme.primary },
                headerTitleStyle: { color: "#fff" },
                headerTitleAlign: "center",
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="Settings/Settings"
              options={{
                title: "Configurações",
                headerStyle: { backgroundColor: theme.primary },
                headerTitleStyle: { color: "#fff" },
                headerTitleAlign: "center",
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="Terms/Terms"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PrivacyPolicy/PrivacyPolicy"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ChangeData/ChangeData"
              options={{
                title: "Meus Dados",
                headerStyle: { backgroundColor: theme.primary },
                headerTitleStyle: { color: "#fff" },
                headerTitleAlign: "center",
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="DonationDetails/DonationDetails"
              options={{
                title: "Acompanhar Doação",
                headerStyle: { backgroundColor: theme.primary },
                headerTitleStyle: { color: "#fff" },
                headerTitleAlign: "center",
                headerTintColor: "#fff",
              }}
            />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default RootLayoutNav;
