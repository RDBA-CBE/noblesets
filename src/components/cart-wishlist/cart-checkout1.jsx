import React, { useEffect } from "react";
import Link from "next/link";
import useCartInfo from "@/hooks/use-cart-info";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import { addCommasToNumber, checkChannel } from "@/utils/functions";
import { roundOff } from "@/utils/functions";
import {
  removeCartProduct,
} from "@/utils/constant";
import { notifyError } from "@/utils/toast";
import { useRouter } from "next/router";

const CartCheckout1 = ({ cartData, cartLength }) => {
  const { total } = useCartInfo();

  const router = useRouter();
  const [shipCost, setShipCost] = useState(0);
  const [totals, setTotal] = useState(0);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart?.cart_list);

  const { data: list, refetch } = useGetCartListQuery();

  const totalAmount = cart?.reduce(
    (acc, curr) =>
      acc + curr?.variant?.pricing?.price?.gross?.amount * curr?.quantity ||
      acc +
        curr?.node?.pricing?.priceRange?.start?.gross?.amount * curr?.quantity,
    0
  );
  // handle shipping cost
  const handleShippingCost = (value) => {
    if (value === "free") {
      setShipCost(0);
    } else {
      setShipCost(value);
    }
  };

  useEffect(() => {
    let total = 0;
    if (shipCost == "free") {
      total = totalAmount;
    } else {
      total = totalAmount + shipCost;
    }
    setTotal(total);
  }, [shipCost, dispatch, cart]);

  useEffect(() => {}, []);

  const quantityDisable = cartData?.map((item) => {
    return item.variant.quantityAvailable >= item.quantity;
  });

  const checkout = () => {
    const isNotPushlishProduct = cartData?.some(
      (item) => !item.variant?.product?.isPublishedInIndia
    );
    if (isNotPushlishProduct) {
      const allCheckNotPublishedProduct = cartData
        ?.filter((item) => item?.variant?.product?.isPublishedInIndia == false)
        ?.map((val) => val?.variant?.product?.name || val?.node?.name)
        ?.join(", ");
      notifyError(removeCartProduct(allCheckNotPublishedProduct));
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div>
      <h5 className="mb-3">Payment Details ({cartLength} items)</h5>
      <ul className="list-unstyled">
        <li className="d-flex justify-content-between mb-2">
          <span style={{ color: "#333435" }}>Sub Total</span>
          <span>
            {checkChannel() === "india-channel" ? (
              <span
                className="tp-cart-checkout-top-price"
                style={{ color: "#333435" }}
              >
                &#8377;
                {addCommasToNumber(
                  list?.data?.checkout?.totalPrice?.gross?.amount
                )}
              </span>
            ) : (
              <span
                className="tp-cart-checkout-top-price"
                style={{ color: "#333435" }}
              >
                $
                {addCommasToNumber(
                  list?.data?.checkout?.totalPrice?.gross?.amount
                )}
              </span>
            )}
          </span>
        </li>
        {/* <li className="d-flex justify-content-between mb-2">
                <span>You Saved</span>
                <span className="text-success">- ₹ 0</span>
              </li> */}
        {/* <li className="d-flex justify-content-between mb-2">
                <span>Discount</span>
                <span className="text-success">- ₹ 0</span>
              </li> */}
        {/* {checkChannel() === "india-channel" ? (
                <li className="d-flex justify-content-between mb-2">
                <span>GST</span>
                <span className="text-success"> + ₹{addCommasToNumber(list?.data?.checkout?.totalPrice?.tax?.amount)}</span>
              </li>
               ) : null} */}

        {/* <li className="d-flex justify-content-between mb-2">
                <span>Delivery Charge</span>
                <span>FREE</span>
              </li> */}
      </ul>
      <div
        className="d-flex justify-content-between mt-3 p-3  rounded"
        style={{ background: "#7d443230" }}
      >
        <strong className="text-black">Grand Total</strong>
        <strong className="text-black">
          ₹{addCommasToNumber(list?.data?.checkout?.totalPrice?.gross?.amount)}
        </strong>
      </div>

      {/* <div className="text-center mt-4">
              <img
                src="https://i.imgur.com/xnG5SwA.png"
                alt="Warranty"
                className="warranty-img"
              />
              <p className="mt-2 mb-0">1 Year Warranty</p>
            </div> */}

      <div className="tp-cart-checkout-proceed mt-3">
        {quantityDisable?.some((item) => item === false) ? (
          <button
            type="button"
            className="tp-btn tp-btn-border  w-100 text-center"
            disabled
            style={{ cursor: "not-allowed" }}
          >
            Proceed To Checkout
          </button>
        ) : (
          <button
            onClick={() => checkout()}
            className="tp-btn tp-btn-border  w-100 text-center"
          >
            Proceed To Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartCheckout1;
