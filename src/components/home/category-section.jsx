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
import { addCommasToNumber, capitalizeFLetter } from "@/utils/functions";

const HomeCategorySection = () => {
  const router = useRouter();

  const slider_setting = {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
      nextEl: ".tp-brand-slider-button-next",
      prevEl: ".tp-brand-slider-button-prev",
    },
    autoplay: true,
    loop: true,
    speed: 1000,

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
  { src: "/assets/img/newlayout/Best of Noblesets/img-1.png", title: "FANCY CHAIN 2" , category: "chain" },
  { src: "/assets/img/newlayout/Best of Noblesets/img-2.png", title: "18KT NS RING" , category: "ring" },
  { src: "/assets/img/newlayout/Best of Noblesets/img-3.png", title: "FANCY EARRING 2" , category: "earring" },
  { src: "/assets/img/newlayout/Best of Noblesets/img-4.png", title: "FANCY BRACELET 2" , category: "bracelet" },
  { src: "/assets/img/newlayout/Best of Noblesets/img-5.png", title: "18KT NS CHAIN 2" , category: "chain" },
  { src: "/assets/img/newlayout/Best of Noblesets/img-6.png", title: "GOLD EARRING" , category: "earring" },
  { src: "/assets/img/newlayout/Best of Noblesets/img-7.png", title: "GOLD BRACELET " , category: "bracelet" },
  { src: "/assets/img/newlayout/Best of Noblesets/img-8.png", title: "18KT EARRING" , category: "earring" },
];


  //  const saveOff = () => {
  //   const discountedPrice = product?.pricing?.priceRange?.start?.gross?.amount;
  //   const originalPrice =
  //     product?.pricing?.priceRangeUndiscounted?.start?.gross?.amount;
  //   const discountPercentage =
  //     ((originalPrice - discountedPrice) / originalPrice) * 100;
  //   if (discountPercentage) {
  //     return discountPercentage.toFixed(0);
  //   } else {
  //     return 0;
  //   }
  // };

  return (
    <>
      <section
        className="pt-60 bestofnoblesets position-relative h4size"
        // style={{ backgroundColor: "#f6e9d9" }}
      >
        <div className="container-fluid" style={{ padding: "0px" }}>
          <div className="row">
            <div className="col-12">
              <div className="feature-main mb-50">
                <h5 className="sub-ti">
                  {" "}
                  <b className="pe-2">✦</b>Classic, chic & royal
                </h5>
                <h4 className="feature-adipisicing main-ti">
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
                  modules={[Navigation]}
                  className="tp-brand-slider-active swiper-container"
                >
                  {video_data.map((video, i) => (
                    <SwiperSlide
                      key={i}
                      className="tp-brand-item text-center"
                      // style={{ width: "350px", height: "500px" }}
                    >
                      <div className=" category-section-5">
                        <img
                          src={video.src}
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

                        <div>
                          <div className="tp-product-content-2  pt-20">
                            <div style={{ textAlign: "center" }}>
                              <h3 className="tp-product-title-2 mt-5 ">
                                <Link href={`/`}>{video.title.toLowerCase()}</Link>
                              </h3>
                              

                              <div className="tp-product-price-wrapper-2">
                                {/* <span
                                  className=""
                                  style={{
                                    textDecoration: "line-through",
                                    color: "grey",
                                    fontWeight: 400,
                                    marginRight: "10px",
                                  }}
                                >
                                  &#8377;
                                  {addCommasToNumber(100200) || 0}
                                </span> */}

                                <span
                                  className="tp-product-price-2 new-price  pt-3"
                                  style={{ fontSize: "20px" }}
                                >
                                 {capitalizeFLetter(video.category)}
                                </span>

                                {/* <div
                                  className="save-off"
                                  style={{
                                    color: "#000",
                                    fontSize: "16px",
                                  }}
                                >{`Save 20% OFF`}</div> */}
                              </div>

                              {/* <h3 className="tp-product-title-2 mt-2">
                                <Link
                                  href={`/product-details/${product?.slug}`}
                                >
                                  {capitalizeFLetter(product?.name)}
                                </Link>
                              </h3> */}

                              {/* {channel == "india-channel" ? (
                                <div className="tp-product-price-wrapper mt-2">
                                  <span
                                    className="tp-product-price-2 new-price items-center"
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {product?.pricing?.discount !== null && (
                                      <div
                                        className=""
                                        style={{
                                          textDecoration: "line-through",
                                          color: "grey",
                                          fontWeight: 400,
                                          marginRight: "10px",
                                          fontSize: "14px",
                                        }}
                                      >
                                        &#8377;
                                        {addCommasToNumber(
                                          product?.pricing
                                            ?.priceRangeUndiscounted?.start
                                            ?.gross?.amount
                                        ) || 0}
                                      </div>
                                    )}
                                    <div>
                                      &#8377;
                                      {addCommasToNumber(
                                        product?.pricing?.priceRange?.start
                                          ?.gross?.amount
                                      ) || 0}
                                    </div>
                                  </span>
                                  {product?.pricing?.discount !== null && (
                                    <div
                                      className="save-off"
                                      style={{
                                        color: "#7d4432",
                                        fontSize: "16px",
                                      }}
                                    >{`Save ${saveOff()}% OFF`}</div>
                                  )}
                                </div>
                              ) : (
                                <div className="tp-product-price-wrapper-2">
                                  {product?.pricing?.discount !== null && (
                                    <div
                                      className=""
                                      style={{
                                        textDecoration: "line-through",
                                        color: "grey",
                                        fontWeight: 400,
                                        marginRight: "10px",
                                      }}
                                    >
                                      {"$"}
                                      {addCommasToNumber(
                                        product?.pricing?.priceRangeUndiscounted
                                          ?.start?.gross?.amount
                                      ) || 0}
                                    </div>
                                  )}

                              
                                  <span
                                    className="tp-product-price-2 new-price"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {"$"}
                                    {addCommasToNumber(
                                      product?.pricing?.priceRange?.start?.gross
                                        ?.amount
                                    ) || 0}
                                  </span>
                                  {product?.pricing?.discount !== null && (
                                    <div
                                      className="save-off"
                                      style={{
                                        color: "#7d4432",
                                        fontSize: "16px",
                                      }}
                                    >{`Save ${saveOff()}% OFF`}</div>
                                  )}
                                </div>
                              )} */}
                            </div>
                          </div>
                        </div>
                      </div>
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
