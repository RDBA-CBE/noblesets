import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
// internal
import ErrorMsg from "../common/error-msg";
import { EmailTwo, LocationTwo, PhoneThree, UserThree } from "@/svg";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import ProfileImage from "@assets/img/profile-1.webp";
import Image from "next/image";
import { useGetAddressListQuery } from "@/redux/features/productApi";
import Map from "../../../public/assets/img/map-1.png";

const ProfileInfo = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const {
    data: getAddressList,
    loading: getAddressListLoading,
    error: getAddressListError,
    refetch: getAddressListRefetch,
  } = useGetAddressListQuery();
  const AddressData = getAddressList?.data?.me?.addresses;

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    const JsonUSer = JSON.parse(user);

    const UserFirstName = JsonUSer?.user?.firstName;
    setUserFirstName(UserFirstName);

    const UserLastName = JsonUSer?.user?.lastName;
    setUserLastName(UserLastName);

    const UserEmail = JsonUSer?.user?.email;
    setUserEmail(UserEmail);
  }, []);

  useEffect(() => {
    if (AddressData?.length > 0) {
      const billingAddress = AddressData?.find(
        (item) => item?.isDefaultBillingAddress === true
      );
      const shippingAddress = AddressData?.find(
        (item) => item?.isDefaultShippingAddress === true
      );
      if (shippingAddress) {
        setShippingAddress(shippingAddress);
      }
      if (billingAddress) {
        setBillingAddress(billingAddress);
      }
    }
  }, [getAddressList]);

  return (
    <div className="profile__info">
      <h3 className="profile__info-title">Personal Details</h3>
      <div className="profile__info-content">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "22%" }}>
            <img
              src="assets/img/profile-1.webp"
              alt="profile"
              style={{ width: "68%" }}
            />
          </div>
          <div style={{ width: "88%" }}>
            <p
              className="profile__info-text"
              style={{ color: "gray", fontWeight: "500" }}
            >
              <b>First Name</b> : {userFirstName}
            </p>
            <p
              className="profile__info-text"
              style={{ color: "gray", fontWeight: "500" }}
            >
              <b>Last Name</b> : {userLastName}{" "}
            </p>
            <p
              className="profile__info-text"
              style={{ color: "gray", fontWeight: "500" }}
            >
              <b>Email</b> : {userEmail}
            </p>
          </div>
        </div>
      </div>

      <div className="row pt-10">
        {billingAddress && (
          <div
            className={`address-box col-md-${6}`}
            style={{ marginBottom: "20px" }}
          >
            <div
              className={`${
                billingAddress?.isDefaultBillingAddress ||
                billingAddress?.isDefaultShippingAddress
                  ? "address-box-active"
                  : ""
              }`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding:
                  billingAddress?.isDefaultBillingAddress ||
                  billingAddress?.isDefaultShippingAddress
                    ? "15px"
                    : "0",
                borderRadius:
                  billingAddress?.isDefaultBillingAddress ||
                  billingAddress?.isDefaultShippingAddress
                    ? "10px"
                    : "0",
                background:
                  billingAddress?.isDefaultBillingAddress ||
                  billingAddress?.isDefaultShippingAddress
                    ? "white"
                    : "#f1e7e1",
                color:
                  billingAddress?.isDefaultBillingAddress ||
                  billingAddress?.isDefaultShippingAddress
                    ? "#7d4432"
                    : "#000",
              }}
            >
              <div>
                {billingAddress?.isDefaultBillingAddress && (
                  <div className="d-flex gap-2">
                  {/* <Image src={Map} alt="location"  width={25} height={25} /> */}
                   <LocationTwo/>
                  <h5 style={{ color: "black", fontWeight: "500",fontSize:"20px" }}>
                    Current Billing Address
                  </h5>
                  </div>
                )}

                <p style={{ marginBottom: "0px" }}>
                  {billingAddress?.firstName} {billingAddress?.lastName}
                </p>
                <p style={{ marginBottom: "0px" }}>{billingAddress?.phone}</p>
                <p style={{ marginBottom: "0px" }}>
                  {billingAddress?.companyName}
                </p>
                {/* <p style={{ color: "gray", marginBottom: "0px" }}>
                    { billingAddress?.email}
                  </p> */}
                <p style={{ marginBottom: "0px" }}>
                  {billingAddress?.streetAddress1}{" "}
                  {billingAddress?.streetAddress2}
                </p>
                <p style={{ marginBottom: "0px" }}>{billingAddress?.city}</p>
                <p style={{ marginBottom: "0px" }}>
                  {billingAddress?.countryArea}
                </p>
                <p style={{ marginBottom: "0px" }}>
                  {billingAddress?.country?.country}
                </p>
                <p style={{ marginBottom: "0px" }}>
                  {billingAddress?.postalCode}
                </p>
              </div>
            </div>
          </div>
        )}
        {shippingAddress && (
          <div
            className={`address-box col-md-${6}`}
            style={{ marginBottom: "50px" }}
          >
            <div
              className={`${
                shippingAddress?.isDefaultBillingAddress ||
                shippingAddress?.isDefaultShippingAddress
                  ? "address-box-active"
                  : ""
              }`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding:
                  shippingAddress?.isDefaultBillingAddress ||
                  shippingAddress?.isDefaultShippingAddress
                    ? "15px"
                    : "0",
                borderRadius:
                  shippingAddress?.isDefaultBillingAddress ||
                  shippingAddress?.isDefaultShippingAddress
                    ? "10px"
                    : "0",
                background:
                  shippingAddress?.isDefaultBillingAddress ||
                  shippingAddress?.isDefaultShippingAddress
                   ? "white"
                   : "#f1e7e1",
                color:
                  shippingAddress?.isDefaultBillingAddress ||
                  shippingAddress?.isDefaultShippingAddress
                   ? "#7d4432"
                   : "#000",
              }}
            >
              <div>
                {shippingAddress?.isDefaultShippingAddress && (
                 
                   <div className="d-flex gap-2">
                   {/* <Image src={Map} alt="location" width={25} height={25} /> */}
                    <LocationTwo/>
                   <h5 style={{ color: "black", fontWeight: "500",fontSize:"20px" }}>
                   Current Shipping Address

                   </h5>
                   </div>
                )}
                <p style={{ marginBottom: "0px" }}>
                  {shippingAddress?.firstName} {billingAddress?.lastName}
                </p>
                <p style={{ marginBottom: "0px" }}>{billingAddress?.phone}</p>
                <p style={{ marginBottom: "0px" }}>
                  {shippingAddress?.companyName}
                </p>
                {/* <p style={{ color: "gray", marginBottom: "0px" }}>
                    { billingAddress?.email}
                  </p> */}
                <p style={{ marginBottom: "0px" }}>
                  {shippingAddress?.streetAddress1}{" "}
                  {shippingAddress?.streetAddress2}
                </p>
                <p style={{ marginBottom: "0px" }}>{shippingAddress?.city}</p>
                <p style={{ marginBottom: "0px" }}>
                  {shippingAddress?.countryArea}
                </p>
                <p style={{ marginBottom: "0px" }}>
                  {shippingAddress?.country?.country}
                </p>
                <p style={{ marginBottom: "0px" }}>
                  {shippingAddress?.postalCode}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
