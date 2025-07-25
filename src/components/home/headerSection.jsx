import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import Menus from "@/layout/headers/header-com/menus";
import logo from "@assets/img/logo/logo.svg";
import useSticky from "@/hooks/use-sticky";
import useCartInfo from "@/hooks/use-cart-info";
import {
  cart_list,
  compare_list,
  openCartMini,
  openUserSidebar,
} from "@/redux/features/cartSlice";
import HeaderTopRight from "@/layout/headers/header-com/header-top-right";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import {
  CartTwo,
  Compare,
  Facebook,
  Menu,
  PhoneTwo,
  Wishlist,
  Search,
  User,
  UserTwo,
  UserThree,
} from "@/svg";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";
import OffCanvas from "@/components/common/off-canvas";
import pradeLogo from "@assets/img/header-logo.png";
import UserMiniSidebar from "@/components/common/user-sidebar";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import { useGetCartAllListQuery } from "../../redux/features/card/cardApi";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import {
  useGetWishlistQuery,
  useProductSearchMutation,
} from "@/redux/features/productApi";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/router";
import { checkChannel, removeduplicate } from "@/utils/functions";
import { profilePic } from "@/utils/constant";
import ButtonLoader from "../../components/loader/button-loader";
import { useLogoutMutation } from "../../redux/features/productApi";
import Menus1 from "@/layout/headers/header-com/menu1";

