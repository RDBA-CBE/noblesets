import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useRouter } from "next/router";

// Internal images
// import slider_img_1 from "@assets/img/home/home-banner/banner-img-4.webp";
// import slider_img_4 from "@assets/img/home/home-banner/banner-img-3.webp";
// import slider_img_2 from "@assets/img/home/home-banner/banner-img-1.webp";
// import slider_img_3 from "@assets/img/home/home-banner/banner-img-2.webp";
import mobile_size_ban_1 from "@assets/img/home/home-banner/mobile-banner-img-1.webp";
import mobile_size_ban_2 from "@assets/img/home/home-banner/mobile-banner-img-2.webp";
import mobile_size_ban_3 from "@assets/img/home/home-banner/mobile-banner-img-3.webp";
import mobile_size_ban_4 from "@assets/img/home/home-banner/mobile-banner-img-4.webp";


import slider_img_1 from "@assets/img/home/home-banner/Baanner-2.jpg";
import slider_img_2 from "@assets/img/home/home-banner/Baanner-4.jpg";
import slider_img_3 from "@assets/img/home/home-banner/Baanner-5.jpg";
import slider_img_4 from "@assets/img/home/home-banner/Baanner-3.jpg";
import slider_img_5 from "@assets/img/home/home-banner/Baanner-6.jpg";



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
    
    title:"Elevate Every Look <br/> with a Touch of Sparkle.",
    desc:"Discover lightweight, stylish jewelry <br/> designed to add effortless elegance to your everyday and special moments.",
    btnTi:"Exhibition & Sale",
    btnDesc:"of exquisite diamond jewellery"
  },
  {
      id: 2,
      img: slider_img_2,
      mblImg: mobile_size_ban_2,
      link: "/shop",
      // url: "/shop?category=finger_rings",
      title:"Where Timeless Beauty <br/> Meets Modern Design.",
    desc:"Exquisite craftsmanship meets timeless design. <br/> Jewelry that defines elegance in every detail.",
    btnTi:"Exhibition & Sale",
    btnDesc:"of exquisite diamond jewellery"
  },
  {
      id: 3,
      img: slider_img_3,
      mblImg: mobile_size_ban_3,
      link: "/shop",
      title:"The Glow-Up You’ll <br/> Never Feel Tired Wearing.",
    desc:"Discover lightweight, stylish jewelry designed <br/> to add effortless elegance to your everyday and special moments.",
    btnTi:"Exhibition & Sale",
    btnDesc:"of exquisite diamond jewellery"
      // url: "/shop?category=gold_plated_silver",
  },
  {
      id: 4,
      img: slider_img_4,
      mblImg: mobile_size_ban_4,
      link: "/shop",
      title:"Luxury That’s Always <br /> Within Reach.",
    desc:"Simple, sleek, and effortlessly beautiful. <br/> Jewelry that feels as good as it looks." ,
    btnTi:"Exhibition & Sale",
    btnDesc:"of exquisite diamond jewellery"
      // url: "/shop?category=earrings",
  },

   {
      id: 4,
      img: slider_img_5,
      mblImg: mobile_size_ban_4,
      link: "/shop",
      title:"Luxury That’s Always <br /> Within Reach.",
    desc:"Simple, sleek, and effortlessly beautiful. <br/> Jewelry that feels as good as it looks." ,
    btnTi:"Exhibition & Sale",
    btnDesc:"of exquisite diamond jewellery"
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
    autoplay:true,
    loop:true
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
                  unoptimized
                />
              </Link>

              {/* <div className="tp-slider-thumb-4-shape">
                <span className="tp-slider-thumb-4-shape-1"></span>
                <span className="tp-slider-thumb-4-shape-2"></span>
              </div> */}
            </div>
            <div className="mbl-content" >
              <h1 dangerouslySetInnerHTML={{__html: item.title}}>
              
              </h1>
              <p>
                Adorn jewels inspired by the royal jewellery adorned<br/> by
                empresss in maratha dynasty
              </p>
              <div className="exb-btn cursor-pointer" onClick={()=>router.push("/shop")}>
                <p>
                  Exhibition & Sale</p>
                  <span className="exb-btn-s">of exquisite diamond jewellery</span>
                
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
