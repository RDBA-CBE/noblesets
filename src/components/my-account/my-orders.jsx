import React, { useCallback, useEffect, useState } from "react";
import {
  useMyOrderListQuery,
  usePaymentMutation,
  useOrderCancelMutation,
  useOrderListQuery,
  useGetOrderDetailMutation,
} from "@/redux/features/productApi";
import { useRouter } from "next/router";
import useRazorpay from "react-razorpay";
import moment from "moment";
import {
  addCommasToNumber,
  roundIndianRupee,
  showDeleteAlert,
} from "@/utils/functions";
import { notifySuccess } from "@/utils/toast";
import ButtonLoader from "../loader/button-loader";
import Swal from "sweetalert2";
import {
  ACCESS_CODE,
  CASE_ON_DELIVERY,
  CCAVENUE_URL,
  MERCHANT_ID,
} from "@/utils/constant";
import CCAvenue from "@/utils/CCAvenue";
import { createHash } from "crypto";

const OrderList = () => {
  const {
    data: orders,
    isError,
    isLoading,
    refetch: orderListRefetch,
  } = useMyOrderListQuery();

  const [orderDetail, { isLoading: loading1 }] = useGetOrderDetailMutation();

  const [orderList, setOrderList] = useState([]);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [index, setIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const [orderCancel] = useOrderCancelMutation();
  const router = useRouter();
  const [Razorpay] = useRazorpay();
  const [successPayment] = usePaymentMutation();

  useEffect(() => {
    if (orders?.data?.me?.orders?.edges?.length > 0) {
      const edges = orders?.data?.me?.orders?.edges;
      const list = edges?.map((item) => item.node);
      setOrderList(list);
    }
  }, [orders]);

  const handlePayment = useCallback(
    async (total, currency, orderId) => {
      try {
        const options = {
          key: "rzp_test_tEMCtcfElFdYts",
          key_secret: "rRfAuSd9PLwbhIwUlBpTy4Gv",
          amount: roundIndianRupee(total) * 100,
          currency,
          name: "Products",
          description: "",
          image: "https://example.com/your_logo",
          modal: {
            ondismiss: async (res) => {
              // Handle payment dismissal if needed
            },
          },
          handler: async (res) => {
            if (res?.razorpay_payment_id) {
              notifySuccess("Payment Successful");
              await successPayment({
                amountAuthorized: total,
                amountCharged: total,
                pspReference: res?.razorpay_payment_id,
              });
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
    [Razorpay, successPayment, router]
  );

  const getOrderDetail = async (orderId) => {
    try {
      const res = await orderDetail({ orderId });
      console.log("✌️res --->", res?.data?.data?.order);
      if (res?.data?.data?.order) {
        ccAvenuePayment(res?.data?.data?.order);
      }
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const ccAvenuePayment = async (orderData) => {
    const userEmail = localStorage.getItem("userInfo");
    localStorage.setItem("order_id",orderData?.id)
    let email = "";
    if (userEmail) {
      const user = JSON.parse(userEmail);
      email = user?.user?.email;
    }

    const billingAddress = orderData?.billingAddress;
    const shippingAddress = orderData?.shippingAddress;
    const Total = orderData?.total?.gross?.amount;

    try {
      const orderId = createHash("sha1")
        .update(orderData?.id)
        .digest("hex")
        .slice(0, 20);
      let paymentData = {
        merchant_id: MERCHANT_ID,
        order_id: orderId,
        amount: Total,
        currency: "INR",
        billing_email: email,
        billing_name: `${billingAddress.firstName} ${billingAddress.lastName}`,
        billing_address: billingAddress.streetAddress1,
        billing_city: billingAddress.city,
        billing_state: billingAddress.selectedState,
        billing_zip: billingAddress.postalCode,
        billing_tel: billingAddress.phone?.replace('+91', ''),
        billing_country: billingAddress.country?.country,
        redirect_url: `${CCAVENUE_URL}/api/ccavenue-handle1`,
        cancel_url: `${CCAVENUE_URL}/failed-order`,

        delivery_address: shippingAddress.streetAddress1,
        delivery_city: shippingAddress.city,
        delivery_state: shippingAddress.selectedState,
        delivery_zip: shippingAddress.postalCode,
        delivery_country: shippingAddress.country?.country,
        delivery_tel: shippingAddress.phone?.replace('+91', ''),
        merchant_param1: orderData?.id,
        merchant_param2: email,
        // merchant_param3: "myOrder",

      
      };
      console.log("✌️paymentData --->", paymentData);

      let encReq = CCAvenue.getEncryptedOrder(paymentData);
      let accessCode = ACCESS_CODE;
      let URL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${paymentData.merchant_id}6&encRequest=${encReq}&access_code=${accessCode}`;

      router.push(URL);
      localStorage.setItem("order_id", orderData?.id);

     
    } catch (error) {
      console.error("Payment init error:", error);
      alert("Payment initialization failed: " + error.message);
    } finally {
    }
  };

  const cancelOrder = (item) => {
    showDeleteAlert(
      async () => {
        try {
          setCancelLoading(true);
          await orderCancel({ id: item.id });
          orderListRefetch();
        } catch (error) {
          console.log("error: ", error);
        } finally {
          setCancelLoading(false);
        }
        Swal.fire("Cancelled!", "Your file has been deleted.", "success");
      },
      () => {
        Swal.fire("Order", "Your Order is safe :)", "info");
      }
    );
  };

  // Pagination Logic
  const totalPages = Math.ceil(orderList.length / itemsPerPage);
  const paginatedOrders = orderList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Pagination range calculation
  const getPaginationRange = () => {
    const range = [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage > 3) {
      range.push(1);
      if (start > 1) range.push("...");
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (currentPage < totalPages - 1) {
      if (end < totalPages - 1) range.push("...");
      range.push(totalPages);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <>
      <section className="tp-cart-area">
        {paginatedOrders.length > 0 ? (
          <>
            <div className="profile__ticket table-responsive">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ORDER</th>
                    <th scope="col">DATE</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((item, i) => (
                    <tr key={i}>
                      <th scope="row">#{item.number}</th>
                      <td data-info="title">
                        {moment(item.created).format("MMMM D, YYYY")}
                      </td>
                      <td
                        data-info={`status ${
                          item.status === "Pending" ? "pending" : ""
                        } ${item.status === "Processing" ? "hold" : ""} ${
                          item.status === "Delivered" ? "done" : ""
                        }`}
                        className={`status ${
                          item.status === "Pending" ? "pending" : ""
                        } ${item.status === "Processing" ? "hold" : ""} ${
                          item.status === "Delivered" ? "done" : ""
                        }`}
                      >
                        {item.status}
                      </td>
                      <td>
                        {`${
                          item?.total?.gross?.currency === "USD" ? "$" : "₹"
                        }${addCommasToNumber(item?.total?.gross?.amount)} for ${
                          item?.lines?.length
                        } item`}
                      </td>
                      <td style={{ display: "flex", gap: 10 }}>
                        {item?.paymentStatus === "NOT_CHARGED" &&
                          item?.paymentMethod?.name != CASE_ON_DELIVERY && (
                            <button
                              type="button"
                              className=" tp-btn tp-btn-border text-white"
                              style={{
                                borderRadius: "20px",
                                padding: "3px 14px",
                                fontSize: "14px",
                              }}
                              onClick={() => {
                                getOrderDetail(item?.id);
                                // ccAvenuePayment(
                                //   item?.id,
                                //   item?.total?.gross?.amount,
                                //   item
                                //   // item?.total?.gross?.currency,
                                // );
                              }}
                            >
                              Pay
                            </button>
                          )}
                        <button
                          type="button"
                          className=" tp-btn tp-btn-border text-white"
                          style={{
                            borderRadius: "20px",
                            padding: "3px 14px",
                            fontSize: "14px",
                          }}
                          onClick={() =>
                            router.push(`/order-details/${item?.id}`)
                          }
                        >
                          View
                        </button>
                        {item?.status === "UNCONFIRMED" && (
                          <button
                            type="button"
                            className=" tp-btn tp-btn-border text-white"
                            style={{
                              borderRadius: "20px",
                              padding: "3px 14px",
                              fontSize: "14px",
                            }}
                            onClick={() => {
                              setIndex(i);
                              cancelOrder(item);
                            }}
                          >
                            {cancelLoading && index === i ? (
                              <ButtonLoader />
                            ) : (
                              "Cancel"
                            )}
                          </button>
                        )}
                        {item?.invoices?.length > 0 && (
                          <button
                            type="button"
                            className=" tp-btn tp-btn-border text-white"
                            style={{
                              borderRadius: "20px",
                              padding: "3px 14px",
                              fontSize: "14px",
                            }}
                            onClick={() =>
                              window.open(item?.invoices[0]?.url, "_blank")
                            }
                          >
                            Invoice
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination-controls">
              {/* <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button> */}
              {paginationRange.map((page, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (page !== "...") {
                      handlePageChange(page);
                    }
                  }}
                  className={currentPage === page ? "active" : ""}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}
              {/* <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button> */}
            </div>
          </>
        ) : (
          <div
            style={{ height: "210px" }}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="text-center">
              <i
                style={{ fontSize: "30px" }}
                className="fa-solid fa-cart-circle-xmark"
              ></i>
              <p style={{ fontSize: "20px", color: "black" }}>
                You have no orders Yet!
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default OrderList;
