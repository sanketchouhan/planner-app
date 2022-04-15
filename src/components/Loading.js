import React from "react";
import logo from "../assets/calendar.png";

export default function Loading() {
  return (
    <div className="h-screen w-full bg-black bg-opacity-50 fixed left-0 top-0 flex justify-center items-center z-50">
      <img src={logo} alt="App_logo" className="mb-2 w-12 h-12" />
    </div>
  );
}
