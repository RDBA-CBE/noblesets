import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Wrapper from '@/layout/wrapper';
import RegisterArea from '@/components/login-register/register-area';
import FooterTwo from '@/layout/footers/footer-2';
import HeaderSection from '@/components/home/headerSection';
import HomeFooter from '@/components/home/HomeFooter';

const RegisterPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

      {/* <CommonBreadcrumb title="Register" subtitle="Register" center={true} /> */}
      <RegisterArea />
      <HomeFooter />
    </Wrapper>
  );
};

export default RegisterPage;