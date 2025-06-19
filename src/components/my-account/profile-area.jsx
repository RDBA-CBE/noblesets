import React from "react";
import ProfileNavTab from "./profile-nav-tab";
import ProfileShape from "./profile-shape";
import NavProfileTab from "./nav-profile-tab";
import ProfileInfo from "./profile-info";
import ChangePassword from "./change-password";
import MyOrders from "./my-orders";
import { Wishlist } from "@/svg";
import AddressInfo from "./AddressInfo";
import ReviewSection from "../product-details/ReviewSection";
import Rating from "react-rating-stars-component";

const ProfileArea = ({ orderData, reviewList }) => {

  return (
    <>
      <section className="profile__area pt-50 pb-50" style={{background:"#fff9f4"}}>
        <div className="container">
          <div className="profile__inner p-relative">
            {/* <ProfileShape /> */}
            <div className="row">
              <div className="col-xxl-3 col-lg-4">
                <div className="profile__tab mr-20">
                  <ProfileNavTab />
                </div>
              </div>
              <div className="col-xxl-9 col-lg-8">
                <div className="profile__tab-content">
                  <div className="tab-content" id="profile-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <NavProfileTab orderData={orderData} />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-information"
                      role="tabpanel"
                      aria-labelledby="nav-information-tab"
                    >
                      <ProfileInfo />
                    </div>

                    <div
                      className="tab-pane fade address-nav-tab"
                      id="nav-address"
                      role="tabpanel"
                      aria-labelledby="nav-address-tab"
                    >
                      <AddressInfo />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-password"
                      role="tabpanel"
                      aria-labelledby="nav-password-tab"
                    >
                      <ChangePassword />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-review"
                      role="tabpanel"
                      aria-labelledby="nav-review-tab"
                    >
                      <div>
                        <h4 className="review-title mb-3 ">Reviews</h4>
                        {reviewList?.length > 0 ? (
                          reviewList?.map((review, index) => (
                            <div key={index} className="mb-4">
                              <div className="d-flex align-items-center mb-2">
                                <img
                                  src={
                                    review?.product?.thumbnail?.url
                                      ? review.product?.thumbnail?.url
                                      : "/assets/img/user.png"
                                  }
                                  alt="avatar"
                                  className="rounded-circle me-2"
                                  width={50}
                                  height={50}
                                />

                                <div>
                                  <strong>{`${review?.product?.name}`}</strong>

                                  <p className="text-muted small m-0">
                                    {review.created_at}
                                  </p>
                                </div>
                              </div>
                              <p className="text-dark mb-1">{review.comment}</p>
                              <Rating
                                count={5}
                                value={review.rating}
                                edit={false}
                                size={18}
                                activeColor="#b4633a"
                              />
                              <div className="d-flex gap-2 mt-2">
                                {review?.images.map((src, idx) => (
                                  <img
                                    key={idx}
                                    src={src?.fileUrl}
                                    className="rounded"
                                    alt="review"
                                    width={50}
                                    height={50}
                                  />
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div>No Data Found</div>
                        )}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-order"
                      role="tabpanel"
                      aria-labelledby="nav-order-tab"
                    >
                      <MyOrders orderData={orderData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileArea;
