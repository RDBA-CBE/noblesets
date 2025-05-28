import { useRouter } from "next/router";
import React from "react";

export default function ShopByBudget() {
  const budgetItems = [
    { label: "₹5000", img: "/assets/img/home/shopByBudget/nimg-1.png" },
    { label: "₹15000", img: "/assets/img/home/shopByBudget/nimg-2.png" },
    { label: "₹30000", img: "/assets/img/home/shopByBudget/nimg-3.png" },
  ];
  const router = useRouter();
  return (
    <>
      <section
        className="budget-section pt-60 ShopByBudget position-relative"
        
      >
        <div className="feature-main mb-50" >
          <h5 className="sub-ti"><b className="pe-2">✦</b> Lorem ipsum dolor</h5>
          <h4
            className="feature-adipisicing main-ti"
            
          >
            Shop By Budget
          </h4>
        </div>
        {/* <p className="budget-section__subtitle">Lorem ipsum dolor</p>
        <h2 className="budget-section__title">Shop By Budget</h2> */}
        <div className="budget-section__items">
          {budgetItems.map((item, idx) => (
            <div className={`cursor-pointer budget-card budget-card--${idx + 1}  new-budget-card-${idx + 1}`} key={idx}
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
