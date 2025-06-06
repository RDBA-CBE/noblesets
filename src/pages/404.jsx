import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import error from "@assets/img/error/error.png";
import HomeFooter from "@/components/home/HomeFooter";
import HeaderSection from "@/components/home/headerSection";

const ErrorPage = () => {
  return (
    <Wrapper>
      {/* <SEO pageTitle="404" /> */}
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />

      {/* 404 area start */}
      <section className="tp-error-area pt-110 pb-110">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="tp-error-content text-center">
                <div className="tp-error-thumb">
                  <Image src={error} alt="error img" />
                </div>

                <h3 className="tp-error-title">Oops! Page not found</h3>
                <p>
                  Whoops, this is embarrassing. Looks like the page you were
                  looking for was not found.
                </p>

                <Link href="/" className="tp-error-btn">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 404 area end */}
      <HomeFooter />
    </Wrapper>
  );
};

export default ErrorPage;
