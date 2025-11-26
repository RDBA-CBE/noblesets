import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import HomeFooter from "@/components/home/HomeFooter";
import ProfileArea from "@/components/my-account/profile-area";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";
import Loader from "@/components/loader/loader";
import PrivateRouter from "@/layout/private-router";
import HeaderSection from "@/components/home/headerSection";
import { useUserReviewsListMutation } from "@/redux/features/productApi";
import { useSetState } from "@/utils/functions";

const ProfilePage = () => {
  const router = useRouter();
  const { data: orderData, isError, isLoading } = useGetUserOrdersQuery();

  const [state, setState] = useSetState({
    reviewList: [],
  });

  const [reviews] = useUserReviewsListMutation();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      getReviewList(user);
    }
  }, [router]);

  const getReviewList = async (user) => {
    try {
      const res = await reviews({
        userId: user?.user?.id,
      });
      if (res?.data?.data?.productReviews?.edges?.length > 0) {
        const reviewsData = res?.data?.data?.productReviews?.edges?.map(
          (item) => item?.node
        );
        setState({ reviewList: reviewsData });
      }
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader loading={isLoading} />
      </div>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Profile" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <HeaderSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <ProfileArea orderData={orderData} reviewList={state.reviewList} />
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

export default PrivateRouter(ProfilePage); // export default ProfilePage;
