import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const InstagramSection2 = () => {
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

          <div className="d-flex flex-wrap justify-content-between justify-content-md-start scroll-wid">
            {/* Column 1 */}
            <div className="col-1-5">
              <img
                src="/assets/img/home/shop_by_category/1.webp"
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
                src="/assets/img/home/shop_by_category/2.webp"
                alt="Rings"
                className="category-img mt-3 img-2"
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
            <div className="col-1-5 lr-col">
              <img
                src="/assets/img/home/shop_by_category/3.webp"
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
                src="/assets/img/home/shop_by_category/4.webp"
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
                src="/assets/img/home/shop_by_category/5.webp"
                alt="Necklace"
                className="category-img mt-3 img-2"
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
            <div className="col-1-5 lr-col">
              <img
                src="/assets/img/home/shop_by_category/6.webp"
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

            {/* responsive col */}
            <div className="col-1-5 lr-col-new ">
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
                  }}>✦ Bangles ✦</button>
              </div>

              <img
                src="/assets/img/home/shop_by_category/img-5.png"
                alt="Necklace"
                className="category-img mt-3 img-2"
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
            <div className="col-1-5 coloumn-5 coloumn-5-new">
              <div>
                <img
                src="/assets/img/home/shop_by_category/7.webp"
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
              </div>
              
                
              <div>
                <img
                src="/assets/img/home/shop_by_category/8.webp"
                alt="Necklace 2"
                className="category-img mt-0 mt-xl-3 img-2"
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
        </div>
      </section>
    </>
  );
};

export default InstagramSection2;
