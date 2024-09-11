import React from "react";
import { View } from "react-native";
import IconText from "../IconText";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Address } from "@/@types/app";

function AddressInfo({ addressess }: { addressess: Address }) {
  return (
    <View style={{ paddingBottom: 70, width: 300 }}>
      <IconText
        text={
          addressess[0]?.street +
          ", " +
          addressess[0]?.city +
          ", " +
          addressess[0]?.state +
          " - " +
          addressess[0]?.zipcode
        }
      >
        <MaterialIcons name="location-pin" size={30} color="#0D62AD" />
      </IconText>
    </View>
  );
}

export default AddressInfo;
