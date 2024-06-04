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

const Map = () => {
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

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
        {institutions &&
          institutions.map((institution) => {
            return (
              <Marker
                key={institution.id}
                coordinate={{
                  latitude: Number(institution.address.latitude),
                  longitude: Number(institution.address.longitude),
                }}
                image={{
                  uri: institution.avatar,
                  width: 40,
                  height: 40,
                }}
                onPress={() => {
                  router.navigate("Institution/Institution");
                }}
              />
            );
          })}
      </MapView>
    </View>
  );
};

export default Map;
