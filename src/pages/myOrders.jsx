import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import OrderList from "@/components/cart-wishlist/order-list";
import SEO from "@/components/seo";
import FooterTwo from "@/layout/footers/footer-2";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import React from "react";
import OrderBanner from "@assets/img/shop-banner.jpg";
import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";
import GoldRateBar from "@/components/GoldRateBar";

const MyOrders = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Cart" />
      <div className="d-block d-xl-none">
        <GoldRateBar />
      </div>
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

      <CommonBreadcrumb
        title="Order List"
        subtitle="Order List"
        BgImage={OrderBanner}
      />
      <OrderList />
      <HomeFooter />
    </Wrapper>
  );
};
export default MyOrders;
