import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { AskQuestion, CompareTwo, Wishlist, WishlistTwo } from "@/svg";
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
  ReadMore,
  RegularPrice,
  capitalizeFLetter,
  checkChannel,
  generateCaptcha,
  limitChar,
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
  useCreateCustomerProductMutation,
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
  HeartFilled,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { cleanHTML, customStyles, profilePic } from "@/utils/constant";
import { RWebShare } from "react-web-share";
import PincodeChecker from "../pincode_checker/pincodeChecker";
import PriceBreakup from "../price_breakup/priceBreakUp";
import ReactModal from "react-modal";
import CCAvenue from "@/utils/CCAvenue";
import * as Yup from "yup";
import WishlistFill from "@/svg/WishListFill";

const DetailsWrapper1 = ({
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
  const [captcha, setCaptcha] = useState(generateCaptcha());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productName: "",
    sku: "",
    message: "",
    captcha: "",
  });
  const [userInfo, setUserInfo] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [attributeList, setAttributeList] = useState([]);

  const correctCaptchaAnswer = 3; // because five - 2 = 3

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [visibility, setVisibility] = useState({
    // description: true,
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
  const [createCustomerProduct, { loading: loading }] =
    useCreateCustomerProductMutation();

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
    if (productItem?.attributes?.length > 0) {
      const filteredAttributes = productItem?.attributes?.filter(
        (item) => item?.values && item?.values?.length > 0
      );
      if (filteredAttributes?.length > 0) {
        const formattedAttributes = filteredAttributes.map((attr) => ({
          title: attr?.attribute?.name,
          value: attr?.values.map((v) => v?.name)?.join(", "),
        }));
        setAttributeList(formattedAttributes);
      }
    }
  }, [productItem]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      let user = JSON.parse(userInfo);
      setUserInfo(user);
      setFormData({
        name: `${user?.user?.firstName} ${user?.user?.lastName}`,
        email: user?.user?.email,
        message: "",
        captcha: "",
      });
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

  useEffect(() => {
    if (isModalOpen || isProductModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isProductModalOpen]);

  const [previousHovered, setPreviousHovered] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);
  const [nextProduct, setNextProduct] = useState();
  const [previousProduct, setPreviousProduct] = useState();
  const [shippingOpen, setShippingOpen] = useState(false);

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
      return discountPercentage.toFixed(0);
    } else {
      return 0;
    }
  };

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

    let encReq = CCAvenue.getEncryptedOrder(paymentData);
    // const encRequest = encrypt(paymentData, WORKING_KEY);
    let accessCode = "AVGO93LF57AY79OGYA";

    let URL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${paymentData.merchant_id}&encRequest=${encReq}&access_code=${accessCode}`;

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

      const isCorrect = parseInt(formData.captcha) === captcha.answer;

      if (!isCorrect) {
        setError("Captcha is incorrect. Please try again.");
        setSuccess("");
        setCaptcha(generateCaptcha());
        return;
      }

      let input = {};

      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        let user = JSON.parse(userInfo);
        input = {
          customer: user?.user?.id,
          baseProduct: productItem?.id,
          customizationDetails: JSON.stringify({
            message: formData.message,
            color: "black",
          }),
        };
      } else {
        input = {
          customerName: formData.name,
          email: formData.email,
          customizationDetails: JSON.stringify({
            message: formData.message,
            color: "black",
          }),

          baseProduct: productItem?.id,
        };
      }

      const res = await createCustomerProduct({
        input,
      });
      if (res?.data?.data?.customProductCreate?.errors?.length > 0) {
        notifyError(res?.data?.data?.customProductCreate?.errors?.[0]?.message);
      } else {
        setSuccess("Form submitted successfully!");
        setError("");
        setIsProductModelOpen(false);
        setFormData({
          name: "",
          email: "",
          productName: productItem?.name || "",
          sku: productItem?.defaultVariant?.sku || "",
          message: "",
          captcha: "",
        });
      }
      notifySuccess("Form submitted successfully!");
    } catch (err) {
      console.log("✌️err --->", err);
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
      <div
        className="bg-white rounded pt-10 pb-10"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <ProductDetailsBreadcrumb
            category={pageTitle}
            title={productItem?.name}
            parentSlug={parentSlug}
            parentCat={productItem.category}
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
                      zIndex: "1000",
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
                            style={{ width: "100%", objectFit: "contain" }}
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
                      zIndex: "1000",
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
                            style={{ width: "100%", objectFit: "contain" }}
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

      <div className="product-info">
        {/* price */}
        <div className="bg-white my-3 p-3 rounded">
          <div className="d-flex justify-content-between">
            <h3 className="tp-product-details-title product-title">
              {capitalizeFLetter(productItem?.name || productItem?.node?.name)}
            </h3>

            {router?.route !== "/gift-card" && (
              <div className="tp-product-details-action-sm mt-2 pt-1">
                <button
                  disabled={status === "out-of-stock"}
                  onClick={() => {
                    if (
                      compareList?.some((prd) => prd?.id === productItem?.id)
                    ) {
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
                  {/* {compareList?.some((prd) => prd?.id === productItem?.id)
                              ? " View Compare"
                              : " Add  Compare"} */}
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
                    <WishlistFill />
                    {/* View Wishlist */}
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
                    {/* {wishlistLoader ? "Loading..." : "Add To Wishlist"} */}
                  </button>
                )}

                {/* <button type="button" className="tp-product-details-action-sm-btn">
                      <AskQuestion />
                      Ask a question
                    </button> */}
              </div>
            )}
            {/* {(productItem?.brand || productItem?.node?.brand) && (
              <img
                className="brand-logo cursor-pointer"
                onClick={() => {
                  router.push({
                    pathname: "/brand",
                    query: {
                      slug:
                        productItem?.brand?.slug ||
                        productItem?.node?.brand?.slug,
                    }, // Your parameters
                  });
                }}
                src={productItem?.brand?.logo || productItem?.node?.brand?.logo}
                alt=""
              />
            )} */}
          </div>

          <div
            className="tp-product-details-price-wrapper"
            // style={{ paddingBottom: "15px" }}
          >
            {channel == "india-channel" ? (
              <div className="d-flex flex-wrap justify-content-between">
                <div className="tp-product-price-wrapper-2">
                  {productItem?.variants?.length <= 1 &&
                    RegularPrice(
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
                    style={{ fontSize: "25px", fontWeight: "700" }}
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
                            productItem?.pricing?.priceRange?.start?.gross
                              ?.amount ||
                              productItem?.node?.pricing?.priceRange?.start
                                ?.gross?.amount
                          ) || 0}
                        </>
                      )}
                    </>
                  </span>
                </div>
              </div>
            ) : (
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
                          productItem?.pricing?.priceRange?.start?.gross
                            ?.amount ||
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
                  className="text-bold text-lg gap-3 my-2"
                  style={{
                    alignItems: "center",
                    fontSize: "14px",
                    color: "black",
                    display: "flex",
                    // paddingBottom: "10px",
                    // borderBottom: "1px dashed #ddd",
                    // marginBottom: "10px",
                  }}
                >
                  <div>
                    {isGiftCard ? (
                      <span>Gift Card Amount:</span>
                    ) : (
                      <span>Select Variant:</span>
                    )}
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <select
                      style={{ height: "30px" }}
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
                </div>
                {variantDetails && (
                  <span
                    className="tp-product-price-2 new-price "
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
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

          {productItem?.pricing?.discount !== null && (
            <p className="text-danger mb-0">{`Save ${saveOff()}% OFF`}</p>
          )}

          <p className="product-desc text-muted mb-0">
            {variantDetails?.quantityAvailable == 0 ||
            productItem?.defaultVariant?.quantityAvailable == 0 ? (
              <span style={{ color: "red", fontWeight: "500" }}>
                Out of Stock
              </span>
            ) : (
              <span style={{ color: "#7d4432", fontWeight: "700" }}>
                In Stock
              </span>
            )}
          </p>
          {productItem?.metadata?.length > 0 && (
            <p className="product-desc text-muted" style={{ color: "black" }}>
              {
                productItem?.metadata?.find(
                  (item) => item.key === "short_description"
                )?.value
              }
            </p>
          )}

          {router?.route == "/gift-card" && variantDetails ? (
            <div className="pb-20" style={{ fontSize: "16px" }}>
              {
                productItem?.metadata?.filter(
                  (item) => item.key === "description"
                )?.[0]?.value
              }
              {variantDetails && (
                <div>
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
                                style={{
                                  fontWeight: "bold",
                                  paddingLeft: "3px",
                                }}
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
                                style={{
                                  fontWeight: "bold",
                                  paddingLeft: "3px",
                                }}
                              >
                                {" "}
                                &#8377;
                                {addCommasToNumber(
                                  productItem?.pricing?.priceRange?.start?.gross
                                    ?.amount ||
                                    productItem?.node?.pricing?.priceRange
                                      ?.start?.gross?.amount
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
                                  style={{
                                    fontWeight: "bold",
                                    paddingLeft: "3px",
                                  }}
                                >
                                  {"$"}{" "}
                                  {addCommasToNumber(
                                    variantDetails?.pricing?.price?.gross
                                      ?.amount
                                  )}
                                </span>
                              </>
                            ) : (
                              <>
                                E-Gift Vouchure of{" "}
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    paddingLeft: "3px",
                                  }}
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
                </div>
              )}
            </div>
          ) : null}

          <div className="d-flex flex-wrap justify-content-between">
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
            {!isGiftCard && productItem?.sizeGuide !== null && (
              <div className="pt-2 pb-2">
                <button
                  onClick={() => setIsModelOpen(true)}
                  className=""
                  style={{ color: "#7d4432" }}
                >
                  Size Chart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Delivery */}
        <div className="delivery-box my-3 p-3 rounded  bg-white">
          <h6>Delivery Details</h6>
          <PincodeChecker />
        </div>

        {/* Warranty */}

        {/* <div className="warranty-box my-3 p-3  rounded bg-white text-center">
          <p className="mb-0 text-black">
            <strong>1 YEAR</strong> Warranty
            
          </p>
        </div> */}

        {/* Offers */}
        {/* <div className="offer-box my-3 p-3 rounded bg-white">
          <h6 className="">Available Offers</h6>
          <div className="bg-gold p-3 rounded d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-1 fw-bold text-white">Flat ₹500/- Off</p>
              <small className="text-white">
                Applicable for your first purchase
              </small>
            </div>
            <div className="text-center">
              <p className="mb-1 ttext-white">Use coupon code:</p>
              <div className="coupon-code">NBS500</div>
            </div>
          </div>
        </div> */}

        <div className="delivery-box my-3 p-3 rounded  bg-white">
          <div className="pd-tabs-container">
            <ul className="nav nav-tabs pd-nav-tabs">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#pd-details"
                  onClick={() => toggleVisibility("description")}
                >
                  Product Details
                </button>
              </li>
              {!isGiftCard && (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#pd-price"
                  >
                    Price Breakup
                  </button>
                </li>
              )}
              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#pd-brand"
                >
                  About Brand
                </button>
              </li>
            </ul>

            <div className="tab-content pd-tab-content  rounded-bottom p-3 bg-white">
              {/* Product Details */}

              <div className="tab-pane fade show active" id="pd-details">
                {/* {visibility?.description && ( */}
                <>
                  {JSON.parse(productItem?.description)?.blocks?.map(
                    (block) => {
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

                            {/* <div key={block.id}>
                              {block.type === "paragraph" && (
                                <p
                                  style={{ color: "gray", marginBottom: "5px" }}
                                >
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
                            </div> */}

                            <div key={block.id}>
                              {block.type === "paragraph" && (
                                <p
                                  style={{ color: "gray", marginBottom: "5px" }}
                                >
                                  <ReadMore
                                    text={
                                      block.data.text.includes("<b>")
                                        ? `<b>${block.data.text}</b>`
                                        : block.data.text
                                    }
                                    charLimit={250}
                                  />
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
                    }
                  )}
                  {
                    <div className="pt-10">
                      {
                        productItem?.metadata?.filter(
                          (item) => item.key === "description"
                        )?.[0]?.value
                      }
                    </div>
                  }

                  {attributeList.length > 0 && (
                    <>
                      <h5 style={{ fontWeight: "600", letterSpacing: "0.2px" }}>
                        Additional Information:
                      </h5>

                      <table
                        className="table "
                        style={{
                          width: "100%",
                          fontSize: "14px",
                          // borderCollapse: "collapse",
                          marginBottom: "0",
                          borderColor: "#7d4432",
                        }}
                      >
                        <tbody>
                          {attributeList?.map((attribute) => (
                            <tr>
                              <td style={{ fontWeight: "bold" }}>
                                {attribute?.title}
                              </td>
                              <td style={{ textAlign: "right" }}>
                                {attribute?.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </>
                {/* )} */}
                {/* <div
                  style={{
                    paddingTop: "10px",
                    
                  }}
                >
                  <p className="pd-description">
                    Time to add a dash of glam to your earlobes! Elevate your
                    style with our Martini Marvel 14KT Yellow Gold Diamond &
                    Amethyst Studs. These rhombus-shaped dazzlers are the
                    perfect recipe for a night out or any occasion where you
                    want to reignite your sparkle!
                  </p>

                  <div className="pd-section mb-3">
                    <h6 className="pd-section-title">
                      <i className="bi bi-info-circle-fill me-2 text-danger"></i>
                      General
                    </h6>
                    <div className="pd-row border-bottom py-1 d-flex justify-content-between">
                      <span>Design Code</span>
                      <span>2923STD</span>
                    </div>
                    <div className="pd-row py-1 d-flex justify-content-between">
                      <span>Gross Weight</span>
                      <span>4.200g</span>
                    </div>
                  </div>

                  
                  <div className="pd-section mb-3">
                    <h6 className="pd-section-title">
                      <i className="bi bi-circle-fill me-2 text-warning"></i>
                      Gold Details
                    </h6>
                    <div className="pd-row border-bottom py-1 d-flex justify-content-between">
                      <span>Purity</span>
                      <span>14 KT</span>
                    </div>
                    <div className="pd-row border-bottom py-1 d-flex justify-content-between">
                      <span>Weight</span>
                      <span>3.254g</span>
                    </div>
                    <div className="pd-row py-1 d-flex justify-content-between">
                      <span>Colour</span>
                      <span>Yellow</span>
                    </div>
                  </div>

                  
                  <div className="pd-section mb-3">
                    <h6 className="pd-section-title">
                      <i className="bi bi-gem me-2 text-danger"></i>Diamond
                      Details
                    </h6>
                    <div className="pd-row border-bottom py-1 d-flex justify-content-between">
                      <span>Clarity</span>
                      <span>I2</span>
                    </div>
                    <div className="pd-row border-bottom py-1 d-flex justify-content-between">
                      <span>Weight</span>
                      <span>0.088 Ct</span>
                    </div>
                    <div className="pd-row border-bottom py-1 d-flex justify-content-between">
                      <span>Count</span>
                      <span>14</span>
                    </div>
                    <div className="pd-row py-1 d-flex justify-content-between">
                      <span>Shape</span>
                      <span>Round</span>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Price Breakup */}
              {!isGiftCard && (
                <div
                  className="tab-pane fade"
                  id="pd-price"
                  style={{
                    overflowY: "scroll",
                  }}
                >
                  {productItem?.priceBreakup?.breakupDetails ? (
                    <PriceBreakup
                      data={productItem.priceBreakup.breakupDetails}
                    />
                  ) : (
                    <p className="pd-placeholder">
                      No Price breakup available for this product.
                    </p>
                  )}
                </div>
              )}
              {/* Reviews */}

              <div
                className="tab-pane fade"
                id="pd-brand"
                style={{ width: "100%" }}
              >
                {productItem?.brand || productItem?.node?.brand ? (
                  <div
                    style={{
                      paddingTop: "10px",
                      // height: "300px",
                      // overflowY: "scroll",
                    }}
                  >
                    <div style={{ width: "100%" }}></div>
                    <img
                      src={
                        productItem?.brand?.logo ||
                        productItem?.node?.brand?.logo
                      }
                      alt=""
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />

                    <h4
                      className="mt-4 mb-0 "
                      style={{ color: "#7d4432 ", fontWeight: "400" }}
                    >
                      {productItem?.brand?.name ||
                        productItem?.node?.brand?.name}
                    </h4>

                    <p className="mt-2" style={{ color: "#55585b" }}>
                      {productItem?.brand?.description ? (
                        <>
                          {limitChar(productItem?.brand?.description, 200)}{" "}
                          <span
                            style={{ color: "#7d4432", cursor:"pointer" }}
                            onClick={() => {
                              router.push({
                                pathname: "/brand",
                                query: {
                                  slug:
                                    productItem?.brand?.slug ||
                                    productItem?.node?.brand?.slug,
                                }, // Your parameters
                              });
                            }}
                          >
                            {" "}
                            Read more{" "}
                          </span>
                        </>
                      ) : productItem?.node?.brand?.description ? (
                        <>
                          {limitChar(
                            productItem?.node?.brand?.description,
                            200
                          )}
                          <span
                            style={{ color: "#7d4432", cursor:"pointer" }}
                            onClick={() => {
                              router.push({
                                pathname: "/brand",
                                query: {
                                  slug:
                                    productItem?.brand?.slug ||
                                    productItem?.node?.brand?.slug,
                                }, // Your parameters
                              });
                            }}
                          >
                            {" "}
                            Read more{" "}
                          </span>{" "}
                        </>
                      ) : null}
                    </p>

                    <button
                      className="tp-btn tp-btn-border"
                      type="button"
                      style={{ padding: "4px 25px" }}
                      onClick={() => {
                        router.push({
                          pathname: "/brand",
                          query: {
                            slug:
                              productItem?.brand?.slug ||
                              productItem?.node?.brand?.slug,
                          }, // Your parameters
                        });
                      }}
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  <p className="pd-placeholder">
                    No Brand available for this product.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="delivery-box my-3 p-3 rounded  bg-white">
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
                      style={{
                        marginRight: "3px",
                        cursor: "pointer",
                        textTransform: "capitalize",
                      }}
                      onClick={() => {
                        router.push({
                          pathname: "/shop",
                          query: { category: category?.slug }, // Your parameters
                        });
                      }}
                    >
                      {category?.name.toLowerCase()}
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

            <p
              style={{
                color: "#7d4432",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setShippingOpen(!shippingOpen)}
            >
              <b>Shipping & Delivery Policy</b>{" "}
            </p>

            {shippingOpen == true && (
              <div
                style={{
                  paddingTop: "5px",
                  paddingBottom: "10px",
                  // height: "300px",
                  // overflowY: "scroll",
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
                <p style={{ color: "#55585b" }} className="mb-1">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="6"
                    viewBox="0 0 8 8"
                    fill="currentColor"
                    style={{ marginRight: "8px" }}
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Shipping charges are not refundable.
                </p>

                <p style={{ color: "#55585b" }} className="mb-1">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="6"
                    viewBox="0 0 8 8"
                    fill="currentColor"
                    style={{ marginRight: "8px" }}
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  The brand has put the utmost effort in showcasing the products
                  as realistic as possible with the colour, appearance etc.
                  Please note that the colour of the jewellery might slightly
                  vary in person, any return/ exchange on these criteria will
                  not be accepted.
                </p>
                <p style={{ color: "#55585b" }} className="mb-1">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="6"
                    viewBox="0 0 8 8"
                    fill="currentColor"
                    style={{ marginRight: "8px" }}
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  We at Nobleset believe in providing fair trade to our artisans
                  and hence selected products shall not be eligible for returns.
                </p>
              </div>
            )}

            {offerDate?.endDate && (
              <ProductDetailsCountdown offerExpiryTime={offerDate?.endDate} />
            )}

            <div className="d-flex justify-content-between flex-wrap">
              <div>
                <RWebShare
                  data={{
                    text: productItem.name,
                    url: window.location.href,
                    title: "Nobleset",
                  }}
                  onClick={() => console.log("shared successfully!")}
                >
                  <button
                    className="tp-btn tp-btn-border mt-2 mt-sm-0"
                    style={{
                      background: "transparent",
                      color: "#7d4432",
                      border: "1px solid #7d4432",
                    }}
                  >
                    Share This Page
                  </button>
                </RWebShare>
              </div>

              {!isGiftCard && (
                <div
                  className="tp-btn tp-btn-border mt-2 mt-md-0 mt-xl-0 "
                  style={{ color: "#fff", cursor: "pointer" }}
                  onClick={() => {
                    setSuccess("");
                    setError("");
                    setCaptcha(generateCaptcha());
                    setIsProductModelOpen(true);
                  }}
                >
                  To Customize Product
                </div>
              )}
            </div>

            {/* {!isGiftCard && (
              <div
                className="text-capitalize text-decordation  cursor-pointer mt-20"
                style={{ color: "#7d4432" }}
                onClick={() => setIsProductModelOpen(true)}
              >
                To Customize Product
              </div>
            )} */}
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModelOpen(false)}
        style={customStyles}
        preventScroll={true}
        shouldCloseOnOverlayClick={true}
        contentLabel="Product Modal"
        // className={"tp-product-details-wrapper"}
        ariaHideApp={false} // optional: disables appElement warning
      >
        <div className="tp-product-modal">
          <div className="tp-product-modal-content d-lg-flex flex-column gap-4">
            <button
              onClick={() => setIsModelOpen(false)}
              type="button"
              className="btn btn-sm  align-self-end text-white"
              style={{
                background:
                  "linear-gradient( to right, color-mix(in srgb, #fbdccc 40%, #e09a7a), #e09a7a )",
              }}
            >
              ✕
            </button>
            {/* Product Image */}
            {productItem?.sizeGuide?.sizeimg && (
              <div className="text-center">
                <img
                  src={productItem?.sizeGuide?.sizeimg} // replace with your image path
                  alt="Product"
                  width={400}
                  height={300}
                  className="img-fluid rounded"
                />
              </div>
            )}

            {productItem?.sizeGuide?.sizedetail && (
              <div
                className="table-responsive-1 mb-3"
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(productItem?.sizeGuide?.sizedetail),
                }}
              />
            )}
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={isProductModalOpen}
        onRequestClose={() => {
          setFormData({
            name: "",
            email: "",
            productName: productItem?.name || "",
            sku: productItem?.defaultVariant?.sku || "",
            message: "",
            captcha: "",
          });
          setIsProductModelOpen(false);
        }}
        style={customStyles}
        contentLabel="Product Modal"
        ariaHideApp={false} // optional: disables appElement warning
      >
        <div className="tp-product-modal">
          <div className="tp-product-modal-content d-lg-flex flex-column gap-4">
            <button
              onClick={() => {
                setFormData({
                  name: "",
                  email: "",
                  productName: productItem?.name || "",
                  sku: productItem?.defaultVariant?.sku || "",
                  message: "",
                  captcha: "",
                });
                setIsProductModelOpen(false);
              }}
              type="button"
              className="btn btn-sm  align-self-end text-white"
              style={{
                background:
                  "linear-gradient( to right, color-mix(in srgb, #fbdccc 40%, #e09a7a), #e09a7a )",
              }}
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
                      disabled={userInfo != null}
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
                  <label className="form-label">
                    Your Message <span>*</span>{" "}
                  </label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Captcha (Enter Sum)</label>
                  <div className="d-flex align-items-center">
                    <span className="me-2" style={{ flex: 1 }}>
                      {captcha?.question}
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
                  {loading ? <ButtonLoader /> : "SUBMIT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default DetailsWrapper1;
