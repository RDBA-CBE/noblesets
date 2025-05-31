import React, { useEffect, useState } from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import {
  useGetCategoryNameMutation,
  useGetProductQuery,
} from "@/redux/features/productApi";
import ProductDetailsArea from "../components/product-details/product-details-area";
import banner from "../../public/assets/img/shop-banner.jpg";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import ErrorMsg from "@/components/common/error-msg";
import HeaderSection from "@/components/home/headerSection";
import Link from "next/link";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import shopBanner from "../../public/assets/img/header-bg.png";

export default function GiftCart() {
  const {
    data: productData,
    isLoading,
    isError,
    refetch: productRefetch,
  } = useGetProductQuery({ productId: "gift-card" });
  const product = productData?.data?.product;

  // const [state, setState] = useSetState({
  //   data: {},
  // });
  // console.log("productData: ", state.data);

  // useEffect(() => {
  //   getData();
  // }, [productData]);

  // const getData = async () => {
  //   try {
  //     const product = productData?.data?.product;
  //     setState({ data: product });
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

  const [getCategoryName] = useGetCategoryNameMutation();

  const [catName, setCatName] = useState("");
  const [parentCatName, setParentCatName] = useState("");
  const [parentSlug, setParentSlug] = useState("");

  useEffect(() => {
    if (product?.category?.id) {
      filterByCategoryName();
    }
  }, [product?.category?.id]);

  const filterByCategoryName = async () => {
    const categoryID = product?.category?.id;
    try {
      const res = await getCategoryName({
        categoryid: categoryID,
      });

      const list = res?.data?.data?.category?.name;
      setCatName(list);

      if (res?.data?.data?.category?.parent?.name) {
        setParentCatName(res?.data?.data?.category?.parent?.name);
        setParentSlug(res?.data?.data?.category?.parent?.slug);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let shopTitle = "Shop";

  if (product?.category?.id) {
    shopTitle = `Shop / ${
      parentCatName ? `${parentCatName} / ` : ""
    }${catName}`;
  }

  let content = null;
  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  // if (!isLoading && !isError && product) {
  content = (
    <>
      {/* {product !== null ? (
          <ProductDetailsArea
            productItem={product}
            pageTitle={shopTitle}
            detailsRefetch={productRefetch}
            isGiftCard={true}
            parentSlug={parentSlug}
          />
        ) : ( */}
      <div className="container-fluid tp-compare-area pb-50 pt-50">
        <div className="row">
          <div className="col-xl-12">
            <div className="text-center pt-0 pb-0 pt-md-50 pb-md-50 ">
              <h3>No Gift Card Found</h3>
              <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                Continue Shipping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* )} */}
    </>
  );
  // }
  return (
    <Wrapper>
      <SEO pageTitle="Gift Card" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />
      {/* 
      <CommonBreadcrumb
        title="Gift Card"
        subtitle="Gift Card"
        BgImage={banner}
        parentSlug={parentSlug}
      /> */}

      <ShopBreadcrumb
        title="Gift Card"
        // parentSlug={parentSlug}
        // title="Shop"
        subtitle="Gift Card"
        bgImage={shopBanner}
        // catList={categoryList}
        // product={productList}
      />
      {isLoading ? (
        <PrdDetailsLoader loading={isLoading} />
      ) : product ? (
        <ProductDetailsArea
          productItem={product}
          pageTitle={shopTitle}
          detailsRefetch={productRefetch}
          isGiftCard={true}
          parentSlug={parentSlug}
        />
      ) : (
        <div className="container-fluid tp-compare-area pb-50 pt-50">
          <div className="row">
            <div className="col-xl-12">
              <div className="text-center pt-0 pb-0 pt-md-50 pb-md-50 ">
                <h3>No Gift Card Found</h3>
                <Link href="/shop" className="tp-cart-checkout-btn mt-20">
                  Continue Shipping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <ProductDetailsArea
        productItem={product}
        detailsRefetch={productRefetch}
      /> */}
      {/* {content} */}
      <HomeFooter />
    </Wrapper>
  );
}
