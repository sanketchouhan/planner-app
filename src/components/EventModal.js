import React from "react";
import rightChevron from "../assets/rightchevron.png";
import closeImg from "../assets/close.png";
import deleteImg from "../assets/delete.png";
import descImg from "../assets/edit.png";
import labelImg from "../assets/label.png";
import dateImg from "../assets/date.png";
import Image from "../assets/add-file.png";
import notesImg from "../assets/notes.png";

import GlobalContext from "../context/GlobalContext";
import { addItem, deleteItem, updateItem } from "../firebase/FirebaseUtil";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const {
    user,
    setShowEventModal,
    selectedDay,
    dispatchCalEvent,
    selectedEvent,
    setShowLoading,
    setToastMessage,
  } = React.useContext(GlobalContext);

  const [title, setTitle] = React.useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = React.useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [notes, setNotes] = React.useState(
    selectedEvent ? selectedEvent.notes : ""
  );
  const [selectedLabel, setSelectedLabel] = React.useState(
    selectedEvent ? selectedEvent.label : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    setShowLoading(true);
    const calenderEvent = {
      title,
      description,
      notes,
      label: selectedLabel,
      day: selectedDay.valueOf(),
      createdBy: user.id,
    };
    if (selectedEvent) {
      updateItem("events", selectedEvent.id, {
        title,
        description,
        notes,
        label: selectedLabel,
      })
        .then((res) => {
          dispatchCalEvent({
            type: "update",
            payload: { id: selectedEvent.id, ...calenderEvent },
          });
          setShowEventModal(false);
        })
        .catch((error) => {
          setToastMessage("Error in updating event. Please try again.");
        })
        .finally(() => setShowLoading(false));
    } else {
      addItem("events", calenderEvent)
        .then((docRef) => {
          dispatchCalEvent({
            type: "push",
            payload: { id: docRef.id, ...calenderEvent },
          });
          setShowEventModal(false);
        })
        .catch((error) => {
          setToastMessage("Error in adding event. Please try again.");
        })
        .finally(() => setShowLoading(false));
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setShowLoading(true);
    deleteItem("events", selectedEvent.id)
      .then((res) => {
        dispatchCalEvent({ type: "delete", payload: selectedEvent });
        setShowEventModal(false);
      })
      .catch((error) => {
        setToastMessage("Error in deleting event. Please try again.");
      })
      .finally(() => {
        setShowLoading(false);
      });
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg overflow-hidden shadow-2xl w-2/5">
        <header className="bg-gray-200 px-4 py-3 flex justify-between items-center">
          <img src={Image} alt="logo" className="w-7 h-7 mx-1 cursor-pointer" />
          <div className="flex items-center gap-5">
            {selectedEvent && (
              <button onClick={handleDelete}>
                <img
                  src={deleteImg}
                  alt="deleteImg"
                  className="w-5 h-5 mx-1 cursor-pointer"
                />
              </button>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <img
                src={closeImg}
                alt="closeImg"
                className="w-5 h-5 mx-1 cursor-pointer"
              />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-start gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Add title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-2 border-0 text-gray-600 text-xl font-semibold w-full border-b-2 border-gray-200 outline-none focus:ring-0 focus:border-blue-200"
            />
            <img
              src={dateImg}
              alt="dateImg"
              className="w-5 h-5 mx-1 justify-self-center self-center cursor-pointer"
            />
            <p>{selectedDay.format("dddd, MMMM DD")}</p>
            <img
              src={descImg}
              alt="descImg"
              className="w-5 h-5 mx-1 justify-self-center self-center cursor-pointer"
            />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Add a description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="py-2 border-0 text-gray-600 w-full border-b-2 border-gray-200 outline-none focus:ring-0 focus:border-blue-200"
            />
            <img
              src={labelImg}
              alt="labelImg"
              className="w-5 h-5 mx-1 justify-self-center self-center cursor-pointer"
            />
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <img
                      src={rightChevron}
                      alt="rightChevron"
                      className="w-5 h-5 mx-1 cursor-pointer"
                    />
                  )}
                </span>
              ))}
            </div>
            {selectedEvent && (
              <>
                <img
                  src={notesImg}
                  alt="notesImg"
                  className="w-5 h-5 mx-1 justify-self-center self-center cursor-pointer"
                />
                <textarea
                  type="text"
                  name="notes"
                  id="notes"
                  placeholder="Add note"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 outline-none focus:ring-0 focus:border-blue-200"
                />
              </>
            )}
          </div>
        </div>
        <footer className="flex justify-end w-full border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            {selectedEvent ? "Update" : "Save"}
          </button>
        </footer>
      </form>
    </div>
  );
}
