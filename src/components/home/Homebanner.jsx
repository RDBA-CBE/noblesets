import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useRouter } from "next/router";

// Internal images
import slider_img_1 from "@assets/img/home/Banner/banner-img-1.png";
import slider_mbl_img_1 from "@assets/img/home/Banner/mbl-banner.png";
import slider_img_2 from "@assets/img/home/Banner/banner-img-2.png";
import slider_img_3 from "@assets/img/home/Banner/banner-img-3.png";
import mobile_size_ban_1 from "@assets/img/home/Banner/mobile-size-ban-1.png";
import mobile_size_ban_2 from "@assets/img/home/Banner/mobile-size-ban-2.png";
import mobile_size_ban_3 from "@assets/img/home/Banner/mobile-size-ban-3.png";
import mobile_size_ban_4 from "@assets/img/home/Banner/mobile-size-ban-4.png";


import slider_img_4 from "@assets/img/home/Banner/banner-img-4.png";

import banner_Content from "@assets/img/home/Banner/banner-content-img.png";

// SVG icons
import { ArrowNextTwo, ArrowPrevTwo } from "@/svg";
import Link from "next/link";
import { Autoplay } from "swiper";

// Slider data
const slider_data = [
  {
    id: 1,
    img: slider_img_1,
    mblImg: mobile_size_ban_1,
    link: "/shop",
    // url: "/shop?category=earrings",
  },
  {
      id: 2,
      img: slider_img_2,
      mblImg: mobile_size_ban_2,
      link: "/shop"
      // url: "/shop?category=finger_rings",
  },
  {
      id: 3,
      img: slider_img_3,
      mblImg: mobile_size_ban_3,
      link: "/shop"
      // url: "/shop?category=gold_plated_silver",
  },
  {
      id: 4,
      img: slider_img_4,
      mblImg: mobile_size_ban_4,
      link: "/shop"
      // url: "/shop?category=earrings",
  },
  // {
  //     id: 5,
  //     img: slider_img_5,
  //     link: "/shop"
  //     // url: "/shop?category=finger_rings",
  // },
  // {
  //     id: 6,
  //     img: slider_img_6,
  //     link: "/shop"
  //     // url: "/shop?category=gold_plated_silver",
  // },
];

const HomeBanner = () => {
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const router = useRouter();

  // Slider settings
  const main_slider_setting = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    centerMode: false,
    // autoplay:true
  };

  return (
    <section
      className="tp-slider-area p-relative z-index-1 fix "
      style={{ borderRadius: "20px" , backgroundColor: "#f5f5f5" }}
    >
      <Slider
        {...main_slider_setting}
        asNavFor={slider2}
        ref={(slider) => setSlider1(slider)}
        className="tp-slider-active-4 "
      >
        {slider_data.map((item, i) => (
          <div
            key={i}
            className="tp-slider-item-4 tp-slider-height-4 p-relative d-flex align-items-center"
          >
            {/* <div className="tp-slider-thumb-4  desk">
              <Link href={item?.link}>
                <Image
                  src={item.img}
                  alt="slider img"
                  className="mobile-view-width-change"
                  style={{
                    borderRadius: "20px",
                    objectFit: "contain",
                    cursor: "pointer",
                    objectPosition: "bottom",
                  }}
                />
              </Link>
            </div> */}
            <div className="tp-slider-thumb-4  mbl">
              <Link href={item?.link}>
                <Image
                  src={item.img}
                  alt="slider img"
                  className="mobile-view-width-change"
                  style={{
                    backgroundColor: "#fbdccc",
                    borderRadius: "20px",
                    // objectFit: "contain",
                    cursor: "pointer",
                    // objectPosition: "bottom",
                  }}
                />
              </Link>

              {/* <div className="tp-slider-thumb-4-shape">
                <span className="tp-slider-thumb-4-shape-1"></span>
                <span className="tp-slider-thumb-4-shape-2"></span>
              </div> */}
            </div>
            <div className="mbl-content" onClick={()=>router.push("/shop")}>
              <h1>
                Elevate Your Style <br />
                with Every Piece
              </h1>
              <p>
                Adorn jewels inspired by the royal <br /> jewellery adorned by
                empresss in maratha dynasty
              </p>
              <div className="exb-btn">
                <p>
                  Exhibition & Sale <br />
                  <span>of exquisite diamond jewellery</span>
                </p>
              </div>
              <img src={item?.mblImg} alt="" />
            </div>
          </div>
        ))}
      </Slider>

      {/* Arrow buttons */}
      {/* <div className="tp-slider-arrow-4">
                <button
                    className="tp-slider-3-button-prev slick-arrow"
                    onClick={() => slider1?.slickPrev()}
                >
                    <ArrowPrevTwo />
                </button>
                <button
                    className="tp-slider-3-button-next slick-arrow"
                    onClick={() => slider1?.slickNext()}
                >
                    <ArrowNextTwo />
                </button>
            </div> */}
    </section>
  );
};

export default HomeBanner;
