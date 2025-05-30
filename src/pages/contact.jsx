import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import ContactBreadcrumb from "@/components/breadcrumb/contact-breadcrumb";
import ContactArea from "@/components/contact/contact-area";
import ContactMap from "@/components/contact/contact-map";
import HomeFooter from "@/components/home/HomeFooter";
import HeaderSection from "@/components/home/headerSection";

const ContactPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Contact" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

      <ContactBreadcrumb />
      <ContactArea/>
      <ContactMap/>
      <HomeFooter />
    </Wrapper>
  );
};

export default ContactPage;
