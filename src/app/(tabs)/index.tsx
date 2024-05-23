import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import NewsCard from "@/components/NewsCard";
import CampaignCard from "@/components/CampaignCard";
import Carousel from "react-native-reanimated-carousel";

const index = () => {
  const width = Dimensions.get("window").width;

  const numbers = [1, 2, 3, 4, 5];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        marginHorizontal: 12,
        paddingVertical: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "800" }}>Campanhas</Text>
      <Carousel
        loop
        width={width}
        height={width / 2.5}
        data={numbers}
        mode="horizontal-stack"
        modeConfig={{}}
        scrollAnimationDuration={1000}
        style={{ flex: 1 }}
        renderItem={({ index }) => <CampaignCard key={index} />}
      />

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>Notícias</Text>

        {Array.from({ length: 3 }).map((_, index) => (
          <NewsCard key={index} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default index;
