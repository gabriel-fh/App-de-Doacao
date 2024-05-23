import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import NewsCard from "@/components/NewsCard";

const index = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <Text className="text-2xl font-bold">index</Text>

      <View style={{ paddingHorizontal: 12, gap: 8 }}>
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
