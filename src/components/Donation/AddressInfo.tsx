import React from "react";
import { View } from "react-native";
import IconText from "../IconText";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Address } from "@/@types/app";
import { theme } from "@/Theme/theme";

function AddressInfo({ address }: { address: Address }) {
  return (
    <View style={{ paddingBottom: 70, width: 300 }}>
      <IconText
        text={
          address?.street +
          ", " +
          address?.city +
          ", " +
          address?.state +
          " - " +
          address?.zipcode
        }
      >
        <MaterialIcons name="location-pin" size={30} color={theme.primary} />
      </IconText>
    </View>
  );
}

export default AddressInfo;
