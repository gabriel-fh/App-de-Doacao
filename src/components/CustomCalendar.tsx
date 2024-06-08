import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import Button from "./Button";
import {
  // Calendar,
  CalendarListRef,
  CalendarTheme,
  toDateId,
} from "@marceloterreiro/flash-calendar";
import { addMonths, subMonths, startOfMonth } from "date-fns";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { theme } from "@/Theme/theme";
import moment from "moment";

const CustomCalendar = ({ selectedDate, setSelectedDate, setShowCalendar }) => {
  const getDisabledDates = () => {
    const today = moment().format("YYYY-MM-DD");
    const disabledDates = {};
    const startDate = moment("2020-01-01"); // Ajuste a data de início conforme necessário
    const endDate = moment(today);

    for (let m = startDate; m.isBefore(endDate); m.add(1, "days")) {
      const date = m.format("YYYY-MM-DD");
      disabledDates[date] = { disabled: true, disableTouchEvent: true };
    }

    return disabledDates;
  };

  const disabledDates = getDisabledDates();

  LocaleConfig.locales["pt-BR"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan.",
      "Fev.",
      "Mar.",
      "Abr.",
      "Mai.",
      "Jun.",
      "Jul.",
      "Ago.",
      "Set.",
      "Out.",
      "Nov.",
      "Dez.",
    ],
    dayNames: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
    today: "Hoje",
  };

  LocaleConfig.defaultLocale = "pt-BR";

  const today = moment().format("YYYY-MM-DD");

  const [selected, setSelected] = useState(selectedDate || today);

  // const disabledDates = {
  //   '2024-06-10': { disabled: true, disableTouchEvent: true},
  //   '2024-06-15': { disabled: true, disableTouchEvent: true },
  //   '2024-06-20': { disabled: true, disableTouchEvent: true }
  // };

  return (
    <>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true },
          ...disabledDates,
        }}
        hideExtraDays
        theme={{
          arrowColor: theme.primary,
          todayTextColor: theme.primary,
          selectedDayBackgroundColor: theme.primary,
          selectedDayTextColor: "#ffffff",
          textSectionTitleColor: theme.primary,
          textDayHeaderFontFamily: "Montserrat_500Medium",
          textDayHeaderFontSize: 13,
          textDayFontFamily: "Montserrat_500Medium",
          // textDayFontSize: 14,
          textMonthFontFamily: "Montserrat_600SemiBold",
          textMonthFontSize: 16,
          todayBackgroundColor: "#E2E8F0",
          textDisabledColor: "#BEC1C4",
        }}
      />
      <Button
        text="Confirmar"
        onPress={() => {
          setSelectedDate(selected);
          setShowCalendar(false);
        }}
      />
    </>
  );
};

// const theme: CalendarTheme = {
//   itemWeekName: { content: { color: "#0D62AD", fontWeight: 600 } },
//   itemDay: {
//     idle: ({ isPressed, isWeekend }) => ({
//       container: {
//         backgroundColor: isPressed ? "#666" : "transparent",
//         borderRadius: 30,
//       },
//       content: {
//         color:
//           isWeekend && isPressed
//             ? "#fff"
//             : isWeekend
//             ? "#0D62AD"
//             : isPressed
//             ? "#ffffff"
//             : "#000000",
//         fontWeight: 400,
//       },
//     }),
//     today: ({ isPressed, isWeekend }) => ({
//       container: {
//         borderColor: "#0D62AD",
//         borderRadius: 30,
//         backgroundColor: isPressed ? "#666" : "transparent",
//       },
//       content: {
//         color:
//           isWeekend && isPressed
//             ? "#fff"
//             : isWeekend
//             ? "#0D62AD"
//             : isPressed
//             ? "#ffffff"
//             : "#000000",
//       },
//     }),
//   },
// };

export default CustomCalendar;
