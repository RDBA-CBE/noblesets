import { usePriceRangeMutation } from "@/redux/features/productApi";
import { addCommasToNumber } from "@/utils/functions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function ShopByBudget() {
  // const budgetItems = [
  //   { label: "₹5000", img: "/assets/img/home/shopByBudget/nimg-1.png" },
  //   { label: "₹15000", img: "/assets/img/home/shopByBudget/nimg-2.png" },
  //   { label: "₹30000", img: "/assets/img/home/shopByBudget/nimg-3.png" },
  // ];
  const router = useRouter();

  const [maximumPrice] = usePriceRangeMutation();

  useEffect(() => {
    getProductMaxPrice();
  }, [router]);

  const [budgetItems, setBudgetItems] = useState([]);

  useEffect(() => {
    getProductMaxPrice();
  }, []);

  const getProductMaxPrice = () => {
    maximumPrice({})
      .then((res) => {
        if (res?.data?.data) {
          const minPrice =
            res.data.data.products.edges[0]?.node.pricing.priceRange.start.gross
              .amount;
          const maxPrice =
            res.data.data.productsReverse.edges[0]?.node.pricing.priceRange.stop
              .gross.amount;

          const midPrice = Math.round((minPrice + maxPrice) / 2);

          const budgetItems = [
            {
              label: `₹${addCommasToNumber(minPrice || 0)}`,
              img: "/assets/img/home/shopByBudget/img-1.webp",
            },
            {
              label: `₹${addCommasToNumber(midPrice || 0)}`,
              img: "/assets/img/home/shopByBudget/img-2.webp",
            },
            {
              label: `₹${addCommasToNumber(maxPrice || 0)}`,
              img: "/assets/img/home/shopByBudget/img-3.webp",
            },
          ];
          setBudgetItems(budgetItems);
        }
      })
      .catch((error) => {
        console.error("Error fetching price range:", error);
      });
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
                router.push("/shop");
              }}
            >
              <img
                src={item.img}
                alt={item.label}
                className="budget-card__img"
              />
              <div className="new-c-bud">
                <p>Under</p>
                <p className="u-p">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
