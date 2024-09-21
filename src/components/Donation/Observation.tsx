import { theme } from "@/Theme/theme";
import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

function Observation({
  commentary,
  setCommentary,
}: {
  commentary: string;
  setCommentary: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: theme.primary,
        borderRadius: 10,
        paddingTop: 10,
        position: "relative",
      }}
    >
      <Text
        style={[
          styles.subTitle,
          {
            position: "absolute",
            top: -14,
            backgroundColor: "#ffffff",
            paddingHorizontal: 5,
            left: 15,
            fontSize: 17,
            color: theme.primary,
          },
        ]}
      >
        Observações:
      </Text>

      <TextInput
        placeholder={"Digite suas observações aqui (opcional)"}
        style={{
          flex: 1,
          marginRight: 4,
          padding: 10,
          borderRadius: 10,
          textAlignVertical: "top",
          fontFamily: "Montserrat_500Medium",
        }}
        placeholderTextColor="#545454"
        keyboardType={"default"}
        value={commentary}
        onChangeText={(text) => setCommentary(text)}
        selectionColor={theme.primary}
        numberOfLines={5}
        multiline={true}
        maxLength={250}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 4,
    fontFamily: "Montserrat_600SemiBold",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 7,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  username: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  subTitle: {
    fontSize: 17,
    fontFamily: "Montserrat_600SemiBold",
  },
  badgeContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default Observation;
