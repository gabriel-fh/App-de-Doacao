import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { News } from "@/@types/app";
import { router } from "expo-router";
import CacheImage from "./CacheImage";
import { theme } from "@/Theme/theme";

const NewsCard = ({ news }: { news: News }) => {
  const handlePress = () => {
    router.navigate({
      pathname: "NewsModal/NewsModal",
      params: {
        newsId: news.id,
      },
    });
  };
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, styles.shadow]}>
        {news.banners && (
          <CacheImage
            source={{ uri: news.banners[0] }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Text style={styles.title}>{news.title}</Text>

        <Text style={styles.description} numberOfLines={3}>
          {news.subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    marginBottom: 12,
    gap: 8,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  description: {
    fontSize: 13,
    color: "#595959",
    overflow: "hidden",
    fontFamily: "Montserrat_500Medium",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  avatar: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  username: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  shadow: {
    backgroundColor: "#fff",
    shadowColor: "#999",
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.54,
    elevation: 10,
  },
});
