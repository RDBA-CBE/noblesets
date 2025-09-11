import React,{useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
// internal
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import CheckoutArea from '@/components/checkout/checkout-area';
import FooterTwo from '@/layout/footers/footer-2';
import { useGetCartListQuery } from '@/redux/features/card/cardApi';
import CheckoutBanner from "@assets/img/header-bg.png";
import { useCountryListQuery } from '../redux/features/productApi';
import HeaderSection from '@/components/home/headerSection';
import HomeFooter from '@/components/home/HomeFooter';


const CheckoutPage = () => {
  const  { data: tokens } = useGetCartListQuery();
  const  { data: list } = useCountryListQuery();



  return (
    <Wrapper>
      <SEO pageTitle="Checkout" />
      <HeaderSection />
       <div style={{background:"#f6e9d9"}}>
      <div className="section-wd">
      <CommonBreadcrumb title="Checkout" subtitle="Checkout" bg_clr={true} BgImage={CheckoutBanner} />
      </div>
      <div className='checkout-page-main'>
        <CheckoutArea/>
      </div>
      
      </div>
     <HomeFooter />
    </Wrapper>
  );
};

export default CheckoutPage;