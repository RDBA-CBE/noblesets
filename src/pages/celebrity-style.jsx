import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import WishlistArea from "@/components/cart-wishlist/wishlist-area";
import SEO from "@/components/seo";
import HomeFooter from "@/components/home/HomeFooter";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import React from "react";
import WishlistBanner from "../../public/assets/img/shop-banner.jpg";
import CelebrityStyleMain from "@/components/celebrity/CelebrityStyleMain";
import HeaderSection from "@/components/home/headerSection";


const CelebrityStyle = () => {


  return (
    <>
      <Wrapper>
        <SEO pageTitle="celebrity style" />
        {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

        <CommonBreadcrumb
          title="CELEBRITY STYLE"
          subtitle="CELEBRITY STYLE"
          BgImage={WishlistBanner}
        />
        <CelebrityStyleMain />
        <HomeFooter />
      </Wrapper>
    </>
  );
};

export default CelebrityStyle;
