import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import { User } from "@/@types/app";
import { theme } from "@/Theme/theme";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { router } from "expo-router";

const UserInfos = ({ data }: { data: User }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        overflow: "hidden",
        paddingHorizontal: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <FontAwesome
          name={"user-circle-o"}
          size={47}
          color={"#fff"}
          style={{
            paddingLeft: 5,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Montserrat_600SemiBold",
              width: 250,
              color: "#fff",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {data.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat_500Medium",
              marginTop: 4,
              color: "#fff",
            }}
          >
            {data.phone
              .replace("+55", "")
              .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          paddingRight: 5,
        }}
        onPress={() => router.navigate("ChangeData/ChangeData")}
      >
        <FontAwesome5 name={"user-cog"} size={25} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default UserInfos;
