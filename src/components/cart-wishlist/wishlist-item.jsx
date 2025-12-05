import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  useDeleteWishlistMutation,
  useGetCartAllListQuery,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";

// internal
import { Close, Minus, Plus } from "@/svg";
import {
  add_cart_product,
  cart_list,
  openCartMini,
  quantityDecrement,
} from "@/redux/features/cartSlice";
import {
  useWishlistDeleteMutation,
  useAddToCartMutation,
} from "@/redux/features/card/cardApi";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";

// import { useGetWishlistQuery } from "@/redux/features/productApi";
import {
  addCommasToNumber,
  checkChannel,
  roundOff,
} from "../../utils/functions";
import { NOT_PUBLISHED_PRODUCT, profilePic } from "@/utils/constant";
import ButtonLoader from "../loader/button-loader";
import { ClipLoader } from "react-spinners";

const WishlistItem = ({ product, refetchWishlist, refetchWishlistDefault }) => {
  const { variant, img, name, pricing } = product || {};

  const dispatch = useDispatch();

  const [cartLoader, setCartLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  // const { data: wishlistData, refetch: wishlistRefetch } =
  //   useGetWishlistQuery();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const { wishlist } = useSelector((state) => state.wishlist);

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const router = useRouter();

  const data =
    checkChannel() == "india-channel"
      ? product?.product
      : product?.defaultChannelProduct;

  const cart = useSelector((state) => state.cart.cart_list);

  const [wishlistDelete] = useDeleteWishlistMutation();

  const { data: datacartList, refetch: cartRefetch } = useGetCartListQuery();

  const isAddToCart = datacartList?.data?.checkout?.lines?.some(
    (item) => item?.variant?.product?.id === data?.id
  );

  // handle decrement product
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };

  // handle remove product
  const handleRemovePrd = async () => {
    setDeleteLoader(true);
    const productId = data.id;
    try {
      setDeleteLoader(true);
      await wishlistDelete({
        variant: productId,
      });

      refetchWishlist();
      refetchWishlistDefault();
      setDeleteLoader(false);
    } catch (error) {}
  };

  // const addToCartProductINR = async () => {
  //   setCartLoader(true);
  //   try {
  //     setCartLoader(true);
  //     const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
  //     const response = await addToCartMutation({
  //       checkoutToken: checkoutTokenINR,
  //       variantId:
  //         product?.product?.defaultVariant.id ||
  //         product?.defaultChannelProduct?.defaultVariant?.id,
  //     });

  //     if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
  //       const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
  //       console.log("err: ", err);
  //       notifyError(err);
  //     } else {
  //       addToCartProductUSD();
  //     }

  //     setCartLoader(false);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const addToCartProductUSD = async () => {
  //   setCartLoader(true);
  //   try {
  //     setCartLoader(true);
  //     const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
  //     const response = await addToCartMutation({
  //       checkoutToken: checkoutTokenUSD,
  //       variantId:
  //         product?.product?.defaultVariant.id ||
  //         product?.defaultChannelProduct?.defaultVariant?.id,
  //     });

  //     if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
  //       const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
  //       notifyError(err);
  //     } else {
  //       notifySuccess(`Product added to cart successfully`);
  //       cartRefetch();
  //       dispatch(openCartMini());
  //       AllListChannelREfresh();
  //     }

  //     setCartLoader(false);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const addToCartProductINR = async () => {
    setCartLoader(true);
    try {
      setCartLoader(true);
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId:
          product?.product?.defaultVariant.id ||
          product?.defaultChannelProduct?.defaultVariant?.id,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
      } else {
        notifySuccess(`Product added to cart successfully`);
        dispatch(openCartMini());
        cartRefetch();
        AllListChannelREfresh();
      }
      setCartLoader(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToCartProductUSD = async () => {
    setCartLoader(true);
    try {
      setCartLoader(true);
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenUSD,
        variantId:
          product?.product?.defaultVariant.id ||
          product?.defaultChannelProduct?.defaultVariant?.id,
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

  const isHiddenCategory = data?.category?.some(
    (item) => item.name === "Hidden"
  );

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };
  console.log("✌️product?.product --->", product?.product);

  const isPublished = () => {
    if (product?.product?.isPublishedInIndia) {
      return true;
    } else {
      false;
    }
  };

  return (
    <>
      {checkChannel() === "india-channel" ? (
        <>
          <tr
            className={`${
              isHiddenCategory ? "wishlistOpacity0" : "wishlistOpacity1"
            }`}
            style={{ opacity: !isPublished() ? 0.45 : 1 }}
          >
            <td className="tp-cart-img">
              <Link href={`/product-details/${product?.product?.slug}`}>
                {/* <Image
            src={
              profilePic(product?.product?.media[0]?.url) ||
              profilePic(data?.media[0]?.url)
            }
            width={70}
            height={100}
          /> */}
                {isImage(profilePic(product?.product?.thumbnail?.url)) ||
                isImage(profilePic(data?.thumbnail?.url)) ? (
                  <img
                    src={
                      profilePic(product?.product?.thumbnail?.url) ||
                      profilePic(data?.thumbnail?.url)
                    }
                    width={70}
                    height={100}
                    style={{
                      borderRadius: "10px",
                      filter: !isPublished()
                        ? "grayscale(1) opacity(0.5)"
                        : "none",
                    }}
                  />
                ) : (
                  <video
                    src={
                      product?.product?.thumbnail?.url || data?.thumbnail?.url
                    }
                    width={70}
                    muted
                    loop
                    height={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      filter: !isPublished()
                        ? "grayscale(1) opacity(0.5)"
                        : "none",
                    }}
                  />
                )}
              </Link>
            </td>
            <td className="tp-cart-title">
              <Link href={`/product-details/${product?.product?.slug}`}>
                <span
                  style={{
                    color: !isPublished() ? "#999" : "inherit",
                    opacity: !isPublished() ? 0.6 : 1,
                  }}
                >
                  {product?.product?.name}
                </span>
              </Link>
            </td>
            <td>
              <span
                style={{
                  color: !isPublished() ? "#999" : "inherit",
                  opacity: !isPublished() ? 0.6 : 1,
                }}
              >
                {product?.product?.name || data?.name}
              </span>
            </td>
            <td className="tp-cart-price">
              <span
                style={{
                  color: !isPublished() ? "#999" : "inherit",
                  opacity: !isPublished() ? 0.6 : 1,
                }}
              >
                ₹{roundOff(data?.pricing?.priceRange?.start?.gross?.amount)}
              </span>
            </td>

            {/* <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            onClick={() => handleDecrement(product)}
            className="tp-cart-minus"
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={isAddToCart ? isAddToCart?.orderQuantity : 0}
            readOnly
          />
          <span
            onClick={() => handleAddProduct(product)}
            className="tp-cart-plus"
          >
            <Plus />
          </span>
        </div>
      </td> */}

            <td
              className="tp-cart-add-to-cart"
              style={{
                pointerEvents:
                  isHiddenCategory || !isPublished() ? "none" : "auto",
              }}
            >
              <button
                onClick={() => {
                  if (isAddToCart) {
                    router.push("/cart");
                  } else {
                    addToCartProductINR();
                    addToCartProductUSD();
                  }
                }}
                type="button"
                className=" tp-btn tp-btn-border"
                style={{
                  borderRadius: "20px",
                  opacity: !isPublished() ? 0.6 : 1,
                  color: !isPublished() ? "#999" : "",
                  borderColor: !isPublished() ? "#999" : "",
                }}
              >
                {isAddToCart ? (
                  "View Cart"
                ) : (
                  <>
                    {cartLoader ? (
                      <ButtonLoader loader={cartLoader} />
                    ) : (
                      "Add To Cart"
                    )}
                  </>
                )}
              </button>
            </td>

            <td className="tp-cart-action">
              <button
                onClick={() => handleRemovePrd()}
                className="tp-cart-action-btn"
              >
                {deleteLoader ? (
                  <ClipLoader color="red" size={13} />
                ) : (
                  <Close />
                )}

                {/* <span> Remove</span> */}
              </button>
            </td>
          </tr>
        </>
      ) : (
        <>
          <tr
            className={`${
              isHiddenCategory ? "wishlistOpacity0" : "wishlistOpacity1"
            }`}
          >
            <td className="tp-cart-img">
              <Link
                href={`/product-details/${product?.defaultChannelProduct?.slug}`}
              >
                {/* <Image
            src={
              profilePic(product?.product?.media[0]?.url) ||
              profilePic(data?.media[0]?.url)
            }
            width={70}
            height={100}
          /> */}
                {isImage(
                  profilePic(product?.defaultChannelProduct?.thumbnail?.url)
                ) || isImage(profilePic(data?.thumbnail?.url)) ? (
                  <img
                    src={
                      profilePic(
                        product?.defaultChannelProduct?.thumbnail?.url
                      ) || profilePic(data?.thumbnail?.url)
                    }
                    width={70}
                    height={100}
                    style={{
                      borderRadius: "10px",
                      filter: !isPublished()
                        ? "grayscale(1) opacity(0.5)"
                        : "none",
                    }}
                  />
                ) : (
                  <video
                    src={
                      product?.defaultChannelProduct?.thumbnail?.url ||
                      data?.thumbnail?.url
                    }
                    width={70}
                    muted
                    loop
                    height={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      filter: !isPublished()
                        ? "grayscale(1) opacity(0.5)"
                        : "none",
                    }}
                  />
                )}
              </Link>
            </td>
            <td className="tp-cart-title">
              <Link
                href={`/product-details/${product?.defaultChannelProduct?.slug}`}
              >
                <span
                  style={{
                    color: !isPublished() ? "#999" : "inherit",
                    opacity: !isPublished() ? 0.6 : 1,
                  }}
                >
                  {product?.defaultChannelProduct?.name}
                </span>
              </Link>
            </td>
            <td>
              <span
                style={{
                  color: !isPublished() ? "#999" : "inherit",
                  opacity: !isPublished() ? 0.6 : 1,
                }}
              >
                {product?.defaultChannelProduct?.name || data?.name}
              </span>
            </td>
            <td className="tp-cart-price">
              <span
                style={{
                  color: !isPublished() ? "#999" : "inherit",
                  opacity: !isPublished() ? 0.6 : 1,
                }}
              >
                $
                {addCommasToNumber(
                  data?.pricing?.priceRange?.start?.gross?.amount
                )}
              </span>
            </td>

            {/* <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span
            onClick={() => handleDecrement(product)}
            className="tp-cart-minus"
          >
            <Minus />
          </span>
          <input
            className="tp-cart-input"
            type="text"
            value={isAddToCart ? isAddToCart?.orderQuantity : 0}
            readOnly
          />
          <span
            onClick={() => handleAddProduct(product)}
            className="tp-cart-plus"
          >
            <Plus />
          </span>
        </div>
      </td> */}

            <td
              className="tp-cart-add-to-cart"
              style={{
                pointerEvents:
                  isHiddenCategory || !isPublished() ? "none" : "auto",
              }}
            >
              <button
                onClick={() => {
                  if (isAddToCart) {
                    router.push("/cart");
                  } else {
                    addToCartProductINR();
                    addToCartProductUSD();
                  }
                }}
                type="button"
                className=" tp-btn tp-btn-border"
                style={{
                  borderRadius: "20px",
                  opacity: !isPublished() ? 0.6 : 1,
                  color: !isPublished() ? "#999" : "inherit",
                  borderColor: !isPublished() ? "#999" : "inherit",
                }}
              >
                {isAddToCart ? (
                  "View Cart"
                ) : (
                  <>
                    {cartLoader ? (
                      <ButtonLoader loader={cartLoader} />
                    ) : (
                      "Add To Cart"
                    )}
                  </>
                )}
              </button>
            </td>

            <td className="tp-cart-action">
              <button
                onClick={() => handleRemovePrd()}
                className="tp-cart-action-btn"
              >
                {deleteLoader ? (
                  <ClipLoader color="red" size={13} />
                ) : (
                  <Close />
                )}

                {/* <span> Remove</span> */}
              </button>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default WishlistItem;
