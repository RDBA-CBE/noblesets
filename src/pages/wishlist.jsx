import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Wrapper from '@/layout/wrapper';
import WishlistArea from '@/components/cart-wishlist/wishlist-area';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import FooterTwo from '@/layout/footers/footer-2';
import WishlistBanner from "../../public/assets/img/shop-banner.jpg";
import PrivateRouter from '@/layout/private-router';
import HeaderSection from '@/components/home/headerSection';


const WishlistPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Wishlist" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

      <CommonBreadcrumb title="WISHLIST" subtitle="WISHLIST" BgImage={WishlistBanner} />
      <WishlistArea/>
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default PrivateRouter(WishlistPage); // export default WishlistPage;