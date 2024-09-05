import { ActivityIndicator, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  LocationAccuracy,
  getCurrentPositionAsync,
} from "expo-location";
import { router } from "expo-router";
import { useFetchInstitutions } from "@/hooks/Institutions/useFetchInstitution";
import { theme } from "@/Theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import InstitutionMarker from "@/components/InstitutionMarker";
import { Institution } from "@/@types/app";

const Map = () => {

  const DATA: Institution[] = [
    {
      id: 1,
      name: "Instituição 1",
      description: "Descrição da instituição 1",
      avatar: "https://picsum.photos/150",
      banner: "https://picsum.photos/500/210",
      phone: "0000-0000",
      status: "active",
      address: {
        city: "Cidade 1",
        id: 1,
        latitude: -22.896994406943087, 
        longitude: -43.106255788317554,
        state: "RJ",
        street: "Rua 1",
        zipcode: "00000-000",
      }
    }
  ]


  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState(null);

  const { data: institutions, isLoading } = useFetchInstitutions();

  // obtendo localização do usuário
  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Aceesso a localização negado!");
        return;
      }

      let location = await getCurrentPositionAsync({
        accuracy: LocationAccuracy.Balanced,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color={theme.primary} />
  //     </View>
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        initialRegion={region}
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        loadingIndicatorColor={theme.primary}
        loadingBackgroundColor="#f1f1f1"
      >
        {DATA &&
          DATA.map((institution) => {
            return (
              <InstitutionMarker
                key={institution.id}
                institution={institution}
              />
            );
          })}
      </MapView>
    </View>
  );
};

export default Map;
