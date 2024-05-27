import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";

const RootLayoutNav = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      "Poppins-Black": require("../../assets/Fonts/Poppins-Black.ttf"),
      "Poppins-BlackItalic": require("../../assets/Fonts/Poppins-BlackItalic.ttf"),
      "Poppins-Bold": require("../../assets/Fonts/Poppins-Bold.ttf"),
      "Poppins-BoldItalic": require("../../assets/Fonts/Poppins-BoldItalic.ttf"),
      "Poppins-ExtraBold": require("../../assets/Fonts/Poppins-ExtraBold.ttf"),
      "Poppins-ExtraBoldItalic": require("../../assets/Fonts/Poppins-ExtraBoldItalic.ttf"),
      "Poppins-ExtraLight": require("../../assets/Fonts/Poppins-ExtraLight.ttf"),
      "Poppins-ExtraLightItalic": require("../../assets/Fonts/Poppins-ExtraLightItalic.ttf"),
      "Poppins-Italic": require("../../assets/Fonts/Poppins-Italic.ttf"),
      "Poppins-Light": require("../../assets/Fonts/Poppins-Light.ttf"),
      "Poppins-LightItalic": require("../../assets/Fonts/Poppins-LightItalic.ttf"),
      "Poppins-Medium": require("../../assets/Fonts/Poppins-Medium.ttf"),
      "Poppins-MediumItalic": require("../../assets/Fonts/Poppins-MediumItalic.ttf"),
      "Poppins-Regular": require("../../assets/Fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("../../assets/Fonts/Poppins-SemiBold.ttf"),
      "Poppins-SemiBoldItalic": require("../../assets/Fonts/Poppins-SemiBoldItalic.ttf"),
      "Poppins-Thin": require("../../assets/Fonts/Poppins-Thin.ttf"),
      "Poppins-ThinItalic": require("../../assets/Fonts/Poppins-ThinItalic.ttf"),
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Ou retorne algum componente de carregamento
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
