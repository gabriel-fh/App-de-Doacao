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
import axios from "axios";

const index = () => {
  const { data: news, isLoading: isLoadingNews } = useFetchNews();

  const [test, setTest] = React.useState(null);
  const [err, setErr] = React.useState(null);

  React.useEffect(() => {
    axios.get("https://admin.doacao.tech/api/news").then((response) => {
      setTest(response.data);
    }).catch((error) => {
      setErr(error);
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        marginHorizontal: 12,
        paddingVertical: 20,
      }}
    >
      <CampaignCarousel />
      <Text>{JSON.stringify(test)}</Text>
      <Text>{JSON.stringify(err)}</Text>
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
        ) : null}
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
