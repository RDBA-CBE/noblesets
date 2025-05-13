import React from "react";

const HomeFooter = () => {
  return (
    <div style={{ backgroundColor: "#e09a7b" }}>
      <footer className="container py-5 text-white">
        <div className="row gy-4">
          <div className="col-12 col-md-3">
            <div className="footer-subtitle mb-2">
              {/* <i className="fas fa-times"></i> */}
              <strong>Newsletter</strong>
            </div>
            <h2 className="h3 fw-normal text-white mb-4">Subscribe Today</h2>
            <form
              className="position-relative mb-3"
              onsubmit="event.preventDefault()"
            >
              <input
                className="footer-input w-100"
                placeholder="Enter Your Mail Id Here"
                required=""
                type="email"
              />
              <button
                aria-label="Submit email"
                className="btn-arrow"
                type="submit"
              >
                {/* <i className="fas fa-arrow-right"></i> */}
              </button>
            </form>
            <div className="form-check">
              <input
                className="form-check-input"
                id="termsCheck"
                required=""
                type="checkbox"
              />
              <label
                className="form-check-label checkbox-label "
                for="termsCheck"
              >
                I Agree with the terms &amp; Conditions
              </label>
            </div>
          </div>
          <div className="col-6 col-md-2">
            <h3 className="footer-title">Useful Links</h3>
            <nav className="nav flex-column">
              <a className="footer-link mb-2" href="#">
                Our Story
              </a>
              <a className="footer-link mb-2" href="#">
                Legal Policies
              </a>
              <a className="footer-link mb-2" href="#">
                Download App
              </a>
              <a className="footer-link mb-2" href="#">
                Loyalty Programs
              </a>
              <a className="footer-link mb-2" href="#">
                Help &amp; FAQS
              </a>
              <a className="footer-link" href="#">
                Testimonials
              </a>
            </nav>
          </div>
          <div className="col-6 col-md-3">
            <h3 className="footer-title">Contact Us</h3>
            <div className="d-flex align-items-center mb-2">
              {/* <i className="fas fa-phone-alt me-2" style="font-size: 10px"></i> */}
              <span className="footer-link">(0252)8345 93421</span>
            </div>
            <div className="d-flex align-items-start mb-2">
              {/* <i
              className="fas fa-map-marker-alt me-2 mt-1"
              style="font-size: 10px"
            ></i> */}
              <span className="footer-link">
                2525 Michigan Ave, Sante Monica, United sates
              </span>
            </div>
            <div className="d-flex align-items-center">
              {/* <i className="fas fa-envelope me-2" style="font-size: 10px"></i> */}
              <span className="footer-link">services@nobelset.com</span>
            </div>
          </div>
          <div className="col-6 col-md-2">
            <h3 className="footer-title">Payment</h3>
            <div className="d-flex flex-column gap-2">
              <div className="payment-item">
                <img
                  alt="Paypal logo with blue text on white background"
                  height="14"
                  src="https://storage.googleapis.com/a1aa/image/068a2278-e56f-4e89-9ce7-c40c48bddb66.jpg"
                  width="20"
                />
                Paypal
              </div>
              <div className="payment-item">
                <img
                  alt="Visa logo white text on dark blue background"
                  height="14"
                  src="https://storage.googleapis.com/a1aa/image/c2acdc74-b8f1-4c7c-8d5c-7ba19f8d6afd.jpg"
                  width="20"
                />
                Visa
              </div>
              <div className="payment-item">
                <img
                  alt="Amazon Pay logo white text on dark background"
                  height="14"
                  src="https://storage.googleapis.com/a1aa/image/a747cceb-28a2-4e69-13a2-918cb84bfc19.jpg"
                  width="20"
                />
                Amazon Pay
              </div>
              <div className="payment-item">
                <img
                  alt="Gpay logo black text on white background"
                  height="14"
                  src="https://storage.googleapis.com/a1aa/image/0425e37f-52da-4140-d35b-2b24a228ffeb.jpg"
                  width="20"
                />
                Gpay
              </div>
              <div className="payment-item">
                <img
                  alt="Apple Pay logo white text on black background"
                  height="14"
                  src="https://storage.googleapis.com/a1aa/image/ddfeb162-e72a-4a69-79a1-23648f035b74.jpg"
                  width="20"
                />
                Apple Pay
              </div>
            </div>
          </div>
          <div className="col-6 col-md-2">
            <h3 className="footer-title">Download Nobelist</h3>
            <p className="download-text">
              Get Exclusive Offers, 24/7 Tech Support &amp; Feet Advatage with
              nobelist app
            </p>
            <div className="d-flex gap-2">
              <a aria-label="Get it on App Store" href="#">
                <img
                  alt="Get it on App Store black badge with white text"
                  height="35"
                  src="https://storage.googleapis.com/a1aa/image/f0b5dd03-d5e1-4ce5-09ee-7a8095c12f9b.jpg"
                  width="100%"
                />
              </a>
              <a aria-label="Get it on Google Play" href="#">
                <img
                  alt="Get it on Google Play black badge with white text"
                  height="35"
                  src="https://storage.googleapis.com/a1aa/image/1c9eba55-7697-4ff6-e651-f4eb90517f4e.jpg"
                  width="100%"
                />
              </a>
            </div>
          </div>
        </div>
        <hr className="footer-divider" />
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50"
          style={{ fontSize: "10px" }}
        >
          <div>Copyright 2025 © Nobelsets. Concept by repute</div>
          <div className="d-flex gap-3 mt-3 mt-md-0">
            <button
              aria-label="Google"
              className="social-btn"
              title="Google"
              type="button"
            >
              {/* <i className="fab fa-google"></i> */}
            </button>
            <button
              aria-label="Instagram"
              className="social-btn"
              title="Instagram"
              type="button"
            >
              {/* <i className="fab fa-instagram"></i> */}
            </button>
            <button
              aria-label="Facebook"
              className="social-btn"
              title="Facebook"
              type="button"
            >
              {/* <i className="fab fa-facebook-f"></i> */}
            </button>
            <button
              aria-label="YouTube"
              className="social-btn"
              title="YouTube"
              type="button"
            >
              {/* <i className="fab fa-youtube"></i> */}
            </button>
            <button
              aria-label="Close"
              className="social-btn close"
              title="Close"
              type="button"
            >
              {/* <i className="fas fa-times"></i> */}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeFooter;
