import React from "react";

const CommonBreadcrumb = ({
  title,
  subtitle,
  BgImage,
  center = false,
  bg_clr = false,
  content,
  pt,
  pb,
}) => {
  return (
    <section
      className={`breadcrumb__area  ${center ? "text-center" : ""} include-bg ${
        pt ? pt : "pt-30"
      } ${pb ? pb : "pb-30"} `}
      style={{ 
          backgroundImage: `url(${BgImage?.src})`,
        //   background:"linear-gradient(to right,color-mix(in srgb, #fbdccc 40%, #e09a7a),#e09a7a)",
         borderRadius:"30px", 
         color:"#b4633a"
      }}
     
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-xxl-12">
            <div
              className="breadcrumb__content p-relative z-index-1"
              style={{ textAlign: "center" }}
            >
              <h3
                className="breadcrumb__title shop-banner-title"
                style={{
                  color: "#b4633a",
                  // paddingBottom: "15px",
                }}
              >
                {title}
              </h3>
              {/* <div style={{ color: "#b4633a" }}>
                <span>
                  <a href="/">HOME</a>
                </span>{" "}
                / <span>{subtitle}</span>
              </div> */}
              {/* {content && (
                <div className="d-flex justify-content-center mt-30">
                  <p className="common-breadcrumb-content">{content}</p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonBreadcrumb;
