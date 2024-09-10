import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import CloseModalButton from "@/components/CloseModalButton";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import { useFetchNewsById } from "@/hooks/News/useFetchNewsById";
import { theme } from "@/Theme/theme";
import { News } from "@/@types/app";

const NewsModal = () => {
  const { newsId } = useLocalSearchParams();

  const { data: newsInfo, isLoading } = useFetchNewsById(
    Array.isArray(newsId) ? newsId[0] : newsId
  );

  const DATA: News = {
    id: 1,
    title: "Titulo da noticia",
    subtitle: "Subtitulo da noticia",
    description:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum.",
    banners: ["https://picsum.photos/200/300", "https://picsum.photos/201/300"],
  };

  // if (isLoading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <ActivityIndicator
  //         size={"large"}
  //         color={theme.primary}
  //       ></ActivityIndicator>
  //     </View>
  //   );
  // }

  return false ? (
    <Text> loading...</Text>
  ) : DATA ? (
    <View style={{ position: "relative", flex: 1, backgroundColor: "#fff" }}>
      <CloseModalButton />

      <ScrollView style={styles.container}>
        {DATA?.banners.length > 0 && (
          <Image
            source={{ uri: DATA.banners[0] }}
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
            <Text style={styles.title}>{DATA.title}</Text>
            {DATA.subtitle && (
              <Text style={styles.subtitle}>{DATA.subtitle}</Text>
            )}
            <Text style={{ ...styles.description }}>{DATA.description}</Text>
          </View>
          {DATA?.banners.length > 1 && (
            <View>
              <Text style={{ ...styles.subtitle, fontSize: 18 }}>Galeria</Text>
              <FlatList
                data={DATA.banners}
                keyExtractor={(item) => item}
                horizontal
                style={{ marginTop: 10 }}
                renderItem={({ item }) => (
                  <Image
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

  galleryImage: {
    height: 200,
    width: 300,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default NewsModal;
