import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const FilterSelect = () => {
  return (
    <View style={styles.itemFilter}>
      <Text style={styles.itemText}>Filtrar</Text>
      <FontAwesome5 name="caret-down" size={21} color="#fff" style={{marginBottom: 5}} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemFilter: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "#0D62AD",
    borderRadius: 10,
    paddingHorizontal: 18,
    maxHeight: 50,
  },
  itemText: {
    fontSize: 17,
    color: "#fff",
    fontFamily: 'Poppins-Medium'
  },
});

export default FilterSelect;
