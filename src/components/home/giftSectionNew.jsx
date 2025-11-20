import { useRouter } from "next/router";
import React from "react";

export default function GiftSectionNew() {

  const router = useRouter()
  return ( 
    <section class="pt-80 giftSection position-relative" 
    // style={{ backgroundColor: "#f6e9d9" }}
    >
      <div class=" section-wd gift-section">
        <div class="row align-items-center justify-content-center g-5 px-3">
          <div class="col-12 col-lg-6 px-3 px-lg-5 gift-section-le" data-aos="fade-right">
            <div className="">
              <h5 className="sub-ti ps-1" > <b className="pe-2">✦</b> Thoughtful moments</h5>
              <h4
                className="feature-adipisicing main-ti mb-4 mt-1"
                
              >
                Make Gifting Special
              </h4>
            </div>

            <p class="text sub-ti text-black mb-5">
            At Noble Sets, we believe gifting is an art; hence, every piece we craft is a story waiting to
be told. Our curated gifting collection caters to every emotion, relationship and occasion.
            </p>

            <div class="row  gap-3  gap-sm-0 pt-4 pt-md-2">
              <div class="col-12 col-sm-4 text-center" data-aos="zoom-in" data-aos-delay="200" onClick={() => {
                  
                  
                 router.push("/gift-card");
                  }}>
                <img
                  src="/assets/img/newlayout/Making gifiting special/image-1.png"
                  alt="image-1"
                  // style={{
                  //   width: "100%",
                  //   borderRadius: "20px",
                  //   cursor: "pointer",
                  // }}
                  
                />
                {/* <p class="small mt-2">Birthday</p> */}
              </div>
              <div class="col-12 col-sm-4 text-center" data-aos="zoom-in" data-aos-delay="300" onClick={() => {
                  
                  
                 router.push("/gift-card");
                  }}>
                <img
                  src="/assets/img/newlayout/Making gifiting special/image-2.png"
                  alt="image-1"
                  // style={{
                  //   width: "100%",
                  //   borderRadius: "20px",
                  //   cursor: "pointer",
                  // }}
                 
                />
                {/* <p class="small mt-2">Anniversary</p> */}
              </div>
              <div class="col-12 col-sm-4 text-center" data-aos="zoom-in" data-aos-delay="400" onClick={() => {
                 
                 router.push("/gift-card");
                  }}>
                <img
                  src="/assets/img/newlayout/Making gifiting special/image-3.png"
                  alt="image-1"
                  // style={{
                  //   width: "100%",
                  //   borderRadius: "20px",
                  //   cursor: "pointer",
                  // }}
                  
                />
                {/* <p class="small mt-2">Valentine’s Day</p> */}
              </div>
            </div>

            <div className="justify-content-center justify-content-md-start"
              style={{
                display: "flex",
                paddingTop: "30px",
              }}
            >
              <button className="gradient-btn" onClick={() => {
                  
                 router.push("/shop");
                  }}>✦ Explore Products ✦</button>
            </div>
          </div>

          <div class="col-12 col-lg-5 text-center gift-section-ri" data-aos="fade-left">
           <div
  className="position-relative d-lg-flex justify-content-lg-end ps-lg-5 p-3"
>
              <img
                src="/assets/img/home/gift_special/gift-img.png"
                alt="image-1"
                // style={{
                //   width: "90%",
                //   height: "auto",
                //   // borderRadius: "50% / 40%", 
                //   objectFit: "cover",
                //   cursor: "pointer",
                // }}
                onClick={() => router?.push("/sale")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
