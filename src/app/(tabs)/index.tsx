import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import NewsCard from "@/components/NewsCard";
import { useFetchNews } from "@/hooks/News/useFetchNews";
import CampaignCarousel from "@/components/CampaignCarousel";
import { theme } from "@/Theme/theme";
import { News } from "@/@types/app";

const DATA: News[] = [
  // id: number;
  // title: string;
  // subtitle: string;
  // description: string;
  // banners: string[];
  {
    id: 1,
    title: "Notícia 1",
    description: "Descrição da notícia 1",
    subtitle: "Subtítulo da notícia 1",
    banners: ["https://picsum.photos/500/210"],
  },
  {
    id: 2,
    title: "Notícia 2",
    description: "Descrição da notícia 2",
    subtitle: "Subtítulo da notícia 2",
    banners: ["https://picsum.photos/500/210"],
  },
  {
    id: 3,
    title: "Notícia 3",
    description: "Descrição da notícia 3",
    subtitle: "Subtítulo da notícia 3",
    banners: ["https://picsum.photos/500/210"],
  },
  {
    id: 4,
    title: "Notícia 4",
    description: "Descrição da notícia 4",
    subtitle: "Subtítulo da notícia 4",
    banners: ["https://picsum.photos/500/210"],
  },
  {
    id: 5,
    title: "Notícia 5",
    description: "Descrição da notícia 5",
    subtitle: "Subtítulo da notícia 5",
    banners: ["https://picsum.photos/500/210"],
  },
]

const index = () => {
  const { data: news, isLoading: isLoadingNews } = useFetchNews();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        marginHorizontal: 12,
        paddingVertical: 20,
      }}
    >
      <CampaignCarousel />

      {DATA && DATA?.length > 0 && (
        <View style={{ gap: 10 }}>
          <Text style={styles.title} children="Notícias" />
          {isLoadingNews ? (
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator size="large" color={theme.primary} />
            </View>
          ) : (
            DATA.map((item) => <NewsCard key={item.id} news={item} />)
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default index;
