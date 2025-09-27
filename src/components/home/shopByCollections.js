"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowNextSm, ArrowPrevSm } from "@/svg";
import { useRouter } from "next/router";
import {
  useChildCategoryListMutation,
  useMaxPriceMutation,
  usePriceFilterMutation,
} from "@/redux/features/productApi";
import { max } from "moment";
import Loader from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { childCategory } from "@/redux/features/shop-filter-slice";

const collections = [
  {
    title: "Bracelet",
    slug: "bracelets",
    desc: "Simple, chic & wearable",
    price: "₹15000 - ₹20000",
    img: "/assets/img/home/collection/img1.webp",
  },
  {
    title: "Rings",
    slug: "rings",
    desc: "Unique, bold & beautiful",
    price: "₹25000 - ₹30000",
    img: "/assets/img/home/collection/img2.webp",
  },
  {
    title: "Chains",
    slug: "chain",
    desc: "Rich, radiant & enduring",
    price: "₹10000 - ₹25000",
    img: "/assets/img/home/collection/img3.webp",
  },
  {
    title: "Earrings",
    slug: "earring",
    desc: "Stunning and fashionable",
    price: "₹25000 - ₹30000",
    img: "/assets/img/home/collection/img4.webp",
  },

  {
    title: "Necklace",
    slug: "necklace",
    desc: "Simple, chic & wearable",
    price: "₹15000 - ₹20000",
    img: "/assets/img/home/collection/1.png",
  },
  {
    title: "Bangle",
    slug: "bangle",
    desc: "Unique, bold & beautiful",
    price: "₹25000 - ₹30000",
    img: "/assets/img/home/collection/2.png",
  },
];

export default function ShopByCollections() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const filter = useSelector((state) => state.shopFilter.childCategory);


  const [maximumPrice, { isLoading: loading }] = usePriceFilterMutation();
  const [childCatList, { isLoading: loading1 }] =
    useChildCategoryListMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (filter?.length == 0) {
      getChildCatList();
    }
  }, []);

  const getChildCatList = async () => {
    try {
      const res = await childCatList({});

      const filter = res?.data?.data?.categories?.edges?.map((item) => ({
        slug: item?.node?.slug,
        title: item?.node?.name,
      }));
      const filterWithImages = filter.map((filterItem) => {
        const matchingCollection = collections.find(
          (collectionItem) => collectionItem.slug == filterItem.slug
        );

        return {
          ...filterItem,
          image: matchingCollection ? matchingCollection.img : null,
          desc: matchingCollection ? matchingCollection.desc : null, // or a default image path
        };
      });

      getProductMaxPrice(filterWithImages);
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const getProductMaxPrice = async (filterWithImages) => {
    for (const cat of filterWithImages) {
      let minPrice = 0;
      let maxPrice = 0;

      try {
        const minRes = await maximumPrice({
          channel: "india-channel",
          first: 1,
          filter: { categorySlugs: [cat.slug] },
          sortBy: { direction: "ASC", field: "PRICE" },
        });

        const maxRes = await maximumPrice({
          channel: "india-channel",
          first: 1,
          filter: { categorySlugs: [cat.slug] },
          sortBy: { direction: "DESC", field: "PRICE" },
        });

        const minNode = minRes.data?.data?.productsSearch?.edges?.[0]?.node;
        const maxNode = maxRes.data?.data?.productsSearch?.edges?.[0]?.node;

        minPrice = minNode?.pricing?.priceRange?.start?.gross?.amount || 0;
        maxPrice = maxNode?.pricing?.priceRange?.start?.gross?.amount || 0;

        cat.price = `₹${Math.round(minPrice)} - ₹${Math.round(maxPrice)}`;
      } catch (err) {
        cat.price = "Price not available";
      }
    }
    dispatch(childCategory(filterWithImages));
  };

  const handleClick = (item) => {
    router.push({
      pathname: "/shop",
      query: {
        category: item?.slug
          .toLowerCase()
          .replace("&", "")
          .split(" ")
          .join("-"),
      },
    });
  };

  return (
    <section
      className="pt-60 ShopByCollections position-relative"
      // style={{ backgroundColor: "#f6e9d9" }}
    >
      <div className="">
        <div
          className="section-wd d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center shp-by-col"
          style={{ padding: "0 95px" }}
        >
          <div className=" mb-md-0">
            <div className="mb-0 mb-md-5">
              <h5 className="sub-ti ps-2">
                <b className="pe-1">✦ </b>Defined elegance
              </h5>
              <h4 className="feature-adipisicing main-ti">
                Shop by Collections
              </h4>
            </div>
          </div>
          <div className="d-flex mt-2 mt-md-0 shp-nav">
            <button
              ref={prevRef}
              className="btn btn-sm rounded-3  me-2"
              style={{
                background: "linear-gradient(90deg, #9b5d34, #7a4525)",
                color: "white",
                fontSize: "15px",
                // fontWeight: "bold",
                padding: "5px 10px",
              }}
            >
              <ArrowPrevSm />
            </button>
            <button
              ref={nextRef}
              className="btn btn-sm rounded-3 "
              style={{
                background: "linear-gradient(90deg, #9b5d34, #7a4525)",
                color: "white",
                fontSize: "15px",
                // fontWeight: "bold",
                padding: "5px 10px",
              }}
            >
              <ArrowNextSm />
            </button>
          </div>
        </div>

        {loading1 || loading ? (
          <Loader />
        ) : (
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
              {filter.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="card border-0 h-100 shadow-sm "
                    onClick={() => handleClick(item)}
                  >
                    <img
                      src={item.image}
                      className="card-img-top cursor-pointer"
                      alt={item.title}
                      style={{
                        objectFit: "cover",
                        // height: "260px",
                        borderRadius: "20px",
                      }}
                      onClick={() => {
                        handleClick(item);
                      }}
                    />
                    <div className="card-body text-center pb-0">
                      <p
                        className="text-black mb-3 mt-40 cursor-pointer"
                        style={{ fontSize: "18px" }}
                      >
                        {item.desc}
                      </p>
                      <h5
                        className=" mb-3 cursor-pointer"
                        style={{
                          fontSize: "35px",
                          fontWeight: "400",
                        }}
                        onClick={() => {
                          handleClick(item);
                        }}
                      >
                        {item.title}
                      </h5>
                      <p
                        className="text-black"
                        style={{ fontSize: "18px", letterSpacing: "1px" }}
                        onClick={() => {
                          handleClick(item);
                        }}
                      >
                        {" "}
                        {item.price}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
