import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
// internal
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import ButtonLoader from "../loader/button-loader";
import { FRONTEND_URL } from "@/utils/functions";

// schema
const schema = Yup.object().shape({
  firstName: Yup.string().required().label("First name"),
  lastName: Yup.string().required().label("Last name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  remember: Yup.bool()
    .oneOf([true], "You must agree to the terms and conditions to proceed.")
    .label("Terms and Conditions"),
});

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [registerUser, { isLoading: loading }] = useRegisterUserMutation();
  const router = useRouter();
  const { redirect } = router.query;
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // on submit
  const onSubmit = (data) => {
    registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      redirectUrl:`${FRONTEND_URL}/email_verify`
    }).then((result) => {
      if (result?.data?.data?.accountRegister?.errors?.length > 0) {
        notifyError(result?.data?.data?.accountRegister?.errors[0].message);
      } else {
        setTimeout(() => {
          router.push("/login");
        }, 5000);
        notifySuccess("Verification email sent! Please check your email inbox");
      }
    });
    // reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("firstName", {
                required: `First name is required!`,
              })}
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="firstName">First Name</label>
          </div>
          <ErrorMsg msg={errors.firstName?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("lastName", { required: `Last name is required!` })}
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="lastName">Last Name</label>
          </div>
          <ErrorMsg msg={errors.lastName?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: `Email is required!` })}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onInput={(e) => {
                e.target.value = e.target.value.replace(
                  /[^a-zA-Z0-9@._-]/g,
                  ""
                );
              }}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register("password", { required: `Password is required!` })}
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 character"
              />
            </div>
            <div className="tp-login-input-eye" id="password-show-toggle">
              <span className="open-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div>
      </div>
      <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
        <div className="tp-login-remeber">
          <input
            {...register("remember", {
              required: `Terms and Conditions is required!`,
            })}
            id="remember"
            name="remember"
            type="checkbox"
          />
          <label htmlFor="remember">
            I accept the <a href="terms-and-conditions">terms & conditions</a>.
          </label>
          <ErrorMsg msg={errors.remember?.message} />
        </div>
      </div>
      <div className="tp-login-bottom">
        <button type="submit" className="gradient-btn w-100">
          {loading ? <ButtonLoader /> : "Sign Up"}
        </button>
      </div>

      {/* sign in with google */}
     
      <div className="w-100 d-flex align-items-center justify-content-center my-2">
        <small className="mx-10">or</small>
      </div>

      <div className="tp-login-mail sign-in text-center">
        <span className=" tp-btn-google " style={{ gap: 10 }}>
          {/* Google icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.59 1.22 8.97 3.22l6.7-6.7C35.99 2.8 30.34 0 24 0 14.73 0 6.96 5.57 3.02 13.68l7.78 6.03C12.9 13.1 18.9 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.5 24c0-1.6-.14-2.8-.43-4H24v8h12.63c-.55 3-2.7 5.6-5.63 7.2l8.6 6.6C44.5 37 46.5 31 46.5 24z"
            />
            <path
              fill="#4A90E2"
              d="M10.8 28.7A14.9 14.9 0 0 1 9.5 24c0-1.4.25-2.8.74-4.1L3.02 13.68C1.08 16.9 0 20.37 0 24c0 3.63 1.08 7.1 3.02 10.32l7.78-6.02z"
            />
            <path
              fill="#FBBC05"
              d="M24 48c6.34 0 11.99-2.8 16.24-7.25l-8.6-6.6C30.59 33.98 27.54 35.2 24 35.2c-5.1 0-11.1-3.6-13.2-8.21L3.02 34.32C6.96 42.43 14.73 48 24 48z"
            />
          </svg>

          <span className="ps-2">Sign Up with Google</span>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
