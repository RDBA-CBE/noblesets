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
import { addCommasToNumber, checkChannel, roundOff } from "../../utils/functions";
import { profilePic } from "@/utils/constant";
import ButtonLoader from "../loader/button-loader";
import { ClipLoader } from "react-spinners";

const WishlistItem1 = ({ product, refetchWishlist, refetchWishlistDefault }) => {
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
        console.log("err: ", err);
        notifyError(err);
      } else {
        addToCartProductUSD();
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
        notifyError(err);
      } else {
        notifySuccess(`Product added to cart successfully`);
        cartRefetch();
        dispatch(openCartMini());
        AllListChannelREfresh();
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

  return (
  <div
  className={`col-md-6 col-lg-4 mb-4 ${
    isHiddenCategory ? "wishlistOpacity0" : "wishlistOpacity1"
  }`}
>
  <div className="wishlist-card border rounded p-3 h-100 d-flex flex-column justify-content-between">
    <div className="d-flex align-items-center mb-3">
      <Link
        href={`/product-details/${
          checkChannel() === "india-channel"
            ? product?.product?.slug
            : product?.defaultChannelProduct?.slug
        }`}
        className="me-3"
      >
        {isImage(
          profilePic(
            checkChannel() === "india-channel"
              ? product?.product?.thumbnail?.url
              : product?.defaultChannelProduct?.thumbnail?.url
          )
        ) || isImage(profilePic(data?.thumbnail?.url)) ? (
          <img
            src={
              profilePic(
                checkChannel() === "india-channel"
                  ? product?.product?.thumbnail?.url
                  : product?.defaultChannelProduct?.thumbnail?.url
              ) || profilePic(data?.thumbnail?.url)
            }
            width={80}
            height={100}
            className="wishlist-thumbnail rounded"
            alt="product image"
          />
        ) : (
          <video
            src={
              checkChannel() === "india-channel"
                ? product?.product?.thumbnail?.url
                : product?.defaultChannelProduct?.thumbnail?.url ||
                  data?.thumbnail?.url
            }
            width={80}
            height={100}
            muted
            loop
            className="wishlist-thumbnail rounded"
          />
        )}
      </Link>

      <div className="flex-grow-1">
        <Link
          href={`/product-details/${
            checkChannel() === "india-channel"
              ? product?.product?.slug
              : product?.defaultChannelProduct?.slug
          }`}
          className="text-decoration-none"
        >
          <h6 className="wishlist-product-name mb-1">
            {checkChannel() === "india-channel"
              ? product?.product?.name
              : product?.defaultChannelProduct?.name}
          </h6>
        </Link>
        <div className="wishlist-price text-muted">
          ₹
          {checkChannel() === "india-channel"
            ? roundOff(data?.pricing?.priceRange?.start?.gross?.amount)
            : addCommasToNumber(data?.pricing?.priceRange?.start?.gross?.amount)}
        </div>
      </div>
    </div>

    <div
      className="d-flex justify-content-between align-items-center pt-3 border-top"
      style={{ pointerEvents: isHiddenCategory ? "none" : "auto" }}
    >
      <button
        type="button"
        onClick={() => {
          if (isAddToCart) {
            router.push("/cart");
          } else {
            addToCartProductINR();
          }
        }}
        className="btn btn-sm btn-primary"
      >
        {isAddToCart ? (
          "View Cart"
        ) : cartLoader ? (
          <ButtonLoader loader={cartLoader} />
        ) : (
          "Add To Cart"
        )}
      </button>

      <button
        onClick={() => handleRemovePrd()}
        className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
      >
        {deleteLoader ? (
          <ClipLoader color="red" size={13} />
        ) : (
          <Close />
        )}
        <span>Remove</span>
      </button>
    </div>
  </div>
</div>

  );
};

export default WishlistItem1;
