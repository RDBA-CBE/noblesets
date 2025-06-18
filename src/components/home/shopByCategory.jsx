import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const InstagramSection = () => {
  const router = useRouter();
  return (
    <>
      <section className="pt-60 shopbycategory position-relative" >
        <div className="row-container">
          <div className="row">
            <div className="feature-main mb-50" >
              <h5 className="sub-ti" ><b className="pe-2">✦</b>Curated choices</h5>
              <h4
                className="feature-adipisicing main-ti"
               
              >
                Shop By Category
              </h4>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-between">
            {/* Column 1 */}
            <div className="col-1-5">
              <img
                src="/assets/img/home/shop_by_category/img-1.png"
                alt="Pedants"
                className="category-img"
                onClick={() => {
                  
                 router.push("/shop");
                  }}
                
              />
              <div className="category-button">
                <button className="gradient-btn" onClick={() => {
                  
                  
                 router.push("/shop");
                  }}>✦ Pedants ✦</button>
              </div>

              <img
                src="/assets/img/home/shop_by_category/img-2.png"
                alt="Rings"
                className="category-img mt-3"
                onClick={() => {
                  
                 router.push("/shop");
                  }}
              />
              <div className="category-button">
                <button className="gradient-btn" onClick={() => {
                  
                  
                 router.push("/shop");
                  }}>✦ Rings ✦</button>
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-1-5">
              <img
                src="/assets/img/home/shop_by_category/img-3.png"
                alt="Bangles"
                className="category-img"
                onClick={() => {
                  
                 router.push("/shop");
                  }}
              />
              <div className="category-button">
                <button className="gradient-btn" onClick={() => {
                  
                  
                 router.push("/shop");
                  }}>✦ Bangles ✦</button>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-1-5">
              <img
                src="/assets/img/home/shop_by_category/img-4.png"
                alt="Nosepin"
                className="category-img"
                onClick={() => {
                  
                 router.push("/shop");
                  }}
              />
              <div className="category-button">
                <button className="gradient-btn" onClick={() => {
                  
                  
                 router.push("/shop");
                  }}>✦ Nosepin ✦</button>
              </div>

              <img
                src="/assets/img/home/shop_by_category/img-5.png"
                alt="Necklace"
                className="category-img mt-3"
                onClick={() => {
                  
                 router.push("/shop");
                  }}
              />
              <div className="category-button">
                <button className="gradient-btn" onClick={() => {
                  
                  
                 router.push("/shop");
                  }}>✦ Necklace ✦</button>
              </div>
            </div>

            {/* Column 4 */}
            <div className="col-1-5">
              <img
                src="/assets/img/home/shop_by_category/img-6.png"
                alt="Chains"
                className="category-img"
               onClick={() => {
                  
                 router.push("/shop");
                  }}
              />
              <div className="category-button">
                <button className="gradient-btn" onClick={() => {
                  
                  
                 router.push("/shop");
                  }}>✦ Chains ✦</button>
              </div>
            </div>

            {/* Column 5 */}
            <div className="col-1-5">
              <img
                src="/assets/img/home/shop_by_category/img-7.png"
                alt="Nosepin 2"
                className="category-img"
                onClick={() => {
                  
                 router.push("/shop");
                  }}
              />
              <div className="category-button">
                <button className="gradient-btn" onClick={() => {
                  
                  
                 router.push("/shop");
                  }}>✦ Bracelet ✦</button>
              </div>

              <img
                src="/assets/img/home/shop_by_category/img-8.png"
                alt="Necklace 2"
                className="category-img mt-3"
               onClick={() => {
                  
                 router.push("/shop");
                  }}
              />
              <div className="category-button">
                <button className="gradient-btn" 
                onClick={() => {
                  
                  
                 router.push("/shop");
                  }}>✦ Earrings ✦</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstagramSection;
