// ShopByBudget.jsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  usePriceFilterMutation,
} from "@/redux/features/productApi";
import { filterByHomePage } from "@/redux/features/shop-filter-slice";
import { addCommasToNumber } from "@/utils/functions";

const ShopByBudgetNew = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [propertyList] = usePriceFilterMutation();
  const [budgetItems, setBudgetItems] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    getProductMaxPrices();
  }, []);

  const getProductMaxPrices = async () => {
    try {
      const minRes = await propertyList({
        channel: "india-channel",
        first: 1,
        filter: {},
        sortBy: { direction: "ASC", field: "PRICE" },
      });

      const maxRes = await propertyList({
        channel: "india-channel",
        first: 1,
        filter: {},
        sortBy: { direction: "DESC", field: "PRICE" },
      });

      const minNode = minRes.data?.data?.productsSearch?.edges?.[0]?.node;
      const maxNode = maxRes.data?.data?.productsSearch?.edges?.[0]?.node;

      const minPrice = minNode?.defaultVariant?.pricing?.price?.gross?.amount || 20000;
      const maxPrice = maxNode?.defaultVariant?.pricing?.price?.gross?.amount || 44000;
      const midPrice1 = Math.round((minPrice + maxPrice) / 3);
      const midPrice2 = Math.round((minPrice + maxPrice) / 2);
      
      setMaxPrice(maxPrice);

      const budgetItems = [
        {
          label: `Under ₹${addCommasToNumber(minPrice)}`,
          img: "/assets/img/newlayout/shop by budget/img-1.png",
          price: minPrice
        },
        {
          label: `Under ₹${addCommasToNumber(midPrice1)}`,
          img: "/assets/img/newlayout/shop by budget/img-2.png",
          price: midPrice1
        },
        {
          label: `Under ₹${addCommasToNumber(midPrice2)}`,
          img: "assets/img/newlayout/shop by budget/img-3.png",
          price: midPrice2
        },
        {
          label: `Under ₹${addCommasToNumber(maxPrice)}`,
          img: "assets/img/newlayout/shop by budget/img-4.png",
          price: maxPrice
        },
      ];
      setBudgetItems(budgetItems);
    } catch (err) {
      // Fallback to default values
      setBudgetItems([
        {
          label: "Under ₹20,000",
          img: "/assets/img/newlayout/shop by budget/img-1.png",
          price: 20000
        },
        {
          label: "Under ₹32,000",
          img: "/assets/img/newlayout/shop by budget/img-2.png",
          price: 32000
        },
        {
          label: "Under ₹44,000",
          img: "assets/img/newlayout/shop by budget/img-3.png",
          price: 44000
        },
        {
          label: "Under ₹30,000",
          img: "assets/img/newlayout/shop by budget/img-4.png",
          price: 30000
        },
      ]);
    }
  };

  const handleBudgetClick = (item) => {
    dispatch(
      filterByHomePage({
        price: {
          min: 0,
          max: item.price,
        },
      })
    );
    router.push("/shop");
  };
  return (
      <section className="sbb-wrapper">
        <div className="sbb-wrapper-in">
          <div className="container p-0 d-none d-md-block">
            <div className="row justify-content-center p-0">
              <div className="col-12 col-lg-11 col-xl-12 p-0">
                <div className="container-fluid p-0">
                  <div className="row align-items-stretch">
                    {/* LEFT SIDE HEADING */}
                    <div className="col-lg-custom-45 col-md-12 sbb-head">
                      <div className="feature-main mb-30 text-start">
                        <h5 className="sub-ti">
                          {" "}
                          <b className="pe-2">✦</b>Style within reach
                        </h5>
                        <h4 className="feature-adipisicing main-ti">
                          Shop By Budget
                        </h4>
                      </div>
                    </div>

                    {/* RIGHT SIDE – FIRST ROW (2 IMAGES) */}
                    <div className="col-lg-custom-75 col-md-12">
                      <div className="row g-4">
                        <div className="col-md-6 col-sm-6">
                          <div className="sbb-card-1 cursor-pointer" onClick={() => handleBudgetClick(budgetItems[0])}>
                            <img
                              src={budgetItems[0]?.img || "/assets/img/newlayout/shop by budget/img-1.png"}
                              className="sbb-img"
                              alt="budget-1"
                            />
                            <div className="sbb-label">{budgetItems[0]?.label || "Under ₹20,000"}</div>
                          </div>
                        </div>

                        <div className="col-md-6 col-sm-6">
                          <div className="sbb-card-1 cursor-pointer" onClick={() => handleBudgetClick(budgetItems[1])}>
                            <img
                              src={budgetItems[1]?.img || "/assets/img/newlayout/shop by budget/img-2.png"}
                              className="sbb-img"
                              alt="budget-2"
                            />
                            <div className="sbb-label">{budgetItems[1]?.label || "Under ₹32,000"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECOND ROW – 2 IMAGES LEFT ALIGNED */}
                  <div className="row gy-2 mt-2">
                    <div className="col-lg-custom-75 col-md-12">
                      <div className="row g-4">
                        <div className="col-md-6 col-sm-6">
                          <div className="sbb-card-2 cursor-pointer" onClick={() => handleBudgetClick(budgetItems[2])}>
                            <img
                              src={budgetItems[2]?.img || "assets/img/newlayout/shop by budget/img-3.png"}
                              className="sbb-img"
                              alt="budget-3"
                            />
                            <div className="sbb-label">{budgetItems[2]?.label || "Under ₹44,000"}</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="sbb-card-2 cursor-pointer" onClick={() => handleBudgetClick(budgetItems[3])}>
                            <img
                              src={budgetItems[3]?.img || "assets/img/newlayout/shop by budget/img-4.png"}
                              className="sbb-img"
                              alt="budget-4"
                            />
                            <div className="sbb-label">{budgetItems[3]?.label || "Under ₹30,000"}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="col-lg-custom-45 col-md-12 p-0 d-flex align-items-center"
                      style={{ marginLeft: "-30px" }}
                    >
                      <div className="vector-img">
                        <img
                          src="/assets/img/newlayout/shop by budget/vector-img.png"
                          className="sbb-img"
                          alt="30k"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-wd d-block d-md-none p-0">
            <div className="container-fluid p-0">
              <div className="row justify-content-center p-0">
                <div className="col-11 p-0">
                  <div className="container-fluid p-0">
                    <div className="row align-items-stretch">
                      {/* LEFT SIDE HEADING */}
                      <div className="col-lg-custom-45 col-md-12 sbb-head">
                        <div className="feature-main mb-30 text-start">
                          <h5 className="sub-ti">
                            {" "}
                            <b className="pe-2">✦</b>Style within reach
                          </h5>
                          <h4 className="feature-adipisicing main-ti">
                            Shop By Budget
                          </h4>
                        </div>
                      </div>

                      {/* RIGHT SIDE – FIRST ROW (2 IMAGES) */}
                      <div className="col-12 col-lg-custom-75 ">
                        <div className="row g-4">
                          <div className="col-6">
                            <div className="sbb-card-1 cursor-pointer" onClick={() => handleBudgetClick(budgetItems[0])}>
                              <img
                                src={budgetItems[0]?.img || "/assets/img/newlayout/shop by budget/img-1.png"}
                                className="sbb-img"
                                alt="budget-1"
                              />
                              <div className="sbb-label">{budgetItems[0]?.label || "Under ₹20,000"}</div>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="sbb-card-1 cursor-pointer" onClick={() => handleBudgetClick(budgetItems[1])}>
                              <img
                                src={budgetItems[1]?.img || "/assets/img/newlayout/shop by budget/img-2.png"}
                                className="sbb-img"
                                alt="budget-2"
                              />
                              <div className="sbb-label">{budgetItems[1]?.label || "Under ₹32,000"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECOND ROW – 2 IMAGES LEFT ALIGNED */}
                    <div className="row gy-2 mt-2">
                      <div className="col-lg-custom-75 col-md-12">
                        <div className="row g-4">
                          <div className="col-6">
                            <div className="sbb-card-2 cursor-pointer" onClick={() => handleBudgetClick(budgetItems[2])}>
                              <img
                                src={budgetItems[2]?.img || "assets/img/newlayout/shop by budget/img-3.png"}
                                className="sbb-img"
                                alt="budget-3"
                              />
                              <div className="sbb-label">{budgetItems[2]?.label || "Under ₹44,000"}</div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="sbb-card-2 cursor-pointer" onClick={() => handleBudgetClick(budgetItems[3])}>
                              <img
                                src={budgetItems[3]?.img || "assets/img/newlayout/shop by budget/img-4.png"}
                                className="sbb-img"
                                alt="budget-4"
                              />
                              <div className="sbb-label">{budgetItems[3]?.label || "Under ₹30,000"}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-lg-custom-45 col-md-12 p-0 d-flex align-items-center d-none d-md-block"
                        style={{ marginLeft: "-30px" }}
                      >
                        <div className="vector-img">
                          <img
                            src="/assets/img/newlayout/shop by budget/vector-img.png"
                            className="sbb-img"
                            alt="30k"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ShopByBudgetNew;
