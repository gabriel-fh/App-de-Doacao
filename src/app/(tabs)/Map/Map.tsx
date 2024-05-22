import { View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  LocationAccuracy,
  getCurrentPositionAsync,
} from "expo-location";

const Map = () => {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState(null);

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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        initialRegion={region}
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        loadingIndicatorColor="#000"
        loadingBackgroundColor="#f1f1f1"
      />
    </View>
  );
};

export default Map;
