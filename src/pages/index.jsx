import React, { useEffect } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import {
  useCreateCheckoutTokenWithoutEmailMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import HomeCategorySection from "@/components/home/category-section";
import GiftWrapSection from "@/components/home/gift-wrap";
import FeaturedProdectsSection from "@/components/home/featured-products";
import InstagramSection from "@/components/home/instagram-section";
import HomeCelebritySection from "@/components/home/home-celebritysection";
import HomeBanner from "@/components/home/Homebanner";
import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";
import ShopByBudget from "@/components/home/shopByBudget";
import ShopByCategory from "@/components/home/shopByCategory";
import ShopByCollections from "@/components/home/shopByCollections";
import GiftSection from "@/components/home/giftSection";
import NobelsetsPromises from "@/components/home/NobelsetsPromises";
import { useMaxPriceMutation } from "@/redux/features/productApi";
import InstagramSection2 from "@/components/home/shopByCategory2";
import InstaSection from "@/components/home/InstaSection";
import MediaGallery from "@/components/home/MediaGallery";
import HomeBannerNew from "@/components/home/HomeBannerNew";
import ShopByBudgetNew from "@/components/home/ShopByBudgetNew";
import BestSellers from "@/components/home/BestSellers";
import GiftSectionNew from "@/components/home/giftSectionNew";
import ShopByCollectionsNew from "@/components/home/shopByCollectionsNew";
import NoblesetPromisesNew from "@/components/home/NoblesetPromisesNew";

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

      <HomeCategorySection />

      <ShopByBudgetNew />

      <BestSellers />

      <GiftSectionNew />

      <ShopByCollectionsNew />
      <NoblesetPromisesNew />

      <MediaGallery />
      <InstaSection />

      <HomeFooter />

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
