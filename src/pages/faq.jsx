import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import ShippingAndExchangePolicyMain from "../components/shippingPolicy/shippingPolicyMain";
import HeaderSection from "@/components/home/headerSection";
import FAQ from "@/components/shippingPolicy/Faq";

const ShippingAndExchangePolicy = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Help & FAQs" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />


      <FAQ />
      <HomeFooter />
    </Wrapper>
  );
};

export default ShippingAndExchangePolicy;
