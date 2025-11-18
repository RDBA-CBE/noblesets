import React from "react";

const NoblesetPromises01 = () => {
  return (
    <section className="nobleset-container">
      {/* Left Image Section */}
      <div className="nobleset-image">
        <img
          src="/assets/model.png" // ← replace with your image path
          alt="Jewelry Model"
        />
      </div>

      {/* Right Text Section */}
      <div className="nobleset-content">
      <h5 className="sub-ti" > <b className="pe-2">✦</b> Trusted craftsmanship </h5>
            <h4
              className="feature-adipisicing main-ti"
             
            >
              Noblesets Promises
            </h4>

        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          commodo consequat.
        </p>

        {/* Icons Row */}
        <div className="icons-row">
          {promises.map((item, index) => (
            <div className="icon-box" key={index}>
              <div className="circle">
                <img src={item.icon} alt={item.title} />
              </div>
              <p className="icon-text">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const promises = [
  { title: "Trusted by Buyers", icon: "/icons/buyer.svg" },
  { title: "BIS Hallmarked", icon: "/icons/hallmark.svg" },
  { title: "Crafted Product", icon: "/icons/crafted.svg" },
  { title: "30 Days Return", icon: "/icons/return.svg" },
  { title: "Certified Natural Diamonds", icon: "/icons/certificate.svg" }
];

export default NoblesetPromises;
