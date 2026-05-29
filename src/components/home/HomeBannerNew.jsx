import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useRouter } from "next/router";

import modelImg1 from "@assets/img/newlayout/Banner/banner-1-image.webp";
import modelImg2 from "@assets/img/newlayout/Banner/banner-2-image.webp";
import modelImg3 from "@assets/img/newlayout/Banner/banner-3-image.webp";
import bannerProducts1 from "@assets/img/newlayout/Banner/3images.png";
import bannerBG1 from "@assets/img/newlayout/Banner/banner-1-bg.webp";
import bannerBG2 from "@assets/img/newlayout/Banner/banner-2-bg.webp";
import bannerBG3 from "@assets/img/newlayout/Banner/banner-3-bg.webp";

import banner_Content from "@assets/img/home/Banner/banner-content-img.png";

// SVG icons
import { ArrowNextSm, ArrowPrevSm } from "@/svg";
import Link from "next/link";
import { Autoplay } from "swiper";

// Slider data

const HomeBannerNew = () => {
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
    autoplay: true,
    loop: true,
    speed: 1000, // slightly slower looks smoother
    cssEase: "ease-in-out",
  };

  return (
    <section
      className="tp-slider-area p-relative z-index-1 fix "
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Slider
        {...main_slider_setting}
        asNavFor={slider2}
        ref={(slider) => setSlider1(slider)}
        className="tp-slider-active-4 "
      >
        <div className="tp-slider-item-4 tp-slider-height-4 p-relative d-flex align-items-center ">
          <div className="tp-slider-thumb-4 ">
            <Link href="/">
              <Image
                src={bannerBG1}
                alt="slider img"
                className=""
                style={{
                  width: "100%",

                  objectFit: "cover",
                  cursor: "pointer",
                  // objectPosition: "bottom",
                }}
                unoptimized
              />
            </Link>
          </div>

          <div className="newBan-content reverse-sli">
            <div className="newBan-content-in">
              <div className="newBan-content-img ">
                <Image src={modelImg1} alt="Model" className="" />
              </div>

              <div className=" con d-none d-sm-flex">
                <div>
                  <p className="main-title">Bespoke</p>
                  <p className="sub-title">Brilliance for You</p>
                </div>
                {/* <Image className="d-none d-md-block"
                  src={bannerProducts1}
                  alt="Jewelry Collection"
                  
                /> */}

                <Link href="/shop"><button className="ljb-shop-btn mt-0 mt-lg-4" >Shop Now</button></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="tp-slider-item-4 tp-slider-height-4 p-relative d-flex align-items-center ">
          <div className="tp-slider-thumb-4 ">
            <Link href="/">
              <Image
                src={bannerBG3}
                alt="slider img"
                className=""
                style={{
                  width: "100%",

                  objectFit: "cover",
                  cursor: "pointer",
                  // objectPosition: "bottom",
                }}
                unoptimized
              />
            </Link>
          </div>

          <div className="newBan-content reverse-sli">
            <div className="newBan-content-in">
              <div className=" con d-none d-sm-flex">
                <div>
                  <p className="main-title">Bespoke</p>
                  <p className="sub-title">Brilliance for You</p>
                </div>
                {/* <Image className="d-none d-md-block"
                  src={bannerProducts1}
                  alt="Jewelry Collection"
                  
                /> */}

                <Link href="/shop"><button className="ljb-shop-btn mt-0 mt-lg-4" >Shop Now</button></Link>
              </div>

              <div className="newBan-content-img ">
                <Image src={modelImg3} alt="Model" className="" />
              </div>
            </div>
          </div>
        </div>

      
      </Slider>

      <div className="d-flex shp-nav" style={{ position: 'absolute', bottom: '20px', right: '40px', zIndex: 10 }}>
        <button
          className="btn btn-sm rounded-5 me-3"
          style={{
            background: "#be978b",
            color: "white",
            fontSize: "15px",
            padding: "7px 10px",
          }}
          onClick={() => slider1?.slickPrev()}
        >
          <ArrowPrevSm />
        </button>
        <button
          className="btn btn-sm rounded-5"
          style={{
            background: "#be978b",
            color: "white",
            fontSize: "15px",
            padding: "7px 10px",
          }}
          onClick={() => slider1?.slickNext()}
        >
          <ArrowNextSm />
        </button>
      </div>
    </section>
  );
};

export default HomeBannerNew;
