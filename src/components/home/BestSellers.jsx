import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ArrowNextSm, ArrowPrevSm } from "@/svg";

const HomeCategorySection = () => {
  const router = useRouter();

  const slider_setting = {
    slidesPerView: 5,
    spaceBetween: 10,
    
    breakpoints: {
      992: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 3,
      },
      //   576: {
      //     slidesPerView: 2,
      //   },
      0: {
        slidesPerView: 1.2,
      },
    },
  };

  const video_data = [
    "/assets/img/newlayout/Best-seller/image-3.png",
    "/assets/img/newlayout/Best-seller/image-2.png",
    "/assets/img/newlayout/Best-seller/image-1.png",
    "/assets/img/newlayout/Best-seller/image-4.png",
    "/assets/img/newlayout/Best-seller/image-5.png",
   
      

    
  ];

  return (
    <>
      <section
        className="pt-60 position-relative h4size bestSellers"
        // style={{ backgroundColor: "#f6e9d9" }}
      >
        <div className="container-fluid" style={{ padding: "0px" }}>
          <div className="row">
            <div className="col-12">
              <div className="feature-main mb-50">
                <h5 className="sub-ti">
                  {" "}
                  <b className="pe-2">✦</b>Curated chioces
                </h5>
                <h4 className="feature-adipisicing main-ti">
                 Our Best Sellers
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-9">
              <div
                className="tp-brand-slider p-relative"
                // style={{ height: "300px" }}
              >
                <Swiper
                  {...slider_setting}
             

                  modules={[Navigation]}
                  className="tp-brand-slider-active swiper-container"
                >
                    {video_data.map((img, index) => (
                    <SwiperSlide
                      key={index}
                      className={`bs-slide 
                        ${index === 2 ? "bs-large" : ""} 
                        ${index === 1 || index === 3 ? "bs-medium" : ""} 
                        ${(index === 0 || index === 4) ? "bs-small" : ""}
                      `}
                    >
                      <img
                        src={img}
                        alt="Best Seller"
                        className="bs-img"
                        onClick={() =>
                          router.push({
                            pathname: "/shop",
                          })
                        }
                      />
                    </SwiperSlide>
                  ))}

                  
                  
                </Swiper>
                <div className="tp-brand-slider-arrow">
                  <button className="tp-brand-slider-button-prev">
                    <ArrowPrevSm />
                  </button>
                  <button className="tp-brand-slider-button-next">
                    <ArrowNextSm />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCategorySection;
