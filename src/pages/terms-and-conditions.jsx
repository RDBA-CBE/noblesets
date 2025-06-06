import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import TermsAndConditionsMain from "@/components/terms/terms-main";
import HeaderSection from "@/components/home/headerSection";

const TermsAndConditions = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Terms And Conditions" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />


      <TermsAndConditionsMain />
      <HomeFooter />
    </Wrapper>
  );
};

export default TermsAndConditions;
