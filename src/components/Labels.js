import React from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, setLabels } = React.useContext(GlobalContext);
  return (
    <>
      <p className="text-gray-500 font-semibold mt-10">Label</p>
      {labels.map(({ label, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              setLabels(
                labels.map((lbl) =>
                  lbl.label === label ? { label, checked: !checked } : lbl
                )
              )
            }
            className={`form-checkbox h-5 w-5 text-${label}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{label}</span>
        </label>
      ))}
    </>
  );
}
