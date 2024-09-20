import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ItemById } from "@/@types/app";
import { theme } from "@/Theme/theme";

const AddDecrease = ({
  handleRemoveItem,
  setDonationItems,
  currentItem,
}: {
  handleRemoveItem: () => void;
  setDonationItems: Dispatch<SetStateAction<ItemById[]>>;
  currentItem: ItemById;
}) => {


  const addItem = () => {
    setDonationItems((prev) =>
      prev.map((item) => {
        if (item.id === currentItem.id) {
          return { ...item, quantity: item?.quantity + 1 };
        } else {
          return item;
        }
      })
    );
  };

  const removeItem = () => {
    setDonationItems((prev) =>
      prev.map((item) => {
        if (item.id === currentItem.id) {
          return { ...item, quantity: item?.quantity - 1 };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={currentItem?.quantity === 0}
        onPress={
          currentItem?.quantity > 1
            ? () => {
                removeItem();
              }
            : handleRemoveItem
        }
      >
        <FontAwesome name="minus" color={theme.primary} size={17} />
      </TouchableOpacity>
      <Text style={{ fontSize: 17, fontFamily: "Montserrat_500Medium" }}>
        {currentItem?.quantity}
      </Text>
      <TouchableOpacity onPress={() => addItem()}>
        <FontAwesome name="plus" color={theme.primary} size={17} />
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
