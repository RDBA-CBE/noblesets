import React from "react";
import { motion } from "framer-motion";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import CartArea from "@/components/cart-wishlist/cart-area";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import FooterTwo from "@/layout/footers/footer-2";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import CartBanner from "@assets/img/newlayout/shop-bg.png";
import HeaderSection from "@/components/home/headerSection";
import CartArea1 from "@/components/cart-wishlist/cart-area1";
import HomeFooter from "@/components/home/HomeFooter";

const CartPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Cart" />
      {/* <HeaderTwo style_2={true} /> */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <HeaderSection />
      </motion.div>
      <div
      //  style={{background:"#f6e9d9"}}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CommonBreadcrumb
              title="Shopping Cart"
              subtitle="Shopping Cart"
              BgImage={CartBanner}
            />
          </motion.div>
        </div>
        {/* <CartArea/> */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="cart-page">
            <CartArea1 />
          </div>
        </motion.div>
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

export default CartPage;
