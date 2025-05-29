import { useRouter } from "next/router";
import React from "react";

const ResetButton = ({ shop_right = false, onClick }) => {
  const router = useRouter();
  return (
    <div className="tp-shop-widget">
      {/* <h3 className="tp-shop-widget-title">Reset Filter</h3> */}
      <button
        onClick={() => {
          onClick();
          // router.push(`/${shop_right ? "shop-right-sidebar" : "shop"}`);
        }}
        className="tp-filter-offcanvas-close-btn filter-close-btn reset"
      >
        Clear
      </button>
    </div>
  );
};

export default ResetButton;
