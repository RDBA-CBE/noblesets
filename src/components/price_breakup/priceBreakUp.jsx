// import { cleanHTML } from "@/utils/constant";
// import React, { useState } from "react";

// export default function PriceBreakup(props) {
//   const { data } = props;
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="">
//       {/* <h5
//         className="fw-semibold border-bottom pb-2  cursor-pointer"
//         onClick={() => setOpen(!open)}
//       >
//         <span className="me-2">+</span> Price Breakup
//       </h5>
//       {open && ( */}
//         <div
//           className="table-responsive-1 mb-3"
//           dangerouslySetInnerHTML={{ __html: cleanHTML(data) }}
//         />
//       {/* )} */}
//     </div>
//   );
// }

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
    <div className="">
      {/* <h5
        className="fw-semibold border-bottom pb-2 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="me-2">+</span> Price Breakup
      </h5> */}

      <div className="table-responsive-1 mb-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Property</th>
              <th style={{ textAlign: "right" }}>Price(₹)</th>
            </tr>
          </thead>
          <tbody>
            {breakupData?.length > 0 &&
              breakupData?.map((item, idx) => (
                <tr key={idx}>
                  <td>{item?.property}</td>
                  <td style={{ textAlign: "right" }}>{item?.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
