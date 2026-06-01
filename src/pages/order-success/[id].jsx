import React, { useEffect, useState } from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import Success from "@/components/payment/success";
import { useRouter } from "next/router";
import { useOrderListQuery } from "@/redux/features/productApi";
import { useCreateCheckoutTokenWithoutEmailMutation } from "@/redux/features/card/cardApi";
import HeaderSection from "@/components/home/headerSection";
import { BLUE_DART } from "@/utils/constant";
import axios from "axios";
import GoldRateBar from "@/components/GoldRateBar";

const PaymentSucess = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const orderId = router?.query?.id;
  const { data } = useOrderListQuery({ orderId: orderId });

  const [createCheckoutTokenWithoutEmail, { data: checkoutTokens }] =
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
    trackShipment();
    getDomesticTransitTime();
  }, []);

  //   const trackShipment = async () => {
  // console.log('✌️trackShipment --->', );
  //     try {
  //       setLoading(true)

  //       const res = await axios.get(`${BLUE_DART.BaseUrl}/tracking/v1/shipment`, {
  //         params: {
  //           handler: 'tnt',
  //           loginid: "SDnWsfLstFqLTXGG",
  //           numbers: '76662235090',
  //           format: 'xml',
  //           lickey: "3K5LxWWJnBpC92pQI29exNqRfIuKvSJl",
  //           scan: 1,
  //           action: 'custawbquery',
  //           verno: 1
  //         },
  //         headers: {
  //           JWTToken: BLUE_DART.JWTToken
  //         }
  //       })

  //       console.log('📦 Tracking Response:', res.data)

  //       setLoading(false)
  //     } catch (error) {
  //       console.error('❌ Tracking Error:', error)
  //       setLoading(false)
  //     }
  //   }

  const trackShipment = async () => {
    console.log("✌️trackShipment --->");
    try {
      setLoading(true);
      const AWB_NO = "90001526591"; // Waybill response la vandhadhu

      const res = await axios.get(`${BLUE_DART.BaseUrl}/tracking/v1/shipment`, {
        params: {
          handler: "tnt",
          loginid: BLUE_DART.API_SECRET,
          lickey: BLUE_DART.LicenceKey,
          numbers: AWB_NO,
          format: "json",
          scan: 1,
          action: "custawbquery",
          verno: 1,
        },
      });
      console.log("Tracking Response 👉", res);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Tracking Error ❌", error);
    }
  };

  const getDomesticTransitTime = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${BLUE_DART.BaseUrl}/transit/v1/GetDomesticTransitTimeForPinCodeandProduct`,
        {
          pPinCodeFrom: "400012",
          pPinCodeTo: "400099",
          pProductCode: "A",
          pSubProductCode: "P",
          pPudate: `/Date(${Date.now()})/`, // Blue Dart format
          pPickupTime: "16:00",
          profile: {
            Api_type: BLUE_DART.Api_type,
            LicenceKey: BLUE_DART.LicenceKey,
            LoginID: BLUE_DART.LoginID,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            JWTToken: BLUE_DART.JWTToken,
          },
        }
      );

      console.log(
        "🚚 Transit Time Response:",
        res.data?.GetDomesticTransitTimeForPinCodeandProductResult
      );

      setLoading(false);
      return res.data;
    } catch (error) {
      console.error("❌ Transit Time Error:", error);
      setLoading(false);
      return null;
    }
  };

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
      <div className="d-block d-xl-none">
              <GoldRateBar/>
            </div>
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

      <Success data={data} />
      <HomeFooter />
    </Wrapper>
  );
};

export default PaymentSucess;
