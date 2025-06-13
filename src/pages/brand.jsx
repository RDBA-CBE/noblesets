
import SEO from "@/components/seo";

import Wrapper from "@/layout/wrapper";
import React, { useState } from "react";


import PrivateRouter from "@/layout/private-router";
import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";
import BrandBanner from "@/components/banner/brand-banner";

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
      </div>
     

      <HomeFooter />
    </Wrapper>
  );
};
export default Page; 
