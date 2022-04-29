import React from "react";
import { getMonth } from "./util";
import CalenderHeader from "./components/CalenderHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import AppLoading from "./components/AppLoading";
import Loading from "./components/Loading";
import ToastMessage from "./components/ToastMessage";

function App() {
  const [currentMonth, setCurrentMonth] = React.useState(getMonth());
  const {
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
      {toastMessage && <ToastMessage toastMessage={toastMessage} />}
      {showLoading && <Loading />}
      {showEventModal && <EventModal />}
      <div className="h-screen w-screen flex flex-col font-sans">
        <CalenderHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
}

export default App;
