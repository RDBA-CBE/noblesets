import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import CartArea from "@/components/cart-wishlist/cart-area";
import OrderList from "@/components/cart-wishlist/order-list";
import SEO from "@/components/seo";
import ShopArea from "@/components/shop/shop-area";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import React, { useState } from "react";
import OrderBanner from "@assets/img/header-bg.webp";
import { useRouter } from "next/router";
import { useOrderListQuery } from "@/redux/features/productApi";
import MyOrderDetails from "../../components/my-account/my-order-details";
import PrivateRouter from "@/layout/private-router";
import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";

const OrderDetails = () => {
  const router = useRouter();
  const orderId = router?.query?.id;
  const { data } = useOrderListQuery({ orderId: orderId });

  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  return (
    <Wrapper>
      <SEO pageTitle="Cart" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />
      <div className="common-bg">
        <div className="section-wd">
          <CommonBreadcrumb
            title="Order Details"
            subtitle="Order / Order Details"
            BgImage={OrderBanner}
          />
        </div>
      </div>
      <MyOrderDetails data={data} />

      <HomeFooter />
    </Wrapper>
  );
};
export default PrivateRouter(OrderDetails); // export default OrderDetails;
