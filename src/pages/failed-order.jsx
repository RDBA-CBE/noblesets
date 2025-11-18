import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import Success from "@/components/payment/success";
import {
  useGetOrderDetailMutation,
  useOrderListQuery,
  usePaymentMutation,
} from "@/redux/features/productApi";
import { useCreateCheckoutTokenWithoutEmailMutation } from "@/redux/features/card/cardApi";
import HeaderSection from "@/components/home/headerSection";
import SEO from "@/components/seo";
import { useSetState } from "@/utils/functions";
import Failed from "@/components/payment/failed";
import Failed1 from "@/components/payment/failed1";

export default function payments() {
  const Router = useRouter();

  const [state, setState] = useSetState({
    orderData: null,
    orderId: "",
  });

  // const storedData1 = decodeURIComponent(data);
  // console.log("✌️storedData1 --->", storedData1);

  const [orderDetail, { isLoading: loading1 }] = useGetOrderDetailMutation();

  const [createCheckoutTokenWithoutEmail, { data: checkoutTokens }] =
    useCreateCheckoutTokenWithoutEmailMutation();

  useEffect(() => {
    getOrderDetail();
  }, []);

  const getOrderDetail = async () => {
    try {
      const orderId = localStorage.getItem("order_id");
      const res = await orderDetail({ orderId });
      console.log("✌️res --->", res?.data?.data?.order);
      setState({ orderData: res?.data, orderId });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

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
      <SEO pageTitle="Payment Success" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

      <Failed1 data={state.orderData} orderId={state.orderId} />

      <HomeFooter />
    </Wrapper>
  );
}
