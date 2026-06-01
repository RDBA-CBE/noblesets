import React from "react";
import Image from "next/image";
// internal
import ContactForm from "../forms/contact-form";
import Mail from "@assets/img/contact/mail.png";
import Phone from "@assets/img/contact/phone.png";
import ContactSideImage from "@assets/img/home/media/video3.png";
import Link from "next/link";
import Address from "@assets/img/contact/address.png";
import {
  FacebookFilled,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeFilled,
  PinterestOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { Email, EmailTwo, Location, LocationTwo, PhoneThree } from "@/svg";
import LocationThree from "@/svg/location-3";

const FacebookIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "#9b604d",
    }}
    icon={
      <i
        className="fab fa-facebook-f"
        style={{ fontSize: "16px", color: "#fff" }}
      ></i>
    }
  />
);

const TwitterIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "#9b604d",
    }}
    icon={
      <p style={{ color: "white", fontSize: "20px", marginTop: "5px" }}> 𝕩 </p>
    }
  />
);

const InstagramIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "#9b604d",
    }}
    icon={
      <i
        className="fab fa-instagram"
        style={{ fontSize: "16px", color: "#fff" }}
      ></i>
    } // Use a custom Instagram icon if needed
  />
);

const YoutubeIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "#9b604d",
    }}
    icon={<YoutubeFilled style={{ color: "white" }} />}
  />
);

const ThreadsIcon = () => (
  <Avatar
    shape="circle"
    style={{
      backgroundColor: "#9b604d",
    }}
    icon={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="16"
        height="16"
        viewBox="0 0 512 512"
        style={{
          enableBackground: "new 0 0 512 512",
          fontSize: "16px",
          color: "#fff",
        }}
      >
        <g>
          <path
            d="M259.965 512h-.147c-76.391-.518-135.117-25.703-174.575-74.879-35.125-43.755-53.232-104.638-53.84-180.936v-.37c.609-76.316 18.715-137.182 53.84-180.936C124.682 25.703 183.427.516 259.799 0h.295c58.56.387 107.551 15.451 145.626 44.732 35.789 27.529 60.977 66.766 74.879 116.642l-43.514 12.133C413.54 89.04 353.947 45.857 259.947 45.175c-62.064.442-108.99 19.95-139.505 57.971-28.58 35.605-43.349 87.03-43.884 152.836.553 65.825 15.322 117.25 43.884 152.837 30.516 38.019 77.441 57.526 139.505 57.969 55.941-.405 92.967-13.44 123.76-43.606 35.143-34.426 34.498-76.649 23.25-102.333-6.619-15.139-18.643-27.75-34.85-37.302-4.073 28.802-13.239 52.181-27.399 69.791-18.882 23.508-45.653 36.361-79.544 38.185-25.648 1.382-50.355-4.682-69.531-17.092-22.68-14.677-35.955-37.136-37.375-63.244-1.383-25.389 8.685-48.733 28.34-65.734 18.789-16.244 45.211-25.776 76.427-27.528 23.011-1.291 44.528-.276 64.424 3.042-2.637-15.839-7.983-28.395-15.949-37.467-10.953-12.483-27.898-18.862-50.337-19.01h-.627c-18.014 0-42.482 4.941-58.081 28.137l-37.485-25.205c20.872-31.032 54.781-48.106 95.548-48.106h.922c68.167.424 108.751 42.113 112.789 114.926 2.321.979 4.591 1.991 6.84 3.043 31.807 14.954 55.057 37.597 67.263 65.476 17.001 38.867 18.568 102.205-33.041 152.725-39.422 38.609-87.289 56.034-155.197 56.496h-.147l.018.019zm21.389-249.418c-5.163 0-10.4.147-15.748.461-39.181 2.213-63.594 20.154-62.211 45.709 1.457 26.773 30.995 39.218 59.372 37.689 26.127-1.403 60.129-11.562 65.825-79.158-14.42-3.078-30.275-4.701-47.239-4.701z"
            fill="#fff"
          />
        </g>
      </svg>
    }
  />
);

