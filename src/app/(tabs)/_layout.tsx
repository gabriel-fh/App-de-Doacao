import { Tabs } from "expo-router";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 70, backgroundColor: "#fff" },
        tabBarItemStyle: { paddingBottom: 10 },
        headerStyle: { backgroundColor: "#fff" },
        headerTitleAlign: "center",
        tabBarInactiveTintColor: "#c0c0c0",
        tabBarActiveTintColor: "#0D62AD",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome6 name={"house"} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Map/Map"
        options={{
          title: "Mapa",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name={"map-marked-alt"} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Campaign/Campaign"
        options={{
          title: "Campanhas",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name={"scroll"} size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile/Profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name={"user-circle"} size={25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
