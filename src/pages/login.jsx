import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Wrapper from '@/layout/wrapper';
import LoginArea from '@/components/login-register/login-area';
import FooterTwo from '@/layout/footers/footer-2';
import { useSelector } from 'react-redux';
import HeaderSection from '@/components/home/headerSection';
import HomeFooter from '@/components/home/HomeFooter';

const LoginPage = () => {
  const cartData = useSelector((state) => state);

  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

      {/* <CommonBreadcrumb title="Login" subtitle="Login" center={true} /> */}
      <LoginArea/>
      <HomeFooter />
    </Wrapper>
  );
};

export default LoginPage;