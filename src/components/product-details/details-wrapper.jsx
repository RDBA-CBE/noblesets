import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { AskQuestion, CompareTwo, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
import {
  add_cart_product,
  cart_list,
  compare_list,
  openCartMini,
} from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { handleModalClose } from "@/redux/features/productModalSlice";
import {
  RegularPrice,
  capitalizeFLetter,
  checkChannel,
} from "@/utils/functions";
import {
  useAddToCartMutation,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import { Router, useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";
import { checkWishlist, handleWishlistProduct } from "@/utils/common_function";
import ProductDetailsBreadcrumb from "../breadcrumb/product-details-breadcrumb";
import {
  useAddWishlistMutation,
  useGetNextProductQuery,
  useGetPrevProductQuery,
  useGetProductQuery,
  useGetWishlistQuery,
} from "@/redux/features/productApi";
import { addCommasToNumber, roundOff } from "../../utils/functions";
import ButtonLoader from "../loader/button-loader";
import {
  RightOutlined,
  LeftOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { cleanHTML, customStyles, profilePic } from "@/utils/constant";
import { RWebShare } from "react-web-share";
import PincodeChecker from "../pincode_checker/pincodeChecker";
import PriceBreakup from "../price_breakup/priceBreakUp";
import ReactModal from "react-modal";
import CCAvenue from "@/utils/CCAvenue";
import * as Yup from "yup";

const DetailsWrapper = ({
  productItem,
  handleImageActive,
  productRefetch,
  activeImg,
  detailsBottom = false,
  pageTitle,
  isGiftCard,
  parentSlug,
}) => {
  const {
    sku,
    img,
    title,
    imageURLs,
    category,
    description,
    discount,
    price,
    status,
    reviews,
    tags,
    offerDate,
  } = productItem || {};

  console.log("✌️productItem --->", productItem);

  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const [channel, setChannel] = useState("india-channel");
  const [cartLoader, setCartLoader] = useState(false);
  const [wishlistLoader, setWishlistLoader] = useState(false);
  const [index, setIndex] = useState(0);
  const [variantId, setVariantId] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [variantDetails, setVariantDetails] = useState("");
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isProductModalOpen, setIsProductModelOpen] = useState(false);

  const [priceHTML, setPriceHTML] = useState(`
        <table border="1" cellpadding="5" cellspacing="0">
            <thead>
                <tr>
                    <th>Size</th><th>width</th><th>Height</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>20</td><td>10</td><td>22</td><td></td></tr><tr><td>10</td><td>20</td><td>21</td><td></td></tr>
            </tbody>
        </table>`);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productName: "",
    sku: "",
    message: "",
    captcha: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const correctCaptchaAnswer = 3; // because five - 2 = 3

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [visibility, setVisibility] = useState({
    description: false,
    additionalInfo: false,
    shipping: false,
    maintenance: false,
  });

  const toggleVisibility = (section) => {
    setVisibility((prevState) => {
      // If the clicked section is currently active, toggle it off
      if (prevState[section]) {
        return {
          ...prevState,
          [section]: false,
        };
      }

      // If the clicked section is not active, toggle it on and toggle off all other sections
      const updatedVisibility = {};
      for (const key in prevState) {
        updatedVisibility[key] = key === section;
      }
      return updatedVisibility;
    });
  };

  const { data: tokens } = useGetCartListQuery();
  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

  const isAddedToWishlist = wishlistData?.data?.wishlists?.edges?.some(
    (prd) => {
      return prd?.node?.variant === productItem?.id;
    }
  );

  const [addWishlist, {}] = useAddWishlistMutation();

  const { wishlist } = useSelector((state) => state.wishlist);

  const compareList = useSelector((state) => state.cart.compare_list);

  useEffect(() => {
    const compareList = localStorage.getItem("compareList");
    const arr = JSON.parse(compareList);
    dispatch(compare_list(arr));
  }, []);

  useEffect(() => {
    if (isGiftCard || productItem?.variants?.length > 1) {
      const amounts = productItem?.variants?.map(
        (product) => product.pricing.price.gross.amount
      );
      const minAmount = Math.min(...amounts);
      const maxAmount = Math.max(...amounts);
      setMaxAmount(maxAmount);
      setMinAmount(minAmount);
    }
  }, [productItem]);

  const [isAddWishlist, setWishlist] = useState(false);
  const [attributeValue, setAttributeValue] = useState(false);
  const cart = useSelector((state) => state.cart?.cart_list);

  const { data: datacartList, refetch: cartRefetch } = useGetCartListQuery();

  let isAddedToCart = false;
  if (datacartList?.data?.checkout?.lines?.length > 0) {
    isAddedToCart = datacartList?.data?.checkout?.lines?.some(
      (prd) => prd.variant.product.id === productItem?.id
    );
  }

  // let textValue = "";
  // // Parse the JSON string
  // if (productItem?.description || productItem?.node?.description) {
  //   const jsonObject = JSON.parse(
  //     productItem?.description || productItem?.node?.description
  //   );
  //   // Extract the text value
  //   textValue = jsonObject?.blocks[0]?.data?.text;
  // }

  // Convert the text value to JSON format

  const dispatch = useDispatch();

  const router = useRouter();

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    const whislist = checkWishlist(wishlist, productItem?.id);
    setWishlist(whislist);
  }, [wishlist]);

  useEffect(() => {
    getWishlistList();
  }, [wishlistData]);

  const getWishlistList = async (prd) => {
    try {
      if (wishlistData?.data?.wishlists?.edges?.length > 0) {
        const isAddWishlist = wishlistData?.data?.wishlists?.edges
          ?.map((item) => item?.node)
          ?.some((node) => {
            return node?.id === productItem?.id;
          });

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

  const handleWishlist = async (prd) => {
    if (token) {
      setWishlistLoader(true);
      try {
        setWishlistLoader(true);
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userInfo");

        if (token) {
          const users = JSON.parse(user);
          const input = {
            input: {
              user: users.user.id,
              variant: prd?.id,
            },
          };

          const res = await addWishlist(input);
          notifySuccess("Product added to wishlist");
          wishlistRefetch();
        } else {
          router.push("/login");
          // const addedWishlist = handleWishlistProduct(prd);
          // dispatch(add_to_wishlist(addedWishlist));
        }

        setWishlistLoader(false);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      notifyError(
        "Only logged-in users can add items to their wishlist or view it"
      );
    }
  };

  // handle add product

  const addToCartProductINR = async () => {
    try {
      setCartLoader(true);
      let variantID = "";
      if (productItem?.variants?.length > 1) {
        if (variantId == "") {
          notifyError("Please select a variant");
          setCartLoader(false);
          return false;
        } else {
          variantID = variantId;
        }
      } else {
        variantID = productItem?.defaultVariant?.id;
      }
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: variantID,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
      } else {
        notifySuccess(`Product added to cart successfully`);
        dispatch(openCartMini());
        cartRefetch();
      }
      setCartLoader(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToCartProductUSD = async () => {
    try {
      setCartLoader(true);
      let variantID = "";
      if (productItem?.variants?.length > 1) {
        if (variantId == "") {
          setCartLoader(false);
          return false;
        } else {
          variantID = variantId;
        }
      } else {
        variantID = productItem?.defaultVariant?.id;
      }
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenUSD,
        variantId: variantID,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        // notifyError(err);
      } else {
        cartRefetch();
      }
      setCartLoader(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const handleAddProduct = (prd) => {
  //   console.log("prd: ", prd);
  //   // dispatch(add_cart_product(prd));if (prd.`1
  // };

  // handle wishlist product

  // handle compare product
  const handleCompareProduct = (prd) => {
    const compare = localStorage.getItem("compareList");

    let arr = [];
    if (!compare) {
      arr = [];
    } else {
      arr = JSON.parse(compare);
    }
    arr.push(prd);
    localStorage.setItem("compareList", JSON.stringify(arr));
    dispatch(compare_list(arr));
    notifySuccess("Product to added to compare list");
  };

  useEffect(() => {
    const channel = localStorage.getItem("channel");
    if (channel) {
      setChannel(channel);
    }
  }, []);

  const [previousHovered, setPreviousHovered] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);
  const [nextProduct, setNextProduct] = useState();
  const [previousProduct, setPreviousProduct] = useState();

  const PreviousMouseEnter = () => {
    setPreviousHovered(true);
  };

  const PreviousMouseLeave = () => {
    setPreviousHovered(false);
  };

  const NextMouseEnter = () => {
    setNextHovered(true);
  };

  const NextMouseLeave = () => {
    setNextHovered(false);
  };

  const {
    data: nextProductData,
    isNextLoadings,
    isNextErrors,
  } = useGetNextProductQuery({ nextProductId: productItem?.nextProduct });

  const {
    data: prevProductData,
    isPreviousLoadings,
    isPreviousErrors,
  } = useGetPrevProductQuery({ prevProductId: productItem?.previousProduct });

  useEffect(() => {
    if (prevProductData && prevProductData?.data?.product) {
      setPreviousProduct(prevProductData?.data?.product);
    }
  }, [prevProductData]);

  useEffect(() => {
    if (nextProductData && nextProductData?.data?.product) {
      setNextProduct(nextProductData?.data?.product);
    }
  }, [nextProductData]);

  const PreviousProductClick = () => {
    router.push(`/product-details/${previousProduct?.slug}`);
  };
  const NextProductClick = () => {
    router.push(`/product-details/${nextProduct?.slug}`);
  };

  useEffect(() => {
    const hasAttributeValues = productItem?.attributes?.some((attribute) =>
      attribute?.values?.length > 0 ? true : false
    );
    setAttributeValue(hasAttributeValues);
  }, [productItem]);

  // Rest of your component code...

  const multiVariantPrice = () => {
    if (checkChannel() == "india-channel") {
      if (productItem?.variants?.length > 1) {
        {
          RegularPrice(
            productItem?.variants[0]?.costPrice,
            productItem?.pricing?.price?.gross?.amount
          ) && (
            <span
              className="pr-5"
              style={{ textDecoration: "line-through", color: "gray" }}
            >
              &#8377;
              {roundOff(productItem?.variants[0]?.costPrice?.gross?.amount)}
            </span>
          );
        }
        <span className="tp-product-price-2 new-price">
          &#8377;
          {roundOff(productItem?.pricing?.price?.gross?.amount)}
        </span>;
      } else {
        {
          RegularPrice(
            productItem?.defaultVariant?.costPrice,
            productItem?.pricing?.priceRange?.start?.gross?.amount
          ) && (
            <span
              className="pr-5"
              style={{ textDecoration: "line-through", color: "gray" }}
            >
              &#8377;{roundOff(productItem?.defaultVariant?.costPrice)}
            </span>
          );
        }
        <span className="tp-product-price-2 new-price">
          &#8377;
          {roundOff(
            productItem?.pricing?.priceRange?.start?.gross?.amount ||
              productItem?.node?.pricing?.priceRange?.start?.gross?.amount
          )}
        </span>;
      }
    } else {
      if (productItem?.variants?.length > 1) {
        {
          RegularPrice(
            productItem?.variants[0]?.costPrice,
            productItem?.pricing?.price?.gross?.amount
          ) && (
            <span
              className="pr-5"
              style={{ textDecoration: "line-through", color: "gray" }}
            >
              {"$"}
              {roundOff(productItem?.variants[0]?.costPrice?.gross?.amount)}
            </span>
          );
        }
        <span className="tp-product-price-2 new-price">
          {"$"}
          {roundOff(productItem?.pricing?.price?.gross?.amount)}
        </span>;
      } else {
        {
          RegularPrice(
            productItem?.defaultVariant?.costPrice,
            productItem?.pricing?.priceRange?.start?.gross?.amount
          ) && (
            <span
              className="pr-5"
              style={{ textDecoration: "line-through", color: "gray" }}
            >
              {"$"}
              {roundOff(productItem?.defaultVariant?.costPrice)}
            </span>
          );
        }
        <span className="tp-product-price-2 new-price">
          {"$"}
          {roundOff(
            productItem?.pricing?.priceRange?.start?.gross?.amount ||
              productItem?.node?.pricing?.priceRange?.start?.gross?.amount
          )}
        </span>;
      }
    }
  };

  const variantsChange = (e) => {
    setVariantId(e.target.value);
    productRefetch();
    const variantDetails = productItem?.variants?.find(
      (variant) => variant?.id == e.target.value
    );
    setVariantDetails(variantDetails);
  };

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };

  const saveOff = () => {
    const discountedPrice =
      productItem?.pricing?.priceRange?.start?.gross?.amount;
    const originalPrice = productItem?.defaultVariant?.costPrice;
    const discountPercentage =
      ((originalPrice - discountedPrice) / originalPrice) * 100;
    if (discountPercentage) {
      return discountPercentage.toFixed(2);
    } else {
      return 0;
    }
  };
  const host = "https://schemes.sreethangamjewellery.com";

  //   const paymentCCAvenue = () => {
  //     let paymentData = {
  //         merchant_id: '315511', // Merchant ID (Required)
  //         order_id: "ORD123", // Order ID - It can be generated from our project
  //         amount: "1", // Payment Amount (Required)
  //         currency: "INR", // Payment Currency Type (Required)
  //         billing_email: "johndoe@gmail.com", // Billing Email (Optional)
  //         billing_name: "John Doe", // Billing Name (Optional)
  //         billing_address: "Address Details", // Billing Address (Optional)
  //         billing_city: "Ahmedabad", // Billing City (Optional)
  //         billing_state: "Gujarat", // Billing State (Optional)
  //         billing_zip: "380002", // Billing Zip (Optional)
  //         billing_country: "India", // Billing COuntry (Optional)
  //         redirect_url: `${host}/api/ccavenue-handle`, // Success URL (Required)
  //         cancel_url: `${host}/api/ccavenue-handle`, // Failed/Cancel Payment URL (Required)
  //         merchant_param1: "Extra Information", // Extra Information (Optional)
  //         merchant_param2: "Extra Information", // Extra Information (Optional)
  //         merchant_param3: "Extra Information", // Extra Information (Optional)
  //         merchant_param4: "Extra Information", // Extra Information (Optional)
  //         language: 'EN', // Language (Optional)
  //         billing_tel: "1234567890" // Billing Mobile Number (Optional)
  //     }

  //     let encReq = CCAvenue.getEncryptedOrder(paymentData);
  //     let accessCode = "AVEV05LC59AW38VEWA";
  //     let URL = `https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${paymentData.merchant_id}6&encRequest=${encReq}&access_code=${accessCode}`;
  //     router.push(URL);
  // }

  const paymentCCAvenue = () => {
    const host =
      "https://6717-2401-4900-8827-46ca-44b5-b29b-478b-2627.ngrok-free.app";

    let paymentData = {
      merchant_id: "315511", // Merchant ID (Required)
      order_id: "ORD123", // Order ID - It can be generated from our project
      amount: "1", // Payment Amount (Required)
      currency: "INR", // Payment Currency Type (Required)
      billing_email: "johndoe@gmail.com", // Billing Email (Optional)
      billing_name: "John Doe", // Billing Name (Optional)
      billing_address: "Address Details",
      billing_city: "Coimbatore", // Billing City (Optional)
      billing_state: "Tamilnadu", // Billing State (Optional)
      billing_zip: "641038", // Billing Zip (Optional)
      billing_country: "India", // Billing COuntry (Optional)
      redirect_url: `${host}/api/ccavenue-handle1`, // Success URL (Required)
      cancel_url: `${host}/api/ccavenue-handle`, // Cancel URL
      merchant_param1: "Extra Information", // Extra Information (Optional)
      merchant_param2: "Extra Information", // Extra Information (Optional)
      merchant_param3: "", // Extra Information (Optional)
      merchant_param4: "", // Extra Information (Optional)
      merchant_param5: "", // Extra Information (Optional)
      // language: 'EN', // Language (Optional)
      billing_tel: "1234567890", // Billing Mobile Number (Optional)
      // sub_account_id: subaccid,
    };

    console.log("paymentData", paymentData);
    let encReq = CCAvenue.getEncryptedOrder(paymentData);
    // const encRequest = encrypt(paymentData, WORKING_KEY);
    let accessCode = "AVGO93LF57AY79OGYA";

    let URL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${paymentData.merchant_id}&encRequest=${encReq}&access_code=${accessCode}`;

    console.log("URL", URL);

    // window.location.href = URL;
    router.push(URL);

    //   if (Amount == undefined || Amount == null || Amount == '' || Amount == 0) {
    //     messageApi.open({
    //         type: 'error',
    //         content: 'Select Chit Amount',
    //     });
    // } else {
    //     router.push(URL);
    // }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    captcha: Yup.string().required("Captcha is required"),
  });

  const handleCustomizedProduct = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      if (parseInt(formData.captcha) !== correctCaptchaAnswer) {
        setError("Captcha is incorrect. Please try again.");
        setSuccess("");
        return;
      }

      const bodyData = {
        name: formData.name,
        email: formData.email,
        productName: formData.productName,
        sku: formData.sku,
        message: formData.message,
      };

      setSuccess("Form submitted successfully!");
      setError("");

      setFormData({
        name: "",
        email: "",
        productName: productItem?.name || "",
        sku: productItem?.defaultVariant?.sku || "",
        message: "",
        captcha: "",
      });
    } catch (err) {
      if (err.inner) {
        const allErrors = err.inner.map((e) => e.message).join(" ");
        setError(allErrors);
      } else {
        setError(err.message);
      }
      setSuccess("");
    }
  };

  return (
    <div className="tp-product-details-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <ProductDetailsBreadcrumb
            category={pageTitle}
            title={productItem?.name}
            parentSlug={parentSlug}
          />
        </div>

        {router?.route == "/gift-card" ? (
          <></>
        ) : (
          <div style={{ paddingRight: "10px", display: "flex" }}>
            {productItem?.previousProduct !== null ? (
              <div
                style={{ position: "relative" }}
                onMouseEnter={PreviousMouseEnter}
                onMouseLeave={PreviousMouseLeave}
              >
                <LeftOutlined
                  style={{
                    color: "gray",
                    paddingRight: "5px",
                    cursor: "pointer",
                  }}
                  onClick={PreviousProductClick}
                  onMouseEnter={PreviousMouseEnter}
                  onMouseLeave={PreviousMouseLeave}
                />
                {previousHovered && (
                  <div
                    style={{
                      position: "absolute",
                      top: "25",
                      right: "-35px",
                      background: "white",
                      padding: "0 5px 0 0",
                      width: "250px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ paddingRight: "10px", width: "50%" }}>
                        {/* <Image
                        style={{ width: "100%" }}
                        height={100}
                        width={100}
                        src={profilePic(previousProduct?.thumbnail?.url)}
                      /> */}
                        {isImage(
                          profilePic(previousProduct?.thumbnail?.url)
                        ) ? (
                          <img
                            style={{ width: "100%" }}
                            height={100}
                            width={100}
                            src={profilePic(previousProduct?.thumbnail?.url)}
                          />
                        ) : (
                          <video
                            style={{ width: "100%" }}
                            height={100}
                            width={100}
                            src={previousProduct?.thumbnail?.url}
                            muted
                            loop
                          />
                        )}
                        {/* <img
                          style={{ width: "100%" }}
                          height={100}
                          width={100}
                          src={profilePic(previousProduct?.thumbnail?.url)}
                        /> */}
                      </div>
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <p style={{ color: "gray", marginBottom: "0px" }}>
                            {previousProduct?.name}
                          </p>
                          <p
                            style={{
                              color: "rgb(195,147,91)",
                              marginBottom: "0px",
                            }}
                          >
                            {channel === "india-channel"
                              ? `₹${previousProduct?.pricing?.priceRange?.start?.gross?.amount}`
                              : `$${previousProduct?.pricing?.priceRange?.start?.gross?.amount}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <LeftOutlined
                  style={{
                    color: "gray",
                    paddingRight: "5px",
                    cursor: "pointer",
                  }}
                />
              </div>
            )}

            <div>
              <Tooltip title="Back to product">
                <Link href="/shop">
                  <AppstoreOutlined
                    style={{ color: "gray", paddingRight: "5px" }}
                  />
                </Link>
              </Tooltip>
            </div>
            {productItem?.nextProduct !== null ? (
              <div
                style={{ position: "relative" }}
                onMouseEnter={NextMouseEnter}
                onMouseLeave={NextMouseLeave}
              >
                <RightOutlined
                  style={{
                    color: "gray",
                    paddingRight: "5px",
                    cursor: "pointer",
                  }}
                  onClick={NextProductClick}
                  onMouseEnter={NextMouseEnter}
                  onMouseLeave={NextMouseLeave}
                />{" "}
                {nextHovered && (
                  <div
                    style={{
                      position: "absolute",
                      top: "25",
                      right: "0px",
                      background: "white",
                      padding: "0 10px 0 0",
                      width: "250px",
                    }}
                    onMouseEnter={NextMouseEnter}
                    onMouseLeave={NextMouseLeave}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ paddingRight: "10px", width: "50%" }}>
                        {/* <Image
                      style={{ width: "100%" }}
                      width={100}
                      height={100}
                      src={profilePic(nextProduct?.thumbnail?.url)}
                    /> */}
                        {isImage(profilePic(nextProduct?.thumbnail?.url)) ? (
                          <img
                            style={{ width: "100%" }}
                            width={100}
                            height={100}
                            src={profilePic(nextProduct?.thumbnail?.url)}
                          />
                        ) : (
                          <video
                            width={100}
                            height={100}
                            src={nextProduct?.thumbnail?.url}
                            muted
                            loop
                          />
                        )}
                        {/*                         
                        <img
                          style={{ width: "100%" }}
                          width={100}
                          height={100}
                          src={profilePic(nextProduct?.thumbnail?.url)}
                        /> */}
                      </div>
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div>
                          <p style={{ color: "gray", marginBottom: "0px" }}>
                            {nextProduct?.name}
                          </p>
                          <p
                            style={{
                              color: "rgb(195,147,91)",
                              marginBottom: "0px",
                            }}
                          >
                            {channel === "india-channel"
                              ? `₹${nextProduct?.pricing?.priceRange?.start?.gross?.amount}`
                              : `$${nextProduct?.pricing?.priceRange?.start?.gross?.amount}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <RightOutlined
                  style={{
                    color: "gray",
                    paddingRight: "5px",
                    cursor: "pointer",
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {/* <div className="tp-product-details-category">
        <span>
          {capitalizeFLetter(
            productItem?.category?.name || productItem?.node?.category?.name
          )}
        </span>
      </div> */}
      <h3 className="tp-product-details-title">
        {capitalizeFLetter(productItem?.name || productItem?.node?.name)}
      </h3>
      <div className="is-divider small"></div>
      {/* price */}
      <div
        className="tp-product-details-price-wrapper"
        style={{ paddingBottom: "15px" }}
      >
        {channel == "india-channel" ? (
          <div className="tp-product-price-wrapper-2">
            {productItem?.variants?.length <= 1 &&
              RegularPrice(
                productItem?.defaultVariant?.costPrice,
                productItem?.pricing?.priceRange?.start?.gross?.amount
              ) && (
                <span
                  className="pr-5"
                  style={{ textDecoration: "line-through", color: "gray" }}
                >
                  {variantDetails ? (
                    <>
                      &#8377;
                      {addCommasToNumber(
                        variantDetails?.pricing?.price?.gross?.amount
                      ) || 0}
                    </>
                  ) : (
                    <>
                      &#8377;
                      {addCommasToNumber(
                        productItem?.defaultVariant?.costPrice
                      ) || 0}
                    </>
                  )}
                </span>
              )}
            <span
              className="tp-product-price-2 new-price"
              style={{ fontSize: "22px", fontWeight: "500" }}
            >
              <>
                {/* For normal product */}
                {isGiftCard || productItem?.variants?.length > 1 ? (
                  <>
                    &#8377;{addCommasToNumber(minAmount)} - &#8377;
                    {addCommasToNumber(maxAmount)}
                  </>
                ) : (
                  <>
                    &#8377;
                    {addCommasToNumber(
                      productItem?.pricing?.priceRange?.start?.gross?.amount ||
                        productItem?.node?.pricing?.priceRange?.start?.gross
                          ?.amount
                    ) || 0}
                  </>
                )}
              </>
            </span>
          </div>
        ) : (
          // <div className="tp-product-price-wrapper-2">
          //   {RegularPrice(
          //     productItem?.defaultVariant?.costPrice,
          //     productItem?.pricing?.priceRange?.start?.gross?.amount
          //   ) && (
          //     <span
          //       className="pr-5"
          //       style={{ textDecoration: "line-through", color: "gray" }}
          //     >
          //       {variantDetails ? (
          //         <>
          //           {"$"} {variantDetails?.pricing?.price?.gross?.amount}
          //         </>
          //       ) : (
          //         <>
          //           {"$"}
          //           {roundOff(productItem?.defaultVariant?.costPrice)}
          //         </>
          //       )}
          //     </span>
          //   )}
          //   <span
          //     className="tp-product-price-2 new-price"
          //     style={{ fontSize: "22px", fontWeight: "500" }}
          //   >
          //     {variantDetails ? (
          //       <>
          //         {"$"}
          //         {variantDetails?.pricing?.price?.gross?.amount}
          //       </>
          //     ) : (
          //       <>
          //         {"$"}
          //         {roundOff(
          //           productItem?.pricing?.priceRange?.start?.gross?.amount ||
          //             productItem?.node?.pricing?.priceRange?.start?.gross
          //               ?.amount
          //         )}
          //       </>
          //     )}
          //   </span>
          // </div>
          <div className="tp-product-price-wrapper-2">
            {productItem?.variants?.length <= 1 &&
              RegularPrice(
                productItem?.defaultVariant?.costPrice,
                productItem?.pricing?.priceRange?.start?.gross?.amount
              ) && (
                <span
                  className="pr-5"
                  style={{ textDecoration: "line-through", color: "gray" }}
                >
                  {variantDetails ? (
                    <>
                      {"$"}
                      {addCommasToNumber(
                        variantDetails?.pricing?.price?.gross?.amount
                      ) || 0}
                    </>
                  ) : (
                    <>
                      {"$"}
                      {addCommasToNumber(
                        productItem?.defaultVariant?.costPrice
                      ) || 0}
                    </>
                  )}
                </span>
              )}
            <span
              className="tp-product-price-2 new-price"
              style={{ fontSize: "22px", fontWeight: "500" }}
            >
              <>
                {/* For normal product */}
                {isGiftCard || productItem?.variants?.length > 1 ? (
                  <>
                    {"$"}
                    {addCommasToNumber(minAmount)} - {"$"}
                    {addCommasToNumber(maxAmount)}
                  </>
                ) : (
                  <>
                    {"$"}
                    {addCommasToNumber(
                      productItem?.pricing?.priceRange?.start?.gross?.amount ||
                        productItem?.node?.pricing?.priceRange?.start?.gross
                          ?.amount
                    ) || 0}
                  </>
                )}
              </>
            </span>
          </div>
        )}
      </div>

      {/* variations */}
      {imageURLs?.some((item) => item?.color && item?.color?.name) && (
        <div className="tp-product-details-variation">
          <div className="tp-product-details-variation-item">
            <h4 className="tp-product-details-variation-title">Color :</h4>
            <div className="tp-product-details-variation-list">
              {imageURLs?.map((item, i) => (
                <button
                  onClick={() => handleImageActive(item)}
                  key={i}
                  type="button"
                  className={`color tp-color-variation-btn ${
                    item.img === activeImg ? "active" : ""
                  }`}
                >
                  <span
                    data-bg-color={`${item?.color?.clrCode}`}
                    style={{ backgroundColor: `${item.color.clrCode}` }}
                  ></span>
                  {item?.color && item?.color.name && (
                    <span className="tp-color-variation-tootltip">
                      {item.color.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* <p style={{ color: "gray" }}>
        Note : The stones we use are either natural or glass stones, the
        imperfections found on them are natural and inevitable. These
        imperfections add characteristics to the stones making it distinct and
        unique.
      </p> */}
      <div className="w-full row">
        {productItem?.variants?.length > 1 && (
          <>
            <div
              className="text-bold text-lg gap-3"
              style={{
                alignItems: variantId ? "end" : "center",
                fontSize: "16px",
                color: "black",
                display: "flex",
                paddingBottom: "10px",
                borderBottom: "1px dashed #ddd",
                marginBottom: "10px",
              }}
            >
              <div>
                {isGiftCard ? (
                  <span>Select Amount:</span>
                ) : (
                  <span>Select Variant:</span>
                )}
              </div>
              <div style={{ textAlign: "end" }}>
                {variantId && variantDetails && (
                  <div className="">
                    <button
                      style={{ fontSize: "14px", color: "grey" }}
                      onClick={() => {
                        setVariantId("");
                        setVariantDetails("");
                      }}
                    >
                      Clear
                    </button>
                  </div>
                )}
                <select
                  name="country"
                  id="country"
                  value={variantId}
                  className="nice-select"
                  onChange={(e) => {
                    variantsChange(e);
                  }}
                >
                  {isGiftCard ? (
                    <option>Select Amount:</option>
                  ) : (
                    <option value="">Select Variant</option>
                  )}
                  {productItem?.variants?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {variantDetails && (
              <span
                className="tp-product-price-2 new-price "
                style={{
                  fontSize: "22px",
                  fontWeight: "500",
                  paddingBottom: "10px",
                }}
              >
                <>
                  {/* giftwrap changed price product */}
                  {checkChannel() === "india-channel" ? (
                    <>
                      &#8377;{" "}
                      {addCommasToNumber(
                        variantDetails?.pricing?.price?.gross?.amount
                      ) || 0}
                    </>
                  ) : (
                    <>
                      $
                      {addCommasToNumber(
                        variantDetails?.pricing?.price?.gross?.amount
                      ) || 0}
                    </>
                  )}
                </>
              </span>
            )}
          </>
        )}
      </div>

      {/* {productItem?.variants?.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          {productItem?.variants?.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setVariantId(item?.id);
                setIndex(i);
              }}
              type="button"
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 10,
                borderStyle: "solid",
                borderRadius: 10,
                backgroundColor: index == i ? "black" : "white",
                color: index == i ? "white" : "black",
              }}
            >
              {item?.name}
            </button>
          ))}
        </div>
      )} */}
      {productItem?.pricing?.discount !== null && (
        <div
          style={{
            color: "#b4633a",
            fontSize: "16px",
            paddingBottom: "10px",
          }}
        >{`Save ${saveOff()}% OFF`}</div>
      )}

      <div>
        <p style={{ fontSize: "16px", color: "black" }}>
          {/* {variantDetails ? (
            <>
              {variantDetails?.quantityAvailable == 0
                ? ""
                : variantDetails?.quantityAvailable}
            </>
          ) : (
            <>
              {productItem?.defaultVariant?.quantityAvailable == 0
                ? ""
                : productItem?.defaultVariant?.quantityAvailable}
            </>
          )}
          {""}{" "} */}
          {variantDetails?.quantityAvailable == 0 ||
          productItem?.defaultVariant?.quantityAvailable == 0 ? (
            <span style={{ color: "red", fontWeight: "500" }}>
              Out of Stock
            </span>
          ) : (
            <span>In Stock</span>
          )}
        </p>
      </div>
      {productItem?.metadata?.length > 0 && (
        <p style={{ color: "black" }}>
          {
            productItem?.metadata?.find(
              (item) => item.key === "short_description"
            )?.value
          }
        </p>
      )}
      {productItem?.defaultVariant?.quantityAvailable != 0 && (
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          <div className="tp-product-details-add-to-cart">
            <button
              onClick={() => {
                // if (isAddedToCart) {
                //   dispatch(handleModalClose());
                //   router.push("/cart");
                // } else {
                addToCartProductINR();
                addToCartProductUSD();
                // }
              }}
              disabled={status === "out-of-stock"}
              className={`tp-btn tp-btn-border`}
            >
              {cartLoader ? (
                <ButtonLoader loader={cartLoader} />
              ) : (
                <>{"Add To Cart"}</>
              )}
            </button>
          </div>
        </div>
      )}
      <div className="pt-2 pb-3">
        <button
          onClick={() => setIsModelOpen(true)}
          className="btn text-white"
          style={{ backgroundColor: "#c18a3d" }}
        >
          SIZE CHART
        </button>
      </div>

      {/* <button
        onClick={() => paymentCCAvenue()}
        className="btn text-white"
        style={{ backgroundColor: "#c18a3d" }}
      >
        PAY
      </button> */}
      {productItem?.priceBreakup && (
        <PriceBreakup data={productItem?.priceBreakup?.breakupDetails} />
      )}
      
      <PincodeChecker />

      {/* product-details-action-sm start */}

      {router?.route !== "/gift-card" && (
        <div
          className="tp-product-details-action-sm"
          style={{
            paddingTop: "20px",
          }}
        >
          <button
            disabled={status === "out-of-stock"}
            onClick={() => {
              if (compareList?.some((prd) => prd?.id === productItem?.id)) {
                dispatch(handleModalClose());
                router.push("/compare");
              } else {
                handleCompareProduct(productItem);
              }
            }}
            // onClick={() => handleCompareProduct(productItem)}
            type="button"
            className="tp-product-details-action-sm-btn"
          >
            <CompareTwo />
            {compareList?.some((prd) => prd?.id === productItem?.id)
              ? " View Compare"
              : " Add  Compare"}
          </button>
          {}

          {isAddedToWishlist === true ? (
            <button
              disabled={status === "out-of-stock"}
              onClick={() => {
                if (token) {
                  router.push("/wishlist");
                } else {
                  notifyError(
                    "Only logged-in users can add items to their wishlist or view it"
                  );
                }
                // router.push("/wishlist");
              }}
              // onClick={() => handleWishlistProduct(productItem)}
              type="button"
              className="tp-product-details-action-sm-btn"
            >
              <WishlistTwo />
              View Wishlist
            </button>
          ) : (
            <button
              disabled={status === "out-of-stock"}
              onClick={() => handleWishlist(productItem)}
              // onClick={() => handleWishlistProduct(productItem)}
              type="button"
              className="tp-product-details-action-sm-btn"
            >
              <WishlistTwo />
              {wishlistLoader ? "Loading..." : "Add To Wishlist"}
            </button>
          )}

          {/* <button type="button" className="tp-product-details-action-sm-btn">
      <AskQuestion />
      Ask a question
    </button> */}
        </div>
      )}

      {/* product-details-action-sm end */}

      {/* dESCRIPTION */}

      {router?.route == "/gift-card" ? (
        <div className="pt-20 pb-20" style={{ fontSize: "16px" }}>
          {
            productItem?.metadata?.filter(
              (item) => item.key === "description"
            )?.[0]?.value
          }
          {variantDetails && (
            <div style={{ borderBottom: "1px dashed #d3d1d1" }}>
              <div style={{ paddingBottom: "5px" }}>
                You will get following coupon(s) when you buy this item:{" "}
              </div>

              <div
                className="tp-product-details-price-wrapper"
                style={{ paddingBottom: "20px" }}
              >
                {channel == "india-channel" ? (
                  <div className="tp-product-price-wrapper-2">
                    {RegularPrice(
                      productItem?.defaultVariant?.costPrice,
                      productItem?.pricing?.priceRange?.start?.gross?.amount
                    ) && (
                      <span
                        className="pr-5"
                        style={{
                          textDecoration: "line-through",
                          color: "gray",
                        }}
                      >
                        {variantDetails ? (
                          <>
                            &#8377;
                            {addCommasToNumber(
                              variantDetails?.pricing?.price?.gross?.amount
                            )}
                          </>
                        ) : (
                          <>
                            &#8377;
                            {addCommasToNumber(
                              productItem?.defaultVariant?.costPrice
                            )}
                          </>
                        )}
                      </span>
                    )}
                    <p style={{ color: "grey", marginBottom: "0px" }}>
                      {variantDetails ? (
                        <>
                          E-Gift Vouchure of{" "}
                          <span
                            style={{ fontWeight: "bold", paddingLeft: "3px" }}
                          >
                            &#8377;
                            {addCommasToNumber(
                              variantDetails?.pricing?.price?.gross?.amount
                            )}
                          </span>
                        </>
                      ) : (
                        <>
                          E-Gift Vouchure of{" "}
                          <span
                            style={{ fontWeight: "bold", paddingLeft: "3px" }}
                          >
                            {" "}
                            &#8377;
                            {addCommasToNumber(
                              productItem?.pricing?.priceRange?.start?.gross
                                ?.amount ||
                                productItem?.node?.pricing?.priceRange?.start
                                  ?.gross?.amount
                            )}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="tp-product-price-wrapper-2">
                    {RegularPrice(
                      productItem?.defaultVariant?.costPrice,
                      productItem?.pricing?.priceRange?.start?.gross?.amount
                    ) && (
                      <span
                        className="pr-5"
                        style={{
                          textDecoration: "line-through",
                          color: "gray",
                        }}
                      >
                        {variantDetails ? (
                          <>
                            E-Gift Vouchure of{" "}
                            <span
                              style={{ fontWeight: "bold", paddingLeft: "3px" }}
                            >
                              {"$"}{" "}
                              {addCommasToNumber(
                                variantDetails?.pricing?.price?.gross?.amount
                              )}
                            </span>
                          </>
                        ) : (
                          <>
                            E-Gift Vouchure of{" "}
                            <span
                              style={{ fontWeight: "bold", paddingLeft: "3px" }}
                            >
                              {"$"}
                              {addCommasToNumber(
                                productItem?.defaultVariant?.costPrice
                              )}
                            </span>
                          </>
                        )}
                      </span>
                    )}
                    <p style={{ color: "grey", marginBottom: "0px" }}>
                      {variantDetails ? (
                        <>
                          {"$"}
                          {addCommasToNumber(
                            variantDetails?.pricing?.price?.gross?.amount
                          )}
                        </>
                      ) : (
                        <>
                          {"$"}
                          {addCommasToNumber(
                            productItem?.pricing?.priceRange?.start?.gross
                              ?.amount ||
                              productItem?.node?.pricing?.priceRange?.start
                                ?.gross?.amount
                          )}
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
              {productItem?.tags?.length > 0 && (
                <p style={{ color: "#55585b" }}>
                  <b>Tags:</b>{" "}
                  {productItem?.tags?.map((tag, index) => {
                    return (
                      <span
                        key={tag?.id}
                        style={{ marginRight: "3px", cursor: "pointer" }}
                        onClick={() => {
                          router.push({
                            pathname: "/shop",
                            query: { tag: tag?.id }, // Your parameters
                          });
                        }}
                      >
                        {tag?.name}
                        {index < productItem.tags.length - 1 ? ", " : ""}
                      </span>
                    );
                  })}
                </p>
              )}
            </div>
          )}
          <div>
            <p
              style={{
                color: "#55585b",
                marginBottom: "0px",
                borderBottom: "1px dashed  #d3d1d1",
                padding: "5px 0px",
              }}
            >
              <b>SKU:</b>{" "}
              {variantDetails
                ? variantDetails?.sku
                : productItem?.defaultVariant?.sku}
            </p>
            {productItem?.category?.length > 0 && (
              <p style={{ color: "#55585b" }}>
                <b>Category:</b>{" "}
                {productItem?.category?.map((category, index) => {
                  return (
                    <span
                      key={category?.id}
                      style={{ marginRight: "3px" }}
                      // onClick={() => {
                      //   router.push({
                      //     pathname: "/shop",
                      //     query: { category: category?.slug }, // Your parameters
                      //   });
                      // }}
                    >
                      {category?.name}
                      {index < productItem.category.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              borderBottom: "1px solid #EAEBED",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onClick={() => toggleVisibility("description")}
            >
              <div
                className={`${visibility?.description ? "theme-color" : ""}`}
              >
                MAINTENENCE TIPS
              </div>{" "}
              <div>{visibility.description ? "▲" : "▼"}</div>{" "}
              {/* Toggle arrow up/down based on content visibility */}
            </div>
            {visibility?.description && (
              <>
                {JSON.parse(productItem?.description)?.blocks?.map((block) => {
                  return (
                    <>
                      <div style={{ marginTop: "10px" }}>
                        <div>
                          {block?.type === "header" && (
                            <h5 style={{ fontWeight: "400" }}>
                              {block?.data?.text}
                            </h5>
                          )}
                        </div>

                        <div key={block.id}>
                          {block.type === "paragraph" && (
                            <p style={{ color: "gray", marginBottom: "5px" }}>
                              {block.data.text && (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: block.data.text.includes("<b>")
                                      ? `<b>${block.data.text}</b>`
                                      : block.data.text,
                                  }}
                                />
                              )}
                            </p>
                          )}
                        </div>

                        <div key={block.id} style={{ paddingLeft: "20px" }}>
                          {block.type === "list" && (
                            <ul>
                              {
                                block.data.items &&
                                  block?.data?.items.map((item) => (
                                    <li
                                      style={{ color: "gray" }}
                                      dangerouslySetInnerHTML={{
                                        __html: item.includes("<b>")
                                          ? `<b>${item}</b>`
                                          : item,
                                      }}
                                    ></li>
                                  ))
                                // <li style={{ color: "gray", fontWeight: "bold" }}
                                //   dangerouslySetInnerHTML={{
                                //     __html: block.data.text.includes("<b>")
                                //       ? block.data.text
                                //       : `<b>${block.data.text}</b>`,
                                //   }}
                                // ></li>
                              }
                            </ul>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
                {/* {
                  <div className="pt-10">
                    {
                      productItem?.metadata?.filter(
                        (item) => item.key === "description"
                      )?.[0]?.value
                    }
                  </div>
                } */}
              </>
            )}
          </div>
          {attributeValue === true && (
            <div
              style={{
                borderBottom: "1px solid #EAEBED",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => toggleVisibility("additionalInfo")}
              >
                <div
                  className={`${
                    visibility?.additionalInfo ? "theme-color" : ""
                  }`}
                >
                  ADDITIONAL INFORMATION
                </div>{" "}
                <div>{visibility?.additionalInfo ? "▲" : "▼"}</div>{" "}
                {/* Toggle arrow up/down based on content visibility */}
              </div>
              {visibility.additionalInfo && (
                <div
                  style={{
                    paddingTop: "10px",
                    height:
                      productItem?.attributes?.length > 8 ? "300px" : "auto",
                    overflowY: productItem?.attributes?.length > 8 && "auto",
                  }}
                >
                  <table className="table">
                    {/* <thead>
                      <tr>
                        <th className="th">Attribute</th>
                        <th className="th">Values</th>
                      </tr>
                    </thead> */}
                    <tbody>
                      {productItem?.attributes?.map(
                        (attribute) =>
                          attribute?.values?.length > 0 && (
                            <tr className="tr" key={attribute?.id}>
                              <td className="td">
                                {attribute?.attribute?.name}
                              </td>
                              <td className="td">
                                {attribute?.values
                                  ?.map((value) => value?.name)
                                  .join(", ")}
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          <div
            style={{
              borderBottom: "1px solid #EAEBED",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer", // Add cursor pointer to indicate it's clickable
              }}
              onClick={() => toggleVisibility("shipping")}
            >
              <div
                className={`${visibility.shipping ? "theme-color" : ""}`}
                style={{ fontSize: "14px" }}
              >
                SHIPPING & DELIVERY
              </div>{" "}
              <div>{visibility.shipping ? "▲" : "▼"}</div>{" "}
              {/* Toggle arrow up/down based on content visibility */}
            </div>
            {visibility.shipping && (
              <div
                style={{
                  paddingTop: "10px",
                  height: "300px",
                  overflowY: "scroll",
                }}
              >
                <h5 style={{ fontWeight: "400" }}>Cancellation Policy:</h5>
                <p style={{ color: "#55585b" }}>
                  If you wish to cancel your order, we shall provide you with an
                  option to replace the ordered product with another product. In
                  no manner shall we provide any refund of the ordered product.
                </p>
                <p style={{ color: "#55585b" }}>
                  In the case where your order gets cancelled from our end for
                  some reason, we shall notify you about the same. We will also
                  take all efforts to refund the amount paid by yourself to your
                  original payment method within 2 working days.
                </p>
                <h5 style={{ fontWeight: "400" }}>Return & Exchange Policy:</h5>
                <p style={{ color: "#55585b" }}>
                  {" "}
                  &#129174;Shipping charges are not refundable.
                </p>

                <p style={{ color: "#55585b" }}>
                  {" "}
                  &#129174; The brand has put the utmost effort in showcasing
                  the products as realistic as possible with the colour,
                  appearance etc. Please note that the colour of the jewellery
                  might slightly vary in person, any return/ exchange on these
                  criteria will not be accepted.
                </p>
                <p style={{ color: "#55585b" }}>
                  {" "}
                  &#129174; We at PraDe believe in providing fair trade to our
                  artisans and hence selected products shall not be eligible for
                  returns.
                </p>
              </div>
            )}
          </div>

          {/* <div
        style={{
          borderBottom: "1px solid #EAEBED",
          paddingBottom: "25px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer", 
          }}
          onClick={() => toggleVisibility("maintenance")}
        >
          <div
            className={`${visibility.maintenance ? "theme-color" : ""}`}
            style={{ fontSize: "14px" }}
          >
            MAINTENENCE TIPS
          </div>{" "}
          <div>{visibility.maintenance ? "▲" : "▼"}</div>{" "}
        </div>
        {visibility.maintenance && (
          <div style={{ paddingTop: "20px" }}>
            <h5 style={{ fontWeight: "400" }}>MAECENAS IACULIS</h5>
            <p style={{ color: "#55585b" }}>
              Vestibulum curae torquent diam diam commodo parturient penatibus
              nunc dui adipiscing convallis bulum parturient suspendisse
              parturient a.Parturient in parturient scelerisque nibh lectus quam
              a natoque adipiscing a vestibulum hendrerit et pharetra fames nunc
              natoque dui.
            </p>
            <h5 style={{ fontWeight: "400" }}>ADIPISCING CONVALLIS BULUM</h5>
            <p style={{ color: "#55585b" }}>
              {" "}
              &#129174; Vestibulum penatibus nunc dui adipiscing convallis bulum
              parturient suspendisse.
            </p>

            <p style={{ color: "#55585b" }}>
              {" "}
              &#129174; Abitur parturient praesent lectus quam a natoque
              adipiscing a vestibulum hendre.
            </p>
            <p style={{ color: "#55585b" }}>
              {" "}
              &#129174; Diam parturient dictumst parturient scelerisque nibh
              lectus.
            </p>

            <p style={{ color: "#55585b" }}>
              Scelerisque adipiscing bibendum sem vestibulum et in a a a purus
              lectus faucibus lobortis tincidunt purus lectus nisl class
              eros.Condimentum a et ullamcorper dictumst mus et tristique
              elementum nam inceptos hac parturient scelerisque vestibulum amet
              elit ut volutpat.
            </p>
          </div>
        )}
      </div> */}

          <div>
            <p style={{ color: "#55585b" }}>
              <b>SKU:</b>{" "}
              {variantDetails
                ? variantDetails?.sku
                : productItem?.defaultVariant?.sku}
            </p>
            {productItem?.category?.length > 0 && (
              <p style={{ color: "#55585b", cursor: "pointer" }}>
                <b>Categories:</b>{" "}
                {productItem?.category?.map((category, index) => {
                  return (
                    <span
                      key={category?.id}
                      style={{ marginRight: "3px", cursor: "pointer" }}
                      onClick={() => {
                        router.push({
                          pathname: "/shop",
                          query: { category: category?.slug }, // Your parameters
                        });
                      }}
                    >
                      {category?.name}
                      {index < productItem.category.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </p>
            )}
            {productItem?.tags?.length > 0 && (
              <p style={{ color: "#55585b" }}>
                <b>Tags:</b>{" "}
                {productItem?.tags?.map((tag, index) => {
                  return (
                    <span
                      key={tag?.id}
                      style={{ marginRight: "3px", cursor: "pointer" }}
                      onClick={() => {
                        router.push({
                          pathname: "/shop",
                          query: { tag: tag?.id }, // Your parameters
                        });
                      }}
                    >
                      {tag?.name}
                      {index < productItem.tags.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </p>
            )}
          </div>
        </>
      )}

      {/* if ProductDetailsCountdown true start */}
      {offerDate?.endDate && (
        <ProductDetailsCountdown offerExpiryTime={offerDate?.endDate} />
      )}
      {/* if ProductDetailsCountdown true end */}

      {/* actions */}
      <div className="tp-product-details-action-wrapper">
        {/* <h3 className="tp-product-details-action-title">Quantity</h3> */}
        {/* <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
         
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() => {
                if (isAddedToCart) {
                  dispatch(handleModalClose());
                  router.push("/cart");
                } else {
                  handleAddProduct(productItem);
                }
              }}
              disabled={status === "out-of-stock"}
              className="tp-product-details-add-to-cart-btn w-100"
            >
              {isAddedToCart ? "View Cart" : "Add To Cart"}
            </button>
          </div>
        </div> */}
        {/* <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
          <button className="tp-btn tp-btn-border ">SHARE THIS PAGE</button>
        </Link> */}

        <div>
          <RWebShare
            data={{
              text: productItem.name,
              url: window.location.href,
              title: "PraDe",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <button className="tp-btn tp-btn-border ">SHARE THIS PAGE</button>
          </RWebShare>
        </div>
      </div>

      <div
        className="text-uppercase text-decordation color:#b4633a cursor-pointer"
        onClick={() => setIsProductModelOpen(true)}
      >
        To Customize Product
      </div>

      {detailsBottom && (
        <DetailsBottomInfo category={category?.name} sku={sku} tag={tags[0]} />
      )}

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModelOpen(false)}
        style={customStyles}
        contentLabel="Product Modal"
        ariaHideApp={false} // optional: disables appElement warning
      >
        <div className="tp-product-modal">
          <div className="tp-product-modal-content d-lg-flex flex-column gap-4">
            <button
              onClick={() => setIsModelOpen(false)}
              type="button"
              className="btn btn-sm btn-danger align-self-end"
            >
              ✕ Close
            </button>

            {/* Product Image */}
            <div className="text-center">
              <img
                src={productItem?.sizeGuide?.sizeimg} // replace with your image path
                alt="Product"
                width={400}
                height={300}
                className="img-fluid rounded"
              />
            </div>

            {/* Table */}
            <div
              className="table-responsive-1 mb-3"
              dangerouslySetInnerHTML={{ __html: cleanHTML(productItem?.sizeGuide?.sizedetail) }}
            />
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={isProductModalOpen}
        onRequestClose={() => setIsProductModelOpen(false)}
        style={customStyles}
        contentLabel="Product Modal"
        ariaHideApp={false} // optional: disables appElement warning
      >
        <div className="tp-product-modal">
          <div className="tp-product-modal-content d-lg-flex flex-column gap-4">
            <button
              onClick={() => setIsProductModelOpen(false)}
              type="button"
              className="btn btn-sm btn-danger align-self-end"
            >
              ✕
            </button>

            <div className="container mt-5">
              <form onSubmit={handleCustomizedProduct} className="p-4 rounded">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      value={productItem?.name}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">SKU</label>
                    <input
                      type="text"
                      name="sku"
                      className="form-control"
                      value={productItem?.defaultVariant?.sku}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Your Message (optional)</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Captcha (Enter Sum)</label>
                  <div className="d-flex align-items-center">
                    <span className="me-2" style={{ flex: 1 }}>
                      5 - 2?
                    </span>
                    <input
                      type="number"
                      name="captcha"
                      className="form-control"
                      value={formData.captcha}
                      onChange={handleChange}
                      required
                      style={{ flex: 6 }}
                    />
                  </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}

                <button type="submit" className="tp-btn tp-btn-border mt-4">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default DetailsWrapper;
