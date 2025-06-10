import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
// internal
import {
  add_cart_product,
  add_compare,
  cart_list,
  compare_list,
  openCartMini,
} from "@/redux/features/cartSlice";
import { remove_compare_product } from "@/redux/features/compareSlice";
import {
  useAddToCartMutation,
  useGetCartAllListQuery,
  useGetCartListQuery,
} from "@/redux/features/card/cardApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/router";
import {
  useGetProductByIdMutation,
  useGetProductByIdQuery,
  useGetWishlistQuery,
} from "@/redux/features/productApi";
import { profilePic } from "@/utils/constant";
import { RegularPrice, checkChannel, roundOff } from "@/utils/functions";

const CompareArea1 = () => {
  const cart = useSelector((state) => state.cart.cart_list);

  const { data: datacartList, refetch: cartRefetch } = useGetCartListQuery();

  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  const [getProducts] = useGetProductByIdMutation();
  const [compareData, setCompareData] = useState([]);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    const compareList = localStorage.getItem("compareList");
    const arr = JSON.parse(compareList);
    dispatch(compare_list(arr));
  }, []);

  useEffect(() => {
    getProductListById();
  }, []);

  const getProductListById = async (item) => {
    try {
      const compareList = localStorage.getItem("compareList");
      let productIds = [];
      if (compareList) {
        productIds = JSON.parse(compareList)?.map((item) =>
          item?.node ? item?.node?.id : item?.id
        );
      } else {
        productIds = [];
      }

      if (productIds?.length > 0) {
        const response = await getProducts({
          ids: productIds,
        });

        setCompareData(response?.data?.data?.products?.edges);
      } else {
        setCompareData([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAddProduct = async (item) => {
    try {
      const checkoutToken = localStorage.getItem("checkoutToken");
      const response = await addToCartMutation({
        checkoutToken: checkoutToken,
        variantId: item?.variants[0]?.id,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
        dispatch(cart_list(cart));
      } else {
        notifySuccess(`${product.node.name} added to cart successfully`);
        // cart_list.push
        dispatch(
          cart_list(response?.data?.data?.checkoutLinesAdd?.checkout?.lines)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // handle add product
  const handleRemoveComparePrd = (prd) => {
    const filter = compareData.filter(
      (item) => item?.node.id !== prd?.node?.id
    );
    localStorage.setItem("compareList", JSON.stringify(filter));
    dispatch(compare_list(filter));

    getProductListById();
  };

  const IndiaChannel = compareData?.map((item) => {
    return item?.node?.pricing?.priceRange?.start?.gross?.currency === "INR"
      ? true
      : false;
  });


  const addToCartProductINR = async (product) => {
    try {
      const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenINR,
        variantId: product?.node?.defaultVariant?.id,
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToCartProductUSD = async (product) => {
    try {
      const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
      const response = await addToCartMutation({
        checkoutToken: checkoutTokenUSD,
        variantId: product?.node?.defaultVariant?.id,
      });
      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
        notifyError(err);
      } else {
        cartRefetch();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };


  return (
    <>
<section className="tp-compare-area pb-50 pt-50 compare-page" style={{ background: "#fff9f4" }}>
  <div className="container">
    <div className="row">
      <div className="col-xl-12">
        {compareData?.length === 0 && (
          <div className="text-center pt-0 pb-0 pt-md-50 pb-md-50">
            <h3>No Compare Items Found</h3>
            <Link href="/shop" className="tp-cart-checkout-btn mt-20">
              Continue Shipping
            </Link>
          </div>
        )}

        {compareData?.length > 0 && (
          <div className="tp-compare-table table-responsive text-center">
            <table className="table">
              <thead >
                <tr className="wishlist-page-tr py-3" >
                  <th className="tp-cart-header-product py-4" style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }}>
                    PRODUCT
                  </th>
                  <th className="tp-cart-header-quantity">DESCRIPTION</th>
                  <th className="tp-cart-header-price">SKU</th>
                  <th>AVAILABILITY</th>
                  <th style={{ borderBottomRightRadius: "10px", borderTopRightRadius: "10px" }}></th>
                </tr>
              </thead>
              <tbody >
                {compareData.map((item) => {
                  const node = item.node;
                  const descriptionBlocks = JSON.parse(node.description)?.blocks;

                  return (
                    <tr key={node.id}>
                      {/* PRODUCT */}
                      <td style={{ minWidth: "300px" }}>
                        <div style={{ display: "flex", justifyContent: "between" }}>
                          <div className="tp-compare-thumb p-relative z-index-1 " style={{ width: "100%",borderRadius:"10px",
                            display:"flex",
                            // justifyContent:"space-around"
                            gap:"20px"
                           }}>
                            <div>
                                 {isImage(profilePic(node?.thumbnail?.url)) ? (
                              <img src={profilePic(node?.thumbnail?.url)} alt="compare"
                              style={{borderRadius:"10px", width:"100px"}} />
                            ) : (
                              <video src={node?.thumbnail?.url} muted loop 
                              style={{borderRadius:"10px", width:"100px"}}
                              />
                            )}
                            <div className="tp-product-badge-2">
                              {node?.defaultVariant?.quantityAvailable == 0 && (
                                <span className="product-hot text-center" style={{ padding: "15px 12px" }}>
                                  SOLD<br />OUT
                                </span>
                              )}
                            </div>
                            </div>
                           

                            <div>
                                <h4 className="tp-compare-product-title">
                              <Link href={`/product-details/${node?.slug}`}>{node?.name}</Link>
                            </h4>
                            <div className="tp-compare-add-to-cart" style={{ paddingBottom: "10px" }}>
                              {checkChannel() === "india-channel" ? (
                                <>
                                  {RegularPrice(node?.defaultVariant?.costPrice, node?.pricing?.priceRange?.start?.gross?.amount) && (
                                    <span className="tp-product-price-1 pr-5 line-through" style={{ textDecoration: "line-through", color: "gray" }}>
                                      ₹ {node?.defaultVariant?.costPrice}
                                    </span>
                                  )}
                                  <span style={{ color: "#b4633a", fontWeight: "500" }}>
                                    ₹{roundOff(node?.pricing?.priceRange?.start?.gross?.amount)}
                                  </span>
                                </>
                              ) : (
                                <>
                                  {RegularPrice(node?.defaultVariant?.costPrice, node?.pricing?.priceRange?.start?.gross?.amount) && (
                                    <span className="tp-product-price-1 pr-5 line-through" style={{ textDecoration: "line-through", color: "gray" }}>
                                      $ {node?.defaultVariant?.costPrice}
                                    </span>
                                  )}
                                  <span style={{ color: "#b4633a", fontWeight: "500" }}>
                                    ${roundOff(node?.pricing?.priceRange?.start?.gross?.amount)}
                                  </span>
                                </>
                              )}
                            </div>
                            {node?.defaultVariant?.quantityAvailable !== 0 && (
                              <div className="tp-compare-add-to-cart">
                                {datacartList?.data?.checkout?.lines?.some(prd => prd?.variant?.product?.id === node?.id) ? (
                                  <button onClick={() => router.push("/cart")} className="gradient-btn" type="button" 
                                  style={{ 
                                    padding:"2px 18px",
                                    color: "white",
                                fontSize:"14px"
                             }}
                                  >
                                    View Cart
                                  </button>
                                ) : (
                                  <button onClick={() => { addToCartProductINR(item); addToCartProductUSD(item); }} type="button" className="gradient-btn"                                   style={{ 
                                    padding:"2px 18px",
                                    color: "white",
                                fontSize:"14px"
                             }}
                             >
                                    Add to Cart
                                  </button>
                                )}
                              </div>
                            )}
                            </div>
                            
                          </div>
                        </div>
                      </td>

                      {/* DESCRIPTION */}
                      <td>
                        {descriptionBlocks?.map((block) => (
                          <div key={block.id} style={{ marginTop: "10px" }}>
                            {block.type === "paragraph" && (
                              <p style={{ color: "gray", marginBottom: "5px" }}>
                                <span className="text-black" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                              </p>
                            )}
                            {block.type === "header" && (
                              <h5 style={{ fontWeight: "400" }}>{block.data.text}</h5>
                            )}
                            {block.type === "list" && (
                              <ul style={{ paddingLeft: "20px" }}>
                                {block.data.items.map((listItem, idx) => (
                                  <li key={idx} style={{ color: "gray" }} dangerouslySetInnerHTML={{ __html: listItem.includes("<b>") ? `<b>${listItem}</b>` : listItem }} />
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </td>

                      {/* SKU */}
                      <td>
                        <span style={{ color: "black" }}>{node?.variants?.[0]?.sku}</span>
                      </td>

                      {/* AVAILABILITY */}
                      <td>
                        <span style={{ color: "black" , textAlign:"center"}}>{node?.defaultVariant?.quantityAvailable}</span>
                      </td>

                      {/* REMOVE */}
                      <td>
                        <div className="tp-compare-remove">
                          <button onClick={() => handleRemoveComparePrd(item)}>
                            <i className="fal fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default CompareArea1;
