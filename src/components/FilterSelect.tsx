import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const FilterSelect = () => {
  return (
    <View style={styles.itemFilter}>
      <Text style={styles.itemText}>Filtrar</Text>
      <FontAwesome5 name="caret-down" size={20} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  itemFilter: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8e98de",
    borderRadius: 10,
    paddingHorizontal: 24,
    maxHeight: 50,
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default FilterSelect;
