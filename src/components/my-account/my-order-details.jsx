import {
  addCommasToNumber,
  checkChannel,
  formatCurrency,
  roundOff,
} from "@/utils/functions";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";

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

  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    rating: 0,
    images: [],
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const handleSubmit = () => {
    try {
      const body = {
        input: {
          product: "UHJvZHVjdDozNg==",
          rating: 5,
          comment: "This product is amazing!",
        },
      };
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

                      <td>
                        {item?.totalPrice?.gross?.currency === "USD"
                          ? "$"
                          : "₹"}
                        {addCommasToNumber(item?.totalPrice?.gross?.amount)}
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

        <div className="mb-4">
          <h5 className="">Write a Review</h5>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
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

            <button type="submit" className="tp-btn tp-btn-border ">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MyOrderDetails;
