import React from "react";
import { useState } from "react";
import Picker from "./Picker";
import PopUp from "../PopUp";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Button from "../Button";
// import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { theme } from "@/Theme/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { FlatList } from "react-native-gesture-handler";
import RadioButton from "../RadioButton";

type TimePickerProps = {
  value: any;
  setValue: any;
  items: {
    label: string;
    value: string;
  }[];
  disabled: boolean;
};

function TimePicker({
  items,
  value,
  setValue,
  disabled,
}: TimePickerProps) {
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <>

      <TouchableOpacity
        onPress={() => setShowPopUp(true)}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          borderWidth: 2,
          borderColor: disabled ? "#acacac" : theme.primary,
          height: 50,
          borderRadius: 10,
        }}
        disabled={disabled}
      >
        <Text
          style={[
            styles.title,
            { color: disabled ? "#acacac" : theme.primary },
          ]}
        >
          Hora
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            // paddingLeft: 10,
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{
              color: "#666",
              fontFamily: "Montserrat_500Medium",
            }}
          >
            {!value ? "HH:MM" : value}
          </Text>
          <AntDesign
            name={"clockcircleo"}
            size={20}
            color={disabled ? "#acacac" : theme.primary}
          />
        </View>
      </TouchableOpacity>
      <PopUp isVisible={showPopUp} closePopUp={() => setShowPopUp(false)}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Montserrat_600SemiBold",
            textAlign: "left",
            marginBottom: 10,
          }}
        >
          Escolha um horário
        </Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => {
            return (
              <RadioButton
                item={item}
                isSelected={item.value === value}
                onSelect={() => {
                  setValue(item.value);
                }}
              />
            );
          }}
        />
        {error && (
          <Text
            style={{
              color: "red",
              fontFamily: "Montserrat_500Medium",
              textAlign: "center",
              paddingHorizontal: 12,
            }}
          >
            {error}
          </Text>
        )}
        <Button
          text={"Confirmar"}
          onPress={() => {
            if (value) {
              setShowPopUp(false)
              setError(null)
            } else {
              setError("Selecione um horário")
            }
          }}
          style={{ marginTop: 20 }}
        />
      </PopUp>
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
