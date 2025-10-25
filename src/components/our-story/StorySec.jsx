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
             At Noble Sets, we believe jewelry is more than just an accessory. It is a reflection of your style, your confidence, and your story. Our journey began with a vision to create designs that carry the grace of tradition while embracing the spirit of modern fashion. 

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
               Each piece is carefully handcrafted, blending timeless artistry with precision and care. 
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="ourstory-card shadow-sm p-4 h-100">
              <h5 className="card-title">Designed for Her</h5>
              <p className="card-text text-black mt-3">
               Experience exceptional quality in every piece, designed to shine for years and crafted to be seen and felt. 
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="ourstory-card shadow-sm p-4 h-100">
              <h5 className="card-title">Unmatched Quality</h5>
              <p className="card-text text-black mt-3">
              Jewelry that reflects her personality, spirit, and shine, celebrating every woman’s style, confidence, and grace. 
              </p>
            </div>
          </div>
        </div>

        {/* Highlight Statement */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-10">
            <div className="ourstory-highlight p-4">
              <h4>Wear Noble Sets. Wear confidence, charm, and a sparkle that stays with you. </h4>
            </div>
          </div>
        </div>

        {/* Dual Column Section - Vision & Mission */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="ourstory-block p-4 shadow-sm h-100">
              <h5>Our Vision</h5>
              <ul>
                <li>Our vision is to craft jewelry that blends timeless elegance with modern design, offering lightweight, comfortable, and versatile pieces for everyday wear and special moments. </li>
               
              </ul>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="ourstory-block p-4 shadow-sm h-100">
              <h5>Our Mission</h5>
              <ul>
                <li>Our mission is to help every woman shine effortlessly, embracing her individuality with jewelry that reflects her personality, celebrates her grace, and inspires confidence at every step.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySec;
