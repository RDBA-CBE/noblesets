import React, { useEffect } from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import FooterTwo from "@/layout/footers/footer-2";
import banner from "../../public/assets/img/shop-banner.jpg";
import { useGetProductQuery } from "@/redux/features/productApi";
import ProductDetailsArea from "@/components/product-details/product-details-area";
import { useSetState } from "../utils/functions";

const CouponPage = () => {
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductQuery({ productId: "UHJvZHVjdDo1NTI3" });
  const product = productData?.data?.product;

  const [state, setState] = useSetState({
    data: {},
  });


  useEffect(() => {
    getData();
  }, [productData]);

  const getData = async () => {
    try {
      const product = productData?.data?.product;
      setState({ data: product });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Wrapper>
      <SEO pageTitle="Coupon" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb
        title="Gift Cart"
        subtitle="Coupon"
        BgImage={banner}
      />
      <ProductDetailsArea productItem={product} />
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default CouponPage;
