import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import AddDecrease from "../AddDecrease";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ItemById } from "@/@types/app";

function DonationItem({
  item,
  deleteItem,
  setDonationItems,
}: {
  item: ItemById;
  deleteItem: (item: any) => void;
  setDonationItems: React.Dispatch<React.SetStateAction<ItemById[]>>;
}) {
  return (
    <View style={styles.item}>
      <Text style={[styles.text, { maxWidth: "50%" }]} numberOfLines={2}>
        {item?.name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 50,
          alignItems: "center",
        }}
      >
        <View>
          <AddDecrease
            handleRemoveItem={() => deleteItem(item)}
            setDonationItems={setDonationItems}
            currentItem={item}
          />
        </View>
        <TouchableOpacity onPress={() => deleteItem(item)}>
          <FontAwesome name="trash" color={"#ff0000"} size={20} />
        </TouchableOpacity>
      </View>
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
    borderColor: "#0D62AD",
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

export default DonationItem;
