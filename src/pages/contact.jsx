import React from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import ContactBreadcrumb from "@/components/breadcrumb/contact-breadcrumb";
import ContactArea from "@/components/contact/contact-area";
import ContactMap from "@/components/contact/contact-map";
import HomeFooter from "@/components/home/HomeFooter";
import HeaderSection from "@/components/home/headerSection";
import { motion } from "framer-motion";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import shopBanner from "@assets/img/newlayout/shop-bg.png";



const ContactPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Contact" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

      {/* <ContactBreadcrumb /> */}
      <div style={{ background: "#f6e9d9" }}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ShopBreadcrumb
              title="Contact"
              // parentSlug={parentSlug}
              // title="Shop"
              bgImage={shopBanner}
              // catList={categoryList}
              // product={productList}
            />
          </motion.div>
        </div>
      </div>
      <ContactArea/>
      <ContactMap/>
      <HomeFooter />
    </Wrapper>
  );
};

export default ContactPage;
