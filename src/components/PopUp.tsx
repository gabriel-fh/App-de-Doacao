import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Modal } from "react-native";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";


const PopUp = ({
  isVisible,
  closePopUp,
  children
}: {
  isVisible: boolean;
  children: React.ReactNode;
  closePopUp: () => void;
}) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      presentationStyle={"overFullScreen"}
    >
      <TouchableWithoutFeedback onPress={closePopUp} >
        <GestureHandlerRootView style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.popupContainer}>
              {children}
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
    paddingVertical: 25,
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
});

export default PopUp;
