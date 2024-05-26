import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import Button from "./Button";
import {
  Calendar,
  CalendarListRef,
  CalendarTheme,
  toDateId,
} from "@marceloterreiro/flash-calendar";
import { addMonths, subMonths, startOfMonth } from "date-fns";

const today = toDateId(new Date());

const CustomCalendar = ({ selectedDate, setSelectedDate, setShowCalendar }) => {
  const [date, setDate] = useState(selectedDate || today);
  const ref = useRef<CalendarListRef>(null);

  const handleSelectDate = () => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  function getNextMonth(date) {
    const currentDate = new Date(date);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const nextMonth = (currentMonth + 1) % 12;
    const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
    const nextMonthDate = new Date(nextYear, nextMonth, 1);
    return nextMonthDate;
  }

  const getDisabledDates = () => {
    const today = new Date();
    const disabledDates = [];

    for (let i = 1; i < today.getDate(); i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      const formattedDate = toDateId(date);
      disabledDates.push(formattedDate);
    }

    return disabledDates;
  };

  const disabledDates = getDisabledDates();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  return (
    <View>
      <Calendar
        calendarActiveDateRanges={[
          {
            startId: date,
            endId: date,
          },
        ]}
        onCalendarDayPress={setDate}
        calendarFormatLocale="pt-BR"
        theme={theme}
        calendarDisabledDateIds={disabledDates}
        calendarMonthId={today}
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
    }),
  },
};

export default CustomCalendar;
