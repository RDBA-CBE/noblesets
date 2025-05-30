import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import PrivacyPolicyMain from "../components/privacy/privacyPolicyMain";
import HeaderSection from "@/components/home/headerSection";

const PrivacyPloicy = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Privacy Policy" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />


      <PrivacyPolicyMain />
      <HomeFooter />
    </Wrapper>
  );
};

export default PrivacyPloicy;
