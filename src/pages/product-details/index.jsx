import React from 'react';
// internal
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import FooterTwo from "@/layout/footers/footer-2"

import Wrapper from '@/layout/wrapper';
import ErrorMsg from '@/components/common/error-msg';
import { useGetProductQuery } from '@/redux/features/productApi';
import ProductDetailsBreadcrumb from '@/components/breadcrumb/product-details-breadcrumb';
import ProductDetailsArea from '@/components/product-details/product-details-area';
import PrdDetailsLoader from '@/components/loader/prd-details-loader';
import HomeFooter from '@/components/home/HomeFooter';
import HeaderSection from '@/components/home/headerSection';
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb';

const ProductDetailsPage = ({ query }) => {
  const { data: product, isLoading, isError } = useGetProductQuery("6431364df5a812bd37e765ac");
  // decide what to render
  let content = null;
  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading}/>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product) {
    content = (
      <>
      
      <div style={{background:"#fff9f4"}}>
      <ProductDetailsArea productItem={product} />
      </div>
       
      </>
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle="Product Details" />
      <HeaderSection/>

      
      {content}

      
      <HomeFooter />
    </Wrapper>
  );
};

export default ProductDetailsPage;

export const getServerSideProps = async (context) => {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
};
