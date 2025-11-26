import Image from "next/image";
import React from "react";

const NoblesetPromisesNew = () => {
  return (
    <section className="np-section container-fluid p-0 ">
      <div className="row g-0 align-items-center np-main-row">
        {/* Left Image */}
        <div className="col-6 col-md-5 col-lg-6 col-xl-5  np-left-img-wrap d-none d-md-block ">
          <img
            src="/assets/img/newlayout/Nobleset Promises/image.png"
            alt="model"
            className="img-fluid np-left-img"
            width={100}
            height={100}
          />
        </div>

        {/* Right Content */}
        <div className="col-12 col-md-7 col-lg-6 col-xl-7  np-content-wrap">
          <div className="mb-0 ">
            <h5 className="sub-ti ps-2">
              <b className="pe-1">✦ </b>Trusted craftsmanship
            </h5>
            <h4 className="feature-adipisicing main-ti">Noblesets Promises</h4>
          </div>

          <p className="np-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod
            tempor incididunt ut labore et dolore magna. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut ullamco
            laboris nisi
          </p>

          {/* Icons Row */}
          <div className=" np-icon-row text-center d-none d-lg-flex">
            <div className=" np-icon-col">
              <div className="np-icon-circle">
                <img
                  src="/assets/img/newlayout/Nobleset Promises/Logo/logo.png"
                  alt="logo"
                />
              </div>
              <p className="np-icon-label">Trusted by Buyers</p>
            </div>

            <div className=" np-icon-col">
              <div className="np-icon-circle">
                <img
                  src="/assets/img/newlayout/Nobleset Promises/Logo/logo-2.png"
                  alt="logo"
                />
              </div>
              <p className="np-icon-label">BIS Hallmarked</p>
            </div>

            <div className=" np-icon-col">
              <div className="np-icon-circle">
                <img
                  src="/assets/img/newlayout/Nobleset Promises/Logo/logo-3.png"
                  alt="logo"
                />
              </div>
              <p className="np-icon-label">Crafted Product</p>
            </div>

            <div className=" np-icon-col">
              <div className="np-icon-circle">
                <img
                  src="/assets/img/newlayout/Nobleset Promises/Logo/logo-4.png"
                  alt="logo"
                />
              </div>
              <p className="np-icon-label">30 Days Return</p>
            </div>

            <div className="np-icon-col">
              <div className="np-icon-circle">
                <img
                  src="/assets/img/newlayout/Nobleset Promises/Logo/logo-5.png"
                  alt="logo"
                />
              </div>
              <p className="np-icon-label">
                Certified Natural <br /> Diamonds
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 text-center d-flex justify-content-between justify-content-md-center gap-0 gap-md-2  d-lg-none promise" >
        <div className=" np-icon-col">
          <div className="np-icon-circle">
            <img
              src="/assets/img/newlayout/Nobleset Promises/Logo/logo.png"
              alt="logo"
            />
          </div>
          <p className="np-icon-label">Trusted by Buyers</p>
        </div>

        <div className=" np-icon-col">
          <div className="np-icon-circle">
            <img
              src="/assets/img/newlayout/Nobleset Promises/Logo/logo-2.png"
              alt="logo"
            />
          </div>
          <p className="np-icon-label">BIS Hallmarked</p>
        </div>

        <div className=" np-icon-col">
          <div className="np-icon-circle">
            <img
              src="/assets/img/newlayout/Nobleset Promises/Logo/logo-3.png"
              alt="logo"
            />
          </div>
          <p className="np-icon-label">Crafted Product</p>
        </div>

        <div className=" np-icon-col">
          <div className="np-icon-circle">
            <img
              src="/assets/img/newlayout/Nobleset Promises/Logo/logo-4.png"
              alt="logo"
            />
          </div>
          <p className="np-icon-label">30 Days Return</p>
        </div>

        <div className="np-icon-col">
          <div className="np-icon-circle">
            <img
              src="/assets/img/newlayout/Nobleset Promises/Logo/logo-5.png"
              alt="logo"
            />
          </div>
          <p className="np-icon-label">
            Certified Natural <br /> Diamonds
          </p>
        </div>
      </div>
    </section>
  );
};

export default NoblesetPromisesNew;
