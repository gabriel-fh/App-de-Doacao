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
import { Campaign } from "@/@types/app";

const DATA: Campaign[] = [
  {
    id: 1,
    name: "Campanha 1",
    description: "Descrição da campanha 1",
    avatar: "https://picsum.photos/150",
    donated_items_quantity: 10,
    donated_items_objective: 100,
    date: "2021-09-01",
    banner: "https://picsum.photos/500/210",
  },
  {
    id: 2,
    name: "Campanha 2",
    description: "Descrição da campanha 2",
    avatar: "https://picsum.photos/150",
    donated_items_quantity: 20,
    donated_items_objective: 100,
    date: "2021-05-15",
    banner: "https://picsum.photos/500/210",
  },
  {
    id: 3,
    name: "Campanha 3",
    description: "Descrição da campanha 3",
    avatar: "https://picsum.photos/150",
    donated_items_quantity: 30,
    donated_items_objective: 100,
    date: "2021-11-30",
    banner: "https://picsum.photos/500/210",
  },
  {
    id: 4,
    name: "Campanha 4",
    description: "Descrição da campanha 4",
    avatar: "https://picsum.photos/150",
    donated_items_quantity: 40,
    donated_items_objective: 100,
    date: "2021-10-20",
    banner: "https://picsum.photos/500/210",
  },
  {
    id: 5,
    name: "Campanha 5",
    description: "Descrição da campanha 5",
    avatar: "https://picsum.photos/150",
    donated_items_quantity: 50,
    donated_items_objective: 100,
    date: "2021-08-05",
    banner: "https://picsum.photos/500/210",
  },
]

const CampaignCarousel = () => {
  const { data: campaigns, isLoading: isLoadingCampaign } = useFetchCampaign();

  const width = Dimensions.get("window").width;
  

  // if (isLoadingCampaign) {
  //   return (
  //     <View style={{ marginTop: 20 }}>
  //       <Text style={styles.title} children="Campanhas" />

  //       <ActivityIndicator size="large" color={theme.primary} />
  //     </View>
  //   );
  // }

  // if (campaigns?.length === 0) {
  //   return null
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title} children="Campanhas" />

      <Carousel
        data={DATA}
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
