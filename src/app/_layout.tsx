import "../global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Slot } from "expo-router";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <Slot />
    </GestureHandlerRootView>
  );
}
