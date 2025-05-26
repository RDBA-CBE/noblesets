import React, { useEffect } from "react";
import Link from "next/link";
import useCartInfo from "@/hooks/use-cart-info";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartListQuery } from "@/redux/features/card/cardApi";
import { addCommasToNumber, checkChannel } from "@/utils/functions";
import { roundOff } from "@/utils/functions";

const CartCheckout1 = ({ cartData }) => {
  const { total } = useCartInfo();
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

  return (
    <div >
      <h5 className="mb-3">Payment Details (2 items)</h5>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between mb-2">
                <span>Sub Total</span>
                <span>
                    {checkChannel() === "india-channel" ? (
                              <span className="tp-cart-checkout-top-price">
                                &#8377;
                                {addCommasToNumber(list?.data?.checkout?.totalPrice?.gross?.amount)}
                              </span>
                            ) : (
                              <span className="tp-cart-checkout-top-price">
                                ${addCommasToNumber(list?.data?.checkout?.totalPrice?.gross?.amount)}
                              </span>
                            )}
                </span>
              </li>
              <li className="d-flex justify-content-between mb-2">
                <span>You Saved</span>
                <span className="text-success">- ₹ 0</span>
              </li>
              <li className="d-flex justify-content-between mb-2">
                <span>Discount</span>
                <span className="text-success">- ₹ 0</span>
              </li>
               {checkChannel() === "india-channel" ? (
                <li className="d-flex justify-content-between mb-2">
                <span>GST</span>
                <span className="text-success"> + ₹{addCommasToNumber(list?.data?.checkout?.totalPrice?.tax?.amount)}</span>
              </li>
               ) : null}
               
              <li className="d-flex justify-content-between mb-2">
                <span>Delivery Charge</span>
                <span>FREE</span>
              </li>
            </ul>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light rounded">
              <strong>Grand Total</strong>
              <strong>
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
    </div>
  );
};

export default CartCheckout1;
