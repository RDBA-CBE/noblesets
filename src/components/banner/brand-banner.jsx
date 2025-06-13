import React from "react";

const BrandBanner = ({
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
        pt ? pt : "pt-50"
      } ${pb ? pb : "pb-50"} `}
      style={{ 
          backgroundImage: `url(/assets/img/home/brand-img.png)`,
        //   background:"linear-gradient(to right,color-mix(in srgb, #fbdccc 40%, #e09a7a),#e09a7a)",
         borderRadius:"30px", 
         color:"#b4633a",
         height:"60%"
      }}
     
    >
     
    </section>
  );
};

export default BrandBanner;
