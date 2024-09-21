import React, { useState } from "react";
import Picker from "./Picker";
import CustomCalendar from "./CustomCalendar";
import PopUp from "../PopUp";

function DatePicker({
  formatedDate,
  selectedDate,
  setSelectedDate,
  startDate,
  endDate,
}: {
  formatedDate: (date: string) => string;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  endDate: string;
}) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <Picker
        title="Data"
        placeholder={formatedDate(selectedDate) || "DD/MM/YY"}
        icon="calendar"
        iconSize={20}
        onPress={() => setShowCalendar(!showCalendar)}
      />
      {showCalendar && (
        <PopUp
          isVisible={showCalendar}
          closePopUp={() => setShowCalendar(false)}
        >
          <CustomCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setShowCalendar={setShowCalendar}
            startDate={startDate}
            endDate={endDate}
          />
        </PopUp>
      )}
    </>
  );
}

export default DatePicker;
