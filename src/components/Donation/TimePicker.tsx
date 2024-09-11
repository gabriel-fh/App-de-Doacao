import { useState } from "react";
import Picker from "../Picker";
import PopUp from "../PopUp";
import { Text } from "react-native";
import Button from "../Button";

function TimePicker() {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <>
      <Picker
        title="Hora"
        placeholder="HH:MM"
        icon="clock-o"
        iconSize={20}
        onPress={() => setShowPopUp(true)}
      />

      {showPopUp && (
        <PopUp isVisible={showPopUp} closePopUp={() => setShowPopUp(false)}>
          <Text>Vasco</Text>
          <Button text="Confirmar" onPress={() => console.log("a")} />
        </PopUp>
      )}
    </>
  );
}

export default TimePicker;
