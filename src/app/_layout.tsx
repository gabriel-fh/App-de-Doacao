import "../global.css";

import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Início", headerShown: false }}
      />
      <Tabs.Screen
        name="Map/Map"
        options={{ title: "Mapa", headerShown: false }}
      />
    </Tabs>
  );
}
