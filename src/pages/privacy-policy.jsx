import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import FooterTwo from "@/layout/footers/footer-2";
import PrivacyPolicyMain from "../components/privacy/privacyPolicyMain";
import HeaderSection from "@/components/home/headerSection";

const PrivacyPloicy = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Privacy Policy" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />


      <PrivacyPolicyMain />
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default PrivacyPloicy;
