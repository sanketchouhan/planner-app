import React from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import logo from "../assets/calendar.png";
import leftChevron from "../assets/leftchevron.png";
import rightChevron from "../assets/rightchevron.png";
import { signOutWithGoogle } from "../firebase/FirebaseUtil";

export default function CalenderHeader() {
  const { user, monthIndex, setMonthIndex, setShowLoading, setToastMessage } =
    React.useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  function handleSignOut() {
    setShowLoading(true);
    signOutWithGoogle()
      .catch((error) => {
        setToastMessage("Error in Sign out. Please try again.");
      })
      .finally(() => {
        setShowLoading(false);
      });
  }

  return (
    <div className="px-5 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="App_logo" className="mr-2 w-12 h-12" />
        <h1 className="mr-10 text-xl text-gray-500 font-bold">Planner</h1>
        <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <img
            src={leftChevron}
            alt="leftChevron"
            className="w-6 h-6 cursor-pointer text-gray-600 mx-2"
          />
        </button>
        <button onClick={handleNextMonth}>
          <img
            src={rightChevron}
            alt="rightChevron"
            className="w-6 h-6 cursor-pointer text-gray-600 mx-2"
          />
        </button>
        <h2 className="ml-4 text-lg text-gray-600 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
      <img
        src={user.photoURL}
        alt="user"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={handleSignOut}
      />
    </div>
  );
}
