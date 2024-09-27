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

  const [test, setTest] = React.useState();
  const [err, setErr] = React.useState();

  const [test2, setTest2] = React.useState();
  const [err2, setErr2] = React.useState();

  React.useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos/1").then((response) => {
      setTest2(response.data);
    }).catch((error) => {
      setErr2(error?.response?.data || error);
    });
  }, []);

  React.useEffect(() => {
    axios.get("https://admin.doacao.tech/api/news").then((response) => {
      setTest(response.data);
    }).catch((error) => {
      setErr(error?.response?.data || error);
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
      <Text>{JSON.stringify(test2)}</Text>
      <Text>{JSON.stringify(err)}</Text>
      <Text>{JSON.stringify(err2)}</Text>
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
