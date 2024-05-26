import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Picker from "./Picker";
import Button from "./Button";
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
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  const validateFields = () => {
    if (items.length === 0 && !selectedDate) {
      setErrorMsg(
        "Selecione pelo menos um item para doação e escolha uma data"
      );
      return false;
    }

    if (items.length === 0) {
      setErrorMsg("Selecione pelo menos um item para doação");
      return false;
    }

    if (!selectedDate) {
      setErrorMsg("Selecione uma data para a doação");
      return false;
    }

    setErrorMsg("");
    return true;
  };

  const handleConfirm = () => {
    if (validateFields()) {
        closePopUp();
        router.navigate("Donation/Donation");
    }
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
      {/* {errorMsg && ( */}
        <Text style={{ color: "red", marginVertical: 10 }}>{errorMsg}</Text>
    {/* //   )} */}
      <Button text={"Continuar"} onPress={() => handleConfirm()} />
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
    marginTop: 30,
  },
});

export default DonateDetails;
