import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import Success from "@/components/payment/success";
import { useOrderListQuery } from "@/redux/features/productApi";
import { useCreateCheckoutTokenWithoutEmailMutation } from "@/redux/features/card/cardApi";
import HeaderSection from "@/components/home/headerSection";
import SEO from "@/components/seo";
import { useSetState } from "@/utils/functions";
import Failed from "@/components/payment/failed";

export default function payments() {
  const Router = useRouter();

  // const { data } = Router.query;

  const [state, setState] = useSetState({
    orderData: null,
  });

  const datas = {
    order_id: "07b893f457064f537cb9",
    tracking_id: "114059103997",
    bank_ref_no: "",
    order_status: "Aborted",
    failure_message: "",
    payment_mode: "Net Banking",
    card_name: "HDFC Bank",
    status_code: "null",
    status_message: "null",
    currency: "INR",
    amount: "139538.00",
    billing_name: "Duraisamy p",
    billing_address: "chennai",
    billing_city: "chennai",
    billing_state: "Tamil Nadu",
    billing_zip: "641704",
    billing_country: "India",
    billing_tel: "9876543210",
    billing_email: "psmkduraisamy@gmail.com",
    delivery_name: "Duraisamy p",
    delivery_address: "chennai",
    delivery_city: "chennai",
    delivery_state: "Tamil Nadu",
    delivery_zip: "641704",
    delivery_country: "India",
    delivery_tel: "9876543210",
    merchant_param1: "T3JkZXI6NzUwZGM1MjUtOGE5NS00YzE0LWFmNGYtNGQwMDE2Mzk4YTM1",
    merchant_param2: "",
    merchant_param3: "",
    merchant_param4: "",
    merchant_param5: "",
    vault: "N",
    offer_type: "null",
    offer_code: "null",
    discount_value: "0.0",
    mer_amount: "139538.00",
    eci_value: "null",
    retry: "N",
    response_code: "null",
    billing_notes: "",
    trans_date: "29/10/2025 11:54:15",
    bin_country: "",
    auth_ref_num: "",
  };

  const storedData1 = decodeURIComponent(datas);

  const { refetch: orderData } = useOrderListQuery({
    orderId: datas?.merchant_param1,
  });

  // const [successPayment] = usePaymentMutation();

  const [createCheckoutTokenWithoutEmail, { data: checkoutTokens }] =
    useCreateCheckoutTokenWithoutEmailMutation();

  useEffect(() => {
    orderDetails();
  }, [storedData1]);

  const orderDetails = async () => {
    try {
      // const data = await successPayment({
      //   amountAuthorized: datas?.,
      //   amountCharged: total,
      //   pspReference: res?.razorpay_payment_id,
      // });
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
      {datas?.merchant_param1 == "Success" ? (
        <Success data={state.orderData} />
      ) : (
        <Failed data={state.orderData} orderId={datas?.merchant_param1} />
      )}

      <HomeFooter />
    </Wrapper>
  );
}
