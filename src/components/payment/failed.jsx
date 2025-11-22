import { useOrderListQuery } from "@/redux/features/productApi";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  addCommasToNumber,
  checkChannel,
  roundIndianRupee,
  roundOff,
} from "../../utils/functions";
import { useRouter } from "next/router";
import { usePaymentMutation } from "@/redux/features/productApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import useRazorpay from "react-razorpay";
import { useDispatch } from "react-redux";
import { cart_list } from "@/redux/features/cartSlice";
import {
  ACCESS_CODE,
  CASE_ON_DELIVERY,
  CCAVENUE_URL,
  MERCHANT_ID,
} from "@/utils/constant";
import { createHash } from "crypto";
import CCAvenue from "@/utils/CCAvenue";

const Failed = ({ data, orderId, fullData }) => {
  console.log("✌️data --->", data);
  const [giftCard, setGiftCard] = useState(0);

  const OrderDetails = data?.data?.order?.lines;
  const SubTotal = data?.data?.order?.subtotal.gross.amount;
  const Total = data?.data?.order?.total.gross.amount;
  const OrderNumber = data?.data?.order?.number;
  const Tax = data?.data?.order?.total?.tax;
  const OrderDate = moment(data?.data?.order?.updatedAt).format("MMMM D, YYYY");
  const ShippingAmount = data?.data?.order?.shippingPrice?.gross.amount;
  const status = data?.data?.order?.paymentStatus;
  const giftWrap = data?.data?.order?.isGiftWrap;
  const paymentMethod = data?.data?.order?.paymentMethod?.name;
  const GiftCard = data?.data?.order?.giftCards;
  const codAmount = data?.data?.order?.codAmount;
  const giftWrapAmount = data?.data?.order?.giftWrapAmount;
  const discount = data?.data?.order?.discount;
  const billingAddress = data?.data?.order?.billingAddress;
  const shippingAddress = data?.data?.order?.shippingAddress;

  const [Razorpay] = useRazorpay();

  const dispatch = useDispatch();

  const router = useRouter();

  const [successPayment] = usePaymentMutation();

  useEffect(() => {
    if (data) {
      total();
    }
  }, [data]);

  const total = () => {
    let total = 0;
    if (paymentMethod == CASE_ON_DELIVERY && codAmount !== 0) {
      total = SubTotal + codAmount;
    } else {
      total = SubTotal + ShippingAmount;
    }
    if (giftWrap && giftWrapAmount > 0) {
      total += giftWrapAmount;
    }
    if (roundIndianRupee(total) > roundIndianRupee(Total)) {
      const final = roundIndianRupee(total) - roundIndianRupee(Total);
      if (final !== 0) {
        setGiftCard(final);
      }
    }
  };

  const handlePayment = useCallback(
    async (total, orderId) => {
      try {
        const options = {
          key: "rzp_test_tEMCtcfElFdYts",
          key_secret: "rRfAuSd9PLwbhIwUlBpTy4Gv",
          amount: roundIndianRupee(total) * 100,
          // order_id:orderId,
          currency: checkChannel() == "india-channel" ? "INR" : "USD",
          name: "Products",
          description: "",
          image: "https://example.com/your_logo",
          modal: {
            ondismiss: async (res) => {
              // console.log("res: ", res);
              localStorage.removeItem("checkoutTokenUSD");
              localStorage.removeItem("checkoutTokenINR");
              dispatch(cart_list([]));
              router.push(`/order-failed/${orderId}`);

              // await paymentFailed(orderId);
              // paymentFaildRefetch();
            },
          },
          handler: async (res) => {
            if (res?.razorpay_payment_id) {
              notifySuccess("Payment Successful");

              const data = await successPayment({
                amountAuthorized: total,
                amountCharged: total,
                pspReference: res?.razorpay_payment_id,
              });
              localStorage.removeItem("checkoutTokenUSD");
              localStorage.removeItem("checkoutTokenINR");
              dispatch(cart_list([]));
              router.push(`/order-success/${orderId}`);
            }
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          notes: {
            address: "",
          },
          theme: {
            color: "#3399cc",
          },
          retry: {
            enabled: false,
            max_count: true,
          },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
      } catch (error) {
        console.log("error: ", error);
      }
    },
    [Razorpay]
  );

  const ccAvenuePayment = async (amount, order_id) => {
    try {
      const orderId = createHash("sha1")
        .update(data?.data?.order?.id)
        .digest("hex")
        .slice(0, 18);
      let paymentData = {
        merchant_id: MERCHANT_ID,
        // order_id: orderId,
        order_id: "NOB" + orderId,
        amount: amount,
        currency: "INR",
        // billing_email: billingAddress.email,
        billing_email: fullData?.billing_email,

        billing_name: `${billingAddress.firstName} ${billingAddress.lastName}`,
        billing_address: billingAddress.streetAddress1,
        billing_city: billingAddress.city,
        billing_state: billingAddress.countryArea,
        billing_zip: billingAddress.postalCode,
        billing_tel: billingAddress.phone?.replace("+91", ""),
        billing_country: billingAddress.country?.country,
        redirect_url: `${CCAVENUE_URL}/api/ccavenue-handle1`,
        cancel_url: `${CCAVENUE_URL}/api/ccavenue-handle1`,

        delivery_address: shippingAddress.streetAddress1,
        delivery_city: shippingAddress.city,
        delivery_state: shippingAddress.countryArea,
        delivery_zip: shippingAddress.postalCode,
        delivery_country: shippingAddress.country?.country,
        delivery_tel: shippingAddress.phone?.replace("+91", ""),
        merchant_param1: order_id,
        merchant_param2: fullData?.merchant_param2,
      };

      let encReq = CCAvenue.getEncryptedOrder(paymentData);
      let accessCode = ACCESS_CODE;
      let URL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${paymentData.merchant_id}6&encRequest=${encReq}&access_code=${accessCode}`;

      router.push(URL);
    } catch (error) {
      console.error("Payment init error:", error);
      alert("Payment initialization failed: " + error.message);
    } finally {
    }
  };

  return (
    <section
      className="tp-login-area pt-50 pb-50 p-relative z-index-1 fix order-status"
      // style={{ background: "#f6e9d9" }}
    >
      <div className="container">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="col-lg-6  ">
            <div
              style={{
                padding: "20px 30px",
                borderRadius: "30px 20px",
                background: "#fff2ec",
                // boxShadow: "3px 3px 5px #f1f1f1",
              }}
            >
              <p style={{ color: "red" }}>Order Failed</p>
              <p style={{ color: "#333" }}>
                Pay with{" "}
                {paymentMethod == CASE_ON_DELIVERY
                  ? CASE_ON_DELIVERY
                  : paymentMethod}{" "}
              </p>
              <h3 style={{ fontWeight: "500" }}>Order Details</h3>
              <div>
                <table className="table width-100">
                  <thead>
                    <tr>
                      <th className="tp-cart-header-quantity" style={{background: "transparent"}}>PRODUCT</th>
                      <th className="tp-cart-header-quantity" style={{background: "transparent"}}>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OrderDetails?.map((order) => {
                      return (
                        <tr key={order?.id}>
                          <td>
                            {order?.productName}
                            <span> x {order?.quantity}</span>
                          </td>
                          {checkChannel() === "india-channel" ? (
                            <>
                              <td>
                                &#8377;
                                {addCommasToNumber(
                                  order?.quantity *
                                    order.variant?.pricing?.price?.gross?.amount
                                )}
                              </td>
                            </>
                          ) : (
                            <>
                              <td>
                                $
                                {addCommasToNumber(
                                  order?.quantity *
                                    order.variant?.pricing?.price?.gross?.amount
                                )}
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                    {discount?.amount > 0 && (
                      <tr>
                        <td>Coupon code</td>

                        {checkChannel() === "india-channel" ? (
                          <>
                            <td style={{ color: "green" }}>
                              -&#8377;{addCommasToNumber(discount?.amount)}
                            </td>
                          </>
                        ) : (
                          <>
                            <td style={{ color: "green" }}>
                              -${addCommasToNumber(discount?.amount)}
                            </td>
                          </>
                        )}
                      </tr>
                    )}

                    <tr>
                      <td>Subtotal</td>
                      {checkChannel() === "india-channel" ? (
                        <>
                          <td>&#8377;{addCommasToNumber(SubTotal)}</td>
                        </>
                      ) : (
                        <>
                          <td>${addCommasToNumber(SubTotal)}</td>
                        </>
                      )}
                    </tr>

                    <tr>
                      {paymentMethod == CASE_ON_DELIVERY ? (
                        <td>COD Fee</td>
                      ) : ShippingAmount !== 0 ? (
                        <td>Shipping</td>
                      ) : null}

                      {/* <td>
                                            {paymentMethod == CASE_ON_DELIVERY
                                              ? "COD Fee"
                                              : "Shipping"}
                                          </td> */}

                      {paymentMethod == CASE_ON_DELIVERY && codAmount !== 0 ? (
                        <td>{`₹${addCommasToNumber(codAmount)}`}</td>
                      ) : ShippingAmount !== 0 ? (
                        <td>{`₹${addCommasToNumber(ShippingAmount)}`}</td>
                      ) : null}
                      {/* {checkChannel() === "india-channel" ? (
                                            <>
                                              <td>
                                                {codAmount === 0
                                                  ? `₹${addCommasToNumber(ShippingAmount)}` // Using ₹ for INR
                                                  : `₹${addCommasToNumber(codAmount)}`}
                                              </td>
                                            </>
                                          ) : (
                                            <>
                                              <td>
                                                {codAmount === 0
                                                  ? `$${addCommasToNumber(ShippingAmount)}`
                                                  : `$${addCommasToNumber(codAmount)}`}
                                              </td>
                                            </>
                                          )} */}
                    </tr>

                    {giftWrap && (
                      <tr>
                        <td>Gift Wrap</td>

                        <td>
                          {checkChannel() === "india-channel" ? "₹" : "$"}
                          {giftWrapAmount}
                        </td>
                      </tr>
                    )}

                    {giftCard > 0 && (
                      <tr>
                        <td>Gift voucher code</td>
                        <td style={{ color: "green" }}>
                          -₹
                          {addCommasToNumber(giftCard)}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td>Payment Method</td>

                      <td>
                        {paymentMethod == CASE_ON_DELIVERY
                          ? CASE_ON_DELIVERY
                          : paymentMethod}
                      </td>
                    </tr>

                    <tr>
                      <td>Payment Status</td>

                      <td>{status}</td>
                    </tr>

                    <tr>
                      <td style={{ color: "black", fontWeight: "600" }}>
                        Total
                      </td>
                      {checkChannel() === "india-channel" ? (
                        <>
                          <td style={{ color: "black", fontWeight: "600" }}>
                            &#8377;{addCommasToNumber(Total)}
                            <div
                              style={{ fontSize: "14px", fontWeight: "normal" }}
                            >
                              (includes {Tax?.currency == "USD" ? "$" : "₹"}
                              {addCommasToNumber(Tax?.amount)} GST)
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{ color: "black", fontWeight: "600" }}>
                            ${addCommasToNumber(Total)}
                            <div
                              style={{ fontSize: "15px", fontWeight: "normal" }}
                            >
                              (includes {Tax?.currency == "USD" ? "$" : "₹"}
                              {addCommasToNumber(Tax?.amount)} GST)
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <div
              style={{
                padding: "20px 30px",
                borderRadius: "30px 20px",
                background: "#fff2ec",
                // boxShadow: "3px 3px 5px #f1f1f1",
              }}
            >
              <h3
                style={{
                  color: "gray",
                  fontSize: "26px",
                  fontWeight: "500",
                  color: "#7d4432",
                }}
              >
                Your order has been Failed.
              </h3>
              <ul style={{ paddingLeft: "20px", fontSize: "18px" }}>
                <li style={{ paddingBottom: "8px" }}>
                  Order number: <span className="bold">{OrderNumber}</span>
                </li>
                <li style={{ paddingBottom: "8px" }}>
                  Date: <span>{OrderDate}</span>
                </li>
                <li style={{ paddingBottom: "8px" }}>
                  Total:{" "}
                  {checkChannel() === "india-channel" ? (
                    <span style={{ fontWeight: "600", color: "black" }}>
                      &#8377;{addCommasToNumber(Total)}
                    </span>
                  ) : (
                    <span style={{ fontWeight: "600", color: "black" }}>
                      ${addCommasToNumber(Total)}
                    </span>
                  )}
                </li>
                <li style={{ paddingBottom: "8px" }}>
                  Payment Method:{" "}
                  <span>
                    {paymentMethod == CASE_ON_DELIVERY
                      ? CASE_ON_DELIVERY
                      : paymentMethod}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-20">
              <button
                onClick={() => ccAvenuePayment(Total, orderId)}
                className="gradient-btn"
              >
                Pay Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Failed;
