import { Text, View, Image, StyleSheet } from "react-native";
import React from "react";

const NewsCard = () => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <Image
        source={{ uri: "https://picsum.photos/350/150" }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Enchentes no Rio Grande do Sul</Text>

      <Text style={styles.description}>
        Nesta campanha nosso foco é arrecadar roupas de frio para ajudar n
        inverno sombrio Nesta campanha nosso foco é arrecadar roupas de frio
        para ajudar no inverno sombrio
      </Text>

      <View style={styles.userContainer}>
        <Image
          source={{ uri: "https://picsum.photos/20" }}
          style={styles.avatar}
          resizeMode="contain"
        />
        <Text style={styles.username}>acao.comunitaria.unilasalle</Text>
      </View>
    </View>
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
    width: 350,
    height: 150,
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
    borderColor: "#0D62AD", 
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
