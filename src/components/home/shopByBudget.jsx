import {
  usePriceFilterMutation,
} from "@/redux/features/productApi";
import { filterByHomePage } from "@/redux/features/shop-filter-slice";
import { addCommasToNumber } from "@/utils/functions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ShopByBudget() {
  const dispatch = useDispatch();

  const router = useRouter();


  const [propertyList] = usePriceFilterMutation();

  useEffect(() => {
    getProductMaxPrices();
  }, [router]);

  const [budgetItems, setBudgetItems] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    getProductMaxPrices();
  }, []);

  const getProductMaxPrices = async (filterWithImages) => {
    let minPrice = 0;
    let maxPrice = 0;

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

      minPrice = minNode?.defaultVariant?.pricing?.price?.gross?.amount || 0;
      maxPrice =
        maxNode?.defaultVariant?.pricing?.price?.gross?.amount || 0;
          const midPrice = Math.round((minPrice + maxPrice) / 2);
          setMaxPrice(maxPrice);


       const budgetItems = [
            {
              label: `₹${addCommasToNumber(minPrice || 0)}`,
              img: "/assets/img/home/shopByBudget/img-1.webp",
              lable:"Start From"
            },
            {
              label: `₹${addCommasToNumber(midPrice || 0)}`,
              img: "/assets/img/home/shopByBudget/img-2.webp",
              lable:"Under"

            },
            {
              label: `₹${addCommasToNumber(maxPrice || 0)}`,
              img: "/assets/img/home/shopByBudget/img-3.webp",
              lable:"Under"


            },
          ];
          setBudgetItems(budgetItems);

    } catch (err) {
      cat.price = "Price not available";
    }
  };

  return (
    <>
      <section className="budget-section pt-60 ShopByBudget position-relative">
        <div className="feature-main mb-50">
          <h5 className="sub-ti">
            <b className="pe-2">✦</b>Style within reach
          </h5>
          <h4 className="feature-adipisicing main-ti">Shop By Budget</h4>
        </div>
        {/* <p className="budget-section__subtitle">Lorem ipsum dolor</p>
        <h2 className="budget-section__title">Shop By Budget</h2> */}
        <div className="budget-section__items">
          {budgetItems.map((item, idx) => (
            <div
              className={`cursor-pointer budget-card budget-card--${
                idx + 1
              }  new-budget-card-${idx + 1}`}
              key={idx}
              onClick={() => {
                dispatch(
                  filterByHomePage({
                    price: {
                      min: item.label.replace(/[^0-9]/g, ""),
                      max: maxPrice,
                    },
                  })
                );

                router.push("/shop");
              }}
            >
              <img
                src={item.img}
                alt={item.label}
                className="budget-card__img"
              />
              <div className="new-c-bud">
                <p>{item?.lable}</p>
                <p className="u-p">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
