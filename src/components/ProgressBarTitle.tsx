import { View, Text } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";

const ProgressBarTitle = () => {
  return (
    <View style={{gap: 4, marginTop: 4}}>
      <Text style={{ fontFamily: "Poppins-Medium", fontSize: 14.5 }}>Vestimenta</Text>
      <ProgressBar objective={200} donated={150} />
      <Text>
        <Text style={{ color: "#0D62AD", fontFamily: "Poppins-Bold" }}>
          700 Doações{" "}
        </Text>
        Coletadas
      </Text>
    </View>
  );
};

export default ProgressBarTitle;
