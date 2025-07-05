import React from "react";

const StorySec = () => {
  return (
    <section className="ourstory-wrapper py-5">
      <div className="container">
        {/* Banner Intro */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h2 className="main-ti">The Legacy of Elegance</h2>
            <p className="ourstory-lead">
              At Noble Sets, every ornament tells a story — of tradition, innovation, and timeless grace. We don’t just design jewellery; we craft heirlooms that reflect confidence and individuality.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <div className="ourstory-banner-img rounded">
              <img
              src="/assets/img/home/nobletset_promises/img-right.png"
              alt="Models"
              style={{width:"100%"}}
              // style={{ height: "100%", width: "100%" }}
            />
                {/* <img src="" alt="" /> */}
            </div>
          </div>
        </div>

        {/* Grid Section - Core Values */}
        <div className="row text-center mb-5">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="ourstory-card shadow-sm p-4 h-100">
              <h5 className="card-title">Authentic Craftsmanship</h5>
              <p className="card-text text-black mt-3">
                Each piece is meticulously crafted using heritage methods blended with modern design sensibilities.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="ourstory-card shadow-sm p-4 h-100">
              <h5 className="card-title">Designed for Her</h5>
              <p className="card-text text-black mt-3">
                Our collections celebrate womanhood — from empowering minimalism to bridal opulence.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="ourstory-card shadow-sm p-4 h-100">
              <h5 className="card-title">Unmatched Quality</h5>
              <p className="card-text text-black mt-3">
                We ensure nano-precision, stringent quality checks, and only the finest gold & stones in every product.
              </p>
            </div>
          </div>
        </div>

        {/* Highlight Statement */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-10">
            <div className="ourstory-highlight p-4">
              <h4>Jewellery isn’t an accessory — it's your statement. At Noble Sets, we design it with that power in mind.</h4>
            </div>
          </div>
        </div>

        {/* Dual Column Section - Vision & Mission */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="ourstory-block p-4 shadow-sm h-100">
              <h5>Our Vision</h5>
              <ul>
                <li>To redefine jewellery as wearable art for the modern woman.</li>
                <li>To blend antique charm with futuristic elegance.</li>
                <li>To be globally recognized for innovation and precision.</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="ourstory-block p-4 shadow-sm h-100">
              <h5>Our Mission</h5>
              <ul>
                <li>To deliver jewellery that inspires confidence and culture.</li>
                <li>To offer trust, transparency, and timeless value in every design.</li>
                <li>To stay affordable without compromising on luxury.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySec;
