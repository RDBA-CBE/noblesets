import React, { useEffect } from "react";
import { useRouter } from "next/router";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import FooterTwo from "@/layout/footers/footer-2";
import ProfileArea from "@/components/my-account/profile-area";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";
import Loader from "@/components/loader/loader";
import PrivateRouter from "@/layout/private-router";

const ProfilePage = () => {
  const router = useRouter();
  const {data: orderData, isError, isLoading, } = useGetUserOrdersQuery();
  // useEffect(() => {
  //   const isAuthenticate = Cookies.get("userInfo");
  //   if (!isAuthenticate) {
  //     router.push("/login");
  //   }
  // }, [router]);

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
      <HeaderTwo style_2={true} />
      <ProfileArea orderData={orderData} />
      <FooterTwo style_2={true} />
    </Wrapper>
  );
};

export default PrivateRouter(ProfilePage); // export default ProfilePage;
