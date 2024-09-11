import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import CloseModalButton from "@/components/CloseModalButton";
import { useLocalSearchParams } from "expo-router";
import { useFetchNewsById } from "@/hooks/News/useFetchNewsById";
import { theme } from "@/Theme/theme";
import CacheImage from "@/components/CacheImage";

const NewsModal = () => {
  const { newsId } = useLocalSearchParams();

  const { data: newsInfo, isLoading } = useFetchNewsById(
    Array.isArray(newsId) ? newsId[0] : newsId
  );

  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size={"large"}
        color={theme.primary}
      ></ActivityIndicator>
    </View>
  ) : newsInfo ? (
    <View style={{ position: "relative", flex: 1, backgroundColor: "#fff" }}>
      <CloseModalButton />

      <ScrollView style={styles.container}>
        {newsInfo?.banners.length > 0 && (
          <CacheImage
            source={{ uri: newsInfo.banners[0] }}
            style={styles.banner}
            resizeMode="cover"
          />
        )}
        <View style={{ ...styles.container, ...styles.wrapper }}>
          <View
            style={{
              gap: 12,
            }}
          >
            <Text style={styles.title}>{newsInfo.title}</Text>
            {newsInfo.subtitle && (
              <Text style={styles.subtitle}>{newsInfo.subtitle}</Text>
            )}
            <Text style={{ ...styles.description }}>
              {newsInfo.description}
            </Text>
          </View>
          {newsInfo?.banners.length > 1 && (
            <View>
              <Text style={{ ...styles.subtitle, fontSize: 18 }}>Galeria</Text>
              <FlatList
                data={newsInfo.banners}
                keyExtractor={(item) => item}
                horizontal
                style={{ marginTop: 10 }}
                renderItem={({ item }) => (
                  <CacheImage
                    source={{ uri: item }}
                    style={styles.galleryImage}
                    resizeMode="cover"
                  />
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  ) : (
    <Text>Ocorreu um erro ao carregar a noticia</Text>
  );
};
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  banner: {
    height: 200,
    width: width,
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
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Montserrat_600SemiBold",
  },
  description: {
    fontSize: 14,
    color: "#595959",
    fontFamily: "Montserrat_500Medium",
    marginVertical: 5,
    textAlign: "justify",
  },
  galleryImage: {
    height: 200,
    width: 300,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default NewsModal;
