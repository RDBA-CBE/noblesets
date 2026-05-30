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
import GoldRateBar from "../GoldRateBar";
import GoldRateBarHead from "../GoldRateBarHead";

const HeaderSection = ({ style_2 = false, data }) => {
  const router = useRouter();
  const cart = useSelector((state) => state.cart?.cart_list);
  const compareList = useSelector((state) => state.cart.compare_list);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 800);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        data?.data?.data?.checkoutCreate?.checkout?.token,
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
        data?.data?.data?.checkoutCreate?.checkout?.token,
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
            wishlistData?.data?.wishlists?.edges?.map((item) => item?.node),
          ),
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setSearchText("");
    setSearchOption([]);
    setIsOpen2(false);
  };

  const handleSearchIconClick = (e) => {
    e.stopPropagation();
    if (window.innerWidth <= 1500) {
      setIsMobileSearchOpen(true);
      setSearchText("");
      setSearchOption([]);
      setIsOpen2(false);
    } else {
      setIsOpen3((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Close My Account dropdown
      if (
        !event.target.closest(".tp-header-area") &&
        !event.target.closest(".dropdown-content")
      ) {
        setIsOpen(false);
      }
      // Close search results dropdown when clicking outside
      if (!event.target.closest(".tp-header-search-2")) {
        setIsOpen2(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

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
      {/* Mobile search overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          transform: isMobileSearchOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          padding: "12px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            autoFocus={isMobileSearchOpen}
            onChange={(e) => handleSearch(e.target.value)}
            value={searchText}
            type="text"
            placeholder="Search for Products..."
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch(searchText);
            }}
            style={{
              flex: 1,
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            onClick={() => {
              setIsMobileSearchOpen(false);
              setSearchText("");
              setSearchOption([]);
              setIsOpen2(false);
            }}
            style={{
              background: "none",
              border: "none",
              fontSize: "22px",
              cursor: "pointer",
              color: "#7d4432",
              lineHeight: 1,
              padding: "4px 8px",
            }}
          >
            ✕
          </button>
        </div>
        {isOpen2 && (
          <div
            style={{
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              marginTop: "8px",
              maxHeight: "60vh",
              overflowY: "auto",
              padding: "10px",
            }}
          >
            {searchLoading ? (
              <ButtonLoader color="#7d4432" size={30} />
            ) : searchOption?.length > 0 ? (
              searchOption.map((item, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center "
                  style={{
                    marginBottom: "10px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #dadada",
                  }}
                >
                  <div
                    style={{
                      marginRight: "10px",
                      width: "30px",
                      height: "30px",
                      flexShrink: 0,
                    }}
                  >
                    {isImage(profilePic(item?.img)) ? (
                      <img
                        className="w-100 h-100"
                        src={profilePic(item?.img)}
                        alt="Product"
                        width={50}
                        height={50}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      <video
                        src={item?.img}
                        width={50}
                        height={50}
                        muted
                        loop
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                  </div>
                  <div className="d-flex flex-wrap">
                    <Link
                      href={`/product-details/${item?.slug}`}
                      className="dropdown-item"
                      onClick={() => {
                        setIsMobileSearchOpen(false);
                        setSearchText("");
                        setSearchOption([]);
                        setIsOpen2(false);
                      }}
                      style={{ flex: 1, fontSize: "13px" }}
                    >
                      {item?.name}
                    </Link>
                    <p
                      style={{
                        color: "black",
                        margin: "0",
                        fontSize: "13px",
                        flexShrink: 0,
                      }}
                    >
                      {checkChannel() === "india-channel"
                        ? `₹${item?.price}`
                        : `$${item?.price}`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <span style={{ color: "#888", fontSize: "14px" }}>
                No Data Found
              </span>
            )}
          </div>
        )}
      </div>
      {/* Mobile search backdrop */}
      {isMobileSearchOpen && (
        <div
          onClick={() => {
            setIsMobileSearchOpen(false);
            setSearchText("");
            setSearchOption([]);
            setIsOpen2(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            background: "rgba(0,0,0,0.3)",
          }}
        />
      )}

      <header
        className={`bg-white tp-header-area tp-header-style-${
          style_2 ? "primary" : "darkRed"
        } tp-header-height`}
      >
        
        <div
          id="header-sticky"
          className={`tp-header-bottom-2 tp-header-sticky ${
            sticky ? "header-sticky" : ""
          }`}
          // className="container-fluid px-5 py-3"
        >
          {/* Top Bar */}
          <div className="section-wd row d-flex align-items-center justify-content-between justify-content-lg-center py-2 " 
          >
            <div className=" d-flex header-in-wid">
              {/* Logo */}
              <div className="logo">
                <Link href="/">
                  <Image src={pradeLogo} alt="logo" width={95} height={55} />
                </Link>
              </div>

              {/* Search */}
              <div className="ps-4 pe-3   col-6 d-none d-lg-block ">
                <div className="position-relative w-100 mt-2 tp-header-input-new  ">
                  <input
                    className=""
                    type="text"
                    placeholder="Shop for Products"
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSearch(searchText);
                      }
                    }}
                    style={{
                      height: "40px",
                      borderRadius: "25px",
                      border: "1px solid #ddd",
                      padding: "0 50px 0 50px",
                      outline: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "20px",
                      top: "20px",
                      transform: "translateY(-50%)",
                      color: "#c84a62",
                    }}
                  >
                    {" "}
                    <Search size={18} />
                  </div>

                  {isOpen2 == true ? (
                    <div
                      className="dropdown-content  d-flex flex-column"
                      style={{
                        position: "absolute",
                        top: "50px",
                        background: "white",
                        padding: "30px 20px",
                        // right: "-10px",
                        zIndex: "200",
                        width: "100%",
                        borderRadius: "10px",
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
                        <ButtonLoader color="#7d4432" size={30} />
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
              </div>
              <div className="col-9 ps-4 ps-xl-0 col-xl-6 col-xxl-7 header-in-wid-two mt-2 d-none d-xl-block">
                 <GoldRateBarHead/>
              </div>
             
            </div>

            {/* Right Actions */}
            <div className="col-3 col-xl-3  d-flex align-items-center justify-content-end gap-4">
              {/* <button
                style={{
                  background: "#f3e8b5",
                  border: "none",
                  borderRadius: "25px",
                  padding: "8px 18px",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Gold Price
              </button> */}

              <div
                onClick={handleSearchIconClick}
                title="Search"
                className="tp-header-action-btn d-block d-lg-none "
              >
                <Search size={20} />
              </div>

              <div
                onClick={() => {
                  dispatch(openCartMini());
                  cartRefetch();
                  AllListChannelREfresh();
                }}
                title="Cart"
                className="tp-header-action-btn cartmini-open-btn "
              >
                <CartTwo size={24} />
                <span className="tp-header-action-badge">
                  {cart?.length || 0}
                </span>
              </div>

              <div
                className="tp-header-action-btn cartmini-open-btn "
                style={{ position: "relative" }}
              >
                <div onClick={toggleDropdown} title="My Account">
                  <UserThree size={24} />
                </div>

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
                      borderRadius: "10px",
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
                            borderRadius: "5px",
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
                            borderRadius: "5px",
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
                            style={{
                              fontSize: "14px",
                              color: "#55585b",
                              paddingBottom: "5px",
                            }}
                          >
                            My Profile
                          </Link>
                          <Link
                            href="/profile"
                            style={{
                              fontSize: "14px",
                              color: "#55585b",
                              paddingBottom: "5px",
                            }}
                          >
                            My Orders
                          </Link>
                        </>
                      )}

                      <Link
                        href="/wishlist"
                        style={{
                          fontSize: "14px",
                          color: "#55585b",
                          paddingBottom: "5px",
                        }}
                      >
                        WishList
                      </Link>
                      <Link
                        href="/compare"
                        style={{
                          fontSize: "14px",
                          color: "#55585b",
                          paddingBottom: "5px",
                        }}
                      >
                        Compare
                      </Link>
                      <Link
                        href="/gift-card"
                        style={{
                          fontSize: "14px",
                          color: "#55585b",
                          paddingBottom: "5px",
                        }}
                      >
                        Gift Cards
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="tp-header-action-btn tp-offcanvas-open-btn cartmini-open-btn tp-header-hamburger ps-0 d-xl-none"
                style={{ position: "relative" }}
                 onClick={() => setIsCanvasOpen(true)}
              >
              <Menu />  
              </div>

              {!token ? (
                <span
                  className="cursor-pointer d-none d-xl-block"
                  style={{
                    color: "#7d4432",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  onClick={() => router.push("/login")}
                >
                  Login
                </span>
              ) : (
                <span
                  className="cursor-pointer d-none d-xl-block"
                  style={{
                    color: "#7d4432",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div
            className="d-none d-xl-block"
            style={{
              background: "#7d4432 ",
              height: "44px",
            }}
          >
            <div className="section-wd">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row justify-content-center align-items-center mb-0">
                  <div className="main-menu">
                    <nav className="tp-main-menu-content">
                      <Menus1 />
                    </nav>
                  </div>
                </div>
              </div>

              {/* <ul
                className="d-flex justify-content-center align-items-center mb-0"
                style={{
                  listStyle: "none",
                  height: "44px",
                  gap: "50px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 500,
                }}
              >
                <li>Earrings</li>
                <li>Rings</li>
                <li>Bracelet & Bangles</li>
                <li>Necklaces & Pendants</li>
                <li>Mangalsutra</li>
                <li>Silver Jewellery</li>
                <li>Collections</li>
                <li>Gifting</li>
                <li>More Jewellery</li>
              </ul> */}
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
