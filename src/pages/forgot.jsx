import React from "react";
import { motion } from "framer-motion";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import ForgotArea from "@/components/login-register/forgot-area";
import FooterTwo from "@/layout/footers/footer-2";
import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";

const ForgotPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      {/* <HeaderTwo style_2={true} /> */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <HeaderSection />
      </motion.div>

      {/* <CommonBreadcrumb title="Forgot Password" subtitle="Reset Password" center={true} /> */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <ForgotArea />
      </motion.div>

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

export default ForgotPage;
