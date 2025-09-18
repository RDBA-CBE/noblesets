import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import ShippingAndExchangePolicyMain from "../components/shippingPolicy/shippingPolicyMain";
import HeaderSection from "@/components/home/headerSection";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import shopBanner from "@assets/img/header-bg.webp";

const ShippingAndExchangePolicy = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Loyalty Programs" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

       <div style={{ background: "#f6e9d9" }}>
        <div >
          <ShopBreadcrumb
            title="Loyalty Programs"
            subtitle="Loyalty Programs"
            bgImage={shopBanner}
            // catList={categoryList}
            // product={productList}
          />
        </div>
      </div>


      <ShippingAndExchangePolicyMain />
      <HomeFooter />
    </Wrapper>
  );
};

export default ShippingAndExchangePolicy;
