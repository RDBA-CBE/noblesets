import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import StorySec from "@/components/our-story/StorySec";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import HomeFooter from "@/components/home/HomeFooter";
import HeaderSection from "@/components/home/headerSection";
import shopBanner from "@assets/img/header-bg.png";



const OurStory = () => {
  return (
     <Wrapper>
          <SEO pageTitle="Our Story" />
          {/* <HeaderTwo style_2={true} /> */}
          <HeaderSection />
           <div style={{background:"#fff9f4"}}>
          <div className="section-wd">
          <ShopBreadcrumb
            title="Our Story"
            subtitle="Our Story"
            bgImage={shopBanner}
            // catList={categoryList}
            // product={productList}
          />
          </div>
          </div>
          
          <StorySec/>
          <HomeFooter />
        </Wrapper>
   
  );
};

export default OurStory;
