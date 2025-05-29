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
import { Navigation } from "swiper";
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
        slidesPerView: 3,
      },
      576: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1.2,
      },
    },
  };

  const video_data = [
    "/assets/img/home/best_of_nobletset/img-1.png",
    "/assets/img/home/best_of_nobletset/img-3.png",
    "/assets/img/home/best_of_nobletset/img-2.png",
    "/assets/img/home/best_of_nobletset/img-4.png",
    "/assets/img/home/best_of_nobletset/img-3.png",
  ];

  return (
    <>
      <section
        className="pt-60 bestofnoblesets position-relative h4size"
        // style={{ backgroundColor: "#fff9f4" }}
      >
        <div className="container-fluid" style={{ padding: "0px" }}>
          <div className="row">
            <div className="col-12">
              <div className="feature-main mb-50" >
                <h5 className="sub-ti" > <b className="pe-2">✦</b> Duis Irure dolor</h5>
                <h4
                  className="feature-adipisicing main-ti"
                 
                >
                  Best of Noblesets
                </h4>
              </div>
            </div>
          </div>
          {/* <div className="row "> */}
            {/* <div className="col-md-6 col-12">
              <div className="row">
                <div className="col-xl-6 col-lg-6 category-section-1">
                  <img
                    src="/assets/img/home/Catergories/1.jpg"
                    alt="image-1"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "finger_rings" }, // Your parameters
                      });
                    }}
                  />
                </div>

                <div className="col-xl-6 col-lg-6 category-section-2">
                  <img
                    src="/assets/img/home/Catergories/2.jpg"
                    alt="image-2"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "necklaces" }, // Your parameters
                      });
                    }}
                  />
                </div>

                <div className="col-xl-6 col-lg-6 category-section-3">
                  <img
                    src="/assets/img/home/Catergories/3.jpg"
                    alt="image-3"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "earrings" }, // Your parameters
                      });
                    }}
                  />
                </div>

                <div className="col-xl-6 col-lg-6  category-section-4">
                  <img
                    src="/assets/img/home/Catergories/4.jpg"
                    alt="image-4"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "short_necklaces" }, // Your parameters
                      });
                    }}
                  />
                </div>
              </div>
            </div> */}

            <div className="row justify-content-center">
              <div className="col-11">
                <div
                  className="tp-brand-slider p-relative"
                  // style={{ height: "300px" }}
                >
                  <Swiper
                    {...slider_setting}
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
                              query: { category: "other_accessories" }, // Your parameters
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

            {/* <div className="col-md-6 col-12">
              <div className="row">
                <div className="col-xl-6 col-lg-6  category-section-5">
                  <img
                    src="/assets/img/home/Catergories/5.jpg"
                    alt="image-5"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "other_accessories" }, // Your parameters
                      });
                    }}
                  />
                </div>

                <div className="col-xl-6 col-lg-6">
                  <img
                    src="/assets/img/home/Catergories/6.jpg"
                    alt="image-6"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "bangles__bracelets" }, // Your parameters
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="row">
                <div className="col-xl-6 col-lg-6  category-section-5">
                  <img
                    src="/assets/img/home/Catergories/5.jpg"
                    alt="image-5"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "other_accessories" }, // Your parameters
                      });
                    }}
                  />
                </div>

                <div className="col-xl-6 col-lg-6">
                  <img
                    src="/assets/img/home/Catergories/6.jpg"
                    alt="image-6"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/shop",
                        query: { category: "bangles__bracelets" }, // Your parameters
                      });
                    }}
                  />
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </section>
    </>
  );
};

export default HomeCategorySection;
