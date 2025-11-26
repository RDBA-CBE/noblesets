import { useOrderListQuery } from "@/redux/features/productApi";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  addCommasToNumber,
  checkChannel,
  roundIndianRupee,
  roundOff,
} from "../../utils/functions";
import { useRouter } from "next/router";
import Link from "next/link";
import { CASE_ON_DELIVERY } from "@/utils/constant";

const Success = ({ data }) => {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [giftCard, setGiftCard] = useState(0);

  const OrderDetails = data?.data?.order?.lines;
  const SubTotal = data?.data?.order?.subtotal.gross.amount;
  const Total = data?.data?.order?.total.gross.amount;
  const Tax = data?.data?.order?.total?.tax;
  const OrderNumber = data?.data?.order?.number;
  const OrderDate = moment(data?.data?.order?.updatedAt).format("MMMM D, YYYY");
  const ShippingAmount = data?.data?.order?.shippingPrice?.gross?.amount;
  const giftWrap = data?.data?.order?.isGiftWrap;
  const paymentMethod = data?.data?.order?.paymentMethod?.name;
  const GiftCard = data?.data?.order?.giftCards;
  const codAmount = data?.data?.order?.codAmount;
  const giftWrapAmount = data?.data?.order?.giftWrapAmount;

  const discount = data?.data?.order?.discount;
  useEffect(() => {
    const token = localStorage.getItem("token");

    setToken(token);
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

  return (
    <section
      className="tp-login-area  pt-50 pb-50   p-relative z-index-1 fix order-status"
      // style={{ background: "#f6e9d9" }}
    >
      <div className="container">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="col-lg-6">
            <div
              style={{
                padding: "20px 30px",
                borderRadius: "30px 20px",
                background: "#f1e7e1",
                // boxShadow: "3px 3px 5px #f1f1f1",
              }}
            >
              {/* {paymentMethod != "Cash On delivery" && */}
              <p style={{ color: "#333" }}>
                Pay with{" "}
                {paymentMethod == CASE_ON_DELIVERY
                  ? CASE_ON_DELIVERY
                  : paymentMethod}{" "}
              </p>
              {/* } */}
              <h3 style={{ fontWeight: "500" }}>Order Details</h3>
              <div>
                <table className="table width-100">
                  <thead>
                    <tr>
                      <th className="tp-cart-header-quantity" style={{background: "transparent"}}>PRODUCT</th>
                      <th className="tp-cart-header-quantity" style={{background: "transparent"}}>PRICE</th>
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
                                  order?.variant?.pricing?.price?.gross?.amount
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
                      <td style={{ color: "black", fontWeight: "600" }}>
                        Grand Total
                      </td>
                      {checkChannel() === "india-channel" ? (
                        <>
                          <td style={{ color: "black", fontWeight: "600" }}>
                            &#8377;{addCommasToNumber(Total)}
                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: "normal",
                                marginTop: "-8px",
                              }}
                            >
                              (includes {Tax?.currency == "USD" ? "$" : "₹"}
                              {roundOff(Tax?.amount)} GST)
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
                background: "#f1e7e1",
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
                Thank You!
                <br /> Your order has been received.
              </h3>
              <ul style={{ paddingLeft: "0px", fontSize: "18px" }}>
                <li style={{ paddingBottom: "8px", listStyle: "none" }}>
                  Order number: <span className="bold">{OrderNumber}</span>
                </li>
                <li style={{ paddingBottom: "8px", listStyle: "none" }}>
                  Date: <span>{OrderDate}</span>
                </li>
                <li style={{ paddingBottom: "8px", listStyle: "none" }}>
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
                <li style={{ paddingBottom: "8px", listStyle: "none" }}>
                  Payment Method: {""}
                  <span>
                    {paymentMethod == CASE_ON_DELIVERY
                      ? CASE_ON_DELIVERY
                      : paymentMethod}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-20 gap-4 d-flex">
              <button
                onClick={() => router.push("/shop")}
                className="gradient-btn "
                // style={{ background: "rgb(194, 136, 43)", color: "white" }}
              >
                Continue Shopping
              </button>
              {token && (
                <button
                  onClick={() => router.push("/profile")}
                  className="gradient-btn "
                >
                  My Orders
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;
