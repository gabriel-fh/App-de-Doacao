import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { theme } from "@/Theme/theme";

type RadioButtonProps = {
  item: {
    label: string;
    value: string;
  };
  onSelect: () => void;
  isSelected: boolean;
};

const RadioButton = ({ item, isSelected, onSelect }: RadioButtonProps) => {


  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: !!isSelected ? theme.primary : "#acacac",
        width: "100%",
        // height: 50,
        marginTop: 10,
      }}
      onPress={onSelect}
    >
      <Text>{item.label}</Text>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 50,
          // backgroundColor: '#acacac',
          borderWidth: 2,
          borderColor: !!isSelected ? theme.primary : "#acacac",
          backgroundColor: !!isSelected ? theme.primary : "#fff",
        }}
      />
    </TouchableOpacity>
  );
};

export default RadioButton;
