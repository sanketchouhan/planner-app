import React from "react";
import { signInWithGoogle } from "../firebase/FirebaseUtil";
import logo from "../assets/google.png";
import appLogo from "../assets/calendar.png";
import GlobalContext from "../context/GlobalContext";

export default function Login() {
  const { setShowLoading, setToastMessage } = React.useContext(GlobalContext);

  const handelSignin = () => {
    setShowLoading(true);
    signInWithGoogle().catch((error) => {
      setToastMessage("Error in Sign in. Please try again.");
      setShowLoading(false);
    });
  };

  return (
    <div className="flex h-screen w-full justify-center items-center flex-col gap-8">
      <img src={appLogo} alt="App_logo" className="mb-2 w-16 h-16" />
      <div
        onClick={handelSignin}
        className="px-5 py-4 flex items-center gap-3 rounded-xl bg-gray-100 shadow-xl cursor-pointer"
      >
        <img src={logo} alt="login" className="w-6 h-6" />
        Sign in with Google
      </div>
    </div>
  );
}
