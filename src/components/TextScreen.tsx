import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CloseModalButton from "./CloseModalButton";
import Markdown from "react-native-markdown-display";

const TextScreen = ({ markdown }: { markdown: string }) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ height: "100%" }}
    >
      <CloseModalButton />
      <View style={styles.container}>
        <Markdown>{markdown}</Markdown>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TextScreen;
