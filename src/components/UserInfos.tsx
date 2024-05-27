import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

const UserInfos = () => {
  return (
    <View style={{ flexDirection: "row", gap: 10, alignItems: 'center', width: "100%" }}>
      <Ionicons name={"person-circle-sharp"} size={60} color={"#0D62AD"} />
      <View style={{}}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Montserrat_600SemiBold'
          }}
        >
          Jorge Amado
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Montserrat_500Medium'
          }}
        >
          (21) 99999-9999
        </Text>
      </View>
    </View>
  );
};

export default UserInfos;
