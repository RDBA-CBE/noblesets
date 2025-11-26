import React, { useEffect } from "react";
import { motion } from "framer-motion";
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
import shopBanner from "@assets/img/newlayout/shop-bg.png";
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <HeaderSection />
      </motion.div>
      <div style={{ background: "#f6e9d9" }}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ShopBreadcrumb
              title="Compare"
              subtitle="Compare"
              bgImage={shopBanner}
              // catList={categoryList}
              // product={productList}
            />
          </motion.div>
        </div>
      </div>
      {/* <CommonBreadcrumb title="Compare" subtitle="Compare" BgImage={banner}/> */}
      {/* <CompareArea /> */}
      {/* <CompareArea1/> */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <CompareArea2 />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <HomeFooter />
      </motion.div>
    </Wrapper>
  );
};

export default ComparePage;
