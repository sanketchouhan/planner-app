import React from "react";

function ToastMessage({ toastMessage }) {
  return (
    <div
      className="px-5 py-2 rounded-lg text-base bg-gray-900 bg-opacity-70 text-white font-sans fixed left-2/4 bottom-5 z-50"
      style={{ transform: "translateX(-50%)" }}
    >
      {toastMessage}
    </div>
  );
}

export default ToastMessage;
