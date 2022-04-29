import React from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import logo from "../assets/calendar.png";
import googleLogo from "../assets/google.png";
import leftChevron from "../assets/leftchevron.png";
import rightChevron from "../assets/rightchevron.png";
import { signInWithGoogle, signOutWithGoogle } from "../firebase/FirebaseUtil";
import Notification from "./Notification";

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

  const handelSignin = () => {
    setShowLoading(true);
    signInWithGoogle().catch((error) => {
      setToastMessage("Error in Sign in. Please try again.");
      setShowLoading(false);
    });
  };

  function handleSignOut() {
    setShowLoading(true);
    signOutWithGoogle().catch((error) => {
      setToastMessage("Error in Sign out. Please try again.");
      setShowLoading(false);
    });
  }

  return (
    <div className="px-2 sm:px-5 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="App_logo" className="mr-2 w-12 h-12" />
        <h1 className="hidden sm:block sm:mr-6 md:mr-10 text-xl text-gray-500 font-bold">
          Planner
        </h1>
        <button
          onClick={handleReset}
          className="border rounded py-2 px-2 sm:px-4 mr-1 sm:mr-3 md:mr-5"
        >
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <img
            src={leftChevron}
            alt="leftChevron"
            className="w-6 h-6 cursor-pointer text-gray-600 sm:mx-2"
          />
        </button>
        <button onClick={handleNextMonth}>
          <img
            src={rightChevron}
            alt="rightChevron"
            className="w-6 h-6 cursor-pointer text-gray-600 sm:mx-2"
          />
        </button>
        <h2 className="ml-2 sm:ml-3 md:ml-4 text-md sm:text-lg text-gray-600 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
      <div className="flex items-center gap-2 sm:gap-5 md:gap-10">
        <Notification />
        {user ? (
          <img
            src={user.photoURL}
            alt="user"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={handleSignOut}
          />
        ) : (
          <button
            onClick={handelSignin}
            className="flex items-center px-3 sm:px-4 py-3 cursor-pointer text-gray-600 rounded border shadow-md hover:shadow-lg"
          >
            <img src={googleLogo} alt="logo" className="w-5 h-5" />
            <span className="hidden sm:block ml-2">Sign In</span>
          </button>
        )}
      </div>
    </div>
  );
}
