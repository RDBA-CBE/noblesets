import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import {
  useAddToCartMutation,
  useGetCartListQuery,
  useGetCartAllListQuery,
} from "@/redux/features/card/cardApi";
import { cart_count } from "@/redux/features/card/cardSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { compare_list, openCartMini } from "@/redux/features/cartSlice";
import { handleWishlistProduct } from "@/utils/common_function";
import { useRouter } from "next/router";
import {
  useAddWishlistMutation,
  useGetWishlistQuery,
} from "@/redux/features/productApi";
import {
  RegularPrice,
  addCommasToNumber,
  capitalizeFLetter,
  checkChannel,
  roundOff,
} from "@/utils/functions";
import { profilePic } from "@/utils/constant";
import ButtonLoader from "@/components/loader/button-loader";
const SimilarProductItem = ({
  product,
  prdCenter = false,
  primary_style = false,
  data,
}) => {
  const { id, thumbnail, name, discount, pricing, tags, status, video, slug } =
    product || {};
  const cart = useSelector((state) => state.cart?.cart_list);
  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();
  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});
  const { data: datacartList, refetch: cartRefetch } = useGetCartListQuery();
  const router = useRouter();
  const { cart_products } = useSelector((state) => state.cart);
  const compareList = useSelector((state) => state.cart.compare_list);
  const { wishlist } = useSelector((state) => state.wishlist);

  const isAddedToCart = cart?.some(
    (prd) => prd?.variant?.product?.id === product?.id
  );
  // const isAddedToCart = cart_products.some((prd) => prd.id === id);
  // const isAddedToWishlist = data?.some((prd) => prd.id === id);
  const dispatch = useDispatch();
  const [cartLoader, setCartLoader] = useState(false);
  const [wishlistLoader, setWishlistLoader] = useState(false);
  // wishlist added and show
  const { data: wishlistData, refetch: wishlistRefetch } = useGetWishlistQuery(
    {}
  );
  const isAddedToWishlist = wishlistData?.data?.wishlists?.edges?.some(
    (prd) => {
      return prd?.node?.variant === product?.id;
    }
  );
  const [addWishlist, {}] = useAddWishlistMutation();
  const addToCartProductINR = async () => {
    setCartLoader(true);
    try {
      setCartLoader(true);
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: product?.defaultVariant?.id,
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
  const addToCartProductUSD = async () => {
    setCartLoader(true);
    try {
      setCartLoader(true);
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenUSD,
        variantId: product?.defaultVariant?.id,
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
  // handle wishlist product
  const addWishlistProduct = async (product) => {
    try {
      setWishlistLoader(true);
      const user = localStorage.getItem("userInfo");
      const Token = localStorage.getItem("token");
      if (Token) {
        const users = JSON.parse(user);
        const input = {
          input: {
            user: users.user.id,
            variant: product?.id,
          },
        };
        const res = await addWishlist(input);
        notifySuccess("Product added to wishlist");
        wishlistRefetch();
      } else {
        notifyError(
          "Only logged-in users can add items to their wishlist or view it"
        );
        // const addedWishlist = handleWishlistProduct(prd);
        // dispatch(add_to_wishlist(addedWishlist));
      }
      setWishlistLoader(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCompareProduct = (prd) => {
    const products = product || product.node;
    const compare = localStorage.getItem("compareList");
    let arr = [];
    if (!compare) {
      arr = [];
    } else {
      arr = JSON.parse(compare);
    }
    arr.push(products);

    localStorage.setItem("compareList", JSON.stringify(arr));
    dispatch(compare_list(arr));
    notifySuccess("Product to added to compare list");
  };

  const saveOff = () => {
    const discountedPrice = product?.pricing?.priceRange?.start?.gross?.amount;
    const originalPrice =
      product?.pricing?.priceRangeUndiscounted?.start?.gross?.amount;
    const discountPercentage =
      ((originalPrice - discountedPrice) / originalPrice) * 100;
    if (discountPercentage) {
      return discountPercentage.toFixed(0);
    } else {
      return 0;
    }
  };

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };
  return (
    <div
      className={`tp-product-item-3 featured-product-section ${
        primary_style ? "tp-product-style-primary" : ""
      } ${prdCenter ? "text-center" : ""}`}
      style={{ borderRadius: "20px" }}
    >
      <div
        className="tp-product-thumb-3 mb-15 fix p-relative z-index-1"
        style={{
          borderRadius: "20px",
        }}
      >
        <Link
          href={`/product-details/${slug}`}
          style={{ borderRadius: "20px" }}
        >
          {/* <Image
src={profilePic(thumbnail?.url)}
alt="product image"
width={282}
height={320}
/> */}

          {/* <img
              src="/assets/img/image-not-included-img.png"
              alt="product image"
              width={282}
              height={320}
              style={{
                borderRadius:"20px",
              }}
            /> */}

          {video ? (
            <video
              src={
                video?.url
                  ? video?.url
                  : "/assets/img/image-not-included-img.png"
              }
              autoPlay
              muted // Ensure it's muted to autoplay without user interaction
              loop // Ensure it loops indefinitely
              playsInline // Ensure it plays inline on iOS devices
              style={{
                borderRadius: "20px",
                width: "100%",
                height: "100%",
              }}
              alt="instagram video"
              className="actor-video"
            />
          ) : isImage(profilePic(thumbnail?.url)) ? (
            <img
              src={
                profilePic(thumbnail?.url)
                  ? profilePic(thumbnail?.url)
                  : "/assets/img/image-not-included-img.png"
              }
              alt="product image"
              width={282}
              height={320}
              style={{
                borderRadius: "20px",
              }}
            />
          ) : (
            <video
              src={
                thumbnail?.url
                  ? thumbnail?.url
                  : "/assets/img/image-not-included-img.png"
              }
              autoPlay
              muted // Ensure it's muted to autoplay without user interaction
              loop // Ensure it loops indefinitely
              playsInline // Ensure it plays inline on iOS devices
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
              }}
              alt="instagram video"
              className="actor-video"
            />
          )}

          {/* <img
src={profilePic(thumbnail?.url)}
alt="product image"
width={282}
height={320}
/> */}
        </Link>
        {/* <div className="tp-product-badge">
{status === "out-of-stock" && (
<span className="product-hot">out-stock</span>
)}
</div> */}
        <div className="tp-product-badge">
          {status === "out-of-stock" ? (
            <span className="product-hot">
              SOLD
              <br /> OUT
            </span>
          ) : (
            <div style={{ display: "none" }}></div>
          )}
        </div>
        <div className="tp-product-badge-2">
          {product?.defaultVariant?.quantityAvailable == 0 && (
            <span
              className="product-hot text-center"
              style={{ padding: "15px 12px ", fontSize: "12px" }}
            >
              SOLD
              <br /> OUT
            </span>
          )}
        </div>
        <div
          className={`${
            product?.defaultVariant?.quantityAvailable == 0
              ? "tp-product-badge"
              : "tp-product-badge-2"
          }`}
        >
          {product?.metadata?.filter((item) => item.key === "label").length >
            0 &&
            product.metadata
              .filter((item) => item.key === "label")
              .map((item, index) => (
                <span
                  key={index}
                  className="product-trending text-center"
                  style={{ padding: "18px 15px", textTransform: "capitalize" }}
                >
                  {item.value}
                </span>
              ))}
        </div>
        {/* <div className="tp-product-badge-2">
<span className="product-hot">HOT</span>
</div> */}
        {/* product action */}
        <div className="tp-product-action-3 tp-product-action-blackStyle">
          <div className="tp-product-action-item-3 d-flex ">
            {product?.defaultVariant?.quantityAvailable != 0 && (
              <>
                {isAddedToCart ? (
                  <Link
                    href="/cart"
                    className={`tp-product-action-btn-3 ${
                      isAddedToCart ? "active" : ""
                    } tp-product-add-cart-btn text-center`}
                  >
                    <Cart />
                    <span className="tp-product-tooltip tp-product-tooltip-top">
                      View Cart
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      addToCartProductINR();
                      addToCartProductUSD();
                    }}
                    className={`tp-product-action-btn-3 ${
                      isAddedToCart ? "active" : ""
                    } tp-product-add-cart-btn`}
                    disabled={status === "out-of-stock"}
                  >
                    {cartLoader ? (
                      <ButtonLoader loader={cartLoader} />
                    ) : (
                      <>
                        <Cart />
                        <span className="tp-product-tooltip tp-product-tooltip-top">
                          Add to Cart
                        </span>
                      </>
                    )}
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => dispatch(handleProductModal(product))}
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
            >
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-top">
                Quick View
              </span>
            </button>
            {isAddedToWishlist === true ? (
              <button
                disabled={status === "out-of-stock"}
                onClick={() => router.push("/wishlist")}
                className={`tp-product-action-btn-3 active tp-product-add-to-wishlist-btn`}
              >
                <Wishlist />
                <span className="tp-product-tooltip tp-product-tooltip-top">
                  View Wishlist
                </span>
              </button>
            ) : (
              <button
                disabled={status === "out-of-stock"}
                onClick={() => addWishlistProduct(product)}
                className={`tp-product-action-btn-3 tp-product-add-to-wishlist-btn`}
              >
                <Wishlist />
                <span className="tp-product-tooltip tp-product-tooltip-top">
                  Add To Wishlist
                </span>
              </button>
            )}
            <button
              type="button"
              className={`tp-product-action-btn-3  tp-product-add-to-wishlist-btn`}
              onClick={() => {
                if (
                  compareList?.some(
                    (prd) =>
                      (prd?.node?.id || prd?.id) ==
                      (product?.node?.id || product?.id)
                  )
                ) {
                  router.push("/compare");
                } else {
                  handleCompareProduct(product);
                }
              }}
              // onClick={() => handleCompare()}
            >
              <CompareThree />
              <span className="tp-product-tooltip tp-product-tooltip-top">
                {compareList?.some(
                  (prd) =>
                    (prd?.node?.id || prd?.id) ==
                    (product?.node?.id || product?.id)
                )
                  ? "View Compare"
                  : "Add To Compare"}
              </span>
            </button>
          </div>
        </div>
        {/* <div className="tp-product-add-cart-btn-large-wrapper">
{isAddedToCart ? (
<Link
href="/cart"
className="tp-product-add-cart-btn-large text-center"
>

View Cart
</Link>
) : (
<button
onClick={() => handleAddProduct(product)}
type="button"
className="tp-product-add-cart-btn-large"
disabled={status === "out-of-stock"}
>
Add To Cart
</button>
)}
</div> */}
      </div>
      <div className="tp-product-content-3" style={{ textAlign: "center" }}>
        {/* <div className="tp-product-tag-3"><span>{tags[1]}</span></div> */}
        <h3
          className="tp-product-title-3"
          style={{
            fontSize: "12px",
            color: "rgb(144 141 141)",
            // textTransform: "uppercase",
          }}
        >
          {product?.category[0]?.name.toLowerCase()}
        </h3>
        <h3 className="tp-product-title-2">
          <Link href={`/product-details/${slug}`}>
            {capitalizeFLetter(name)}
          </Link>
        </h3>
        {/* <p style={{ color: "gray", marginBottom: "0px", ontSize: "16px" }}>
          {product?.category?.name}
        </p> */}
        <div className="tp-product-price-wrapper-3">
          {checkChannel() === "india-channel" ? (
            <>
              {RegularPrice(
                addCommasToNumber(product?.defaultVariant?.costPrice),
                addCommasToNumber(
                  product?.pricing?.priceRange?.start?.gross?.amount
                )
              ) && (
                <span
                  className="pr-5"
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  &#8377;
                  {addCommasToNumber(
                    roundOff(product?.defaultVariant?.costPrice)
                  )}
                </span>
              )}
              <span
                className="tp-product-price-3"
                style={{ fontSize: "22px", fontWeight: "700" }}
              >
                &#8377;
                {roundOff(product?.pricing?.priceRange?.start?.gross?.amount)}
              </span>
              {product?.pricing?.discount !== null && (
                <div
                  className="save-off"
                  style={{
                    color: "#b4633a",
                    fontSize: "16px",
                  }}
                >{`Save ${saveOff()}% OFF`}</div>
              )}
            </>
          ) : (
            <>
              {RegularPrice(
                product?.defaultVariant?.costPrice,
                product?.pricing?.priceRange?.start?.gross?.amount
              ) && (
                <span
                  className="pr-5"
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  &#8377;{roundOff(product?.defaultVariant?.costPrice)}
                </span>
              )}
              <span
                className="tp-product-price-3"
                style={{ fontSize: "22px", fontWeight: "700" }}
              >
                ${roundOff(pricing?.priceRange?.start?.gross?.amount)}
              </span>
              {product?.pricing?.discount !== null && (
                <div
                  className="save-off"
                  style={{
                    color: "#b4633a",
                    fontSize: "16px",
                  }}
                >{`Save ${saveOff()}% OFF`}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SimilarProductItem;