const ContactArea = () => {
  return (
    <>
      <section className="tp-contact-area mb-20 mb-lg-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="feature-main text-center mb-4 mb-md-5">
                <h5 className="sub-ti">
                  <b className="pe-1">✦ </b>Get in touch
                </h5>
                <h4 className="main-ti">Contact Us</h4>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-40 mb-lg-50">
            <div className="col-lg-6">
              <div className="row g-3 flex-column">
                <div className="col">
                  <div
                    className="tp-contact-info-item  px-4 p-relative z-index-1 h-100"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "20px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      border: "1px solid #f2efec",
                    }}
                  >
                    <div
                      className="tp-contact-info-icon mb-20"
                      style={{ display: "flex" }}
                    >
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#f6e9d9",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "12px",
                        }}
                      >
                        <MailOutlined
                          style={{
                            width: "100%",
                            height: "auto",
                            color: "#9b604d",
                          }}
                        />
                      </div>
                    </div>
                    <h5
                      className="mb-10 card-title"
                      style={{
                        fontWeight: "400",
                        color: "#7d4432",
                        fontSize: "20px",
                      }}
                    >
                      Email Address
                    </h5>
                    <p style={{ fontSize: "16px", color:"#000" }}>
                      <Link href="mailto:online@noblesets.com">
                        online@noblesets.com
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="tp-contact-info-item  px-4 p-relative z-index-1 h-100"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "20px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      border: "1px solid #f2efec",
                    }}
                  >
                    <div
                      className="tp-contact-info-icon mb-20"
                      style={{ display: "flex" }}
                    >
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#f6e9d9",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "12px",
                        }}
                      >
                        <PhoneOutlined
                          src={Phone}
                          alt="phone"
                          style={{
                            width: "100%",
                            height: "auto",
                            color: "#9b604d",
                          }}
                        />
                      </div>
                    </div>
                    <h5
                      className="mb-10"
                      style={{
                        fontWeight: "400",
                         color: "#7d4432",
                        fontSize: "20px",
                      }}
                    >
                      Phone Number
                    </h5>
                    <p style={{ fontSize: "16px", color:"#000" }}>
                      <Link href="tel:04212266885">0421 2266885</Link>
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="tp-contact-info-item  px-4 p-relative z-index-1 h-100"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "20px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      border: "1px solid #f2efec",
                    }}
                  >
                    <div
                      className="tp-contact-info-icon mb-20"
                      style={{ display: "flex" }}
                    >
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#f6e9d9",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "12px",
                        }}
                      >
                        <LocationThree
                          src={Address}
                          alt="address"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    </div>
                    <h5
                      className="mb-10"
                      style={{
                        fontWeight: "400",
                         color: "#7d4432",
                        fontSize: "20px",
                      }}
                    >
                      Our Location
                    </h5>
                    <p style={{fontSize: "16px", color:"#000" }}>
                      SREE THANGAM JEWELLERY <br />
                      78, NEW MARKET STREET, <br />
                      TIRUPPUR-641604
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="tp-contact-img w-100">
                <Image
                  src={ContactSideImage}
                  height={550}
                  alt="contact-side"
                  className="w-100 rounded-3"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          <div className="row mt-40 mt-lg-60 text-center">
            <div className="col-12">
              <h5
                className="mb-20"
                style={{  color: "#7d4432",
                        fontSize: "20px", fontWeight: "400" }}
              >
                Follow Our Journey
              </h5>
              <div className="d-flex justify-content-center gap-3">
                <Link
                  href="https://www.facebook.com/noblesets/"
                  target="_blank"
                >
                  <FacebookIcon />
                </Link>
                <Link
                  href="https://www.instagram.com/noble_sets/"
                  target="_blank"
                >
                  <InstagramIcon />
                </Link>
                {/* <Link href="https://www.threads.com/@noble_sets" target="_blank">
                   <Avatar shape="circle" style={{ backgroundColor: "#9b604d" }} icon={<PinterestOutlined style={{ color: "white" }} />} />
                </Link> */}
                <Link
                  href="https://www.threads.net/@noble_sets"
                  target="_blank"
                >
                  <ThreadsIcon />
                </Link>
                <Link
                  href="https://twitter.com/noble_sets"
                  target="_blank"
                >
                  <TwitterIcon />
                </Link>
                <Link
                  href="https://www.youtube.com/@noblesets"
                  target="_blank"
                >
                  <YoutubeIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactArea;
