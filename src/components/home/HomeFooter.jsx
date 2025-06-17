import { Email, EmailTwo, Location, Phone, PhoneTwo } from "@/svg";
import { useRouter } from "next/router";
import React from "react";

const HomeFooter = () => {
  const router = useRouter();
  return (
    // <div style={{ backgroundColor: "#e09a7b" }}>
    <div style={{ background: "url(/assets/img/footer/bg.jpg)" }}>
      <footer className="container-fluid pt-50 text-white px-0">
        <div className="row justify-content-center ">
          <div className="col-11 col-xl-11">
            <div className="row gy-4 ">
              <div className="col-12  col-xl-3">
                <div className="footer-subtitle mb-0">
                  {/* <i className="fas fa-times"></i> */}
                  <h3 className=" text-white sub-ti mt-1" style={{fontSize:"16px", marginBottom:"1.3rem"}}><b style={{color:"#fff9"}}>✦</b> Newsletter</h3>
                </div>
                <h2 className="h3  text-white mb-5 main-ti">
                  Subscribe Today
                </h2>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      // className={className}
                      style={{ width: "20px", height: "20px" }}
                      // {...props}
                    >
                      <path d="M19.9,56.2L2.7,87.3c-0.3,0.5-0.2,1.2,0.2,1.6c0.4,0.5,1,0.6,1.6,0.4l92.2-37c0.5-0.2,0.9-0.7,0.9-1.3 c0-0.6-0.3-1.1-0.9-1.3l-92.2-37c-0.6-0.2-1.2-0.1-1.6,0.4c-0.4,0.5-0.5,1.1-0.2,1.6l17.2,31.1l43.7,4.7c0.3,0,0.6,0.2,0.6,0.5 c0,0.3-0.2,0.5-0.6,0.5L19.9,56.2L19.9,56.2z" />
                    </svg>
                    {/* <i className="fas fa-arrow-right"></i> */}
                  </button>
                </form>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="termsCheck"
                    required=""
                    type="checkbox"
                    style={{ marginTop: "6px" }}
                  />
                  <label
                    className="form-check-label checkbox-label "
                    for="termsCheck"
                  >
                    I Agree with the terms &amp; Conditions
                  </label>
                </div>
              </div>
              <div className="col-6 col-lg-3 col-xl-2 ps-xl-5">
                <h3 className="footer-title">Useful Links</h3>
                <nav className="nav flex-column">
                  <a className="footer-link mb-4" href="/our-story">
                    Our Story
                  </a>
                  <a className="footer-link mb-4" href="/legal-policies">
                    Legal Policies
                  </a>
                  <a className="footer-link mb-4" href="/terms-and-conditions">
                    Terms and conditions
                  </a>
                  <a className="footer-link mb-4" href="/loyalty-programs">
                    Loyalty Programs
                  </a>
                  <a className="footer-link mb-4" href="/faq">
                    Help &amp; FAQS
                  </a>
                  {/* <a className="footer-link" href="#">
                    Testimonials
                  </a> */}
                </nav>
              </div>
              <div className="col-6 col-lg-3 col-xl-2">
                <h3 className="footer-title">Contact Us</h3>
                <div className="d-flex align-items-center mb-4 cursor-pointer">
                  {/* <i className="fas fa-phone me-2" style="font-size: 10px"></i> */}
                  <PhoneTwo />

                  <span className="footer-link ps-2 ">
                    <a href="tellto:(0252)8345 93421"> 0421-2266885</a>
                   
                    </span>
                </div>
                <div className="d-flex align-items-start mb-4">
                  {/* <i
              className="fas fa-map-marker-alt me-2 mt-1"
              style="font-size: 10px"
            ></i> */}
                  <Location />
                  <span className="footer-link ps-2">
                  
                   78, New Market Street, <br /> Tiruppur-641604 <br />
                  
                  </span>
                </div>
                <div className="d-flex align-items-center cursor-pointer">
                  {/* <i className="fas fa-envelope me-2" style="font-size: 10px"/> */}
                  {/* <i class="fa-regular fa-envelope" style={{fontSize:"18px"}}></i> */}
                  <EmailTwo />
                  <span className="footer-link ps-2">
                    <a href="mailto:services@nobleset.com">services@noblesets.com</a>
                    
                  </span>
                </div>
              </div>
              <div className="col-6  col-lg-3 col-xl-2">
                <h3 className="footer-title">Payment</h3>
                <div className="d-flex flex-column gap-4">
                  <div className="payment-item">
                    <img
                      alt="Paypal logo with blue text on white background"
                      height="14"
                      src="/assets/img/footer/payment-2.png"
                      width="30"
                      className="me-2"
                    />
                    Paypal
                  </div>
                  <div className="payment-item">
                    <img
                      alt="Visa logo white text on dark blue background"
                      height="14"
                      src="/assets/img/footer/payment-3.png"
                      width="20"
                      className="me-2"
                    />
                    Visa
                  </div>
                  <div className="payment-item">
                    <img
                      alt="Amazon Pay logo white text on dark background"
                      height="14"
                      src="/assets/img/footer/payment-4.png"
                      width="20"
                      className="me-2"
                    />
                    Amazon Pay
                  </div>
                  <div className="payment-item">
                    <img
                      alt="Gpay logo black text on white background"
                      height="14"
                      src="/assets/img/footer/payment-5.png"
                      width="20"
                      className="me-2"
                    />
                    Gpay
                  </div>
                  <div className="payment-item">
                    <img
                      alt="Apple Pay logo white text on black background"
                      height="14"
                      src="/assets/img/footer/payment-1.png"
                      width="20"
                      className="me-2"
                    />
                    Apple Pay
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3 col-xl-3 ">
                <h3 className="footer-title">Download Noblesets</h3>
                <p className="download-text pb-3 pb-xl-4 pe-5">
                  Get Exclusive Offers, 24/7 Tech Support <br /> &amp; Feet Advatage
                  with noblesets app
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <a className="" aria-label="Get it on App Store" href="#">
                    <img
                      alt="Get it on App Store black badge with white text"
                      height="50"
                      src="/assets/img/footer/app-store-icon.png"
                      width="150"
                      style={{ borderRadius: "10px", objectFit: "cover" }}
                    />
                  </a>
                  <a className="" aria-label="Get it on Google Play" href="#">
                    <img
                      alt="Get it on Google Play black badge with white text"
                      height="50"
                      src="/assets/img/footer/g-pay-icon.png"
                      width="150"
                      style={{ borderRadius: "10px", objectFit: "cover" }}
                    />
                  </a>
                </div>
              </div>
            </div>
            <hr className="footer-divider " />
            <div
              className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white"
              style={{ fontSize: "16px" }}
            >
              <div className="copyright">Copyright 2025 © Noblesets. Concept by repute</div>
              <div className="d-flex gap-3 mt-3 mt-md-0">
                <button
                  aria-label="Google"
                  className="social-btn"
                  title="Google"
                  type="button"
                  onClick={() =>
                    window.open("https://www.threads.net/@noble_sets")
                  }
                >
                  {/* <i className="fab fa-google" style={{fontSize:"16px", color:"#000"}}></i> */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                    style={{ enableBackground: "new 0 0 512 512" }}
                  >
                    <g>
                      <path
                        d="M259.965 512h-.147c-76.391-.518-135.117-25.703-174.575-74.879-35.125-43.755-53.232-104.638-53.84-180.936v-.37c.609-76.316 18.715-137.182 53.84-180.936C124.682 25.703 183.427.516 259.799 0h.295c58.56.387 107.551 15.451 145.626 44.732 35.789 27.529 60.977 66.766 74.879 116.642l-43.514 12.133C413.54 89.04 353.947 45.857 259.947 45.175c-62.064.442-108.99 19.95-139.505 57.971-28.58 35.605-43.349 87.03-43.884 152.836.553 65.825 15.322 117.25 43.884 152.837 30.516 38.019 77.441 57.526 139.505 57.969 55.941-.405 92.967-13.44 123.76-43.606 35.143-34.426 34.498-76.649 23.25-102.333-6.619-15.139-18.643-27.75-34.85-37.302-4.073 28.802-13.239 52.181-27.399 69.791-18.882 23.508-45.653 36.361-79.544 38.185-25.648 1.382-50.355-4.682-69.531-17.092-22.68-14.677-35.955-37.136-37.375-63.244-1.383-25.389 8.685-48.733 28.34-65.734 18.789-16.244 45.211-25.776 76.427-27.528 23.011-1.291 44.528-.276 64.424 3.042-2.637-15.839-7.983-28.395-15.949-37.467-10.953-12.483-27.898-18.862-50.337-19.01h-.627c-18.014 0-42.482 4.941-58.081 28.137l-37.485-25.205c20.872-31.032 54.781-48.106 95.548-48.106h.922c68.167.424 108.751 42.113 112.789 114.926 2.321.979 4.591 1.991 6.84 3.043 31.807 14.954 55.057 37.597 67.263 65.476 17.001 38.867 18.568 102.205-33.041 152.725-39.422 38.609-87.289 56.034-155.197 56.496h-.147l.018.019zm21.389-249.418c-5.163 0-10.4.147-15.748.461-39.181 2.213-63.594 20.154-62.211 45.709 1.457 26.773 30.995 39.218 59.372 37.689 26.127-1.403 60.129-11.562 65.825-79.158-14.42-3.078-30.275-4.701-47.239-4.701z"
                        fill="#000000"
                      />
                    </g>
                  </svg>
                </button>
                <button
                  aria-label="Instagram"
                  className="social-btn"
                  title="Instagram"
                  type="button"
                  onClick={() =>
                    window.open("https://www.instagram.com/noble_sets/")
                  }
                >
                  <i
                    className="fab fa-instagram"
                    style={{ fontSize: "16px", color: "#000" }}
                  ></i>
                </button>
                <button
                  aria-label="Facebook"
                  className="social-btn"
                  title="Facebook"
                  type="button"
                  onClick={() =>
                    window.open("https://www.facebook.com/noblesets/")
                  }
                >
                  <i
                    className="fab fa-facebook-f"
                    style={{ fontSize: "16px", color: "#000" }}
                  ></i>
                </button>
                <button
                  aria-label="YouTube"
                  className="social-btn"
                  title="YouTube"
                  type="button"
                  onClick={() =>
                    window.open("https://www.youtube.com/@noblesets")
                  }
                >
                  <i
                    className="fab fa-youtube"
                    style={{ fontSize: "16px", color: "#000" }}
                  ></i>
                </button>
                <button
                  aria-label="Close"
                  className="social-btn close"
                  title="Close"
                  type="button"
                  style={{ color: "#000", fontSize: "20px" }}
                  onClick={() => window.open("https://twitter.com/noble_sets")}
                >
                  {/* <i className="fas fa-times" style={{fontSize:"16px",color:"#000"}}></i> */}
                  {/* <i class="fa-brands fa-x-twitter"></i> */}
                  𝕩
                </button>
              </div>
            </div>

            <div
              className="d-flex justify-content-center mt-4"
              // style={{height:"330px",overflow:"hidden"}}
            >
              {/* <div> */}
              <img
                src="/assets/img/footer/logo-opt-2.png"
                alt=""
                style={{
                  width: "70%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              {/* </div> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeFooter;
