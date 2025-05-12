import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const InstagramSection = () => {
  const router = useRouter();
  return (
    <>
      <section className="" style={{ backgroundColor: "#fff9f4" }}>
        <div className="row-container">
          <div className="row">
            <div className="feature-main" style={{ marginBottom: "30px" }}>
              <h5 style={{ fontWeight: "400" }}>✦ Excepteur occaecat</h5>
              <h4
                className="feature-adipisicing"
                style={{ fontWeight: "400", fontSize: "30px" }}
              >
                Shop By Category
              </h4>
            </div>
          </div>

          <div className="row">
            {/* Left Column */}
            <div className="col-md-3 mb-lg-0 mb-3">
              <div className="row">
                <div className="col-xl-12 col-lg-12 featured-product-1">
                  <img
                    src="/assets/img/home/shop_by_category/img-1.png"
                    alt="image-1"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                      height: "80%",
                    }}
                    onClick={() => router?.push("/sale")}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <button className="gradient-btn">✦ Pedants ✦</button>
                  </div>
                </div>

                <div className="col-xl-12 col-lg-12 featured-product-2 ">
                  <img
                    src="/assets/img/home/shop_by_category/img-2.png"
                    alt="image-2"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => router?.push("/sale")}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <button className="gradient-btn">✦ Rings ✦</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column with Video */}
            <div className="col-md-3  mb-lg-0 mb-2" style={{ display: "flex" }}>
              <div >
                <img
                  src="/assets/img/home/shop_by_category/img-3.png"
                  alt="image-1"
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => router?.push("/sale")}
                />
                 <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <button className="gradient-btn">✦ Bangles ✦</button>
                  </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-3">
              <div className="row">
                <div className="col-xl-12 col-lg-12 featured-product-1">
                  <img
                    src="/assets/img/home/shop_by_category/img-4.png"
                    alt="image-3"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => router?.push("/sale")}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <button className="gradient-btn">✦ Nosepin ✦</button>
                  </div>
                </div>

                <div className="col-xl-12 col-lg-12 featured-product-2">
                  <img
                    src="/assets/img/home/shop_by_category/img-5.png"
                    alt="image-4"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => router?.push("/sale")}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <button className="gradient-btn">✦ Necklace ✦</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3  mb-lg-0 mb-2" style={{ display: "flex" }}>
              <div >
                <img
                  src="/assets/img/home/shop_by_category/img-6.png"
                  alt="image-1"
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => router?.push("/sale")}
                />
                <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <button className="gradient-btn">✦ Chains ✦</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstagramSection;
