import React from "react";

const HistoryList = ({
  history,
  heading = "Rejected Perposals:",
  type = "Disputed",
}) => {
  return (
    <>
      <h2 className="text-lg font-bold text-gray-800">{heading}</h2>
      <ul>
        {[...history].reverse().map((item, index) => (
          <li
            key={index}
            className={`${
              type === "Disputed" ? "text-red-500" : " text-gray-900"
            } `}
          >
            ${item.amount} - {item.status ? item.status : "Pending"}
          </li>
        ))}
      </ul>
    </>
  );
};

export default HistoryList;
