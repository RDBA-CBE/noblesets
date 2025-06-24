import React, { useEffect } from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import CompareArea from "@/components/compare/compare-area";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import FooterTwo from "@/layout/footers/footer-2";
import banner from "@assets/img/shop-banner.jpg";
import { useGetWishlistQuery } from "@/redux/features/productApi";
import { useDispatch } from "react-redux";
import { get_wishlist_products } from "@/redux/features/wishlist-slice";
import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import shopBanner from "../../public/assets/img/header-bg.png";
import CompareArea1 from "@/components/compare/compare-area-1";
import CompareArea2 from "@/components/compare/compare-area.2";

const ComparePage = () => {
  const { data: wishlistData, isError, isLoading } = useGetWishlistQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (wishlistData) {
      if (wishlistData?.data?.wishlists?.edges?.length > 0) {
        const modify = wishlistData?.data?.wishlists.edges;
        dispatch(get_wishlist_products(modify?.map((item) => item.node)));
      } else {
        dispatch(get_wishlist_products([]));
      }
    } else {
      dispatch(get_wishlist_products([]));
    }
  }, [wishlistData]);

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />
       <div style={{background:"#fff9f4"}}>
      <div className="section-wd">
      <ShopBreadcrumb
        title="Compare"
        subtitle="Compare"
        bgImage={shopBanner}
        // catList={categoryList}
        // product={productList}
      />
      </div>
      </div>
      {/* <CommonBreadcrumb title="Compare" subtitle="Compare" BgImage={banner}/> */}
      {/* <CompareArea /> */}
      {/* <CompareArea1/> */}
      <CompareArea2/>
      <HomeFooter />
    </Wrapper>
  );
};

export default ComparePage;
