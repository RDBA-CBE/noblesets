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
  roundOff,
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

const MyOrderDetails = ({ data }) => {
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

  const [createReview, { loading: loading }] = useCreateReviewMutation();
  const [createMedia, { loading: mediaLoading }] = useCreateMediaFileMutation();

  const [mediaList] = useMediaListMutation();

  const [reviewsData, { loading: reviewLoading }] = useOrderReviewMutation();

  const [state, setState] = useSetState({
    reviewList: [],
    isOpen: false,
    productId: "",
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
  }, [Data]);

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
  return (
    <section className="tp-checkout-area pb-50 pt-50">
      <div className="container">
        <p
          style={{
            color: "gray",
            borderBottom: "1px solid #e6e6e6",
            paddingBottom: "10px",
          }}
        >
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
            {Data?.statusDisplay}
          </span>
          .
        </p>

        <div className="row pt-20 pb-20">
          <div className="col-lg-6 col-md-6 order-updates-section">
            <h3 style={{ fontWeight: "400", fontSize: "18px" }}>
              ORDER UPDATES
            </h3>

            <div className="timeline-container">
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

          <div className="col-lg-6 col-md-6">
            <h3 style={{ fontWeight: "400", fontSize: "18px" }}>
              ORDER DETAILS
            </h3>
            <div className="responsive-table">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">PRODUCT</th>
                    <th scope="col">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {Data?.lines.map((item, i) => (
                    <tr key={i}>
                      <td scope="row">
                        {item.productName} ({item?.quantity})
                      </td>

                      <td className="d-flex ">
                        <div>
                          {item?.totalPrice?.gross?.currency === "USD"
                            ? "$"
                            : "₹"}
                          {addCommasToNumber(item?.totalPrice?.gross?.amount)}
                        </div>
                        <div
                          style={{
                            paddingLeft: "5px",
                            textDecoration: "underline",
                            color: "#b4633a",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setState({
                              isOpen: true,
                              productId: item?.variant?.product?.id,
                            })
                          }
                        >
                          Reviews
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td>Subtotal</td>

                    <td>
                      {SubTotal?.currency == "USD" ? "$" : "₹"}
                      {addCommasToNumber(SubTotal?.amount)}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {paymentMethod == "Cash On delivery"
                        ? "COD Fee"
                        : "Shipping"}
                    </td>

                    <td>
                      {formatCurrency(ShippingAmount?.currency)}
                      {addCommasToNumber(
                        codAmount !== 0 ? codAmount : ShippingAmount?.amount
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Payment Status</td>

                    <td>{Data?.paymentStatus}</td>
                  </tr>

                  <tr>
                    <td>Payment Method</td>

                    <td>{Data?.paymentMethod?.name}</td>
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
                    <td style={{ fontSize: "20px" }}>TOTAL:</td>

                    <td style={{ fontSize: "20px" }}>
                      {Total?.currency == "USD" ? "$" : "₹"}

                      {addCommasToNumber(Total?.amount)}
                      <div style={{ fontSize: "15px" }}>
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
        <div className="row pt-50">
          <div className="col-md-6">
            <h4 style={{ fontWeight: "400", fontSize: "18px" }}>
              BILLING ADDRESS
            </h4>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              <b>Name:</b> {Data?.billingAddress?.firstName}{" "}
              {Data?.billingAddress?.lastName}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              <b>Address:</b> {Data?.billingAddress?.streetAddress1},<br />
              {Data?.billingAddress?.city}, <br />
              {Data?.billingAddress?.country?.country} -{" "}
              {Data?.billingAddress?.postalCode}
            </p>
            {/* <p style={{ color: "gray", marginBottom: "0px" }}></p>
            <p style={{ color: "gray", marginBottom: "0px" }}></p>
            <p style={{ color: "gray", marginBottom: "0px" }}></p> */}
            <p style={{ color: "gray", marginBottom: "0px" }}>
              <b>Phone:</b> {Data?.billingAddress?.phone}
            </p>

            <p></p>
          </div>
          <div className="col-md-6">
            <h4 style={{ fontWeight: "400", fontSize: "18px" }}>
              SHIPPING ADDRESS
            </h4>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              <b>Name:</b> {Data?.shippingAddress?.firstName}{" "}
              {Data?.shippingAddress?.lastName}
            </p>
            <p style={{ color: "gray", marginBottom: "0px" }}>
              <b>Address:</b> {Data?.shippingAddress?.streetAddress1},<br />
              {Data?.shippingAddress?.city}, <br />
              {Data?.shippingAddress?.country?.country} -{" "}
              {Data?.shippingAddress?.postalCode}
            </p>

            <p style={{ color: "gray", marginBottom: "0px" }}>
              <b>Phone:</b> {Data?.shippingAddress?.phone}
            </p>
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
                  activeColor="#b4633a"
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
                  activeColor="#b4633a"
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
            <span style={{ fontSize: "16px", cursor: "pointer" }}>✖</span>
          } // Custom close icon
          okButtonProps={{
            style: {
              backgroundColor: "#b4633a", // Set background color to your preference
              color: "white", // Set text color to white
              border: "none", // Optional: Remove border
            },
          }}
          bodyStyle={{
            padding: 0, // Remove default padding
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
                  activeColor="#b4633a"
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
