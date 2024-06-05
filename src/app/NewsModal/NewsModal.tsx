import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import CloseModalButton from "@/components/CloseModalButton";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import { useFetchNewsById } from "@/hooks/News/useFetchNewsById";

const NewsModal = () => {
  const { newsId } = useLocalSearchParams();

  const { data: newsInfo, isLoading } = useFetchNewsById(
    Array.isArray(newsId) ? newsId[0] : newsId
  );

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={{ position: "relative", flex: 1, backgroundColor: "#fff" }}>
      <StatusBar hidden />

      <CloseModalButton />
      <ScrollView style={styles.container}>
        {newsInfo.banners && (
          <Image
            source={{ uri: newsInfo.banners[0] }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={{ ...styles.container, ...styles.wrapper }}>
          <View>
            <Text style={styles.title}>{newsInfo.title}</Text>
            <Text style={styles.subtitle}>{newsInfo.subtitle}</Text>
            <Text style={{ ...styles.description }}>
              {newsInfo.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  image: {
    height: 200,
    width: "100%",
  },
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 4,
    fontFamily: "Montserrat_600SemiBold",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  description: {
    fontSize: 14,
    color: "#595959",
    fontFamily: "Montserrat_500Medium",
    marginVertical: 5,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 7,
  },
  avatar: {
    height: 22,
    width: 22,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#0D62AD",
  },
  username: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default NewsModal;
