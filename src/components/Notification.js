import React from "react";
import GlobalContext from "../context/GlobalContext";
import notificationLogo from "../assets/bell.png";
import { addItem } from "../firebase/FirebaseUtil";

function Notification() {
  const [newNotification, setNewNotification] = React.useState(true);
  const [showNotifocation, setShowNotifocation] = React.useState(false);
  const [showSyncBtn, setShowSyncBtn] = React.useState(false);
  const [notifocationMessage, setNotifocationMessage] = React.useState("");

  const { user, dispatchCalEvent } = React.useContext(GlobalContext);

  React.useEffect(() => {
    const localEvents = JSON.parse(localStorage.getItem("local-events"));
    if (user && localEvents) {
      setNotifocationMessage(
        "Events are available in current browser. Sync your events for global access."
      );
      setShowSyncBtn(true);
      setNewNotification(true);
    } else if (!user) {
      setNotifocationMessage(
        "You are not logged in. Your events will be available in current browser. Recommend you to login for global access."
      );
      setShowSyncBtn(false);
      setNewNotification(true);
    } else {
      setShowSyncBtn(false);
      setNotifocationMessage("No new notification");
      setNewNotification(false);
    }
  }, [user]);

  const handleShowNotification = () => {
    setShowNotifocation(!showNotifocation);
  };

  const syncEvents = () => {
    const localEvents = JSON.parse(localStorage.getItem("local-events"));
    localEvents.forEach((ev) => {
      delete ev.id;
      addItem("events", {
        ...ev,
        createdBy: user.id,
      }).then((doc) => {
        dispatchCalEvent({
          type: "push",
          payload: { id: doc.id, ...ev, createdBy: user.id },
        });
      });
    });
    localStorage.clear();
    setNewNotification(false);
  };

  return (
    <div className="relative">
      <img
        src={notificationLogo}
        alt=""
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={handleShowNotification}
      />
      {newNotification && (
        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-700 rounded-full" />
      )}
      {showNotifocation && (
        <div className="absolute top-8 right-6 w-56 p-5 bg-white rounded border shadow-lg">
          {notifocationMessage}
          {showSyncBtn && (
            <button
              type="button"
              onClick={syncEvents}
              className="block bg-blue-500 hover:bg-blue-600 px-6 py-1 mt-5 rounded text-white"
            >
              Sync
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;
