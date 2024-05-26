import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import Button from "./Button";
import {
  Calendar,
  CalendarTheme,
  toDateId,
} from "@marceloterreiro/flash-calendar";

const today = toDateId(new Date());

const CustomCalendar = ({ selectedDate, setSelectedDate, setShowCalendar }) => {
  const [date, setDate] = useState(selectedDate || today);
  // const [selectedDate, setSelectedDate] = useState(today);
  const handleSelectDate = () => {
    setSelectedDate(date);
    setShowCalendar(false);
  };
  return (
    <View>
      <Calendar
        calendarActiveDateRanges={[
          {
            startId: date,
            endId: date,
          },
        ]}
        calendarMonthId={today}
        onCalendarDayPress={setDate}
        calendarFormatLocale="pt-BR"
        theme={theme}
        calendarDisabledDateIds={['2024-05-25']}
      />
      <View style={{ marginTop: 20 }}>
        <Button text={"Confirmar"} onPress={() => handleSelectDate()} />
      </View>
    </View>
  );
};

const theme: CalendarTheme = {
  
  itemWeekName: { content: { color: "#0D62AD", fontWeight: 600 } },
  itemDay: {
    idle: ({ isPressed, isWeekend }) => ({
      container: {
        backgroundColor: isPressed ? "#666" : "transparent",
        borderRadius: 30,
      },
      content: {
        color:
          isWeekend && isPressed
            ? "#fff"
            : isWeekend
            ? "#0D62AD"
            : isPressed
            ? "#ffffff"
            : "#000000",
        fontWeight: 400,
      },
    }),
    today: ({ isPressed, isWeekend }) => ({
      container: {
        borderColor: "#0D62AD",
        borderRadius: 30,
        backgroundColor: isPressed ? "#666" : "transparent",
      },
      content: {
        color:
          isWeekend && isPressed
            ? "#fff"
            : isWeekend
            ? "#0D62AD"
            : isPressed
            ? "#ffffff"
            : "#000000",
      },
      active: ({ isEndOfRange, isStartOfRange }) => ({
        container: {
          backgroundColor: "#f00",
          borderTopLeftRadius: isStartOfRange ? 4 : 0,
          borderBottomLeftRadius: isStartOfRange ? 4 : 0,
          borderTopRightRadius: isEndOfRange ? 4 : 0,
          borderBottomRightRadius: isEndOfRange ? 4 : 0,
        },
        content: {
          color: "#ffffff",
        },
      }),
      
    }),
  },
};

export default CustomCalendar;
