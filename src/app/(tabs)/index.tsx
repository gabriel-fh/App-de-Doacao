import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import NewsCard from "@/components/NewsCard";
import { useFetchNews } from "@/hooks/News/useFetchNews";
import CampaignCarousel from "@/components/CampaignCarousel";
import { theme } from "@/Theme/theme";
import { News } from "@/@types/app";
import { Skeleton } from "moti/skeleton";

const DATA: News[] = [
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
];

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

      <View style={{ gap: 10, marginTop: 20 }}>
        {isLoadingNews ? (
          <View style={{marginTop: 20}}>
            <Skeleton
              colorMode="light"
              colors={theme.skeletonColors}
              width={120}
            />
            <View style={{ marginTop: 20 }}>
              <Skeleton
                colorMode="light"
                height={220}
                width={"100%"}
                colors={theme.skeletonColors}
              />
            </View>
          </View>
        ) : !isLoadingNews && DATA && DATA.length > 0 ? (
          <>
            <Text style={styles.title} children="Notícias" />
            {DATA.map((news) => (
              <TouchableOpacity
                key={news.id}
                onPress={() => console.log("Notícia clicada", news)}
              >
                <NewsCard news={news} />
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontFamily: "Montserrat_600SemiBold",
              fontSize: 16,
            }}
            children="Nenhuma notícia encontrada"
          />
        )}
      </View>
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
    marginBottom: 10,
  },
});

export default index;
