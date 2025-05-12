import React, { useEffect, useState } from "react";
import VideFrame from "@assets/img/home/video-frams/videoframe_4247.png"
import Image from "next/image";

const HomeCelebritySection = () => {
    return (
        <>
            <section className="section-gap" style={{ backgroundColor: "rgb(16, 9, 25)" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">

                            <div>
                                {/* <video

                                    muted
                                    autoPlay
                                    loop
                                    style={{ pointerEvents: "none", width: "100%", borderRadius: "20px" }}
                                >
                                    <source
                                        src="https://cdn.joyalukkas.in/media/videos/JA_Ornament_Video_1000_1273px_new.mp4"
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video> */}
                                <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
                                    <Image
                                        src={VideFrame}  // Your image source
                                        alt="slider img"
                                        className="mobile-view-width-change"
                                        style={{
                                            borderRadius: "20px",
                                            objectFit: "cover",
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '40%',  // 30% of the top
                                            background: 'linear-gradient(to bottom, rgba(16, 9, 25, 1) 0%, rgba(16, 9, 25, 0) 100%)',  // Gradient from top to bottom
                                            borderRadius: '20px 20px 0 0',  // Border radius for top corners
                                        }}
                                    >
                                        <div className="feature-main">
                                            <h5 className="feature-adipisicing" style={{ fontWeight: "400" }}>
                                                Just for You!
                                            </h5>
                                            <h4 style={{ fontWeight: "400", color: "white" }}>Celebrity
                                                Style</h4>
                                            <p style={{ color: "gray", fontSize: "14px", color: "white" }}>
                                                Shop Your Favarite Celebrity Style look.
                                            </p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeCelebritySection;
