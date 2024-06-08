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
import { showMessage } from "react-native-flash-message";

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

      <TouchableOpacity
        onPress={() => {
          showMessage({
            message: "Conectado com sucesso!",
            type: "none",
            style: {
              backgroundColor: "#13a709",
              height: 60,
              marginTop: 20,
            },
            floating: true,
            titleStyle: {
              color: "white",
              fontSize: 18,
              fontFamily: "Montserrat_600SemiBold",
              marginTop: 7,
              textAlign: "center",
            },
          });
        }}
      >
        <Text>vasco</Text>
      </TouchableOpacity>

      {news && news?.length > 0 && (
        <View style={{ gap: 10 }}>
          <Text style={styles.title} children="Notícias" />
          {isLoadingNews ? (
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator size="large" color={theme.primary} />
            </View>
          ) : (
            news.map((item) => <NewsCard key={item.id} news={item} />)
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
