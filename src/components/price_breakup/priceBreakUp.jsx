import React, { useState, useEffect } from "react";

export default function PriceBreakup(props) {
  const { data } = props;
  const [breakupData, setBreakupData] = useState([]);

  useEffect(() => {
    if (!data) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    const headers = [...doc.querySelectorAll("thead th")].map((th) =>
      th.textContent.trim()
    );

    const values = [...doc.querySelectorAll("tbody td")].map((td) =>
      td.textContent.trim()
    );

    const result = headers?.map((header, index) => ({
      property: header,
      price: values[index] || "",
    }));

    setBreakupData(result);
  }, [data]);

  return (
    <div className="p-3">
      {breakupData?.map((item, idx) => (
        <div
          key={idx}
          className={` rounded px-3 py-2 mb-2  ${
            idx === breakupData.length - 1
              ? " text-black fw-bold text-center"
              : ""
          }`}
          style={{
            background: idx === breakupData.length - 1 ? "#7d443230" : "#f8f9fa",
          }}
        >
          <div className="d-flex justify-content-between">
            <span>{item?.property}</span>
            <span>₹ {item?.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
