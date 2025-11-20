// ShopByBudget.jsx
import React from "react";

// Import your images
import earrings from "@assets/img/newlayout/shop by budget/img-1.png";
import ring from "@assets/img/newlayout/shop by budget/img-2.png";
import bracelet from "@assets/img/newlayout/shop by budget/img-3.png";
import necklace from "@assets/img/newlayout/shop by budget/img-4.png";

const ShopByBudgetNew = () => {
  return (
    <section className="sbb-wrapper">
      <div className="container">
        <div className="row align-items-stretch">
          {/* LEFT SIDE HEADING */}
          <div className="col-lg-4 col-md-12 sbb-head">
            {/* <div className="sbb-heading">
              <p className="sbb-subtitle">✦ Style within reach</p>
              <h2 className="sbb-title">Shop By Budget</h2>
            </div> */}

            <div className="feature-main mb-50 text-start">
              <h5 className="sub-ti">
                {" "}
                <b className="pe-2">✦</b>Style within reach
              </h5>
              <h4 className="feature-adipisicing main-ti">Shop By Budget</h4>
            </div>
          </div>

          {/* RIGHT SIDE – FIRST ROW (2 IMAGES) */}
          <div className="col-lg-8 col-md-12">
            <div className="row g-4">
              <div className="col-md-6 col-sm-6">
                <div className="sbb-card-1">
                  <img
                    src="/assets/img/newlayout/shop by budget/img-1.png"
                    className="sbb-img"
                    alt="20k"
                  />
                  <div className="sbb-label">Under ₹20,000</div>
                </div>
              </div>

              <div className="col-md-6 col-sm-6">
                <div className="sbb-card-1">
                  <img
                    src="/assets/img/newlayout/shop by budget/img-2.png"
                    className="sbb-img"
                    alt="32k"
                  />
                  <div className="sbb-label">Under ₹32,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECOND ROW – 2 IMAGES LEFT ALIGNED */}
        <div className="row gy-2 mt-2">
          <div className="col-lg-4 col-md-6">
            <div className="sbb-card-2">
              <img
                src="assets/img/newlayout/shop by budget/img-3.png"
                className="sbb-img"
                alt="44k"
              />
              <div className="sbb-label">Under ₹44,000</div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="sbb-card-2">
              <img
                src="assets/img/newlayout/shop by budget/img-4.png"
                className="sbb-img"
                alt="30k"
              />
              <div className="sbb-label">Under ₹30,000</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByBudgetNew;
