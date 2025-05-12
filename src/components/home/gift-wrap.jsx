import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";


const GiftWrapSection = () => {
    const router = useRouter()
    return (
        <>
            <section className="section-gapBottom">

                <div className="row-container">

                    <div className="row border rounded justify-content-between giftwrap-row-section">
                        <div className="col-12 col-md-12 col-lg-2  justify-content-center justify-content-lg-start gift-section-1 text-center d-flex align-items-center">
                            <div>
                                <img
                                    src="/assets/img/home/wrap-with-love/gift-box.png"
                                    alt="image-1"
                                    className="img-fluid gift-wrap-gift-image" // Ensures responsive image
                                />
                                <h5>Wrapped with Love</h5>
                            </div>
                        </div>


                        <div className="col-lg-10 col-md-12 col-12">
                            <div className="row">
                                <div className="col-md-4 col-lg-2 col-6 mb-lg-0 mb-3">
                                    <img src="/assets/img/home/wrap-with-love/1.jpg" alt="gift-wrap-1" style={{ width: "100%", borderRadius: "20px" }} />
                                    <h6 className="gift-wrap-name" style={{ cursor: "pointer" }} onClick={() => {
                                        router.push({
                                            pathname: "/shop",
                                            query: { category: "idols" }, // Your parameters
                                        });
                                    }}>Idols</h6>
                                </div>
                                <div className="col-md-4 col-lg-2 col-6 mb-lg-0 mb-3">
                                    <img src="/assets/img/home/wrap-with-love/2.jpg" alt="gift-wrap-2" style={{ width: "100%", borderRadius: "20px" }} />
                                    <h6 className="gift-wrap-name" style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            router.push({
                                                pathname: "/shop",
                                                query: { category: "bangles__bracelets" }, // Your parameters
                                            });
                                        }}>Bracelets</h6>
                                </div>
                                <div className="col-md-4 col-lg-2 col-6 mb-lg-0 mb-3">
                                    <img src="/assets/img/home/wrap-with-love/3.jpg" alt="gift-wrap-3" style={{ width: "100%", borderRadius: "20px" }} />
                                    <h6 className="gift-wrap-name" style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            router.push({
                                                pathname: "/shop",
                                                query: { category: "earrings" }, // Your parameters
                                            });
                                        }}
                                    >Earrings</h6>
                                </div>
                                <div className="col-md-4 col-lg-2 col-6 mb-lg-0 mb-3">
                                    <img src="/assets/img/home/wrap-with-love/4.jpg" alt="gift-wrap-4" style={{ width: "100%", borderRadius: "20px" }} />
                                    <h6 className="gift-wrap-name" style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            router.push({
                                                pathname: "/shop",
                                                query: { category: "pearls__beads" }, // Your parameters
                                            });
                                        }}
                                    >Pearls & Beads</h6>
                                </div>
                                <div className="col-md-4 col-lg-2 col-6 mb-lg-0 mb-3">
                                    <img src="/assets/img/home/wrap-with-love/5.jpg" alt="gift-wrap-5" style={{ width: "100%", borderRadius: "20px" }} />
                                    <h6 className="gift-wrap-name" style={{ cursor: "pointer" }} onClick={() => {
                                        router.push({
                                            pathname: "/shop",
                                            query: { category: "everyday_jewellery" }, // Your parameters
                                        });
                                    }}>Everyday Jewellery</h6>
                                </div>
                                <div className="col-md-4 col-lg-2 col-6 mb-lg-0 mb-3">
                                    <img src="/assets/img/home/wrap-with-love/6.jpg" alt="gift-wrap-6" style={{ width: "100%", borderRadius: "20px" }} />
                                    <h6 className="gift-wrap-name" style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            router.push({
                                                pathname: "/shop",
                                                query: { category: "necklaces" }, // Your parameters
                                            });
                                        }}
                                    >Necklaces</h6>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default GiftWrapSection;
