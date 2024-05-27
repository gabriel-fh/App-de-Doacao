import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import UserInfos from "@/components/UserInfos";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const Profile = () => {
  const profileTabs = [
    {
      icon: <FontAwesome name={"heart"} size={25} color={"#0D62AD"} />,
      title: "Minhas Doações",
    },
    {
      icon: <FontAwesome name={"trophy"} size={27} color={"#0D62AD"} />,
      title: "Conquistas",
    },
    {
      icon: <Ionicons name={"settings"} size={27} color={"#0D62AD"} />,
      title: "Configurações",
    },
    {
      icon: <FontAwesome6 name={"circle-info"} size={25} color={"#0D62AD"} />,
      title: "Sobre",
    },
    {
      icon: <FontAwesome name={"sign-out"} size={30} color={"#f00"} />,
      title: "Sair",
    },
  ];

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 12,
        }}
      >
        <UserInfos />

        <View
          style={{
            marginTop: 20,
          }}
        >
          {profileTabs.map((tab, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.item,
                  idx < profileTabs.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: "#ddd",
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  {tab.icon}
                  <Text>{tab.title}</Text>
                </View>
                {idx !== profileTabs.length - 1 && (
                  <FontAwesome name={"angle-right"} size={30} color={"#666"} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default Profile;
