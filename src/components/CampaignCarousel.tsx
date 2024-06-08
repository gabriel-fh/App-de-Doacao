import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CampaignCard from "./CampaignCard";
import { useFetchCampaign } from "@/hooks/Campaign/useFetchCampaign";
import { theme } from "@/Theme/theme";

const CampaignCarousel = () => {
  const { data: campaigns, isLoading: isLoadingCampaign } = useFetchCampaign();

  const width = Dimensions.get("window").width;
  

  if (isLoadingCampaign) {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={styles.title} children="Campanhas" />

        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (campaigns.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} children="Campanhas" />

      <Carousel
        data={campaigns}
        width={width - 24}
        height={180}
        style={{ flex: 1, marginTop: 10 }}
        loop
        autoPlay
        autoPlayInterval={3000}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={{ flex: 1, marginRight: 8 }}>
            <CampaignCard campaign={item} />
          </View>
        )}
      />
    </View>
  );
};

export default CampaignCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: "Montserrat_600SemiBold",
  },
});
