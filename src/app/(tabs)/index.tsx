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
import { Skeleton } from "moti/skeleton";

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
        ) : !isLoadingNews && news && news.length > 0 ? (
          <>
            <Text style={styles.title} children="Notícias" />
            {news.map((news) => (
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
