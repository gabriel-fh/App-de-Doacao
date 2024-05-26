import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const AddDecrease = ({handleRemoveItem}: {handleRemoveItem: () => void}) => {
  const [count, setCount] = useState(1);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={count === 0}
        onPress={
          count === 0
            ? () => {
              setCount((prev) => prev - 1);}
            : handleRemoveItem
        }
      >
        <FontAwesome name="minus" color={"#0D62AD"} size={17} />
      </TouchableOpacity>
      <Text style={{ fontSize: 17 }}>
        {count}
      </Text>
      <TouchableOpacity onPress={() => setCount((prev) => prev + 1)}>
        <FontAwesome name="plus" color={"#0D62AD"} size={17} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    width: 100,
    // maxWidth: 200,
  },
});

export default AddDecrease;
