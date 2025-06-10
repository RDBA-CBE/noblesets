"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowNextSm, ArrowPrevSm } from "@/svg";
import { useRouter } from "next/router";

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
];

export default function ShopByCollections() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const router = useRouter()

  return (
    <section className="pt-60 ShopByCollections position-relative" 
    // style={{ backgroundColor: "#fff9f4" }}
    >
      <div className="">
      <div className="section-wd d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center shp-by-col" style={{padding:"0 30px"}}>
        <div className="mb-3 mb-md-0">
          <div className="mb-50" >
            <h5 className="sub-ti"><b className="pe-2">✦ </b> Excepteur occaecat</h5>
            <h4
              className="feature-adipisicing main-ti"
              
            >
              Shop by Collections
            </h4>
          </div>
        </div>
        <div className="d-flex mt-2 mt-md-0 shp-nav">
          <button
            ref={prevRef}
            className="btn btn-sm rounded-3  me-2"
            style={{
              backgroundColor: "#e6a285",
              color: "white",
              fontSize: "15px",
              // fontWeight: "bold",
              padding:"5px 10px"
            }}
          >
             <ArrowPrevSm />
          </button>
          <button
            ref={nextRef}
            className="btn btn-sm rounded-3 "
            style={{
              backgroundColor: "#e6a285",
              color: "white",
              fontSize: "15px",
              // fontWeight: "bold",
              padding:"5px 10px"
            }}
          >
            <ArrowNextSm />
          </button>
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="position-relative d-flex flex-wrap align-items-stretch">
        <Swiper
          modules={[Navigation]}
          // spaceBetween={30}
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
              <div className="card border-0 h-100 shadow-sm ">
                <img
                  src={item.img}
                  className="card-img-top cursor-pointer"
                  alt={item.title}
                  style={{
                    objectFit: "cover",
                    // height: "260px",
                    borderRadius: "20px",
                  }}
                  onClick={() => {
                  
                 router.push("/shop");
                  }}
                />
                <div className="card-body text-center pb-0">
                  <p className="text-muted mb-3 mt-40 cursor-pointer" style={{fontSize:"18px"}}>{item.desc}</p>
                  <h5
                    className=" mb-3 cursor-pointer"
                    style={{
                      fontSize: "35px",
                      fontWeight: "400",
                    }}
                    onClick={() => {
                  
                 router.push("/shop");
                  }}
                  >
                    {item.title}
                  </h5>
                  <p className="text-muted" style={{fontSize:"18px"}}>Starting from {item.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
      
      
    </section>
  );
}
