import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const InstagramSection = () => {
    const router = useRouter()
    return (
        <>
            <section className="section-gap">
                <div className="row-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="feature-main">
                                <h5 className="feature-adipisicing" style={{ fontWeight: "400" }}>
                                    Just for You!
                                </h5>
                                <h4 style={{ fontWeight: "400" }}>Exclusive Deals</h4>
                                <p style={{ color: "gray", fontSize: "14px" }}>
                                    Whether it's a gift or a treat for yourself, now is the perfect time to add a touch of luxury and stunning pieces to your collection
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Left Column */}
                        <div className="col-md-4 mb-lg-0 mb-3">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 featured-product-1">
                                    <img
                                        src="/assets/img/home/instagram/1.jpg"
                                        alt="image-1"
                                        style={{ width: "100%", borderRadius: "20px", cursor: "pointer" }}
                                        onClick={() => router?.push("/sale")}
                                    />
                                </div>

                                <div className="col-xl-12 col-lg-12 featured-product-2">
                                    <img
                                        src="/assets/img/home/instagram/2.jpg"
                                        alt="image-2"
                                        style={{ width: "100%", borderRadius: "20px", cursor: "pointer" }}
                                        onClick={() => router?.push("/sale")}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Middle Column with Video */}
                        <div className="col-md-4  mb-lg-0 mb-2" style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <video

                                    muted
                                    autoPlay
                                    loop
                                    // style={{ pointerEvents: "none", width: "100%", borderRadius: "20px" }}
                                    style={{ width: "100%", borderRadius: "20px", cursor: "pointer", height: "100%" }}
                                    onClick={() => router?.push("/sale")}
                                >
                                    <source
                                        src="/assets/img/home/instagram/center-video.mp4"
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 featured-product-1">
                                    <img
                                        src="/assets/img/home/instagram/3.jpg"
                                        alt="image-3"
                                        style={{ width: "100%", borderRadius: "20px", cursor: "pointer" }}
                                        onClick={() => router?.push("/sale")}
                                    />
                                </div>

                                <div className="col-xl-12 col-lg-12 featured-product-2">
                                    <img
                                        src="/assets/img/home/instagram/4.jpg"
                                        alt="image-4"
                                        style={{ width: "100%", borderRadius: "20px", cursor: "pointer" }}
                                        onClick={() => router?.push("/sale")}
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

export default InstagramSection;
