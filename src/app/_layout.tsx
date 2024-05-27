import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as Font from "expo-font";
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

  return (
    <>
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
            // animation: "slide_from_bottom",
            // headerShown: false,
            headerTitle: "Quero Doar",
          }}
        />
      </Stack>
    </>
  );
};

export default RootLayoutNav;
