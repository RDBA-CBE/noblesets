import { Email, EmailTwo, Location, Phone, PhoneTwo } from "@/svg";
import React from "react";

const HomeFooter = () => {
  return (
    // <div style={{ backgroundColor: "#e09a7b" }}>
      <div style={{ background:"url(/assets/img/footer/bg.jpg)"}}>
      
      <footer className="container-fluid pt-50 text-white">
        <div className="row justify-content-center ">
        <div className="col-11 col-xl-10">
        <div className="row gy-4 ">
          <div className="col-12  col-xl-3">
            <div className="footer-subtitle mb-2">
              {/* <i className="fas fa-times"></i> */}
              <h3 className=" text-white">Newsletter</h3>
            </div>
            <h2 className="h3 fw-normal text-white mb-4 main-ti">Subscribe Today</h2>
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
    style={{width: "20px", height: "20px"  }}
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
                style={{marginTop:"6px"}}
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
              <a className="footer-link mb-3" href="#">
                Our Story
              </a>
              <a className="footer-link mb-3" href="#">
                Legal Policies
              </a>
              <a className="footer-link mb-3" href="#">
                Download App
              </a>
              <a className="footer-link mb-3" href="#">
                Loyalty Programs
              </a>
              <a className="footer-link mb-3" href="#">
                Help &amp; FAQS
              </a>
              <a className="footer-link" href="#">
                Testimonials
              </a>
            </nav>
          </div>
          <div className="col-6 col-lg-3 col-xl-2">
            <h3 className="footer-title">Contact Us</h3>
            <div className="d-flex align-items-center mb-3">
              {/* <i className="fas fa-phone me-2" style="font-size: 10px"></i> */}
              <PhoneTwo/>
              
              <span className="footer-link ps-2">(0252)8345 93421</span>
            </div>
            <div className="d-flex align-items-start mb-3">
              {/* <i
              className="fas fa-map-marker-alt me-2 mt-1"
              style="font-size: 10px"
            ></i> */}
            <Location/>
              <span className="footer-link ps-2">
                2525 Michigan Ave, <br /> Sante Monica, <br />United sates
              </span>
            </div>
            <div className="d-flex align-items-center">
              {/* <i className="fas fa-envelope me-2" style="font-size: 10px"/> */}
              {/* <i class="fa-regular fa-envelope" style={{fontSize:"18px"}}></i> */}
              <EmailTwo/>
              <span className="footer-link ps-2">services@nobelset.com</span>
            </div>
          </div>
          <div className="col-6  col-lg-3 col-xl-2">
            <h3 className="footer-title">Payment</h3>
            <div className="d-flex flex-column gap-3">
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
          <div className="col-6 col-lg-3 col-xl-3">
            <h3 className="footer-title">Download Nobelist</h3>
            <p className="download-text ">
              Get Exclusive Offers, 24/7 Tech Support &amp; Feet Advatage with
              nobelist app
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <a className="" aria-label="Get it on App Store" href="#">
                <img
                  alt="Get it on App Store black badge with white text"
                  height="50"
                  src="/assets/img/footer/app-store-icon.png"
                  width="150"
                  style={{borderRadius:"10px", objectFit:"cover"}}
                />
              </a>
              <a className="" aria-label="Get it on Google Play" href="#">
                <img
                  alt="Get it on Google Play black badge with white text"
                  height="50"
                  src="/assets/img/footer/g-pay-icon.png"
                  width="150"
                  style={{borderRadius:"10px", objectFit:"cover"}}
                />
              </a>
            </div>
          </div>
        </div>
        <hr className="footer-divider" />
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white"
          style={{ fontSize: "16px" }}
        >
          <div>Copyright 2025 © Nobelsets. Concept by repute</div>
          <div className="d-flex gap-3 mt-3 mt-md-0">
            <button
              aria-label="Google"
              className="social-btn"
              title="Google"
              type="button"
            >
              <i className="fab fa-google" style={{fontSize:"16px", color:"#000"}}></i>
            </button>
            <button
              aria-label="Instagram"
              className="social-btn"
              title="Instagram"
              type="button"
            >
              <i className="fab fa-instagram" style={{fontSize:"16px",color:"#000"}}></i>
            </button>
            <button
              aria-label="Facebook"
              className="social-btn"
              title="Facebook"
              type="button"
            >
              <i className="fab fa-facebook-f" style={{fontSize:"16px",color:"#000"}}></i>
            </button>
            <button
              aria-label="YouTube"
              className="social-btn"
              title="YouTube"
              type="button"
            >
              <i className="fab fa-youtube" style={{fontSize:"16px",color:"#000"}}></i>
            </button>
            <button
              aria-label="Close"
              className="social-btn close"
              title="Close"
              type="button"
              style={{color:"#000",fontSize:"20px"}}
            >
              {/* <i className="fas fa-times" style={{fontSize:"16px",color:"#000"}}></i> */}
              {/* <i class="fa-brands fa-x-twitter"></i> */}
              𝕩
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-center" 
        // style={{height:"330px",overflow:"hidden"}}
        >
          {/* <div> */}
            <img src="/assets/img/footer/logo-opt-2.png" alt="" style={{width:"70%",height:"100%",objectFit:"cover",objectPosition:"top"}}/>
          {/* </div> */}
        </div>
        </div>
        </div>
    
      </footer>
     
     
    </div>
  );
};

export default HomeFooter;
