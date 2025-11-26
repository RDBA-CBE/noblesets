import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import CheckoutArea from "@/components/checkout/checkout-area";
import FooterTwo from "@/layout/footers/footer-2";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import CheckoutBanner from "@assets/img/newlayout/shop-bg.png";
import { useCountryListQuery } from "../redux/features/productApi";
import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";

const CheckoutPage = () => {
  const { data: tokens } = useGetCartListQuery();
  const { data: list } = useCountryListQuery();

  return (
    <Wrapper>
      <SEO pageTitle="Checkout" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <HeaderSection />
      </motion.div>
      <div
      // style={{background:"#f6e9d9"}}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CommonBreadcrumb
              title="Checkout"
              subtitle="Checkout"
              bg_clr={true}
              BgImage={CheckoutBanner}
            />
          </motion.div>
        </div>
        <div className="checkout-page-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CheckoutArea />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
      <HomeFooter />
      </motion.div>
    </Wrapper>
  );
};

export default CheckoutPage;
