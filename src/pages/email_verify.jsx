import React, { useEffect, useState, useRef } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HomeFooter from "@/components/home/HomeFooter";
import { useRouter } from "next/router";
import { useVerifyEmailMutation } from "../redux/features/auth/authApi";
import HeaderSection from "@/components/home/headerSection";

const EmailVerifyPage = () => {
  const router = useRouter();
  const { email, token } = router.query;

  const [emailVerify, { isLoading }] = useVerifyEmailMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const hasVerified = useRef(false);

  useEffect(() => {
    // ✅ Wait until router is ready
    if (!router.isReady) return;

    // ✅ Ensure correct types & run only once
    if (
      typeof email === "string" &&
      typeof token === "string" &&
      !hasVerified.current
    ) {
      hasVerified.current = true;
      verifyEmail(email, token);
    }
  }, [router.isReady, email, token]);

  const verifyEmail = async (email, token) => {
    try {
      const result = await emailVerify({ email, token });

      const errors = result?.data?.confirmAccount?.errors;

      if (errors?.length > 0) {
        setErrorMessage(errors[0].message);
      } else {
        setSuccessMessage("Email verification successful. You can login");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const CommonLoader = () => (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="/assets/img/nobelset-gif-3.gif" alt="Loading..." />
    </div>
  );

  return (
    <Wrapper>
      <SEO pageTitle="Email Verification" />
      <HeaderSection />

      <div className="tp-login-input-wrapper pb-140 pt-120 common-bg">
        <div className="tp-login-input-box">
          <section className="tp-login-area pb-140 pt-120">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-8">
                  <div className="tp-login-wrapper items-center">

                    {isLoading && <CommonLoader />}

                    {!isLoading && errorMessage && (
                      <h4 style={{ color: "red", textAlign: "center" }}>
                        {errorMessage}
                      </h4>
                    )}

                    {!isLoading && successMessage && (
                      <div className="text-center">
                        <h4 style={{ color: "green" }}>{successMessage}</h4>
                        <div className="tp-login-bottom">
                          <button
                            className="gradient-btn w-100"
                            onClick={() => router.push("/login")}
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <HomeFooter />
    </Wrapper>
  );
};

export default EmailVerifyPage;
