"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const collections = [
  {
    title: "Bracelet",
    desc: "Excepteur sint occaecat",
    price: "₹15000 - ₹20000",
    img: "/assets/img/home/collection/1.png",
  },
  {
    title: "Rings",
    desc: "Lorem ipsum dolor",
    price: "₹25000 - ₹30000",
    img: "/assets/img/home/collection/2.png",
  },
  {
    title: "Chains",
    desc: "Excepteur sint occaecat",
    price: "₹10000 - ₹25000",
    img: "/assets/img/home/collection/3.png",
  },
  {
    title: "Earrings",
    desc: "Lorem ipsum dolor",
    price: "₹25000 - ₹30000",
    img: "/assets/img/home/collection/4.png",
  },
];

export default function ShopByCollections() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-5 px-2 " style={{ backgroundColor: "#fff9f4" }}>
      {/* Title + Buttons */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-3">
        <div className="mb-3 mb-md-0">
          <div className="" style={{ marginBottom: "30px" }}>
            <h5 style={{ fontWeight: "400" }}>✦ Excepteur occaecat</h5>
            <h4
              className="feature-adipisicing"
              style={{ fontWeight: "400", fontSize: "30px" }}
            >
              Shop by Collections
            </h4>
          </div>
        </div>
        <div className="d-flex mt-2 mt-md-0">
          <button
            ref={prevRef}
            className="btn btn-sm rounded-3 px-3 py-1 me-2"
            style={{
              backgroundColor: "#e6a285",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ‹
          </button>
          <button
            ref={nextRef}
            className="btn btn-sm rounded-3 px-3 py-1"
            style={{
              backgroundColor: "#e6a285",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ›
          </button>
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="position-relative px-3">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.1}
          slidesOffsetAfter={16}
          slidesOffsetBefore={0}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            0: { slidesPerView: 1.1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {collections.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card border-0 h-100 shadow-sm">
                <img
                  src={item.img}
                  className="card-img-top"
                  alt={item.title}
                  style={{
                    objectFit: "cover",
                    height: "260px",
                    borderRadius: "20px",
                  }}
                />
                <div className="card-body text-center">
                  <p className="text-muted mb-1 small">{item.desc}</p>
                  <h5
                    className=" mb-2"
                    style={{
                      fontSize: "20px",
                      fontWeight: "400",
                    }}
                  >
                    {item.title}
                  </h5>
                  <p className="text-muted">Starting from {item.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
