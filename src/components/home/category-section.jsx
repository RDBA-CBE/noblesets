import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGetCategoryListQuery } from "@/redux/features/productApi";
// internal
import { ArrowRightLong } from "@/svg";
import banner_bg_1 from "@assets/img/category-1.jpg";
import banner_bg_2 from "@assets/img/category-2.png";
import banner_bg_3 from "@assets/img/category-3.png";
import banner_bg_4 from "@assets/img/category-4.jpg";
import banner_bg_5 from "@assets/img/category-5.png";
import banner_bg_6 from "@assets/img/category-6.png";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { ArrowNextSm, ArrowPrevSm } from "@/svg";

const HomeCategorySection = () => {
  const router = useRouter();

  const slider_setting = {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
      nextEl: ".tp-brand-slider-button-next",
      prevEl: ".tp-brand-slider-button-prev",
    },
   
    breakpoints: {
      992: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 3,
      },
      0: {
        slidesPerView: 1,
      },
    },
  };

  const video_data = [
    "/assets/img/newlayout/Best of Noblesets/img-1.png",
    "/assets/img/newlayout/Best of Noblesets/img-2.png",
    "/assets/img/newlayout/Best of Noblesets/img-3.png",
    "/assets/img/newlayout/Best of Noblesets/img-4.png",
    "/assets/img/newlayout/Best of Noblesets/img-1.png",
    "/assets/img/newlayout/Best of Noblesets/img-2.png",
    "/assets/img/newlayout/Best of Noblesets/img-3.png",
    "/assets/img/newlayout/Best of Noblesets/img-4.png",
     "/assets/img/newlayout/Best of Noblesets/img-1.png",
  ];

  return (
    <>
      <section
        className="pt-60 bestofnoblesets position-relative h4size"
        // style={{ backgroundColor: "#f6e9d9" }}
      >
        <div className="container-fluid" style={{ padding: "0px" }}>
          <div className="row">
            <div className="col-12">
              <div className="feature-main mb-50" >
                <h5 className="sub-ti" > <b className="pe-2">✦</b>Classic, chic & royal</h5>
                <h4
                  className="feature-adipisicing main-ti"
                 
                >
                  Best of Noblesets
                </h4>
              </div>
            </div>
          </div>
         

            <div className="row justify-content-center">
              <div className="col-11">
                <div
                  className="tp-brand-slider p-relative"
                  // style={{ height: "300px" }}
                >
                  <Swiper
                    {...slider_setting}
                    autoplay={true}
                    modules={[Navigation]}
                    className="tp-brand-slider-active swiper-container"
                  >
                    {video_data.map((video, i) => (
                      <SwiperSlide
                        key={i}
                        className="tp-brand-item text-center"
                        // style={{ width: "350px", height: "500px" }}
                      >
                        {/* <div className="col-xl-6 col-lg-6  category-section-5"> */}
                        <img
                          src={video}
                          alt="image-5"
                          style={{
                            width: "95%",
                            borderRadius: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            router.push({
                              pathname: "/shop",
                              // query: { category: "other_accessories" }, // Your parameters
                            });
                          }}
                        />
                        {/* </div> */}
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
