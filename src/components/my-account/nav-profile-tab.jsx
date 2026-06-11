import React, { useEffect, useState } from "react";
// internal
import { LocationTwo } from "@/svg";
import { useGetUserDetailsMutation, useUpdateProfileMutation, useUpdateUserDetailsMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useGetAddressListQuery } from "@/redux/features/productApi";

const ProfileInfo = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ firstName: "", lastName: "", email: "", newsletter: false });

  const [updateUserDetails, { isLoading: updateUserDetailsLoading }] = useUpdateUserDetailsMutation();
  const [getUserDetails] = useGetUserDetailsMutation();
  const {
    data: getAddressList,
    loading: getAddressListLoading,
    error: getAddressListError,
    refetch: getAddressListRefetch,
  } = useGetAddressListQuery();
  const AddressData = getAddressList?.data?.me?.addresses;

  useEffect(() => {
    getUserDetailsData();
  }, []);

  const getUserDetailsData = async () => {
    const res = await getUserDetails();
    const me = res?.data?.data?.me;
    if (me) {
      setUserFirstName(me.firstName);
      setUserLastName(me.lastName);
      setUserEmail(me.email);
      setIsSubscribed(me.newsletter);
    }
  }


  useEffect(() => {
    if (AddressData?.length > 0) {
      const billingAddress = AddressData?.find(
        (item) => item?.isDefaultBillingAddress === true,
      );
      const shippingAddress = AddressData?.find(
        (item) => item?.isDefaultShippingAddress === true,
      );
      if (shippingAddress) {
        setShippingAddress(shippingAddress);
      }
      if (billingAddress) {
        setBillingAddress(billingAddress);
      }
    }
  }, [getAddressList]);

  const handleEdit = async () => {
    const res = await getUserDetails();
    const me = res?.data?.data?.me;
    if (me) {
      setUserFirstName(me.firstName);
      setUserLastName(me.lastName);
      setUserEmail(me.email);
      setIsSubscribed(me.newsletter);
      setEditForm({ firstName: me.firstName, lastName: me.lastName, email: me.email, newsletter: me.newsletter });
    } else {
      setEditForm({ firstName: userFirstName, lastName: userLastName, email: userEmail, newsletter: isSubscribed });
    }
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    try {
      e.preventDefault();
      const userInfo = localStorage.getItem("userInfo");
      const userId = userInfo ? JSON.parse(userInfo)?.user?.id : null;
      if (!userId) return notifyError("User not found");
      const res = await updateUserDetails({ firstName: editForm.firstName, lastName: editForm.lastName, email: editForm.email, newsletter: editForm.newsletter });
      if (res?.data?.data?.accountUpdate?.user) {
        notifySuccess("Profile updated successfully");
        setIsEditModalOpen(false);
        getUserDetailsData();
      } else {
        notifyError(res?.data?.data?.accountUpdate?.errors?.message);
      }
    }

    catch (error) {

    }

  };

  return (
    <div className="profile__info">
      {isEditModalOpen && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)", zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div style={{ background: "#fff", borderRadius: "12px", padding: "30px", width: "420px", position: "relative" }}>
            <button
              onClick={() => setIsEditModalOpen(false)}
              style={{ position: "absolute", top: "12px", right: "16px", background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
            >
              &times;
            </button>
            <h5 style={{ marginBottom: "20px", fontWeight: "600" }}>Edit Profile</h5>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label style={{ fontWeight: "500" }}>First Name</label>
                <input
                  className="form-control"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label style={{ fontWeight: "500" }}>Last Name</label>
                <input
                  className="form-control"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label style={{ fontWeight: "500" }}>Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
              <div className="mb-4 d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={editForm.newsletter}
                  onChange={(e) => setEditForm({ ...editForm, newsletter: e.target.checked })}
                />
                <label htmlFor="newsletter" style={{ fontWeight: "500", marginBottom: 0 }}>Subscribe to Newsletter</label>
              </div>
              <button type="submit"
                className=" tp-btn tp-btn-border text-white ms-3"
                style={{
                  borderRadius: "20px",
                  padding: "2px 14px",
                  fontSize: "14px",
                  border: "none",
                  marginTop: "-4px",
                }}
                disabled={updateUserDetailsLoading}>{updateUserDetailsLoading ? "Saving..." : "Save Changes"}</button>
            </form>
          </div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 className="profile__info-title" style={{ marginBottom: 0 }}>Personal Details</h3>
        <button
          onClick={handleEdit}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "#7d4432", color: "#fff", border: "none",
            borderRadius: "8px", padding: "6px 14px", fontSize: "13px",
            fontWeight: "500", cursor: "pointer",
          }}
        >
          <i className="fas fa-edit" style={{ fontSize: "13px" }} />
          Edit
        </button>
      </div>
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
            <div className="mt-3 d-flex align-items-center">
              <p
                className="profile__info-text mb-0"
                style={{ color: "gray", fontWeight: "500" }}
              >
                <b>Newsletter</b> :{" "}
                {isSubscribed ? "Subscribed" : "Not Subscribed"}
              </p>
              {/* <button
                onClick={handleNewsletterToggle}
                className=" tp-btn tp-btn-border text-white ms-3"
                style={{
                  borderRadius: "20px",
                  padding: "2px 14px",
                  fontSize: "14px",
                  border: "none",
                  marginTop: "-4px",
                }}
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </button> */}
            </div>
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
              className={`${billingAddress?.isDefaultBillingAddress ||
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
                    <LocationTwo />
                    <h5
                      style={{
                        color: "black",
                        fontWeight: "500",
                        fontSize: "20px",
                      }}
                    >
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
              className={`${shippingAddress?.isDefaultBillingAddress ||
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
                    <LocationTwo />
                    <h5
                      style={{
                        color: "black",
                        fontWeight: "500",
                        fontSize: "20px",
                      }}
                    >
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
