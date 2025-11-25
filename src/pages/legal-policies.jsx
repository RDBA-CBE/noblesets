import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import PrivacyPolicyMain from "../components/privacy/privacyPolicyMain";
import HeaderSection from "@/components/home/headerSection";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import shopBanner from "@assets/img/newlayout/shop-bg.png";

const PrivacyPloicy = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Legal Policies" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />
      <div 
      // style={{ background: "#f6e9d9" }}
      >
        <div >
          <ShopBreadcrumb
            title="Legal Policies"
            subtitle="Legal Policies"
            bgImage={shopBanner}
            // catList={categoryList}
            // product={productList}
          />
        </div>
      </div>

      <PrivacyPolicyMain />
      <HomeFooter />
    </Wrapper>
  );
};

export default PrivacyPloicy;
