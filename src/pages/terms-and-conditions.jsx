import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import TermsAndConditionsMain from "@/components/terms/terms-main";
import HeaderSection from "@/components/home/headerSection";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import shopBanner from "@assets/img/header-bg.png";

const TermsAndConditions = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Terms And Conditions" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

      <div style={{ background: "#f6e9d9" }}>
        <div className="section-wd">
          <ShopBreadcrumb
            title="Terms And Conditions"
            subtitle="Terms And Conditions"
            bgImage={shopBanner}
            // catList={categoryList}
            // product={productList}
          />
        </div>
      </div>


      <TermsAndConditionsMain />
      <HomeFooter />
    </Wrapper>
  );
};

export default TermsAndConditions;
