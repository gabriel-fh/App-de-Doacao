import { useState } from "react";
import Picker from "./Picker";
import PopUp from "../PopUp";
import { StyleSheet, View, Text } from "react-native";
import Button from "../Button";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { theme } from "@/Theme/theme";
import DropDownPicker from "react-native-dropdown-picker";

type TimePickerProps = {
  value: any;
  setValue: any;
  items: any;
  setItems: any;
  disabled: boolean;
};

function TimePicker({
  items,
  setItems,
  value,
  setValue,
  disabled,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <Picker
        title="Hora"
        placeholder="HH:MM"
        icon="clock-o"
        iconSize={20}
        onPress={() => setShowPopUp(true)}
      /> */}

      <View
        style={{
          gap: 10,
          width: 165,
        }}
      >
        <Text
          style={[
            styles.title,
            { color: disabled ? "#acacac" : theme.primary },
          ]}
        >
          Hora
        </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={[
            styles.select,
            {
              borderColor: disabled ? "#acacac" : theme.primary,
            },
          ]}
          placeholder="HH:MM"
          maxHeight={141}
          disabled={disabled}
          containerStyle={{}}
          labelStyle={{
          }}
          textStyle={{
            color:  disabled ? "#acacac" : '#000'
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    top: -14,
    backgroundColor: "#ffffff",
    paddingHorizontal: 5,
    left: 15,
    fontSize: 17,
    color: theme.primary,
    fontFamily: "Montserrat_600SemiBold",
    zIndex: 9999,
  },
  select: {
    borderWidth: 2,
    borderColor: theme.primary,
    borderRadius: 10,
    color: "#000",
    // margin: 2,
    // paddingHorizontal: 5,
    // paddingVertical: 3,
    // backgroundColor: '#3366FF',
    // width: 140
    // backgroundColor: 'crimson'
  },
});

export default TimePicker;
