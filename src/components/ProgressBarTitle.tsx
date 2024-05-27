import { View, Text } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";

const ProgressBarTitle = () => {
  return (
    <View style={{ gap: 4, marginTop: 4 }}>
      <Text style={{ fontSize: 14.5, 
        fontFamily: "Montserrat_600SemiBold", 
       }}>Vestimenta</Text>
      <ProgressBar objective={200} donated={150} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        <Text
          style={{
            color: "#0D62AD",
            fontFamily: "Montserrat_600SemiBold",
          }}
        >
          700 Doações{" "}
        </Text>
        <Text
          style={{
            fontFamily: "Montserrat_500Medium",
          }}
        >
          Coletadas
        </Text>
      </View>
    </View>
  );
};

export default ProgressBarTitle;
