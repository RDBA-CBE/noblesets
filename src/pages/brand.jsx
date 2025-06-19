
import SEO from "@/components/seo";

import Wrapper from "@/layout/wrapper";
import React, { useState } from "react";


import PrivateRouter from "@/layout/private-router";
import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";
import BrandBanner from "@/components/banner/brand-banner";
import BrandShop from "@/components/shop/BrandShop";

const Page = () => {




  return (
    <Wrapper>
      <SEO pageTitle="Cart" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />
      <div style={{ background: "#fff9f4" }}>
        <div className="section-wd">
          <BrandBanner/>


        </div>

        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-7">
              <div className="d-flex text-center flex-column align-items-center justify-content-center h-100">
                <h2 className="main-ti">Go with the trend</h2>
                 <p className="text-black">Younger girls adore jewels and love to glorify them with trending collections. Samelli is our one-of-a-kind teenage collection for young girls to flaunt with a minimalistic yet classy jewellery collection. Samelli’s ornaments feel airy with attractive designs making her fall in love with herself all day.</p>
              </div>
           
          </div>
          <div className="col-10 col-lg-5 m-auto d-flex justify-content-center">
            <img  src="https://sreethangamjewellery.com/stjt/wp-content/uploads/2022/07/Section-Image-sameli-374x300.png" alt="" />
          </div>
          </div>


          {/* <div className="row">
            <div className="col-12 col-md-4">
              <BrandShop/>
            </div>
          </div> */}
          
        </div>
      </div>
     

      <HomeFooter />
    </Wrapper>
  );
};
export default Page; 
