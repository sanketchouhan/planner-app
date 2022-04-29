import React from "react";
import CreateEventButton from "./CreateEventButton";
import Labels from "./Labels";
import SmallCalender from "./SmallCalender";

export default function Sidebar() {
  return (
    <aside className="border p-5 hidden md:block md:w-56 lg:w-64">
      <CreateEventButton />
      <SmallCalender />
      <Labels />
    </aside>
  );
}
