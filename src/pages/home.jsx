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

const Index = () => {
    // const dispatch = useDispatch();

    const { data: tokens } = useGetCartListQuery();

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

    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <HeaderSection />
            <HomeBanner />
            {/* <FeatureAreaThree /> */}
            {/* <JewelryShopBanner /> */}

            <HomeCategorySection />
            <GiftWrapSection />
            <FeaturedProdectsSection />
            <InstagramSection />
            <HomeCelebritySection />
            {/* <JewelryAbout/> */}
            {/* <PopularProducts /> */}
            {/* <ProductArea/> */}
            {/* <JewelryCollectionBanner /> */}
            {/* <BestSellerPrd/> */}
            {/* <InstagramAreaFour /> */}
            <HomeFooter />
        </Wrapper>
    );
};

export default Index;
