import {
  Alert,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Modal } from "react-native";
import { StatusBar } from "react-native";

const PopUp = ({
  isVisible,
  closePopUp,
}: {
  isVisible: boolean;
  closePopUp: () => void;
}) => {
  const ModalRef = useRef(null);

  const handleOutsideClick = (event: GestureResponderEvent) => {
    // if (event.target === ModalRef.current) {
    //   closePopUp();
    // }
  };

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
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View style={styles.container}>
          <View ref={ModalRef} style={styles.popupContainer}>
            <Text>Selecione os itens que deseja doar</Text>
            <Text>Select</Text>
            <ScrollView style={{
              height: 200,
              marginTop: 10,
              marginBottom: 10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#f1f1f1",
            }}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Text key={index} style={{
                  fontSize: 16,
                  padding: 10,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  marginBottom: 5,
                }} >Item {index + 1}</Text>
              ))}
            </ScrollView>
          </View>
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
    width: "80%",
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
});

export default PopUp;
