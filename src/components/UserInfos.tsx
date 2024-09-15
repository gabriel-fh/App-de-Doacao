import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { User } from "@/@types/app";

const UserInfos = ({ data }: { data: User }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
        paddingHorizontal: 5
      }}
    >
      <Ionicons name={"person-circle-sharp"} size={60} color={"#0D62AD"} />
      <View
        style={{
          width: "75%"
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Montserrat_600SemiBold",
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
          }}
        >
          {data.phone
            .replace("+55", "")
            .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
        </Text>
      </View>
    </View>
  );
};

export default UserInfos;
