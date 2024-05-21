import { View } from "react-native";
import React, { useRef } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  LocationAccuracy,
  getCurrentPositionAsync,
} from "expo-location";

const Map = () => {
  const mapRef = useRef<MapView>(null);

  async function requestLocationPermissions() {
    try {
      const { granted } = await requestForegroundPermissionsAsync();

      if (granted) {
        const currentPosition = await getCurrentPositionAsync({
          accuracy: LocationAccuracy.Balanced,
        });
      }
    } catch (error) {
      console.log("MapScreen error: ", error);
    } 
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
      initialRegion={{
        latitude: -22.896272986246537, // região default por enquanto
        longitude: -43.104700078765426,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
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
