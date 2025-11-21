import React from "react";

import sampleImg from "../../../public/assets/img/home/brand-img.png";
import Image from "next/image";

const BrandBanner = ({
  title,
  subtitle,
  BgImage,
  center = false,
  bg_clr = false,
  content,
  pt,
  pb,
  logo,
}) => {
  return (
    <section
      className={`brand-banner breadcrumb__area  ${
        center ? "text-center" : ""
      } `}
      // style={{
      // backgroundImage:{logo ? logo : `url(/assets/img/home/brand-img.png)`},
      //   background:"linear-gradient(to right,color-mix(in srgb, #fbdccc 40%, #e09a7a),#e09a7a)",
      // borderRadius: "30px",
      // color: "#7d4432",
      // height: "60vh",
      // }}
    >
      <Image
        src={logo ? logo : sampleImg}
        //  src="/assets/img/home/brand-img.png"

        width={800}
        height={400}
        // height={"100%"}
        // width={"100%"}
      />
    </section>
  );
};

export default BrandBanner;
