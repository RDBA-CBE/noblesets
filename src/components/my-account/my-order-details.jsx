import {
  useCreateMediaFileMutation,
  useCreateReviewMutation,
  useMediaListMutation,
  useOrderReviewMutation,
} from "@/redux/features/productApi";
import {
  addCommasToNumber,
  addNewMediaFile,
  checkChannel,
  formatCurrency,
  getFileType,
  getImageDimensions,
  resizeImage,
  resizingImage,
  roundIndianRupee,
  roundOff,
  toValidJSON,
  useSetState,
} from "@/utils/functions";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import ButtonLoader from "../loader/button-loader";
import { notifyError, notifySuccess } from "@/utils/toast";
import Resizer from "react-image-file-resizer";
import ReviewSection from "../product-details/ReviewSection";
import { Modal, Radio, Button } from "antd";
import { BLUE_DART, BLUE_DART_LIVE, CASE_ON_DELIVERY } from "@/utils/constant";
import { useRouter } from "next/router";
import axios from "axios";
import Steps from "../common/Steps";

const MyOrderDetails = ({ data }) => {
  const router = useRouter();
  const [giftCard, setGiftCard] = useState(0);
  const [loadings, setLoading] = useState(0);
  const [expectedDate, setExpectedDate] = useState(null);
  const [awbData, setAwbData] = useState(null);

  const Data = data?.data?.order;
  const SubTotal = data?.data?.order?.subtotal.gross;
  const Total = data?.data?.order?.total.gross;
  const Tax = data?.data?.order?.total.tax;
  const ShippingAmount = data?.data?.order?.shippingPrice?.gross;
  const GiftCard = data?.data?.order?.giftCards;
  const giftWrap = data?.data?.order?.isGiftWrap;
  const paymentMethod = data?.data?.order?.paymentMethod?.name;
  const codAmount = data?.data?.order?.codAmount;
  const giftWrapAmount = data?.data?.order?.giftWrapAmount;
  const discount = data?.data?.order?.discount;

  const [createReview, { loading: loading }] = useCreateReviewMutation();
  const [createMedia, { loading: mediaLoading }] = useCreateMediaFileMutation();

  const [mediaList] = useMediaListMutation();

  const [reviewsData, { loading: reviewLoading }] = useOrderReviewMutation();

  const [state, setState] = useSetState({
    reviewList: [],
    isOpen: false,
    productId: "",
    cancel_reason: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    rating: 0,
    images: [],
    imgFile: [],
  });

  useEffect(() => {
    if (Data?.user?.id) {
      reviews();
    }
    if (Data) {
      total();
    }

    if (Data?.metadata?.length > 0) {
      const waybillItem = Data?.metadata?.find(
        (item) => item.key === "waybill_response"
      );

      const cancel_reason = Data?.metadata?.find(
        (item) => item.key === "cancel_reason"
      );

      if (cancel_reason) {
        setState({ cancel_reason });
      }
      if (waybillItem) {
        setAwbData(waybillItem);
        if (Data?.shippingAddress?.postalCode) {
          getDomesticTransitTime();
        }
        const waybillData = JSON.parse(toValidJSON(waybillItem.value));
        trackShipment(waybillData?.GenerateWayBillResult);
      }
    }
  }, [Data]);

  const total = () => {
    let total = 0;
    if (paymentMethod == CASE_ON_DELIVERY && codAmount !== 0) {
      total = SubTotal?.amount + codAmount;
    } else {
      total = SubTotal?.amount + ShippingAmount?.amount;
    }
    if (giftWrap && giftWrapAmount > 0) {
      total += giftWrapAmount;
    }
    if (roundIndianRupee(total) > roundIndianRupee(Total?.amount)) {
      const final = roundIndianRupee(total) - roundIndianRupee(Total?.amount);
      if (final !== 0) {
        setGiftCard(final);
      }
    }
  };

  const trackShipment = async (waybillData) => {
    console.log("✌️trackShipment --->", waybillData);
    try {
      setLoading(true);
      const jwtToken = await axios.get(BLUE_DART_LIVE.TokenUrl);

      const AWB_NO = waybillData?.AWBNo || "90001526591";

      const res = await axios.get(`${BLUE_DART_LIVE.BaseUrl}/tracking/v1/shipment`, {
        params: {
          handler: "tnt",
          loginid: BLUE_DART_LIVE.LoginID,
          lickey: BLUE_DART_LIVE.TrackingLicKey,
          numbers: AWB_NO,
          format: "json",
          scan: 1,
          action: "custawbquery",
          verno: 1,
        },
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          JWTToken: jwtToken?.data?.JWTToken,
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
      const jwtToken = await axios.get(BLUE_DART.TokenUrl);

      const res = await axios.post(
        `${BLUE_DART.BaseUrl}/transit/v1/GetDomesticTransitTimeForPinCodeandProduct`,
        {
          pPinCodeFrom: "400012",
          pPinCodeTo: Data?.shippingAddress?.postalCode,
          // pPinCodeTo: Data?.shippingAddress?.postalCode,

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
            JWTToken: jwtToken?.data?.JWTToken,
          },
        }
      );

      setExpectedDate(
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

  const reviews = async () => {
    try {
      const res = await reviewsData({
        userId: [Data?.user?.id],
        productId: Data?.lines?.map((item) => item?.variant?.product?.id),
      });
      const review = res?.data?.data?.productReviews?.edges;

      setState({ reviewList: review });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      imgFile: [...prev.imgFile, ...files],
      images: [...prev.images, ...imageUrls],
    }));
  };

  const generateUniqueFilenames = async (filename) => {
    let uniqueFilename = filename;
    let counter = 0;
    let fileExists = true;

    while (fileExists) {
      const res = await mediaList({
        uniqueFilename: uniqueFilename,
      });

      if (res?.data?.files?.edges?.length > 0) {
        counter += 1;
        const fileParts = filename.split(".");
        const extension = fileParts.pop();
        uniqueFilename = `${fileParts.join(".")}-${counter}.${extension}`;
      } else {
        fileExists = false;
      }
    }

    return uniqueFilename;
  };

  const addNewImage = async (files) => {
    // let files = e.target.files[0];
    const isImage = files.type.startsWith("image/");
    if (isImage) {
      if (files.size > 300 * 1024) {
        files = await resizingImage(files);
        files = await resizeImage(files, 1160, 1340);
      } else {
        files = await resizeImage(files, 1160, 1340);
      }
    }

    const unique = await generateUniqueFilenames(files.name);

    const result = await addNewMediaFile(files, unique);
    const fileType = await getFileType(result);
    const body = {
      fileUrl: result,
      title: "",
      alt: "",
      description: "",
      caption: "",
      fileType: fileType,
    };

    const response = await createMedia({
      input: body,
    });

    return response;
  };

  const handleSubmit = async () => {
    try {
      const arr = [];

      if (formData.imgFile?.length > 0) {
        const uploadPromises = formData.imgFile.map(async (item) => {
          const res = await addNewImage(item);
          const isError = res?.data?.data?.fileCreate?.fileErrors;
          const file = res?.data?.data?.fileCreate?.file;

          if (isError?.length > 0) {
            notifyError(isError[0]?.message);
          } else {
            arr.push(file?.id);
          }
        });

        await Promise.all(uploadPromises); // Wait for all uploads to complete
      }
      // Data?.lines?.map(async (item) => {
      const res = await createReview({
        product: state.productId,
        rating: formData.rating,
        comment: formData.comment,
        images: arr,
        user: Data?.user?.id,
      });

      if (res?.data?.data?.productReviewCreate?.errors?.length > 0) {
        notifyError(res?.data?.data?.productReviewCreate?.errors[0]?.message);
        setState({ isOpen: false });
      } else {
        setFormData({
          rating: 0,
          comment: "",
          name: "",
          images: [],
          imgFile: [],
        });
        notifySuccess("Reviews Submitted Successfully");
        reviews();
        setState({ isOpen: false });
      }
      // });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const FormatDate = moment(Data?.created).format("MMMM D, YYYY");

  const statusMap = {
    placed: 0,
    confirmed: 1,
    shipped: 2,
    delivered: 3,
  };
  const steps = ["Order Placed", "confirmed", "shipped", "delivered"];

  return (
    <section className="tp-checkout-area pb-50 pt-50 common-bg">
      <div className="container">
        <p
          style={{
            color: "black",
            borderBottom: "1px solid #e6e6e6",
            paddingBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span>
            Order
            <span style={{ color: "black", fontWeight: "bold" }}>
              {" "}
              #{Data?.number}
            </span>{" "}
            was placed on{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>
              {FormatDate}
            </span>{" "}
            and is currently{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>
              {Data?.status}
            </span>
          </span>
          {expectedDate && (
            <span>
              <strong>Expected Delivery Date:</strong>
              <span
                style={{
                  marginLeft: "10px",
                  color: "#7d4432",
                  fontWeight: "bold",
                }}
              >
                {expectedDate.ExpectedDateDelivery}
              </span>
            </span>
          )}
        </p>

        {state.cancel_reason?.value && (
          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <h5 style={{ color: '#856404', marginBottom: '10px', fontSize: '16px' }}>
              Cancellation Reason:
            </h5>
            <p style={{ color: '#856404', marginBottom: '0', fontSize: '14px' }}>
              {state.cancel_reason.value}
            </p>
          </div>
        )}

        {awbData && (
          <Steps
            current={statusMap[Data?.status] || statusMap["shipped"]}
            items={steps.map((title) => ({ title }))}
          />
        )}
        <div
          style={{
            background: "#f1e7e1",
            borderRadius: "20px",
          }}
        >
          <div className="row m-0 px-4 py-3 ">
            <div className="col-md-6 p-0 px-2">
              <h4 style={{ fontWeight: "400", fontSize: "18px" }}>
                BILLING ADDRESS
              </h4>
              <p style={{ color: "black", marginBottom: "0px" }}>
                <b>Name:</b> {Data?.billingAddress?.firstName}{" "}
                {Data?.billingAddress?.lastName}
              </p>
              <p style={{ color: "black", marginBottom: "0px" }}>
                <b>Address:</b> {Data?.billingAddress?.streetAddress1},<br />
                {Data?.billingAddress?.city}, <br />
                {Data?.billingAddress?.country?.country} -{" "}
                {Data?.billingAddress?.postalCode}
              </p>
              {/* <p style={{ color:  "black", marginBottom: "0px" }}></p>
            <p style={{ color:  "black", marginBottom: "0px" }}></p>
            <p style={{ color:  "black", marginBottom: "0px" }}></p> */}
              <p style={{ color: "black", marginBottom: "0px" }}>
                <b>Phone:</b> {Data?.billingAddress?.phone}
              </p>

              <p></p>
            </div>
            <div className="col-md-6 p-0 px-2 px-md-4">
              <h4 style={{ fontWeight: "400", fontSize: "18px" }}>
                SHIPPING ADDRESS
              </h4>
              <p style={{ color: "black", marginBottom: "0px" }}>
                <b>Name:</b> {Data?.shippingAddress?.firstName}{" "}
                {Data?.shippingAddress?.lastName}
              </p>
              <p style={{ color: "black", marginBottom: "0px" }}>
                <b>Address:</b> {Data?.shippingAddress?.streetAddress1},<br />
                {Data?.shippingAddress?.city}, <br />
                {Data?.shippingAddress?.country?.country} -{" "}
                {Data?.shippingAddress?.postalCode}
              </p>

              <p style={{ color: "black", marginBottom: "0px" }}>
                <b>Phone:</b> {Data?.shippingAddress?.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="row pt-20 pb-20 order-details-sec">
          <div className="col-lg-6 col-md-6 ">
            <div className="order-updates-section py-4 px-2">
              <h3
                className="ps-3"
                style={{ fontWeight: "400", fontSize: "18px" }}
              >
                ORDER UPDATES
              </h3>

              <div className="timeline-container px-3 ">
                <ul className="timeline">
                  {Data?.events?.map((item, i) => (
                    <li key={i} className="timeline-item">
                      <div className="timeline-content">
                        <b>{item.type}</b> -{" "}
                        {moment(item.createdAt).format("MMMM D, YYYY")}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="order-updates-section py-4 px-2 mt-4 mt-md-0">
              <h3
                className="ps-3"
                style={{ fontWeight: "400", fontSize: "18px" }}
              >
                ORDER DETAILS
              </h3>
              <div className="responsive-table px-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">PRODUCT</th>
                      <th scope="col">PRICE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Data?.lines.map((item, i) => (
                      <tr key={i}>
                        <td
                          style={{
                            // textDecoration: "underline",
                            // color: "#7d4432",
                            cursor: "pointer",
                          }}
                          scope="row"
                          onClick={() =>
                            router.push(
                              `/product-details/${item?.variant?.product?.slug}`
                            )
                          }
                        >
                          {item.productName} ({item?.quantity})
                        </td>

                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              {item?.totalPrice?.gross?.currency === "USD"
                                ? "$"
                                : "₹"}
                              {addCommasToNumber(
                                Number(item?.quantity) *
                                  Number(
                                    item?.variant?.pricing?.price?.gross?.amount
                                  )
                              )}

                              {/* {addCommasToNumber(item?.totalPrice?.gross?.amount
                                
                              )} */}
                            </div>
                            <div
                              style={{
                                textDecoration: "underline",
                                color: "#7d4432",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                setState({
                                  isOpen: true,
                                  productId: item?.variant?.product?.id,
                                })
                              }
                            >
                              Add Review
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}

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

                      <td>
                        {SubTotal?.currency == "USD" ? "$" : "₹"}
                        {addCommasToNumber(SubTotal?.amount)}
                      </td>
                    </tr>

                    <tr>
                      {paymentMethod == CASE_ON_DELIVERY ? (
                        <td>COD Fee</td>
                      ) : ShippingAmount?.amount !== 0 ? (
                        <td>Shipping</td>
                      ) : null}

                      {/* <td>
                                          {paymentMethod == CASE_ON_DELIVERY
                                            ? "COD Fee"
                                            : "Shipping"}
                                        </td> */}

                      {paymentMethod == CASE_ON_DELIVERY && codAmount !== 0 ? (
                        <td>{`₹${addCommasToNumber(codAmount)}`}</td>
                      ) : ShippingAmount?.amount !== 0 ? (
                        <td>{`₹${addCommasToNumber(
                          ShippingAmount?.amount
                        )}`}</td>
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
                          {formatCurrency(ShippingAmount?.currency)}
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
                      <td>Payment Status</td>

                      <td>{Data?.paymentStatus}</td>
                    </tr>

                    <tr>
                      <td>Payment Method</td>

                      <td>{Data?.paymentMethod?.name}</td>
                    </tr>

                    {GiftCard && GiftCard.length > 0 && (
                      <tr>
                        <td>Coupon</td>
                        <td>
                          {GiftCard[0]?.initialBalance?.currency == "USD"
                            ? "$"
                            : "₹"}
                          {GiftCard[0]?.initialBalance?.amount}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td style={{ fontSize: "20px", fontWeight: "700" }}>
                        GRAND TOTAL:
                      </td>

                      <td style={{ fontSize: "20px", fontWeight: "700" }}>
                        {Total?.currency == "USD" ? "$" : "₹"}

                        {addCommasToNumber(Total?.amount)}
                        <div style={{ fontSize: "15px", fontWeight: "400" }}>
                          (includes {Total?.currency == "USD" ? "$" : "₹"}
                          {addCommasToNumber(Tax?.amount)} GST)
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* {state?.reviewList?.length > 0 ? (
          <>
            <h5 className="pt-4 pb-4">REVIEW</h5>

            {state?.reviewList.map((review, index) => (
              <div key={index} className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={review?.node?.avatar}
                    alt="avatar"
                    className="rounded-circle me-2"
                    width={50}
                  />
                  <div>
                    <strong>{review.node?.user?.firstName}</strong>
                    <p className="text-muted small m-0">
                      {moment(review.node?.createdAt).format("DD-MM-YYYY")}
                    </p>
                  </div>
                </div>
                <p className="text-dark mb-1">{review?.node?.comment}</p>
                <Rating
                  count={5}
                  value={review?.node?.rating}
                  edit={false}
                  size={18}
                  activeColor="#7d4432"
                />
                <div className="d-flex gap-2 mt-2">
                  {review?.node?.images.map((src, idx) => (
                    <img
                      key={idx}
                      src={src?.fileUrl}
                      className="rounded"
                      alt="review"
                      width={30}
                      height={30}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="mb-4">
            <h5 className="">Write a Review</h5>
         
            <textarea
              className="form-control mb-2"
              placeholder="Your review"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              required
            />

            <div className=" gap-2 flex-wrap mb-2">
              <input
                type="file"
                className="form-control"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="d-flex gap-2 mt-2 flex-wrap">
                {formData.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="preview"
                    className="rounded"
                    width={50}
                    height={50}
                  />
                ))}
              </div>
              <div className="mb-2">
                <Rating
                  count={5}
                  value={formData.rating}
                  onChange={(newRating) =>
                    setFormData({ ...formData, rating: newRating })
                  }
                  size={25}
                  activeColor="#7d4432"
                />
              </div>
            </div>

            <button
              type="button"
              className="tp-btn tp-btn-border "
              onClick={handleSubmit}
            >
              {loading ? <ButtonLoader /> : "Submit Review"}
            </button>
          </div>
        )} */}
      </div>

      <div>
        <Modal
          title={"Add Review"}
          visible={state.isOpen}
          onOk={handleSubmit}
          onCancel={() => setState({ isOpen: false })}
          okText={loading ? <ButtonLoader /> : "Submit Review"}
          cancelText="Cancel"
          width={800} // Adjusted modal width for better fit
          closeIcon={
            <span
              style={{ fontSize: "18px", cursor: "pointer", color: "black" }}
            >
              x
            </span>
          } // Custom close icon
          okButtonProps={{
            className: " tp-btn tp-btn-border text-white",
            style: {
              backgroundColor: "#7d4432", // Set background color to your preference
              color: "white", // Set text color to white
              borderRadius: "20px",
              padding: "3px 14px",
              fontSize: "14px",
              border: "none",
            },
          }}
          cancelButtonProps={{
            className: " tp-btn tp-btn-border text-white",
            style: {
              backgroundColor: "#7d4432", // Set background color to your preference
              color: "white", // Set text color to white
              borderRadius: "20px",
              padding: "3px 14px",
              fontSize: "14px",
              border: "none",
            },
          }}
          bodyStyle={{
            padding: 0, // Remove default padding
            fontFamily: "Bagind,sans-serif",
          }}
        >
          <div className="mb-4">
            {/* <input
            type="text"
            className="form-control mb-2"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          /> */}
            <textarea
              className="form-control mb-2"
              placeholder="Your review"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              required
            />

            <div className=" gap-2 flex-wrap mb-2">
              <input
                type="file"
                className="form-control"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="d-flex gap-2 mt-2 flex-wrap">
                {formData.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="preview"
                    className="rounded"
                    width={50}
                    height={50}
                  />
                ))}
              </div>
              <div className="mb-2">
                <Rating
                  count={5}
                  value={formData.rating}
                  onClick={(e) => {
                    setFormData({ ...formData, rating: e });
                  }}
                  size={25}
                  activeColor="#7d4432"
                />
              </div>
            </div>

            {/* <button
              type="button"
              className="tp-btn tp-btn-border "
              onClick={handleSubmit}
            >
              {loading ? <ButtonLoader /> : "Submit Review"}
            </button> */}
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default MyOrderDetails;
