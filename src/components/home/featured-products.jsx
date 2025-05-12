import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { ArrowNextSm, ArrowPrevSm } from '@/svg';
import { useRouter } from "next/router";

// Video data
const video_data = [
    "/assets/img/home/featured-product/feature-product-1.mp4",
    "/assets/img/home/featured-product/feature-product-2.mp4",
    "/assets/img/home/featured-product/feature-product-3.mp4",
    "/assets/img/home/featured-product/feature-product-4.mp4",
    "/assets/img/home/featured-product/feature-product-5.mp4",
    "/assets/img/home/featured-product/feature-product-6.mp4",
    "/assets/img/home/featured-product/feature-product-7.mp4",
    "/assets/img/home/featured-product/feature-product-8.mp4"
];

// Slider settings
const slider_setting = {
    slidesPerView: 4,
    spaceBetween: 10,
    navigation: {
        nextEl: ".tp-brand-slider-button-next",
        prevEl: ".tp-brand-slider-button-prev",
    },
    breakpoints: {
        '992': {
            slidesPerView: 4,
        },
        '768': {
            slidesPerView: 3,
        },
        '576': {
            slidesPerView: 2,
        },
        '0': {
            slidesPerView: 1.2,
        },
    }
}

const FeaturedProdectsSection = () => {
    const router = useRouter()

    return (
        <section className="section-gap" style={{ background: "url(/assets/img/home/featured-product/background.jpg", backgroundSize: "cover", }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="feature-main">
                            <h5 className="feature-adipisicing" style={{ fontWeight: "400" }}>
                                Handpicked Favourites
                            </h5>
                            <h4 style={{ fontWeight: "400", color: "white" }}>FEATURED PRODUCTS</h4>
                            <p style={{ color: "gray", fontSize: "14px" }}>
                                Explore the latest and most sought-after products, specially
                                curated for you
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="tp-brand-slider p-relative">
                            <Swiper {...slider_setting} modules={[Navigation]} className="tp-brand-slider-active swiper-container">
                                {video_data.map((video, i) => (
                                    <SwiperSlide key={i} className="tp-brand-item text-center" style={{ width: "308px", height: "462px" }}>
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="video-container plp-card-image-video"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: "10px",
                                                objectFit: "cover", cursor: "pointer"
                                            }} onClick={() => router?.push("/shop")}
                                        >
                                            <source src={video} type="video/mp4" />
                                        </video>
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
            </div>
        </section>
    );
};

export default FeaturedProdectsSection;
