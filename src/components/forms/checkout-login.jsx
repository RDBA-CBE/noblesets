import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
// internal
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useCheckoutTokenMutation } from "@/redux/features/card/cardApi";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});
const CheckoutLoginForm = ({update}) => {

  console.log("update",update);
  
  const [showPass, setShowPass] = useState(false);

  const [loginUser, {}] = useLoginUserMutation();

  const [checkoutTokens, { data: tokens }] = useCheckoutTokenMutation();

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
  // onSubmit
  const onSubmit = (data) => {
    loginUser({
      email: data.email,
      password: data.password,
    }).then((data) => {
      if (data?.data?.data?.tokenCreate?.errors?.length > 0) {
        notifyError(data?.data?.data?.tokenCreate?.errors[0]?.message);
      } else {
        localStorage.setItem("token", data?.data.data.tokenCreate.token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            accessToken: data?.data.data.tokenCreate.token,
            user: data?.data.data.tokenCreate.user,
            refreshToken: data?.data.data.tokenCreate.refreshToken,
          })
        );
        notifySuccess("Login successfully");
        getCheckoutToken(data?.data?.data?.tokenCreate?.user?.email);
        window.location.reload();
        // update()
        // router.push(redirect || "/");
      }
    });
    reset();
  };



  const getCheckoutToken = async (email) => {
    try {
      const data = await checkoutTokens({
        email,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{
                            marginTop:"-20px",
                            color:"black",
                            fontSize:"18px",
                            fontWeight:"700",
                            cursor:"pointer",
                            textAlign:"right"
                          }}
                           onClick={() => update()}
                          >X</div>
      <div className="tp-login-input-wrapper mt-3" >
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            
            <input
              {...register("email", { required: `Email is required!` })}
              name="email"
              id="email"
              type="email"
              placeholder="nobleset@mail.com"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register("password", { required: `Password is required!` })}
                id="password"
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
            id="remeber"
            type="checkbox"
           
          />
          <label htmlFor="remeber">Remember me</label>
        </div>
        <div className="tp-login-forgot">
          <Link href="/forgot">Forgot Password?</Link>
        </div>
      </div>
      <div className="tp-login-bottom">
        <button type="submit" className="tp-btn tp-btn-border w-100">
          Login
        </button>
      </div>
    </form>
  );
};

export default CheckoutLoginForm;
