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

const HomeCategorySection = () => {
    const router = useRouter();
    return (
        <>
            <section className="section-gap">

                <div className="row-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="feature-main">
                                <h5 className="feature-adipisicing" style={{ fontWeight: "400" }}>
                                    Explore our exclusive collections
                                </h5>
                                <h4 style={{ fontWeight: "400" }}>CATEGORIES</h4>
                                <p style={{ color: "gray", fontSize: "14px" }}>
                                    Carefully curated for modern women
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 category-section-1">
                                    <img
                                        src="/assets/img/home/Catergories/1.jpg"
                                        alt="image-1"
                                        style={{ width: "100%", borderRadius: "20px", cursor: "pointer" }} onClick={() => {
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
                                        style={{ width: "100%", borderRadius: "20px", cursor: "pointer" }} onClick={() => {
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
                                        style={{ width: "100%", borderRadius: "20px", cursor: "pointer" }}
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
                                        style={{ width: "100%", borderRadius: "20px", cursor: "pointer" }} onClick={() => {
                                            router.push({
                                                pathname: "/shop",
                                                query: { category: "short_necklaces" }, // Your parameters
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
                                        style={{ width: "100%", borderRadius: "20px", cursor: "pointer" }} onClick={() => {
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
                                        style={{ width: "100%", borderRadius: "20px", cursor: "pointer" }} onClick={() => {
                                            router.push({
                                                pathname: "/shop",
                                                query: { category: "bangles__bracelets" }, // Your parameters
                                            });
                                        }}
                                    />
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