const HeaderSection = ({ style_2 = false, data }) => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart?.cart_list);
  const compareList = useSelector((state) => state.cart.compare_list);

  const { wishlist } = useSelector((state) => state.wishlist);

  const [searchOption, setSearchOption] = useState([]);

  const { data: cartList, refetch: cartRefetch } = useGetCartListQuery();
  const [searchProduct, { isLoading: searchLoading }] =
    useProductSearchMutation();

  const [logoutRefetch] = useLogoutMutation();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { setSearchText, handleSubmit, searchText } = useSearchFormSubmit();
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();

  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

  const WishListLength = wishlistData?.data?.wishlists?.edges;

  useEffect(() => {
    wishlistRefetch();
  }, []);

  useEffect(() => {
    getWishlistList();
  }, [wishlistData]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const user = localStorage.getItem("userInfo");
    const JsonUSer = JSON.parse(user);
    const UserName = JsonUSer?.user?.firstName;
    setUserName(UserName);
    setToken(token);
  }, []);

  useEffect(() => {
    const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
    const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");

    if (!checkoutTokenINR || checkoutTokenINR === "undefined") {
      createCheckoutTokenINR();
    }
    if (!checkoutTokenUSD || checkoutTokenUSD === "undefined") {
      createCheckoutTokenUSD();
    }
  }, []);

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

  const getWishlistList = async (prd) => {
    try {
      if (wishlistData?.data?.wishlists?.edges?.length > 0) {
        const isAddWishlist = wishlistData?.data?.wishlists?.edges
          ?.map((item) => item?.node)
          ?.some((node) => node?.id === product?.id);

        dispatch(
          add_to_wishlist(
            wishlistData?.data?.wishlists?.edges?.map((item) => item?.node)
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest(".tp-header-area") &&
        !event.target.closest(".dropdown-content")
      ) {
        setIsOpen(false);
        setIsOpen2(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown if the user clicks outside of it
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".tp-header-action-item")) {
      setIsOpen(false);
    }
  };

  // Attach event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logoutRefetch({});
      dispatch(userLoggedOut());
      router.push("/login");
      if (localStorage.getItem("token")) {
        dispatch(cart_list([]));
        localStorage.clear();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  let timeoutId;

  const handleSearch = (search) => {
    // Immediately update search text as user types
    setSearchText(search);

    // If the search term is less than 3 characters, don't proceed with API call
    if (search.length <= 2) return;

    // Clear the existing timeout if there is any
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout only for the API call
    timeoutId = setTimeout(async () => {
      try {
        const data = await searchProduct({
          search: search,
        });

        const filter = data?.data?.data?.productsSearch?.edges?.map((item) => ({
          name: item?.node?.name,
          price: item?.node?.defaultVariant?.pricing?.price?.gross?.amount,
          img: item?.node?.thumbnail?.url,
          id: item?.node?.id,
          slug: item?.node?.slug,
        }));

        // Handle UI state based on the search term
        if (search === "") {
          setIsOpen2(false);
        } else {
          setIsOpen2(true);
        }

        const res = removeduplicate(filter);
        setSearchOption(res);
      } catch (error) {
        console.log("error: ", error);
      }
    }, 1000); // Delay the API call by 500ms
  };

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };

  return (
    <>
      <header style={{background:"#fff9f4"}}>
        <div
          className={`tp-header-area tp-header-style-${
            style_2 ? "primary" : "darkRed"
          } tp-header-height`}
        >
          <div
            id="header-sticky"
            // style={{ backgroundColor: "#3b021e" }}
            className={`tp-header-bottom-2 tp-header-sticky ${
              sticky ? "header-sticky" : ""
            }`}
          >
            <div className="section-wd" style={{ padding: "10px 30px 10px 30px" }}>
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xl-5 d-none d-xl-block">
                    <div className="main-menu">
                      <nav className="tp-main-menu-content">
                        {/* <Menus /> */}
                        <Menus1/>
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-5 col-md-5 col-sm-4 col-6 d-flex justify-content-xl-center">
                    <div className="logo" style={{height:"auto"}}>
                      <Link href="/">
                        <Image
                        width={150}
                        height={90}
                          src={pradeLogo}
                          alt="logo"
                          priority
                          className="prade-navbar-logo"
                          style={{
                            // height:"70px",
                            // width:'12px'
                          }}
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-5 col-lg-7 col-md-7 col-sm-8 col-6">
                    <div className="tp-header-bottom-right d-flex align-items-center justify-content-end pl-30">
                      {isOpen3 && (
                        <div
                          className="tp-header-search-2 d-none d-sm-block"
                          style={{ position: "relative" }}
                        >
                          <input
                            onChange={(e) => handleSearch(e.target.value)}
                            value={searchText}
                            type="text"
                            placeholder="Search for Products..."
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSearch(searchText);
                              }
                            }}
                            style={{borderRadius:"10px"}}
                          />
                          {isOpen2 == true ? (
                            <div
                              className="dropdown-content  d-flex flex-column"
                              style={{
                                position: "absolute",
                                top: "50px",
                                background: "white",
                                padding: "30px 20px",
                                // right: "-10px",
                                zIndex: "2",
                                width: "100%",
                                borderRadius:"10px",
                                boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                                height: searchLoading
                                  ? "60px"
                                  : searchOption?.length > 5
                                  ? "400px"
                                  : "auto",
                                overflowY: "scroll",
                              }}
                            >
                              {searchLoading ? (
                                <ButtonLoader color="#b4633a" size={30} />
                              ) : searchOption?.length > 0 ? (
                                searchOption?.map((item, index) => (
                                  <div
                                    key={index}
                                    className="d-flex align-items-center justify-content-between"
                                    style={{
                                      marginBottom: "10px",
                                      paddingBottom: "10px",
                                      borderBottom: "1px solid #dadada",
                                    }}
                                  >
                                    <div
                                      style={{
                                        marginRight: "10px",
                                        width: "50px",
                                        height: "50px",
                                      }}
                                    >
                                      {isImage(profilePic(item?.img)) ? (
                                        <img
                                          src={profilePic(item?.img)}
                                          alt="Product Image"
                                          width={50}
                                          height={50}
                                          style={{ borderRadius: "50%" }}
                                        />
                                      ) : (
                                        <video
                                          src={item?.img}
                                          width={50}
                                          muted
                                          loop
                                          height={50}
                                          style={{ borderRadius: "50%" }}
                                        />
                                      )}
                                    </div>

                                    <Link
                                      href={`/product-details/${item?.slug}`}
                                      key={item?.id}
                                      className="dropdown-item"
                                    >
                                      {item?.name}
                                    </Link>
                                    {checkChannel() === "india-channel" ? (
                                      <p
                                        style={{
                                          marginLeft: "10px !important",
                                          color: "black",
                                          margin: "0",
                                        }}
                                      >
                                        ₹{item?.price}
                                      </p>
                                    ) : (
                                      <p
                                        style={{
                                          marginLeft: "10px !important",
                                          color: "black",
                                          margin: "0",
                                        }}
                                      >
                                        ${item?.price}
                                      </p>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <span className="item-center justify-center">
                                  No Data Found
                                </span>
                              )}
                            </div>
                          ) : null}
                        </div>
                      )}
                      <div className="tp-header-action d-flex align-items-center ml-30">
                        <div className="tp-header-action-item d-none d-lg-block">
                          <div
                            onClick={() => setIsOpen3(!isOpen3)}
                            className="tp-header-action-btn  "
                            style={{
                              // backgroundColor: "#e09a7b",
                              background: "linear-gradient(to right,color-mix(in srgb, #fbdccc 40%, #e09a7a),#e09a7a)",
                              width: "40px",
                              height: "40px",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                              borderRadius:"5px"
                            }}
                          >
                            <Search />
                            {/* <span className="tp-header-action-badge">
                              {compareList?.length || 0}
                            </span> */}
                          </div>
                        </div>
                        {/* {token && (
                          <div className="tp-header-action-item d-none d-lg-block">
                            <Link
                              href="/wishlist"
                              className="tp-header-action-btn"
                            >
                              <Wishlist />
                              <span className="tp-header-action-badge">
                                {WishListLength?.length || 0}
                              </span>
                            </Link>
                          </div>
                        )} */}
                        <div
                          className="tp-header-action-item "
                          style={{ position: "relative" }}
                        >
                          <button
                            onClick={toggleDropdown}
                            className="tp-header-action-btn cartmini-open-btn "
                            style={{
                              backgroundColor: "#e09a7b",
                              width: "40px",
                              height: "40px",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                              borderRadius:"5px"
                            }}
                          >
                            <UserThree />
                          </button>
                          {isOpen && (
                            <div
                              className="dropdown-content  d-flex flex-column"
                              style={{
                                position: "absolute",
                                top: "35px",
                                background: "white",
                                padding: "30px 20px",
                                right: "-10px",
                                zIndex: "2000",
                                width: "250px",
                                boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                                borderRadius:"10px"
                              }}
                            >
                              {/* Content of the dropdown menu goes here */}
                              {/* For example: */}
                              <div className="pb-20">
                                <p
                                  style={{
                                    color: "black",
                                    fontWeight: "500",
                                    color: "gray",
                                    margin: "0px",
                                  }}
                                >
                                  Welcome {userName}
                                </p>
                                <p style={{ color: "gray", margin: "0px" }}>
                                  To access account and manage orders
                                </p>
                              </div>
                              {!token ? (
                                <div className="pb-20">
                                  <button
                                    className="tp-login-btn "
                                    style={{
                                      padding: "5px 10px",
                                      background: "none",
                                      border: "1px solid gray",
                                      color: "gray",
                                      fontSize: "14px",
                                      borderRadius:"5px"
                                    }}
                                    onClick={() => router.push("/login")}
                                  >
                                    LOGIN / SIGNUP
                                  </button>
                                </div>
                              ) : (
                                <div className="pb-20">
                                  <button
                                    className="tp-login-btn "
                                    style={{
                                      padding: "5px 10px",
                                      background: "none",
                                      border: "1px solid gray",
                                      color: "gray",
                                      fontSize: "14px",
                                       borderRadius:"5px"
                                    }}
                                    onClick={handleLogout}
                                  >
                                    LOGOUT
                                  </button>
                                </div>
                              )}

                              <div className="d-flex flex-column">
                                {token && (
                                  <>
                                    <Link
                                      href="/profile"
                                      style={{ paddingBottom: "5px" }}
                                    >
                                      My Profile
                                    </Link>
                                    <Link
                                      href="/profile"
                                      style={{ paddingBottom: "5px" }}
                                    >
                                      My Orders
                                    </Link>
                                  </>
                                )}

                                <Link
                                  href="/wishlist"
                                  style={{ paddingBottom: "5px" }}
                                >
                                  WishList
                                </Link>
                                <Link
                                  href="/compare"
                                  style={{ paddingBottom: "5px" }}
                                >
                                  Compare
                                </Link>
                                <Link
                                  href="/gift-card"
                                  style={{ paddingBottom: "5px" }}
                                >
                                  Gift Cards
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="tp-header-action-item">
                          <button
                            onClick={() => {
                              dispatch(openCartMini());
                              cartRefetch();
                              AllListChannelREfresh();
                            }}
                            className="tp-header-action-btn cartmini-open-btn "
                            style={{
                              backgroundColor: "#e09a7b",
                              width: "40px",
                              height: "40px",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                              borderRadius:"5px"
                            }}
                          >
                            <CartTwo />
                            <span className="tp-header-action-badge">
                              {cart?.length || 0}
                            </span>
                          </button>
                        </div>
                        {/* {token && ( */}

                        {/* )} */}
                        <div className="tp-header-action-item tp-header-hamburger ps-3 d-xl-none">
                          <button
                            onClick={() => setIsCanvasOpen(true)}
                            type="button"
                            className="tp-offcanvas-open-btn"
                          >
                            <Menu />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      <UserMiniSidebar />

      {/* off canvas start */}
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="fashion"
      />
      {/* off canvas end */}
    </>
  );
};

export default HeaderSection;
