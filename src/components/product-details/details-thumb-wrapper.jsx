import React, { useState, useRef, useEffect } from "react";
import Loader from "../loader/loader";
import { profilePic } from "@/utils/constant";
import {
  UpOutlined,
  DownOutlined,
  MergeCellsOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { ArrowNextTwo, ArrowPrevTwo } from "@/svg";

const DetailsThumbWrapper = ({ product, relatedClick }) => {
  const Router = useRouter();

  const [activeImg, setActiveImg] = useState(product?.media[0] || "");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const buttonRef = useRef(null);
  const timeoutId = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // prevent background scroll
      document.body.style.overflow = "hidden";
    } else {
      // restore scroll
      document.body.style.overflow = "auto";
    }

    // cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleImageActive = (item) => {
    setActiveImg(item);
  };

  const handleNavigationClicking = (direction) => {
    const currentIndex = product?.media?.findIndex(
      (item) => item.url === activeImg?.url
    );
    let newIndex;
    if (direction === "prev") {
      newIndex =
        (currentIndex - 1 + product?.media?.length) % product?.media?.length;
    } else {
      newIndex = (currentIndex + 1) % product?.media?.length;
    }
    setActiveImg(product?.media[newIndex]);
    setPhotoIndex(newIndex);

    if (direction === "prev" && startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    } else if (
      direction === "next" &&
      startIndex < product?.media?.length - 4
    ) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handleLightboxClose = () => {
    setIsOpen(false);
  };

  const handleLightboxPrev = (e) => {
    e.stopPropagation();
    handleNavigationClicking("prev");
  };

  const handleLightboxNext = (e) => {
    e.stopPropagation();
    handleNavigationClicking("next");
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const handleClick = () => {
    relatedClick();
  };

  const isImage = (url) => {
    return /\.(jpg|webp|jpeg|png|gif)$/i.test(url);
  };

  const productImages = [
    {
      url: "/assets/img/blog.webp",
    },
    {
      url: "/assets/img/blog.webp",
    },
    {
      url: "/assets/img/blog.webp",
    },
    {
      url: "/assets/img/blog.webp",
    },
    {
      url: "/assets/img/blog.webp",
    },
  ];

  return (
    <>
      <div
        className={`tp-product-details-thumb-wrapper tp-tab d-md-flex
        w-100`}
      >
        {/* {product?.media?.length > 1 && ( */}
        {/* <nav className="product-side-nav-img p-relative">
          <div className="nav nav-tabs flex-md-column flex-nowrap justify-content-start">
            {product?.media
              ?.slice(startIndex, startIndex + 4)
              .map((item, i) => (
                <button
                  key={i + startIndex}
                  className={`nav-link ${
                    item?.url === activeImg?.url ? "active" : ""
                  }`}
                  onClick={() => handleImageActive(item)}
                  id={`image-${i}`}
                >
                  {isImage(profilePic(item?.url)) ? (
                    <figure>
                      <img
                        src={item?.url}
                        alt={item?.alt}
                        description={item?.description}
                        caption={item?.caption}
                        title={item?.title}
                        width={78}
                        height={100}
                        style={{ width: "100%", height: "100%", borderRadius:"20px" }}
                      />
                     
                    </figure>
                  ) : (
                    <figure>
                      <video
                        src={item?.url}
                        aria-label={item?.alt}
                        width={78}
                        height={100}
                        style={{ width: "100%", height: "100%" ,borderRadius:"20px" }}
                        muted
                        loop
                        description={item?.description}
                        caption={item?.caption}
                        title={item?.title}
                      />
                      
                    </figure>
                  )}
                </button>
              ))}
          </div>
          {product?.media?.length > 3 && (
            <>
              <UpOutlined
                className="prev-btn"
                onClick={() => handleNavigationClicking("prev")}
              />
              <DownOutlined
                className="next-btn"
                onClick={() => handleNavigationClicking("next")}
              />
            </>
          )}
        </nav> */}
        {product?.media?.length > 1 && (
          <nav className="product-side-nav-img p-relative">
            <div className="nav nav-tabs flex-md-column flex-nowrap justify-content-start">
              {product?.media
                ?.slice(startIndex, startIndex + 4)
                .map((item, i) => (
                  <button
                    key={i + startIndex}
                    className={`nav-link ${
                      item?.url === activeImg?.url ? "active" : ""
                    }`}
                    onClick={() => handleImageActive(item)}
                    id={`image-${i}`}
                  >
                    {isImage(profilePic(item?.url)) ? (
                      <figure>
                        <img
                          src={item?.url}
                          // alt={item?.alt}
                          // description={item?.description}
                          // caption={item?.caption}
                          // title={item?.title}
                          width={78}
                          height={100}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "20px",
                          }}
                        />
                      </figure>
                    ) : (
                      <figure>
                        <video
                          // src="/assets/img/blog.webp"
                          src={item?.url}
                          aria-label={item?.alt}
                          width={78}
                          height={100}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "20px",
                          }}
                          muted
                          loop
                          description={item?.description}
                          caption={item?.caption}
                          title={item?.title}
                        />
                      </figure>
                    )}
                  </button>
                ))}
            </div>
            {product?.media?.length > 3 && (
              <>
                <UpOutlined
                  className="prev-btn"
                  onClick={() => handleNavigationClicking("prev")}
                />
                <DownOutlined
                  className="next-btn"
                  onClick={() => handleNavigationClicking("next")}
                />
              </>
            )}
          </nav>
        )}

        <div className={`tab-content m-img full-width-image`}>
          <div className="tab-pane fade show active">
            <div
              className="tp-product-details-nav-main-thumb p-relative"
              style={{ borderRadius: "20px" }}
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  <div
                    style={{ cursor: "zoom-in", borderRadius: "20px" }}
                    onClick={() => setIsOpen(true)}
                  >
                    {isImage(profilePic(activeImg?.url)) ? (
                      <figure
                        className="detail-single-image"
                        style={{ marginBottom: "0px", borderRadius: "20px" }}
                      >
                        <img
                          className="product-details-image"
                          // src="/assets/img/blog.webp"
                          description={activeImg?.description}
                          caption={activeImg?.caption}
                          title={activeImg?.title}
                          src={profilePic(activeImg?.url)}
                          alt={activeImg.alt}
                          onLoad={() => setLoading(false)}
                          onError={() => setLoading(false)}
                          style={{ borderRadius: "20px" }}
                        />
                        {/* <img
                          className="product-details-image"
                          description={activeImg?.description}
                          caption={activeImg?.caption}
                          title={activeImg?.title}
                          src={profilePic(activeImg?.url)}
                          alt={activeImg.alt}
                          onLoad={() => setLoading(false)}
                          onError={() => setLoading(false)}
                          
                        /> */}

                        {/* already commented */}

                        {/* <figcaption className="hidden-for-seo">
                          <strong>{activeImg?.title}</strong> 
                          <p>{activeImg?.description}</p>
                          <em>{activeImg?.caption}</em> 
                        </figcaption> */}

                        {/* already commented */}
                      </figure>
                    ) : (
                      <figure
                        style={{ marginBottom: "0px" }}
                        className="detail-single-image"
                      >
                        <video
                          className="product-details-image"
                          src="/assets/img/blog.webp"
                          // src={activeImg?.url}
                          autoPlay
                          muted // Ensure it's muted to autoplay without user interaction
                          loop // Ensure it loops indefinitely
                          playsInline // Ensure it plays inline on iOS devices
                          onLoadedData={() => setLoading(false)}
                          onError={() => setLoading(false)}
                          aria-label={activeImg?.alt}
                          description={activeImg?.description}
                          caption={activeImg?.caption}
                          title={activeImg?.title}
                        />
                        {/* <figcaption className="hidden-for-seo">
                          <strong>{activeImg?.title}</strong> 
                          <p>{activeImg?.description}</p> 
                          <em>{activeImg?.caption}</em> 
                        </figcaption> */}
                      </figure>
                    )}
                  </div>
                  {Router.route == "/gift-card" ? (
                    <></>
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }}
                    >
                      <button
                        className={`animated-button ${hover ? "hover" : ""}`}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={handleClick}
                      >
                        <span className="icon">
                          <MergeCellsOutlined stytle={{ fontSize: "18px" }} />
                        </span>
                        <span className="text ms-2">Similar Product</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="lightbox"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            overflow: "hidden",
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleLightboxClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "#a4420094",

              color: "#dad4d4ff",
              border: "none",
              fontSize: "15px",

              cursor: "pointer",
              padding: "5px 14px",
              borderRadius: "50%",
            }}
          >
            <i className="fal fa-times"></i>
          </button>

          {/* Thumbnails Left Side */}
          <div
            className="d-none d-lg-flex"
            style={{
              position: "absolute",
              left: "40px",
              top: "100px",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {product?.media?.map((item, idx) => (
              <img
                key={idx}
                src={profilePic(item?.url) || item?.url}
                alt="thumb"
                onClick={() => setPhotoIndex(idx)}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border:
                    idx === photoIndex
                      ? "2px solid white"
                      : "2px solid transparent",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {/* Prev Button */}
          <button
          className="action-btn-le"
            onClick={handleLightboxPrev}
            style={{
              fontSize: "15px",
              background: "#a4420094",
              padding: "10px 15px",
              color: "#dad4d4ff",
              borderRadius: "50%",
              border: "none",
              position: "absolute",
              left: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            <ArrowPrevTwo />
          </button>

          {/* Main Image / Video */}
          <div
          // style={{ maxWidth: "70%", maxHeight: "80%" }}
          >
            {isImage(product?.media[photoIndex]?.url) ? (
              <img
                src={
                  profilePic(product?.media[photoIndex]?.url) ||
                  product?.media[photoIndex]?.url
                }
                alt="Lightbox"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <video
                src={
                  profilePic(product?.media[photoIndex]?.url) ||
                  product?.media[photoIndex]?.url
                }
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
                controls
              />
            )}
          </div>

          {/* Next Button */}
          <button
          className="action-btn-ri"
            onClick={handleLightboxNext}
            style={{
              fontSize: "15px",
              background: "#a4420094",
              padding: "10px 15px",
              color: "#dad4d4ff",
              borderRadius: "50%",
              border: "none",
              position: "absolute",
              right: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            <ArrowNextTwo />
          </button>
        </div>
      )}
    </>
  );
};

export default DetailsThumbWrapper;
