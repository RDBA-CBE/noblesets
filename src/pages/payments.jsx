import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import Success from "@/components/payment/success";
import {
  useOrderListQuery,
  usePaymentMutation,
} from "@/redux/features/productApi";
import { useCreateCheckoutTokenWithoutEmailMutation } from "@/redux/features/card/cardApi";
import HeaderSection from "@/components/home/headerSection";
import SEO from "@/components/seo";
import { useSetState } from "@/utils/functions";
import Failed from "@/components/payment/failed";

export default function payments() {
  const Router = useRouter();

  const { data } = Router.query;

  const [state, setState] = useSetState({
    orderData: null,
  });

  // const storedData1 = decodeURIComponent(data);
  // console.log("✌️storedData1 --->", storedData1);

  let jsonLike;

  if (data) {
    jsonLike = JSON.parse(data);
  }
  const { refetch: orderData } = useOrderListQuery({
    orderId: jsonLike?.merchant_param1,
  });

  const [successPayment] = usePaymentMutation();

  const [createCheckoutTokenWithoutEmail, { data: checkoutTokens }] =
    useCreateCheckoutTokenWithoutEmailMutation();

  useEffect(() => {
    orderDetails();
  }, [data]);

  const orderDetails = async () => {
    try {
      const jsonLike = JSON.parse(data);
      console.log("✌️jsonLike --->", jsonLike);
      if (jsonLike?.order_status == "Success") {
        const datas = await successPayment({
          amountAuthorized: jsonLike?.mer_amount,
          amountCharged: jsonLike?.mer_amount,
          pspReference: jsonLike?.tracking_id,
        });
        console.log("✌️dasuccessPaymentta --->", datas);

        if (datas) {
          const response = await orderData();
          console.log("✌️response --->", response);
          setState({ orderData: response?.data });
        }
      }
      const response = await orderData();
      console.log("✌️response --->", response);
      setState({ orderData: response?.data });
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
      {jsonLike?.order_status == "Success" ? (
        <Success data={state.orderData} />
      ) : (
        <Failed data={state.orderData} orderId={jsonLike?.merchant_param1} />
      )}

      <HomeFooter />
    </Wrapper>
  );
}
