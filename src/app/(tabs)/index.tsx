import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useEffect } from "react";
import NewsCard from "@/components/NewsCard";
import CampaignCard from "@/components/CampaignCard";
import api from "@/setup/api";
import { useFetchCampaign } from "@/hooks/Campaign/useFetchCampaign";
import { useFetchNews } from "@/hooks/News/useFetchNews";
// import Carousel from "react-native-reanimated-carousel";

const index = () => {
  const { data: campaigns, isLoading: isLoadingCampaign } = useFetchCampaign();

  const { data: news, isLoading: isLoadingNews } = useFetchNews();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        marginHorizontal: 12,
        paddingVertical: 20,
      }}
    >
      <View style={{ gap: 10 }}>
        <Text style={styles.title} children="Campanhas" />
        {isLoadingCampaign ? (
          <Text>Carregando...</Text>
        ) : (
          campaigns?.map((item) => (
            <CampaignCard key={item.id} campaign={item} />
          ))
        )}
      </View>

      <View style={{ gap: 10 }}>
        <Text style={styles.title} children="Notícias" />
        {isLoadingNews ? (
          <Text>Carregando...</Text>
        ) : (
          news?.map((item) => <NewsCard key={item.id} news={item} />)
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
  },
});

export default index;
