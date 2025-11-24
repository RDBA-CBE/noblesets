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
        <div className="sbb-wrapper-in">
          <div className="container p-0 d-none d-md-block">
            <div className="row justify-content-center p-0">
              <div className="col-12 col-lg-11 col-xl-12 p-0">
                <div className="container-fluid p-0">
                  <div className="row align-items-stretch">
                    {/* LEFT SIDE HEADING */}
                    <div className="col-lg-custom-45 col-md-12 sbb-head">
                      <div className="feature-main mb-30 text-start">
                        <h5 className="sub-ti">
                          {" "}
                          <b className="pe-2">✦</b>Style within reach
                        </h5>
                        <h4 className="feature-adipisicing main-ti">
                          Shop By Budget
                        </h4>
                      </div>
                    </div>

                    {/* RIGHT SIDE – FIRST ROW (2 IMAGES) */}
                    <div className="col-lg-custom-75 col-md-12">
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
                    <div className="col-lg-custom-75 col-md-12">
                      <div className="row g-4">
                        <div className="col-md-6 col-sm-6">
                          <div className="sbb-card-2">
                            <img
                              src="assets/img/newlayout/shop by budget/img-3.png"
                              className="sbb-img"
                              alt="44k"
                            />
                            <div className="sbb-label">Under ₹44,000</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
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

                    <div
                      className="col-lg-custom-45 col-md-12 p-0 d-flex align-items-center"
                      style={{ marginLeft: "-30px" }}
                    >
                      <div className="vector-img">
                        <img
                          src="/assets/img/newlayout/shop by budget/vector-img.jpg"
                          className="sbb-img"
                          alt="30k"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-wd d-block d-md-none p-0">
            <div className="container-fluid p-0">
              <div className="row justify-content-center p-0">
                <div className="col-11 p-0">
                  <div className="container-fluid p-0">
                    <div className="row align-items-stretch">
                      {/* LEFT SIDE HEADING */}
                      <div className="col-lg-custom-45 col-md-12 sbb-head">
                        <div className="feature-main mb-30 text-start">
                          <h5 className="sub-ti">
                            {" "}
                            <b className="pe-2">✦</b>Style within reach
                          </h5>
                          <h4 className="feature-adipisicing main-ti">
                            Shop By Budget
                          </h4>
                        </div>
                      </div>

                      {/* RIGHT SIDE – FIRST ROW (2 IMAGES) */}
                      <div className="col-12 col-lg-custom-75 ">
                        <div className="row g-4">
                          <div className="col-6">
                            <div className="sbb-card-1">
                              <img
                                src="/assets/img/newlayout/shop by budget/img-1.png"
                                className="sbb-img"
                                alt="20k"
                              />
                              <div className="sbb-label">Under ₹20,000</div>
                            </div>
                          </div>

                          <div className="col-6">
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
                      <div className="col-lg-custom-75 col-md-12">
                        <div className="row g-4">
                          <div className="col-6">
                            <div className="sbb-card-2">
                              <img
                                src="assets/img/newlayout/shop by budget/img-3.png"
                                className="sbb-img"
                                alt="44k"
                              />
                              <div className="sbb-label">Under ₹44,000</div>
                            </div>
                          </div>
                          <div className="col-6">
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

                      <div
                        className="col-lg-custom-45 col-md-12 p-0 d-flex align-items-center d-none d-md-block"
                        style={{ marginLeft: "-30px" }}
                      >
                        <div className="vector-img">
                          <img
                            src="/assets/img/newlayout/shop by budget/vector-img.jpg"
                            className="sbb-img"
                            alt="30k"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ShopByBudgetNew;
