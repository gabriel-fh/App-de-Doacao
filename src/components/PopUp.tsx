import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native";
import { StatusBar } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Badge from "./Badge";
import Button from "./Button";
import { router } from "expo-router";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const PopUp = ({
  isVisible,
  closePopUp,
}: {
  isVisible: boolean;
  closePopUp: () => void;
}) => {
  const [items, setItems] = useState([]);

  // Função que seleciona ou deseleciona um item
  const selectItem = (newItem) => {
    // Se o item já estiver na lista, remove ele se não adiciona
    if (items.includes(newItem)) {
      setItems((prevItems) => prevItems.filter((item) => item !== newItem));
      return;
    } else {
      setItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const data = [
    "casaco",
    "blusa de frio",
    "cobertor",
    "batata",
    "sla porra",
    "vasco",
    "esquema de piramide",
    "droga",
    "chinelo",
    "cachorro",
    "gato",
    "saxofodase",
    "gremio",
    "eu tava",
    "com meus manos",
    "la na minha quebrada",
    "e chegou ",
    "o Wanderlei",
    "querendo dá ideia errada",
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      presentationStyle={"overFullScreen"}
    >
      <StatusBar
        hidden
        barStyle="light-content"
        backgroundColor={"rgba(0,0,0,0.5)"}
      />
      <TouchableWithoutFeedback onPress={closePopUp}>
        <GestureHandlerRootView style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.popupContainer}>
              <Text style={styles.subTitle}>
                Selecione itens que deseja doar
              </Text>
              <ScrollView
                style={{ maxHeight: 300, paddingBottom: 10 }}
                nestedScrollEnabled={true}
              >
                <View style={styles.badgeContainer}>
                  {data.map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => selectItem(item)}
                    >
                      <Badge text={item} selected={items.includes(item)} />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              <View style={styles.pickersContainer}>
                <View style={styles.dateTime}>
                  <Text style={styles.dateTimeText}>Data</Text>
                  <View style={styles.iconText}>
                    <Text style={{ color: "#666" }}>DD/MM/YYYY</Text>
                    <FontAwesome name="calendar" size={20} color={"#0D62AD"} />
                  </View>
                </View>
                <View style={styles.dateTime}>
                  <Text style={styles.dateTimeText}>Hora</Text>
                  <View style={styles.iconText}>
                    <Text style={{ color: "#666" }}>HH:MM</Text>
                    <FontAwesome name="clock-o" size={20} color={"#0D62AD"} />
                  </View>
                </View>
              </View>
              <Button
                text={"Continuar"}
                onPress={() => {
                  closePopUp();
                  router.navigate("Donation/Donation");
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupContainer: {
    maxHeight: 550,
    backgroundColor: "white",
    borderRadius: 15,
    gap: 10,
    width: "90%",
    paddingVertical: 30,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  subTitle: {
    fontSize: 17,
  },
  badgeContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  pickersContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  dateTime: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0D62AD",
    width: 140,
    height: 50,
    borderRadius: 10,
  },
  dateTimeText: {
    position: "absolute",
    top: -14,
    backgroundColor: "#ffffff",
    paddingHorizontal: 5,
    left: 15,
    fontSize: 17,
    color: "#0D62AD",
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default PopUp;
