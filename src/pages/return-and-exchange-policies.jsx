import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import ShippingAndExchangePolicyMain from "../components/shippingPolicy/shippingPolicyMain";
import HeaderSection from "@/components/home/headerSection";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import shopBanner from "@assets/img/newlayout/shop-bg.png";
import GoldRateBar from "@/components/GoldRateBar";

const ShippingAndExchangePolicy = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Return and Exchange Policies" />
      {/* <HeaderTwo style_2={true} /> */}
      <div className="d-block d-xl-none">
        <GoldRateBar />
      </div>
      <HeaderSection />

      <div
      // style={{ background: "#f6e9d9" }}
      >
        <div>
          <ShopBreadcrumb
            title="Return and Exchange Policies"
            subtitle="Return and Exchange Policies"
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
