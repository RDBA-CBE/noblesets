import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import WishlistItem from "./wishlist-item";
import { Wishlist } from "@/svg";
import {
  useGetProductByIdQuery,
  useGetWishlistQuery,
  useGetWishlistDefaultQuery,
} from "@/redux/features/productApi";
import { get_wishlist_products } from "@/redux/features/wishlist-slice";
import { checkChannel } from "@/utils/functions";
import WishlistItem1 from "./wishlist-item1";

const WishlistArea1 = () => {
  const [ids, setIds] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const { data: wishlistDefaultData, refetch: wishlistDefaultRefetch } =
    useGetWishlistDefaultQuery();

  const { data: wishlistData, refetch: wishlistRefetch } =
    useGetWishlistQuery();

  useEffect(() => {
    getWishlistList();
  }, [wishlistData]);

  useEffect(() => {
    wishlistDefaultRefetch();
  }, []);

  const list =
    checkChannel() == "india-channel"
      ? wishlistData?.data?.wishlists?.edges?.map((item) => item?.node)
      : wishlistDefaultData?.data?.wishlists?.edges?.map((item) => item?.node);

  const getWishlistList = async (prd) => {
    try {
      if (wishlistData?.data?.wishlists?.edges?.length > 0) {
        setWishlist(
          wishlistData?.data?.wishlists?.edges?.map((item) => item?.node)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section
        className="tp-cart-area pb-20 pt-30"
        style={{ background: "#fff9f4" }}
      >
        <div className="container">
          {list?.length === 0 && (
            <div className="text-center pb-20">
              <h3 style={{ paddingBottom: "15px" }}>This wishlist is empty.</h3>
              <p style={{ color: "gray" }}>
                You dont have any products in the wishlist yet.
                <br /> You will find a lot of interesting products on our Shop
                page.
              </p>
              <Link href="/shop" className="gradient-btn">
                Return to shop
              </Link>
            </div>
          )}
          {list?.length > 0 && (
            <>
              <div className="row">
                <div className="col-xl-12">
                  <div className="wishlist-card-container row">
                    <WishlistItem1/>
                    {/* {list?.map((item, i) => (
                      <div key={i} className="col-md-6 col-lg-4 mb-4">
                        <div className="wishlist-card p-3 border rounded h-100 d-flex flex-column justify-content-between">
                          <div className="wishlist-card-top d-flex align-items-center mb-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="wishlist-card-img me-3 rounded"
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <h5 className="wishlist-product-name mb-1">
                                {item.name}
                              </h5>
                              <p className="wishlist-product-price text-muted mb-0">
                                ₹ {item.price}
                              </p>
                            </div>
                          </div>
                          <div className="wishlist-card-actions d-flex justify-content-between mt-auto pt-3 border-top">
                            <button className="btn btn-dark btn-sm">
                              Add to Cart
                            </button>
                            <button className="btn btn-outline-danger btn-sm">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))} */}
                  </div>

                  <div className="wishlist-cart-bottom mt-4">
                    <div className="row align-items-end">
                      <div className="col-xl-6 col-md-4">
                        <div className="wishlist-cart-link">
                          <Link href="/cart" className="btn btn-secondary">
                            Go To Cart
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default WishlistArea1;
