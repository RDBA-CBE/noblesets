import { cleanHTML } from "@/utils/constant";
import React, { useState } from "react";

export default function PriceBreakup(props) {
  const { data } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <h5
        className="fw-semibold border-bottom pb-2  cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="me-2">+</span> Price Breakup
      </h5>
      {open && (
        <div
          className="table-responsive-1 mb-3"
          dangerouslySetInnerHTML={{ __html: cleanHTML(data) }}
        />
      )}
    </div>
  );
}
