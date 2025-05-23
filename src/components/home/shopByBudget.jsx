import React from "react";

export default function ShopByBudget() {
  const budgetItems = [
    { label: "₹5000", img: "/assets/img/home/shopByBudget/img-1.png" },
    { label: "₹15000", img: "/assets/img/home/shopByBudget/img-2.png" },
    { label: "₹30000", img: "/assets/img/home/shopByBudget/img-3.png" },
  ];
  return (
    <>
      <section
        className="budget-section pt-60"
        style={{
          backgroundImage: "url(/assets/img/home/shopByBudget/bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="feature-main mb-50" >
          <h5 className="sub-ti"><b>✦</b> Lorem ipsum dolor</h5>
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
            <div className={`budget-card budget-card--${idx + 1}`} key={idx}>
              <img
                src={item.img}
                alt={item.label}
                className="budget-card__img"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
