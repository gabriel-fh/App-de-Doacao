import React, { useRef, useState } from "react";
import Button from "../Button";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { theme } from "@/Theme/theme";
import moment from "moment";
import { MarkedDates } from "react-native-calendars/src/types";

const CustomCalendar = ({
  selectedDate,
  setSelectedDate,
  setShowCalendar,
  startDate,
  endDate,
}: {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  startDate: string;
  endDate: string;
}) => {
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
    monthNamesShort: ["Jan.", "Fev.", "Mar.", "Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."],
    dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
    today: "Hoje",
  };

  LocaleConfig.defaultLocale = "pt-BR";

  const today = moment().format("YYYY-MM-DD");

  const [selected, setSelected] = useState(selectedDate || today);

  const disabledDates: MarkedDates = {
    "2024-10-15": { disabled: true, inactive: true},
  };

  return (
    <>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true,  },
          ...disabledDates
        }}
        minDate={today}
        maxDate={endDate}
        hideExtraDays
        disableAllTouchEventsForDisabledDays
        disableAllTouchEventsForInactiveDays
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
