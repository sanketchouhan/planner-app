import React from "react";
import Image from "../assets/add-file.png";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const { setShowEventModal } = React.useContext(GlobalContext);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border py-2 px-4 rounded-full flex items-center shadow-md hover:shadow-xl"
    >
      <img src={Image} alt="Add_event" className="w-6 h-6" />
      <span className="pl-3 pr-5">Create</span>
    </button>
  );
}
