import React from "react";
import { getMonth } from "./util";
import CalenderHeader from "./components/CalenderHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import Login from "./components/Login";
import AppLoading from "./components/AppLoading";
import Loading from "./components/Loading";

function App() {
  const [currentMonth, setCurrentMonth] = React.useState(getMonth());
  const {
    user,
    monthIndex,
    showEventModal,
    initialLoading,
    showLoading,
    toastMessage,
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  if (initialLoading) return <AppLoading />;

  return (
    <>
      {toastMessage && (
        <div
          className="px-5 py-4 rounded-lg bg-gray-900 bg-opacity-80 text-white font-sans fixed left-2/4 bottom-5 z-50"
          style={{ transform: "translateX(-50%)" }}
        >
          {toastMessage}
        </div>
      )}
      {showLoading && <Loading />}
      {user ? (
        <>
          {showEventModal && <EventModal />}
          <div className="h-screen flex flex-col font-sans">
            <CalenderHeader />
            <div className="flex flex-1">
              <Sidebar />
              <Month month={currentMonth} />
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
