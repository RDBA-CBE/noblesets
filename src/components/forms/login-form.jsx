// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { useRouter } from "next/router";
// import Link from "next/link";
// // internal
// import { CloseEye, OpenEye } from "@/svg";
// import ErrorMsg from "../common/error-msg";
// import { useLoginUserMutation } from "@/redux/features/auth/authApi";
// import { notifyError, notifySuccess } from "@/utils/toast";
// import {
//   useAddToCartMutation,
//   useCheckoutTokenMutation,
// } from "@/redux/features/card/cardApi";
// import {
//   useAddWishlistMutation,
//   useWishlistMutation,
// } from "@/redux/features/productApi";
// import { useDispatch, useSelector } from "react-redux";
// import { cart_list } from "@/redux/features/cartSlice";
// import { useCheckoutTokenEmailUpdatesMutation } from "../../redux/features/card/cardApi";
// import ButtonLoader from "../loader/button-loader";
// import { userLoggedIn } from "@/redux/features/auth/authSlice";

// // schema
// const schema = Yup.object().shape({
//   email: Yup.string().required().email().label("Email"),
//   password: Yup.string().required().min(5).label("Password"),
// });
// const LoginForm = () => {
//   const [showPass, setShowPass] = useState(false);

//   const cart = useSelector((state) => state.cart.cart_list);

//   const dispatch = useDispatch();

//   const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

//   const [addWishlist, {}] = useAddWishlistMutation();

//   const [checkoutTokens, { data: tokens }] = useCheckoutTokenMutation();
//   const [checkoutTokenEmailUpdate] = useCheckoutTokenEmailUpdatesMutation();

//   const [addToCartMutation, { data: productsData, isError, isLoading }] =
//     useAddToCartMutation();

//   const router = useRouter();
//   const { redirect } = router.query;
//   // react hook form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   // onSubmit
//   const onSubmit = (data) => {
//     loginUser({
//       email: data.email,
//       password: data.password,
//     }).then(async (data) => {
//       // let whishlist = localStorage.getItem("whishlist");

//       if (data?.data?.data?.tokenCreate?.errors?.length > 0) {
//         notifyError(data?.data?.data?.tokenCreate?.errors[0]?.message);
//       } else {
//         // if (!whishlist) {
//         //   whishlist = [];
//         // } else {
//         //   whishlist = JSON.parse(whishlist);
//         //   if (whishlist?.length > 0) {
//         //     whishlist.map((item) =>
//         //       wishlistData(data?.data?.data?.tokenCreate, item.node)
//         //     );
//         //   }
//         // }
//         //For india channel
//         localStorage.setItem("token", data?.data.data.tokenCreate.token);
//         localStorage.setItem(
//           "userInfo",
//           JSON.stringify({
//             accessToken: data?.data.data.tokenCreate.token,
//             user: data?.data.data.tokenCreate.user,
//             refreshToken: data?.data.data.tokenCreate.refreshToken,
//           })
//         );
//         dispatch(
//           userLoggedIn({
//             accessToken: data?.data.data.token,
//             user: data?.data.data.user,
//           })
//         );
//         const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
//         if (!checkoutTokenINR || checkoutTokenINR === "undefined") {
//           createCheckoutTokenINR(data?.data?.data?.tokenCreate?.user?.email);
//         } else {
//           await checkoutTokenEmailUpdate({
//             email: data?.data?.data?.tokenCreate?.user?.email,
//             checkoutToken: checkoutTokenINR,
//           });
//         }

//         //For default channel
//         const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
//         if (!checkoutTokenUSD || checkoutTokenUSD === "undefined") {
//           createCheckoutTokenUSD(data?.data?.data?.tokenCreate?.user?.email);
//         } else {
//           await checkoutTokenEmailUpdate({
//             email: data?.data?.data?.tokenCreate?.user?.email,
//             checkoutToken: checkoutTokenUSD,
//           });
//           // if (cart?.length > 0) {
//           //   cart?.map((item) =>
//           //     handleAddProduct(checkoutTokenUSD, item?.variant.id)
//           //   );
//           // }
//         }
//         router.push(redirect || "/");
//         notifySuccess("Login successfully");
//       }
//     });
//     reset();
//   };

