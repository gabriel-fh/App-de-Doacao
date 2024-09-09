import { Institution } from "@/@types/app";
import { theme } from "@/Theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Marker } from "react-native-maps";
import { Image } from "react-native";

function InstitutionMarker({ institution }: { institution: Institution }) {
  const handlePress = () => {
    router.navigate({
      pathname: "Institution/Institution",
      params: {
        institutionId: institution.id,
      },
    });
  };

  return (
    <Marker
      key={institution.id}
      coordinate={{
        latitude: Number(institution.address.latitude),
        longitude: Number(institution.address.longitude),
      }}
      onPress={handlePress}
    >
      <LinearGradient
        colors={['#000000', '#000000']}
        style={{
          width: 40,
          height: 40,
          borderRadius: 10000,
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: institution.avatar }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10000,
          }}
        />
      </LinearGradient>
    </Marker>
  );
}

export default InstitutionMarker;
