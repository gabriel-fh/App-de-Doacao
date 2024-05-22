import React from "react";
import { Stack } from "expo-router";
import '../../src/global.css';

const RootLayoutNav = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayoutNav;