//   // const wishlistData = async (user, data) => {
//   //   try {
//   //     const input = {
//   //       input: {
//   //         user: user.user.id,
//   //         variant: data.id,
//   //       },
//   //     };
//   //     const res = await addWishlist(input);
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // };

//   const createCheckoutTokenINR = async (email) => {
//     try {
//       const data = await checkoutTokens({
//         email,
//         channel: "india-channel",
//       });
//       localStorage.setItem(
//         "checkoutTokenINR",
//         data?.data?.data?.checkoutCreate?.checkout?.token
//       );
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const createCheckoutTokenUSD = async (email) => {
//     try {
//       const data = await checkoutTokens({
//         email,
//         channel: "default-channel",
//       });
//       localStorage.setItem(
//         "checkoutTokenUSD",
//         data?.data?.data?.checkoutCreate?.checkout?.token
//       );
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleAddProduct = async (checkoutToken, id) => {
//     try {
//       const response = await addToCartMutation({
//         checkoutToken: checkoutToken,
//         variantId: id,
//       });
//       if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
//         const err = response.data?.data?.checkoutLinesAdd?.errors[0]?.message;
//         notifyError(err);
//         // dispatch(cart_list(cart));
//       } else {
//         // notifySuccess(`${product.node.name} added to cart successfully`);
//         // cart_list.push
//         // dispatch(
//         //   cart_list(response?.data?.data?.checkoutLinesAdd?.checkout?.lines)
//         // );
//         // updateData();
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="tp-login-input-wrapper">
//         <div className="tp-login-input-box">
//           <div className="tp-login-input">
//             <input
//               {...register("email", { required: `Email is required!` })}
//               name="email"
//               id="email"
//               type="email"
//               placeholder="nobleset@mail.com"
//               onInput={(e) => {
//                 e.target.value = e.target.value.replace(
//                   /[^a-zA-Z0-9@._-]/g,
//                   ""
//                 );
//               }}
//               pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
//             />
//           </div>
//           <div className="tp-login-input-title">
//             <label htmlFor="email">Your Email</label>
//           </div>
//           <ErrorMsg msg={errors.email?.message} />
//         </div>
//         <div className="tp-login-input-box">
//           <div className="p-relative">
//             <div className="tp-login-input">
//               <input
//                 {...register("password", { required: `Password is required!` })}
//                 id="password"
//                 type={showPass ? "text" : "password"}
//                 placeholder="Min. 8 character"
//               />
//             </div>
//             <div className="tp-login-input-eye" id="password-show-toggle">
//               <span className="open-eye" onClick={() => setShowPass(!showPass)}>
//                 {showPass ? <CloseEye /> : <OpenEye />}
//               </span>
//             </div>
//             <div className="tp-login-input-title">
//               <label htmlFor="password">Password</label>
//             </div>
//           </div>
//           <ErrorMsg msg={errors.password?.message} />
//         </div>
//       </div>
//       <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
//         <div className="tp-login-remeber">
//           <input id="remeber" type="checkbox" />
//           <label htmlFor="remeber">Remember me</label>
//         </div>
//         <div className="tp-login-forgot">
//           <Link href="/forgot">Forgot Password?</Link>
//         </div>
//       </div>
//       <div className="tp-login-bottom">
//         <button type="submit" className=" w-100 tp-btn tp-btn-border">
//           {loginLoading ? <ButtonLoader /> : "Login"}
//         </button>
//       </div>

//       {/* sign in with google */}

//       <div className="w-100 d-flex align-items-center justify-content-center my-2">
//         <small className="mx-10">or</small>
//       </div>

//       <div className="tp-login-mail sign-in text-center">
//         <span className=" tp-btn-google " style={{ gap: 10 }}>
//           {/* Google icon */}
//           <svg
//             width="18"
//             height="18"
//             viewBox="0 0 48 48"
//             xmlns="http://www.w3.org/2000/svg"
//             aria-hidden="true"
//             focusable="false"
//           >
//             <path
//               fill="#EA4335"
//               d="M24 9.5c3.54 0 6.59 1.22 8.97 3.22l6.7-6.7C35.99 2.8 30.34 0 24 0 14.73 0 6.96 5.57 3.02 13.68l7.78 6.03C12.9 13.1 18.9 9.5 24 9.5z"
//             />
//             <path
//               fill="#34A853"
//               d="M46.5 24c0-1.6-.14-2.8-.43-4H24v8h12.63c-.55 3-2.7 5.6-5.63 7.2l8.6 6.6C44.5 37 46.5 31 46.5 24z"
//             />
//             <path
//               fill="#4A90E2"
//               d="M10.8 28.7A14.9 14.9 0 0 1 9.5 24c0-1.4.25-2.8.74-4.1L3.02 13.68C1.08 16.9 0 20.37 0 24c0 3.63 1.08 7.1 3.02 10.32l7.78-6.02z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M24 48c6.34 0 11.99-2.8 16.24-7.25l-8.6-6.6C30.59 33.98 27.54 35.2 24 35.2c-5.1 0-11.1-3.6-13.2-8.21L3.02 34.32C6.96 42.43 14.73 48 24 48z"
//             />
//           </svg>

//           <span className="ps-2">Sign in with Google</span>
//         </span>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";

// google captcha
// import ReCAPTCHA from "react-google-recaptcha";

import Captcha from "captcha-mini";

// internal
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import {
  useAddToCartMutation,
  useCheckoutTokenMutation,
} from "@/redux/features/card/cardApi";
import {
  useAddWishlistMutation,
  useWishlistMutation,
} from "@/redux/features/productApi";
import { useDispatch, useSelector } from "react-redux";
import { cart_list } from "@/redux/features/cartSlice";
import { useCheckoutTokenEmailUpdatesMutation } from "../../redux/features/card/cardApi";
import ButtonLoader from "../loader/button-loader";
import { userLoggedIn } from "@/redux/features/auth/authSlice";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);

  // -- Google Captcha
  // const [captchaToken, setCaptchaToken] = useState(null);

  const [userCaptcha, setUserCaptcha] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const captchaRef = useRef(null);

  const cart = useSelector((state) => state.cart.cart_list);
  const dispatch = useDispatch();

  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const [addWishlist, {}] = useAddWishlistMutation();
  const [checkoutTokens, { data: tokens }] = useCheckoutTokenMutation();
  const [checkoutTokenEmailUpdate] = useCheckoutTokenEmailUpdatesMutation();
  const [addToCartMutation, { data: productsData, isError, isLoading }] =
    useAddToCartMutation();

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

  const generateCaptcha = () => {
    const captcha = new Captcha({
      lineWidth: 1,
      lineNum: 3,
      dotR: 2,
      dotNum: 20,
      preGroundColor: [200, 200],
      backGroundColor: [255, 255],
      fontSize: 30,
      length: 5,
    });

    captcha.draw(captchaRef.current, (text) => {
      setCaptchaText(text); // store the generated text
    });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // onSubmit
  const onSubmit = (data) => {
    // google captcha

    // if (!captchaToken) {
    //   notifyError("Please verify you're not a robot.");
    //   return;
    // }

    if (!userCaptcha) {
      notifyError("Enter the Captcha");
      return
    } else {
      if (userCaptcha.toLowerCase() !== captchaText.toLowerCase()) {
        notifyError("Captcha is incorrect!");
        generateCaptcha();
        return;
      }
    }

    loginUser({
      email: data.email,
      password: data.password,
    }).then(async (data) => {
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

        dispatch(
          userLoggedIn({
            accessToken: data?.data.data.token,
            user: data?.data.data.user,
          })
        );

        const checkoutTokenINR = localStorage.getItem("checkoutTokenINR");
        if (!checkoutTokenINR || checkoutTokenINR === "undefined") {
          createCheckoutTokenINR(data?.data?.data?.tokenCreate?.user?.email);
        } else {
          await checkoutTokenEmailUpdate({
            email: data?.data?.data?.tokenCreate?.user?.email,
            checkoutToken: checkoutTokenINR,
          });
        }

        const checkoutTokenUSD = localStorage.getItem("checkoutTokenUSD");
        if (!checkoutTokenUSD || checkoutTokenUSD === "undefined") {
          createCheckoutTokenUSD(data?.data?.data?.tokenCreate?.user?.email);
        } else {
          await checkoutTokenEmailUpdate({
            email: data?.data?.data?.tokenCreate?.user?.email,
            checkoutToken: checkoutTokenUSD,
          });
        }

        router.push(redirect || "/");
        notifySuccess("Login successfully");
      }
    });

    reset();
  };

  const createCheckoutTokenINR = async (email) => {
    try {
      const data = await checkoutTokens({
        email,
        channel: "india-channel",
      });
      localStorage.setItem(
        "checkoutTokenINR",
        data?.data?.data?.checkoutCreate?.checkout?.token
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createCheckoutTokenUSD = async (email) => {
    try {
      const data = await checkoutTokens({
        email,
        channel: "default-channel",
      });
      localStorage.setItem(
        "checkoutTokenUSD",
        data?.data?.data?.checkoutCreate?.checkout?.token
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddProduct = async (checkoutToken, id) => {
    try {
      const response = await addToCartMutation({
        checkoutToken: checkoutToken,
        variantId: id,
      });

      if (response.data?.data?.checkoutLinesAdd?.errors?.length > 0) {
        notifyError(response.data?.data?.checkoutLinesAdd?.errors[0]?.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: "Email is required!" })}
              name="email"
              id="email"
              type="email"
              placeholder="nobleset@mail.com"
              onInput={(e) => {
                e.target.value = e.target.value.replace(
                  /[^a-zA-Z0-9@._-]/g,
                  ""
                );
              }}
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
                {...register("password", {
                  required: "Password is required!",
                })}
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
          <input id="remeber" type="checkbox" />
          <label htmlFor="remeber">Remember me</label>
        </div>
        <div className="tp-login-forgot">
          <Link href="/forgot">Forgot Password?</Link>
        </div>
      </div>

      {/* GOOGLE CAPTCHA */}
      {/* <div className="my-3 d-flex justify-content-center">
        <ReCAPTCHA
          sitekey="YOUR_RECAPTCHA_SITE_KEY"
          onChange={(token) => setCaptchaToken(token)}
          
        />
      </div> */}

      {/* FRONTEND CAPTCHA */}
      <div className="my-3 text-center">
        <div className="d-flex gap-2 justify-content-center align-items-center mb-3">
          <canvas
            ref={captchaRef}
            width="180"
            height="60"
            style={{ border: "1px solid #ccc", borderRadius: "5px" }}
          />

          <button
            type="button"
            className="btn btn-sm btn-light d-block "
            onClick={generateCaptcha}
          >
            <i className="fa fa-refresh"></i>
          </button>
        </div>

        <div className="tp-login-input">
          <input
            type="text"
            className="tp-login-input"
            placeholder="Enter captcha"
            value={userCaptcha}
            onChange={(e) => setUserCaptcha(e.target.value)}
          />
        </div>
      </div>

      <div className="tp-login-bottom">
        <button type="submit" className=" w-100 tp-btn tp-btn-border">
          {loginLoading ? <ButtonLoader /> : "Login"}
        </button>
      </div>

      <div className="w-100 d-flex align-items-center justify-content-center my-2">
        <small className="mx-10">or</small>
      </div>

      <div className="tp-login-mail sign-in text-center">
        <span className=" tp-btn-google " style={{ gap: 10 }}>
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

          <span className="ps-2">Sign in with Google</span>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
