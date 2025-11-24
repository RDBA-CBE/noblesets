import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import {
  useCreateCheckoutTokenWithoutEmailMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import HomeCategorySection from "@/components/home/category-section";

import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";

import { useMaxPriceMutation } from "@/redux/features/productApi";

import InstaSection from "@/components/home/InstaSection";
import MediaGallery from "@/components/home/MediaGallery";
import HomeBannerNew from "@/components/home/HomeBannerNew";
import ShopByBudgetNew from "@/components/home/ShopByBudgetNew";
import BestSellers from "@/components/home/BestSellers";
import GiftSectionNew from "@/components/home/giftSectionNew";
import ShopByCollectionsNew from "@/components/home/shopByCollectionsNew";
import NoblesetPromisesNew from "@/components/home/NoblesetPromisesNew";
import InstaSection1 from "@/components/home/InstaSection1";

const Index = () => {
  const [maximumPrice] = useMaxPriceMutation();

  const [createCheckoutTokenWithoutEmail, { data: data }] =
    useCreateCheckoutTokenWithoutEmailMutation();

  useEffect(() => {
    const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
    const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");

    if (!checkoutTokenINR || checkoutTokenINR == "undefined") {
      createCheckoutTokenINR();
    }
    if (!checkoutTokenUSD || checkoutTokenUSD == "undefined") {
      createCheckoutTokenUSD();
    }
    getProductMaxPrice();
  }, []);

  const createCheckoutTokenINR = async () => {
    try {
      const data = await createCheckoutTokenWithoutEmail({
        channel: "india-channel",
      });
      localStorage.setItem(
        "checkoutTokenINR",
        data?.data?.data?.checkoutCreate?.checkout?.token
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createCheckoutTokenUSD = async () => {
    try {
      const data = await createCheckoutTokenWithoutEmail({
        channel: "default-channel",
      });
      localStorage.setItem(
        "checkoutTokenUSD",
        data?.data?.data?.checkoutCreate?.checkout?.token
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getProductMaxPrice = () => {
    // const filter = commonFilter();
    maximumPrice({
      // filter,
      first: 1,
      sortBy: { direction: "DESC", field: "PRICE" },
    }).then((res) => {
      const list = res.data?.data?.productsSearch?.edges;
      if (list?.length > 0) {
        const maxPrice =
          list[0]?.node?.pricing?.priceRange?.start?.gross?.amount;

        // setPriceValue([0, maxPrice]);
        // setInitialMaxPrice(maxPrice);
        // setMaxPrice(maxPrice);
      } else {
        // setPriceValue([0, 0]);
        // setMaxPrice(0);
      }
    });
  };

  return (
    <Wrapper>
      <SEO pageTitle="Home" />

      <HeaderSection />
      <div className="common-bg">
        <div className=" ">
          <HomeBannerNew />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <HomeCategorySection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <ShopByBudgetNew />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <BestSellers />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <GiftSectionNew />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <ShopByCollectionsNew />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <NoblesetPromisesNew />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <MediaGallery />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* <InstaSection /> */}
        <InstaSection1 />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <HomeFooter />
      </motion.div>

      {/* <HomeBanner /> */}

      {/* <FeatureAreaThree /> */}
      {/* <JewelryShopBanner /> */}

      {/* <ShopByBudget /> */}
      {/* <ShopByCategory /> */}
      {/* <InstagramSection2/> */}
      {/* <GiftSection/> */}

      {/* <ShopByCollections /> */}

      {/* <NobelsetsPromises /> */}

      {/* <GiftWrapSection /> */}
      {/* <FeaturedProdectsSection />
      <InstagramSection />
      <HomeCelebritySection /> */}
      {/* <JewelryAbout/> */}
      {/* <PopularProducts /> */}
      {/* <ProductArea/> */}
      {/* <JewelryCollectionBanner /> */}
      {/* <BestSellerPrd/> */}
      {/* <InstagramAreaFour /> */}
    </Wrapper>
  );
};

export default Index;
