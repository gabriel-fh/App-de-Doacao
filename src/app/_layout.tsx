import React, { useEffect, useState } from "react";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { theme } from "@/Theme/theme";
import Toast from "react-native-toast-message";
import { AuthProvider } from "@/contexts/Auth";

const RootLayoutNav = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  const queryClient = new QueryClient();

  const asyncStoragePersistor = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  persistQueryClient({
    queryClient,
    persister: asyncStoragePersistor,
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toast />
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
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default RootLayoutNav;
