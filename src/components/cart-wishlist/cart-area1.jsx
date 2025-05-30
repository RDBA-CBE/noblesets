import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
// internal
import { cart_list, clearCart } from "@/redux/features/cartSlice";
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";
import {
  useGetCartListQuery,
  useUpdateCartQuantityMutation,
} from "@/redux/features/card/cardApi";
import { notifySuccess } from "@/utils/toast";
import { useGetCartAllListQuery } from "../../redux/features/card/cardApi";
import { useRouter } from "next/router";
import ProductItem from "../products/beauty/product-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Autoplay } from "swiper";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useGetYouMayLikeMutation } from "@/redux/features/productApi";
import { slider_setting } from "@/utils/functions";
import CartItem1 from "./cart-item1";
import CartCheckout1 from "./cart-checkout1";
import { Cart } from "@/svg";

const CartArea1 = () => {
  const router = useRouter();

  const { data: list, refetch } = useGetCartListQuery();
  const { data: allList, refetch: cartAllList } = useGetCartAllListQuery();
  const [getYouMayLike] = useGetYouMayLikeMutation();

  const CartList = list?.data?.checkout?.lines;

  const [cartData, setCartData] = useState([]);
  const [allcartData, setAllCartData] = useState([]);

  const [youMayLikeData, setYouMayLikeData] = useState([]);

  useEffect(() => {
    const data = list?.data?.checkout?.lines?.map((item) => {
      return { ...item, quantity: item.quantity ? item.quantity : 1 };
    });
    setCartData(data);
    getYouMayLikeData();
  }, [list]);

  useEffect(() => {
    const data = allList?.data?.checkout?.lines?.map((item) => {
      return { ...item, quantity: item.quantity ? item.quantity : 1 };
    });
    setAllCartData(data);
  }, [allList]);

  const [updateCartQuantity, {}] = useUpdateCartQuantityMutation();

  const updateCart = () => {
    cartData?.map((item) =>
      updateCartQuantity({
        checkoutId: list?.data?.checkout?.id,
        lineId: item.id,
        quantity: item.quantity,
      }).then((data) => {
        allcartData?.map((item) =>
          updateCartQuantity({
            checkoutId: allList?.data?.checkout?.id,
            lineId: item.id,
            quantity: item.quantity,
          }).then((data) => {})
        );
        refetch();
        cartAllList();
      })
    );
    notifySuccess("Quantity update completed");
  };

  const Quantity = (quantity, val) => {
    const data = cartData.map((item) => {
      if (item.variant?.product?.id == val?.variant?.product?.id) {
        return { ...item, quantity: quantity };
      }
      return item;
    });

    const allListData = allcartData.map((item) => {
      if (item.variant?.product?.id == val?.variant?.product?.id) {
        return { ...item, quantity: quantity };
      }
      return item;
    });

    setAllCartData(allListData);
    setCartData(data);
  };

  const getYouMayLikeData = async () => {
    try {
      let productDetails = [];
      if (CartList?.length === 1) {
        if (CartList[0]?.variant?.product?.getCrosssells?.length > 0)
          for (let item of CartList[0]?.variant?.product?.getCrosssells) {
            try {
              const res = await getYouMayLike({ productId: item?.slug });
              productDetails.push(res?.data);
            } catch (error) {
              console.error(
                `Error fetching data for productId ${item?.productId}:`,
                error
              );
            }
          }

        setYouMayLikeData(productDetails);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const thumbRef = useRef(null);

  useEffect(() => {
    const el = thumbRef.current;

    const initialOffsetTop = el?.offsetTop ?? 0;

    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const stickyTop = 120;

      if (scrollY + stickyTop > initialOffsetTop) {
        el.style.position = "sticky";
        el.style.top = `${stickyTop}px`;

        el.style.zIndex = 10;
      } else {
        el.style.position = "static";
        el.style.top = "auto";
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="cart-container container py-4">
      <h3 className="cart-title mb-3 mt-2">
        Cart <span className="text-muted">({CartList?.length} Items)</span>
      </h3>

      {/* Availability Section */}
      {/* <div className="cart-availability mb-4 p-3 d-flex justify-content-between align-items-center rounded">
        <div className="d-flex align-items-center gap-2">
          <span className="availability-icon">
            <Cart />
          </span>
          <strong>Check Availability</strong>
        </div>
        <a href="#" style={{ textDecoration: "underline" }}>
          Enter Pincode
        </a>
      </div> */}

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-7">
          {/* <p className="item-total text-uppercase fw-bold mb-3">
            2 Items Added Worth <span className="text-danger">₹ 1,42,888</span>
          </p> */}

          {/* Item 1 */}

          {/* {CartList?.length > 0 && ( */}

          {CartList?.map((item, i) => {
            return (
              <>
                <CartItem1
                  cartLength={CartList?.length}
                  isQuantity={true}
                  key={i}
                  product={item}
                  title={item?.variant?.product?.name || item?.node?.name}
                  img={
                    item?.variant?.product?.thumbnail?.url ||
                    item?.node?.thumbnail?.url
                  }
                  price={
                    item?.variant?.pricing?.price?.gross?.amount ||
                    item?.node?.pricing?.priceRange?.start?.gross?.amount
                  }
                  quantityAvailable={
                    item?.variant?.quantityAvailable ||
                    item?.node?.quantityAvailable
                  }
                  incQuantity={(quantity) => Quantity(quantity, item)}
                  decQuantity={(quantity) => Quantity(quantity, item)}
                  quantityCount={item.quantity}
                  refetch={() => refetch()}
                />
              </>
            );
          })}

          <div className="tp-cart-update text-md-end ">
            <button
              type="button"
              className="tp-btn tp-btn-border mr-10"
              style={{
                border: "1px solid #b4633a",
                background: "transparent",
                color: "#b4633a",
              }}
              onClick={() => {
                router.push("shop");
              }}
            >
              Continue Shopping
            </button>
            <button
              type="button"
              className="tp-btn tp-btn-border "
              // style={{ background: "#ececec" }}
              onClick={() => updateCart()}
            >
              Update Cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="col-lg-5 mt-3 mt-lg-0">
          <div ref={thumbRef} className="manual-sticky-thumb">
            <div className="cart-summary p-4 rounded">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <strong>Have a coupon?</strong>
                  <br />
                  <span className="text-muted">
                    {" "}
                    Apply Coupon Code in Checkout
                  </span>
                </div>
                <Link
                  href="/checkout"
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  style={{
                    color: "#b4633a",
                    border: "1px solid #b4633a",
                    borderRadius: "20px",
                    padding: "5px 25px",
                  }}
                >
                  Apply
                </Link>
                {/* <Link
                                            href="/checkout"
                                            type="button"
                                            style={{ color: "#b4633a" }}
                                            className="tp-checkout-coupon-form-reveal-btn"
                                          >
                                            Apply Coupon Code in Checkout
                                          </Link> */}
              </div>

              <CartCheckout1 cartData={cartData} cartLength={CartList?.length}/>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-4 text-muted small">
        © 2025 Nobelsets. All Rights Reserved.
      </footer>
    </div>
  );
};

export default CartArea1;
