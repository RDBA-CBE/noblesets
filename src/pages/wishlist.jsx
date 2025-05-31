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
import HomeFooter from '@/components/home/HomeFooter';
import shopBanner from "../../public/assets/img/header-bg.png";
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb';



const WishlistPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Wishlist" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />
       <div style={{background:"#fff9f4"}}>
      <div className="section-wd">
      <ShopBreadcrumb
       title="WISHLIST" subtitle="WISHLIST"
        bgImage={shopBanner}
        // catList={categoryList}
        // product={productList}
      />
      </div>
      </div>
      {/* <CommonBreadcrumb title="WISHLIST" subtitle="WISHLIST" BgImage={WishlistBanner} /> */}
      <WishlistArea/>
      <HomeFooter />
    </Wrapper>
  );
};

export default PrivateRouter(WishlistPage); // export default WishlistPage;