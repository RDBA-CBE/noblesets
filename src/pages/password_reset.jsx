import React, { useEffect, useState } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import HomeFooter from "@/components/home/HomeFooter";
import LoginShapes from "../components/login-register/login-shapes";
import Link from "next/link";
import ErrorMsg from "../components/common/error-msg";
import { CloseEye, OpenEye } from "@/svg";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// internal
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import ButtonLoader from "../components/loader/button-loader";
import HeaderSection from "@/components/home/headerSection";
import { useRouter } from "next/router";

const ForgotPage = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();

  const [resetPassword, { isLoading: loading }] = useResetPasswordMutation();

  // schema
  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "New Password must be at least 8 character"),
    
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      let email = urlParams.get("email");
      let token = urlParams.get("token");
      setEmail(email);
      setToken(token);
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = (data) => {
    resetPassword({
      email: email,
      password: data?.newPassword,
      token,
    }).then((result) => {
      const res = result?.data?.data?.setPassword;
      if (res?.errors?.length > 0) {
        notifyError(res?.errors[0]?.message);
      } else {
        notifySuccess("Password reset successfully");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    });
    reset();
  };
  return (
    <Wrapper>
      <SEO pageTitle="Reset Password" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />
{/* 
      <CommonBreadcrumb
        title="Forgot Password"
        subtitle="Reset Password"
        center={true}
        pt={"0px"}
        pb={"0px"}
      /> */}
      <section className="tp-login-area pb-140 pt-120 p-relative z-index-1 fix" style={{background:"#fff9f4"}}>
        {/* <LoginShapes /> */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="tp-login-wrapper">
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title">Reset Password</h3>
                </div>
                <div className="tp-login-option">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="tp-login-input-wrapper">
                      <div className="tp-login-input-box mb-30">
                        <div className="p-relative">
                          <div className="tp-login-input">
                            <input
                              {...register("newPassword", {
                                required: `New Password is required!`,
                              })}
                              name="newPassword"
                              id="newPassword"
                              type={showNewPassword ? "text" : "password"}
                            />
                          </div>
                          <div
                            className="tp-login-input-eye"
                            id="password-show-toggle"
                          >
                            <span
                              className="open-eye"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? <CloseEye /> : <OpenEye />}
                            </span>
                          </div>

                          <div className="tp-login-input-title">
                            <label htmlFor="new_pass">New Password</label>
                          </div>
                        </div>
                        <ErrorMsg msg={errors.newPassword?.message} />
                      </div>
                    </div>
                    <div className="tp-login-input-wrapper">
                      <div className="tp-login-input-box">
                        <div className="p-relative">
                          <div className="tp-login-input">
                            <input
                              {...register("confirmPassword")}
                              name="confirmPassword"
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                            />
                          </div>
                          <div
                            className="tp-login-input-eye"
                            id="password-show-toggle"
                          >
                            <span
                              className="open-eye"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? <CloseEye /> : <OpenEye />}
                            </span>
                          </div>
                          <div className="tp-login-input-title">
                            <label htmlFor="confirmPassword">
                              Confirm Password
                            </label>
                          </div>
                        </div>
                        <ErrorMsg msg={errors.confirmPassword?.message} />
                      </div>
                    </div>
                    <div className="tp-login-bottom mb-15 mt-25">
                      <button type="submit" className="gradient-btn w-100">
                        {loading ? <ButtonLoader /> : "Submit"}
                      </button>
                    </div>
                  </form>
                  <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-center">
                    <div className="tp-login-forgot">
                      <span>
                        Remeber Passowrd? <Link href="/login"> Login</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />
    </Wrapper>
  );
};

export default ForgotPage;
