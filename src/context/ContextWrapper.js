import dayjs from "dayjs";
import React from "react";
import GlobalContext from "./GlobalContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { getItem, getQueryItem, setItem } from "../firebase/FirebaseUtil";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    case "initialize":
      return [...payload];
    default:
      return state;
  }
}

export default function ContextWrapper({ children }) {
  const [user, setUser] = React.useState(null);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [showLoading, setShowLoading] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState(null);

  const [monthIndex, setMonthIndex] = React.useState(dayjs().month());
  const [selectedDay, setSelectedDay] = React.useState(dayjs());
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [labels, setLabels] = React.useState([]);
  const [savedEvents, dispatchCalEvent] = React.useReducer(
    savedEventsReducer,
    []
  );

  const filteredEvents = React.useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  React.useEffect(() => {
    if (selectedDay) setMonthIndex(selectedDay.month());
  }, [selectedDay]);

  React.useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.labels === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  React.useEffect(() => {
    !showEventModal && setSelectedEvent(null);
  }, [showEventModal]);

  React.useEffect(() => {
    if (!user && !initialLoading) {
      const events = JSON.parse(localStorage.getItem("local-events"));
      dispatchCalEvent({ type: "initialize", payload: events ? events : [] });
    }
  }, [user, initialLoading]);

  React.useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getItem("users", user.uid)
            .then((docSnap) => {
              if (docSnap.exists()) {
                setUser(docSnap.data());
                resetApp();
              } else {
                const _user = {
                  id: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                };
                setItem("users", user.uid, _user)
                  .then((docRef) => {
                    setUser(_user);
                    resetApp();
                  })
                  .catch((error) => {
                    setToastMessage("Error in Sign in. Please try again.");
                    setInitialLoading(false);
                    setShowLoading(false);
                  });
              }
            })
            .catch((error) => {
              setToastMessage("Network error. Please try again.");
              setInitialLoading(false);
              setShowLoading(false);
            });
        } else {
          setUser(null);
          resetApp();
        }
      }),
    []
  );

  const resetApp = () => {
    setMonthIndex(dayjs().month());
    setSelectedDay(dayjs());
    setSelectedEvent(null);
    setInitialLoading(false);
    setShowLoading(false);
  };

  React.useEffect(() => {
    if (user) {
      getQueryItem("events", "createdBy", "==", user.id)
        .then((querySnapshot) => {
          let _payload = [];
          querySnapshot.forEach((doc) => {
            _payload.push({ id: doc.id, ...doc.data() });
          });
          dispatchCalEvent({ type: "initialize", payload: _payload });
        })
        .catch((error) => {
          setToastMessage("Error in syncing events. Please try again.");
        });
    }
  }, [user]);

  React.useEffect(() => {
    if (toastMessage) {
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }
  }, [toastMessage]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        monthIndex,
        setMonthIndex,
        selectedDay,
        setSelectedDay,
        showEventModal,
        setShowEventModal,
        savedEvents,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        filteredEvents,
        initialLoading,
        showLoading,
        setShowLoading,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
