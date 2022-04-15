import dayjs from "dayjs";
import React from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";
import leftChevron from "../assets/leftchevron.png";
import rightChevron from "../assets/rightchevron.png";

export default function SmallCalender() {
  const [currentMonthIdx, setCurrentMonthIdx] = React.useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = React.useState(getMonth());

  const { monthIndex, selectedDay, setSelectedDay } =
    React.useContext(GlobalContext);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  React.useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  React.useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function getCurrentDayClass(day) {
    if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY"))
      return "bg-blue-600 text-white rounded-full";
    else if (day.format("DD-MM-YY") === selectedDay.format("DD-MM-YY"))
      return "bg-blue-100 text-blue-600 rounded-full";
    else return "";
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between items-center mb-2">
        <p className="text-gray-500 font-semibold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div className="flex items-center">
          <button onClick={handlePrevMonth}>
            <img
              src={leftChevron}
              alt="leftChevron"
              className="w-5 h-5 mx-1 cursor-pointer"
            />
          </button>
          <button onClick={handleNextMonth}>
            <img
              src={rightChevron}
              alt="rightChevron"
              className="w-5 h-5 mx-1 cursor-pointer"
            />
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span className="text-sm py-1 text-center" key={i}>
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`py-1 w-full ${getCurrentDayClass(day)}`}
                onClick={() => {
                  setSelectedDay(day);
                }}
              >
                <span className={"text-sm"}>{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
