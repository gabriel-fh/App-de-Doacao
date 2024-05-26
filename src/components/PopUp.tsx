import {
  Alert,
  GestureResponderEvent,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Modal } from "react-native";
import { StatusBar } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Badge from "./Badge";
import Button from "./Button";
import { router } from "expo-router";

const PopUp = ({
  isVisible,
  closePopUp,
}: {
  isVisible: boolean;
  closePopUp: () => void;
}) => {


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
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.popupContainer} >
              <Text style={styles.subTitle}>
                Selecione itens que deseja doar
              </Text>
              <ScrollView style={{height: 300, paddingBottom: 50}} nestedScrollEnabled={true}>
                <View
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {[
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
                    "casaco",
                    "eu tava",
                    "com meus manos",
                    "la na minha quebrada",
                    "e chegou ",
                    "o Wanderlei",
                    "querendo dá ideia errada",
                  ].map((item, idx) => (
                    <Badge key={idx} text={item} />
                  ))}
                </View>
              </ScrollView>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 20,
                }}
              >
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
        </View>
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
    backgroundColor: "white",
    borderRadius: 15,
    gap: 10,
    width: "90%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 19,
  },
  subTitle: {
    fontSize: 17,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 15,
  },
  dateTime: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0D62AD",
    width: 150,
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
