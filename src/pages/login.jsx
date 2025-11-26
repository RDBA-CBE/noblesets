import React from "react";
import { motion } from "framer-motion";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import LoginArea from "@/components/login-register/login-area";
import FooterTwo from "@/layout/footers/footer-2";
import { useSelector } from "react-redux";
import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";

const LoginPage = () => {
  const cartData = useSelector((state) => state);

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

      {/* <CommonBreadcrumb title="Login" subtitle="Login" center={true} /> */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <LoginArea />
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

export default LoginPage;
