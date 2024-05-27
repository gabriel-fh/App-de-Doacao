import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Searchbar = () => {
  return (
    <View style={styles.searchbar}>
      <TextInput placeholder="Buscar Campanhas" style={styles.textInput} />

      <View style={styles.iconView}>
        <FontAwesome5 name="search" size={20} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderColor: "#0D62AD",
    borderWidth: 2,
    borderRadius: 10,
    maxHeight: 50,
    flex: 1,
    paddingLeft: 12,
    marginBottom: 12,
  },
  textInput: {
    marginVertical: 10,
    fontSize: 16,
    flex: 1,
    fontFamily: "Montserrat_600SemiBold",
  },
  iconView: {
    backgroundColor: "#0D62AD",
    borderRadius: 10,
    height: "110%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
  },
});

export default Searchbar;
