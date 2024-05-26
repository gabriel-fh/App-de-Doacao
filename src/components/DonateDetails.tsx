import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Picker from "./Picker";
import Button from "./Button";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { router } from "expo-router";
import Badge from "./Badge";
import CustomCalendar from "./CustomCalendar";
import PopUp from "./PopUp";

const DonateDetails = ({ closePopUp }) => {
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

  const today = toDateId(new Date());

  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [showCalendar, setShowCalendar] = useState(false);

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

  const formatedDate = (date) => {
    return date?.split("-").reverse().join("/");
  };

  return (
    <View>
      <Text style={styles.subTitle}>Selecione itens que deseja doar</Text>
      <ScrollView
        style={{ maxHeight: 300, paddingBottom: 10 }}
        nestedScrollEnabled={true}
      >
        <View style={styles.badgeContainer}>
          {data.map((item, idx) => (
            <TouchableOpacity key={idx} onPress={() => selectItem(item)}>
              <Badge text={item} selected={items.includes(item)} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.pickersContainer}>
        <Picker
          title="Data"
          placeholder={formatedDate(selectedDate) || "DD/MM/YY"}
          icon="calendar"
          iconSize={20}
          onPress={() => setShowCalendar(!showCalendar)}
        />
        {showCalendar && (
          <PopUp
            isVisible={showCalendar}
            closePopUp={() => setShowCalendar(false)}
          >
            <CustomCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setShowCalendar={setShowCalendar}
            />
          </PopUp>
        )}
        <Picker
          title="Hora"
          placeholder="HH:MM"
          icon="clock-o"
          iconSize={20}
          onPress={() => console.log}
        />
      </View>
      <Button
        text={"Continuar"}
        onPress={() => {
          closePopUp();
          router.navigate("Donation/Donation");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default DonateDetails;
