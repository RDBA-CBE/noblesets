import React from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ArrowNextSm, ArrowPrevSm } from "@/svg";

const HomeCategorySection = () => {
  const router = useRouter();

  const video_data = [
    {
      img: "/assets/img/newlayout/Best-seller/image-3.png",
      link: "earring",
    },
    {
      img: "/assets/img/newlayout/Best-seller/image-2.png",
      link: "Chain",
    },
    {
      img: "/assets/img/newlayout/Best-seller/image-1.png",
      link: "rings",
    },
    {
      img: "/assets/img/newlayout/Best-seller/image-4.png",
      link: "earring",
    },
    {
      img: "/assets/img/newlayout/Best-seller/image-5.png",
      link: "necklace",
    },
  ];

  const handleClick = (category) => {
    router.push({
      pathname: "/shop",
      query: {
        category: category.toLowerCase().replace("&", "").split(" ").join("-"),
      },
    });
  };

  return (
    <section className="pt-60 position-relative h4size bestSellers">
      <div className="container-fluid" style={{ padding: "0px" }}>
        <div className="row">
          <div className="col-12">
            <div className="feature-main mb-50">
              <h5 className="sub-ti">
                <b className="pe-2">✦</b>Curated choices
              </h5>
              <h4 className="feature-adipisicing main-ti">Our Best Sellers</h4>
            </div>
          </div>
        </div>
      </div>

      {/* STATIC IMAGE DISPLAY */}
      <div className="container-fluid pt-3">
        <div className="row justify-content-center">
          <div className="col-11 col-lg-10 col-xl-9">
            <div className="static-bs-wrapper d-none d-md-flex justify-content-between align-items-end gap-0">
              {video_data.map((img, index) => (
                <div
                  key={index}
                  className={`bs-slide 
                    ${index === 2 ? "bs-large" : ""} 
                    ${index === 1 || index === 3 ? "bs-medium" : ""} 
                    ${index === 0 || index === 4 ? "bs-small" : ""}
                  `}
                >
                  <img
                    src={img.img}
                    alt="Best Seller"
                    className="bs-img"
                    onClick={() => {
                      handleClick(img.link);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="d-md-none px-3">
            <Swiper
              slidesPerView={3}
              spaceBetween={12}
              loop={true}
              autoplay={true}
              modules={[Navigation]}
              navigation={{
                nextEl: ".tp-brand-slider-button-next",
                prevEl: ".tp-brand-slider-button-prev",
              }}
              breakpoints={{
              
                576: {
                  slidesPerView: 3,
                },
                0: {
                  slidesPerView: 2,
                },
              }}
              className="bs-mobile-slider"
            >
              {video_data.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img.img}
                    alt="Best Seller"
                    className="bs-img"
                    onClick={() => {
                      handleClick(img.link);
                    }}
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
    </section>
  );
};

export default HomeCategorySection;
