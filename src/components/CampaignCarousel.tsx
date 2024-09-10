import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CampaignCard from "./CampaignCard";
import { useFetchCampaign } from "@/hooks/Campaign/useFetchCampaign";
import { theme } from "@/Theme/theme";
import { Skeleton } from "moti/skeleton";

const CampaignCarousel = () => {
  const { data: campaigns, isLoading: isLoadingCampaign } = useFetchCampaign();

  const width = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {isLoadingCampaign ? (
        <>
          <Skeleton colorMode="light" colors={theme.skeletonColors} width={120}/>
          <View style={{ marginTop: 20 }}>
            <Skeleton
              colorMode="light"
              height={150}
              width={"100%"}
              colors={theme.skeletonColors}
            />
          </View>
        </>
      ) : !isLoadingCampaign && campaigns && campaigns.length > 0 && (
        <>
          <Text style={styles.title} children="Campanhas" />
          <Carousel
            data={campaigns}
            width={width - 24}
            height={180}
            style={{ flex: 1, marginTop: 20 }}
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
        </>
      )}
    </View>
  );
};

export default CampaignCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Montserrat_600SemiBold",
  },
});
