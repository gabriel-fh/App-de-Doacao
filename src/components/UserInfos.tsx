import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

const UserInfos = () => {
  return (
    <View style={{ flexDirection: "row", gap: 8, width: "100%" }}>
      <Ionicons name={"person-circle-sharp"} size={60} color={"#404040"} />
      <View style={{}}>
        <Text
          style={{
            fontSize: 18,
            color: "#404040",
          }}
        >
          Jorge Amador
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#404040",
          }}
        >
          (21) 99999-9999
        </Text>
      </View>
    </View>
  );
};

export default UserInfos;
