import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Wrapper from '@/layout/wrapper';
import CartArea from '@/components/cart-wishlist/cart-area';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import FooterTwo from '@/layout/footers/footer-2';
import { useGetCartListQuery } from '@/redux/features/card/cardApi';
import CartBanner from "@assets/img/newlayout/shop-bg.png";
import HeaderSection from '@/components/home/headerSection';
import CartArea1 from '@/components/cart-wishlist/cart-area1';
import HomeFooter from "@/components/home/HomeFooter";


const CartPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Cart" />
      {/* <HeaderTwo style_2={true} /> */}
       <HeaderSection/>
       <div 
      //  style={{background:"#f6e9d9"}}
       >
      <div >
      <CommonBreadcrumb title="Shopping Cart" subtitle="Shopping Cart" BgImage={CartBanner}/>
       </div>
      {/* <CartArea/> */}
      <div className='cart-page'>
         <CartArea1/>
      </div>
     
       </div>
      <HomeFooter />
    </Wrapper>
  );
};

export default CartPage;