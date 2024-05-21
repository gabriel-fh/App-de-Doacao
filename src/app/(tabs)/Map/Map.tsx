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
      if (status !== 'granted') {
        console.error('Aceesso a localização negado!');
        return;
      }

      let location = await getCurrentPositionAsync({ accuracy: LocationAccuracy.Balanced });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
      ref={mapRef}
      initialRegion={{
        latitude: -22.896272986246537, // região default por enquanto
        longitude: -43.104700078765426,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
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
