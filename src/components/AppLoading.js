import React from "react";
import logo from "../assets/calendar.png";

export default function AppLoading() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <img src={logo} alt="App_logo" className="mb-2 w-12 h-12" />
      <p className="text-xl text-gray-800 font-bold">Welcome to Planner</p>
      <p className="text-base text-gray-500">Loading...</p>
    </div>
  );
}
