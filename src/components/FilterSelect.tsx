import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFetchItems } from "@/hooks/Campaign/useFetchItems";
import Badge from "./Badge";
import { Item } from "@/@types/app";
import { theme } from "@/Theme/theme";
import PopUp from "./PopUp";

const FilterSelect = ({
  donationItems,
  selectItem,
}: {
  donationItems: Item[];
  selectItem: (item: Item) => void;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: items, isLoading } = useFetchItems();

  return (
    <>
      <TouchableOpacity
        style={styles.itemFilter}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.itemText}>Filtrar</Text>
        <FontAwesome5
          name="caret-down"
          size={21}
          color="#fff"
          style={{ marginBottom: 5 }}
        />
      </TouchableOpacity>
      {/* 
      <Modal visible={showModal} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
      <PopUp isVisible={showModal} closePopUp={() => setShowModal(false)}>
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            height: "50%",
            borderRadius: 10,
            // padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Montserrat_600SemiBold" }}>
            Filtrar Itens
          </Text>
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" color={theme.primary} />
            ) : (
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  gap: 10,
                  paddingTop: 10,
                }}
              >
                {items.map((item, idx) => (
                  <TouchableOpacity key={idx} onPress={() => selectItem(item)}>
                    <Badge
                      text={item.name}
                      selected={donationItems.includes(item)}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </PopUp>
    </>
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
    fontSize: 16,
    color: "#fff",
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default FilterSelect;
