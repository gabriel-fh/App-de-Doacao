import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { theme } from "@/Theme/theme";

const Searchbar = ({
  setSearchParam,
  searchParam,
}: {
  setSearchParam: (value: string) => void;
  searchParam: string;
}) => {
  const handleSearch = (text: string) => {
    setSearchParam(text);
  };
  return (
    <View style={styles.searchbar}>
      <TextInput
        placeholder="Buscar Campanhas"
        style={styles.textInput}
        value={searchParam}
        onChangeText={handleSearch}
      />

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
    borderColor: theme.primary,
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
    backgroundColor: theme.primary,
    borderRadius: 10,
    height: "110%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
  },
});

export default Searchbar;
