import React, { useCallback, useEffect, useRef, useState } from "react";
import ErrorMsg from "../common/error-msg";
import { useDispatch, useSelector } from "react-redux";
import {
  DELIVERY_ID_OTHER_IN,
  DELIVERY_ID_TN,
  DELIVERY_ID_OTHER_TN,
  addCommasToNumber,
  formatCurrency,
  roundOff,
  useSetState,
  FRONTEND_URL,
  roundIndianRupee,
  encryptOrderId,
  decryptOrderId,
  encrypt12,
  decrypt,
  encryptFull,
} from "@/utils/functions";
import CheckoutOrderArea from "./checkout-order-area";
import {
  useApplyCoupenCodeMutation,
  useCheckoutCompleteMutation,
  useCheckoutUpdateMutation,
  useCreateCheckoutTokenMutation,
  usePaymentMethodListMutation,
  useSubCatListMutation,
  useUpdateBillingAddressMutation,
  useUpdateDeliveryMethodForCODAndGidtWrapMutation,
  useUpdateGiftWrapMutation,
  usePaymentMethodUpdateMutation,
} from "@/redux/features/card/cardApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import useRazorpay from "react-razorpay";
import { useRouter } from "next/router";
import NiceSelect from "@/ui/nice-select";
import HeaderSearchForm from "../forms/header-search-form";
import {
  useGetCartListQuery,
  useCreateCheckoutIdMutation,
} from "@/redux/features/card/cardApi";
import {
  useCountryListQuery,
  usePaymentFailedQuery,
  usePaymentListMutation,
  usePaymentMutation,
  usePaymentQuery,
  usePincodeListMutation,
  useRemoveCouponMutation,
  useShippingZoneListMutation,
  useStateListQuery,
  useUpdateEmailMutation,
} from "@/redux/features/productApi";
import { Filter } from "@/svg";
import {
  useGetCartAllListQuery,
  useGetCheckoutDetailsQuery,
  useUpdateShippingAddressMutation,
  useGetCheckoutDetailsMutation,
} from "../../redux/features/card/cardApi";
import {
  checkChannel,
  getUniqueStates,
  objIsEmpty,
  validLoginAndReg,
} from "../../utils/functions";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import CheckoutLogin from "./checkout-login";
import Link from "next/link";
import { cart_list } from "@/redux/features/cartSlice";
import ButtonLoader from "../loader/button-loader";
import {
  ACCESS_CODE,
  CASE_ON_DELIVERY,
  CCAVENUE_ID,
  COD_ID,
  MERCHANT_ID,
  pincode,
  RAZORPAY_ID,
  SHIPPING_ZONE,
  CCAVENUE_URL,
} from "@/utils/constant";
import { DeleteOutlined } from "@ant-design/icons";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import pradeLogo from "@assets/img/header-logo.png";
import AddressModal from "./addressComponent";
import { useGetAddressListQuery } from "../../redux/features/productApi";
import CCAvenue from "../../components/ccAvenue/ccAvenue";
import useDebounce from "../useDebounce/useDebounce";
import Razorpay_logo from "../../../public/assets/img/razorpay.png";
import CcAvenue from "../../../public/assets/img/CCAvenue.webp";

import cod from "../../../public/assets/img/cash-on-delivery.png";
import Image from "next/image";
import { createHash } from "crypto";

const CheckoutBillingArea1 = () => {
  const { user } = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart?.cart_list);

  const { data: countryList, refetchCountry } = useCountryListQuery();
  const { data: cartList } = useGetCartListQuery();

  const dispatch = useDispatch();

  const CountryList = countryList?.data?.shop?.countries;

  const [checkoutComplete, { data: complete }] = useCheckoutCompleteMutation();

  const [updateBillingAddress] = useUpdateBillingAddressMutation();

  const [checkoutShippingAddressUpdate] = useUpdateShippingAddressMutation();

  const [emailUpdate] = useUpdateEmailMutation();

  const [updateGiftWrap] = useUpdateGiftWrapMutation();

  const [paymentMethodUpdate] = usePaymentMethodUpdateMutation();

  const [removeCoupon] = useRemoveCouponMutation();

  const [state, setState] = useSetState({
    firstName: "",
    firstName1: "",
    lastName: "",
    lastName1: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    city1: "",
    postalCode: "",
    postalCode1: "",
    phone: "",
    phone1: "",
    email: "",
    phone1: "",
    email1: "",
    country: "",
    country1: "",
    countryArea: "",
    diffAddress: false,
    errors: {},
    COD: "",
    razorpay: "",
    companyName: "",
    paymentType: [],
    pType: false,
    selectedCountry: "",
    selectedState: "",
    selectedCountry1: "",
    selectedState1: "",
    companyName1: "",
    stateList: [],
    stateList1: [],
    coupenCode: "",
    orderData: [],
    channel: "",
    createAccount: false,
    loginLastName: "",
    loginFirstName: "",
    password: "",
    confirmPassword: "",
    loginEmail: "",
    isAgree: false,
    razorpayId: "",
    checkoutData: {},
    total: "",
    tax: "",
    shippingCost: "",
    promoCode: "",
    token: "",
    isOpen: false,
    giftCard: [],
    promoCodeError: "",
    orderLoading: false,
    selectedPaymentType: "",
    coupenLoader: false,
    checkedGiftwrap: false,
    isGiftWrap: false,
    preOrderMsg: false,
    notes: "",
    checkoutId: "",
    giftWrapAmount: 0,
    codAmount: 0,
    isBillingOpen: false,
    isShippingOpen: false,
    shippingMethods: [],
    showVoucherMessage: false,
    isGiftCardProduct: false,
    allLinesGiftCard: false,
    passwordChecked: false,
    isGiftProduct: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setState({ token });
  }, []);

  const { data: stateList, refetch: stateRefetch } = useStateListQuery({
    code: state.selectedCountry,
  });

  const { data: stateList1, refetch: stateRefetch1 } = useStateListQuery({
    code: state.selectedCountry1,
  });

  const [successPayment] = usePaymentMutation();

  const { data: linelist } = useGetCartListQuery();

  const [loginUser, { loading: loginLoading }] = useLoginUserMutation();

  const [paymentList, {}] = usePaymentListMutation();

  const [registerUser, { loading: registerLoading }] =
    useRegisterUserMutation();

  const [createCheckoutId] = useCreateCheckoutIdMutation();

  const [updateDeliveryMethod] = useCheckoutUpdateMutation();

  const [getCheckoutDetails] = useGetCheckoutDetailsMutation();

  const [updateDeliveryMethodCODAndGiftWrap] =
    useUpdateDeliveryMethodForCODAndGidtWrapMutation();

  const [applyCoupenCode] = useApplyCoupenCodeMutation();

  const [paymentMethodList] = usePaymentMethodListMutation();

  const [picodeCheck, { isLoading: loading }] = usePincodeListMutation();

  const [shippingZoneList] = useShippingZoneListMutation();

  const { data: getAddressList, refetch: addressRefetch } =
    useGetAddressListQuery();

  const addressList = getAddressList?.data?.me?.addresses;

  const handleInputChange = (e, fieldName) => {
    setState({ [fieldName]: e.target.value });
    if (fieldName == "postalCode") {
      const timer = setTimeout(() => {
        if (e?.target?.value?.trim().length >= 3) {
          picodeCheck({ code: [e?.target?.value.trim()] })
            .then((res) => {
              if (res?.data?.data?.pincodes?.edges.length > 0) {
                setState({ errors: { postalCode: "" } });
              } else {
                setState({
                  errors: {
                    postalCode: "Delivery is not available to this area",
                  },
                });
              }
              // Handle success
            })
            .catch((error) => {
              setState({
                errors: {
                  postalCode: "Delivery is not available to this area",
                },
              });

              // Handle error
            });
        } else {
          setState({
            errors: {
              postalCode: "Postal code is required",
            },
          });
        }
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (fieldName == "postalCode1") {
      const timer = setTimeout(() => {
        if (e?.target?.value?.trim().length >= 3) {
          picodeCheck({ code: [e?.target?.value.trim()] })
            .then((res) => {
              if (res?.data?.data?.pincodes?.edges.length > 0) {
                setState({ errors: { postalCode1: "" } });
              } else {
                setState({
                  errors: {
                    postalCode1: "Delivery is not available to this area",
                  },
                });
              }
            })
            .catch((error) => {
              setState({
                errors: {
                  postalCode1: "Delivery is not available to this area",
                },
              });
            });
        } else {
          setState({
            errors: {
              postalCode1: "Postal code is required",
            },
          });
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (stateList?.data?.addressValidationRules?.countryAreaChoices) {
      const list = stateList?.data?.addressValidationRules?.countryAreaChoices;
      const uniqueStateList = getUniqueStates(list);
      setState({
        stateList: uniqueStateList,
      });
    }
  }, [stateList]);

  useEffect(() => {
    if (stateList1?.data?.addressValidationRules?.countryAreaChoices) {
      const list = stateList1?.data?.addressValidationRules?.countryAreaChoices;
      const uniqueStateList = getUniqueStates(list);
      setState({
        stateList1: uniqueStateList,
      });
    }
  }, [stateList1]);

  useEffect(() => {
    orderData();
  }, [linelist]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.postalCode1?.trim().length >= 3) {
        picodeCheck({ code: [state.postalCode1.trim()] })
          .then((res) => {
            if (res?.data?.data?.pincodes?.edges.length > 0) {
              setState({ errors: { postalCode1: "" } });
            } else {
              setState({
                errors: {
                  postalCode1: "Delivery is not available to this area",
                },
              });
            }
            // Handle success
          })
          .catch((error) => {
            setState({
              errors: { postalCode1: "Delivery is not available to this area" },
            });

            // Handle error
          });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [state.postalCode1]);

  const orderData = async () => {
    try {
      if (linelist?.data?.checkout) {
        const orderData = linelist?.data?.checkout;

        const hasDigitalProduct = orderData?.lines?.some(
          (item) => item.variant?.product?.productType?.isDigital === true
        );

        const allDigital = orderData?.lines.every(
          (item) => item.variant?.product?.productType?.isDigital === true
        );

        setState({
          orderData,
          isGiftCardProduct: hasDigitalProduct,
          allLinesGiftCard: allDigital,
        });
        createCheckoutIds(orderData?.lines);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const createCheckoutIds = async (lines) => {
    try {
      const update = lines?.map((item) => ({
        quantity: item.quantity,
        variantId: item?.variant?.id,
      }));
      const data = await createCheckoutId({
        lines: update,
      });
      if (data?.data?.data?.checkoutCreate?.errors?.length > 0) {
        notifyError(data?.data?.data?.checkoutCreate?.errors[0]?.message);
      } else {
        const checkoutId = data?.data?.data?.checkoutCreate?.checkout?.id;
        localStorage.setItem("checkoutId", checkoutId);
        const total =
          data?.data?.data?.checkoutCreate?.checkout?.totalPrice?.gross?.amount;
        const tax =
          data?.data?.data?.checkoutCreate?.checkout?.totalPrice?.tax?.amount;
        setState({ total, tax, checkoutId });
        getDetails(checkoutId);
        // verifyCoupenCode(checkoutId);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const [checkoutAllData, setCheckoutAllData] = useState({});

  useEffect(() => {
    if (checkoutAllData?.voucherCode) {
      setState({ showVoucherMessage: true });

      const timer = setTimeout(() => {
        setState({ showVoucherMessage: false });
      }, 10 * 1000);

      return () => clearTimeout(timer);
    }
  }, [checkoutAllData?.voucherCode]);

  const getDetails = async (id) => {
    try {
      const res = await getCheckoutDetails({
        id,
      });
      const checkoutDetails = res?.data?.data?.checkout;
      setCheckoutAllData(checkoutDetails);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const [Razorpay] = useRazorpay();

  const router = useRouter();

  let lines = [];
  if (cart?.length > 0) {
    lines = cart?.map((item) => {
      return { quantity: 1, variantId: item?.variant?.id };
    });
  }

  useEffect(() => {
    const channels = checkChannel();
    setState({ channel: channels });
  }, []);

  const debouncedPeopleSearch = useDebounce(state.postalCode);
  const debouncedCodeSearch = useDebounce(state.postalCode1);

  const handleCheck = async (code) => {
    try {
      let isTrue = false;
      const res = await picodeCheck({ code: [code] });
      if (res?.data?.data?.pincodes?.edges.length > 0) {
        isTrue = true;
      } else {
        isTrue = false;
      }

      return isTrue;
    } catch (error) {}
  };

  useEffect(() => {
    enableCOD();
  }, [
    // state.total,
    // state.orderData,
    // state.selectedCountry1,
    // state.selectedCountry,
    state.diffAddress,

    debouncedPeopleSearch,
    debouncedCodeSearch,
  ]);

  useEffect(() => {
    enableGiftWrap();
  }, [
    state.selectedCountry1,
    state.selectedCountry,
    state.diffAddress,
    state.total,
  ]);

  const enableCOD = async () => {
    try {
      const res = await paymentList();
      console.log("enableCOD --->", res);
      const data = res.data?.data?.paymentGateways?.edges;
      const findCOD = data?.find(
        (item) => item.node?.name === CASE_ON_DELIVERY
      );

      const filterExceptCOD = data?.filter(
        (item) => item.node?.name !== CASE_ON_DELIVERY && item.node.isActive
      );

      let isShowCOD = false;
      let arr = filterExceptCOD?.map((item, index) => ({
        id: index + 1,
        name: item.node.name,
        checked: false,
      }));

      if (findCOD?.node?.isActive) {
        arr.push({
          id: arr.length + 1,
          name: CASE_ON_DELIVERY,
          checked: false,
        });
      }

      // const hasPreOrders = state.orderData?.lines?.some((line) =>
      //   line?.variant?.product?.collections?.some(
      //     (collection) => collection.name === "Pre Orders"
      //   )
      // );

      // const hasGiftCard = state.orderData?.lines?.some(
      //   (line) => line?.variant?.product?.category.name === "Gift Card"
      // );

      const hasGiftCard = state.orderData?.lines?.some(
        (line) =>
          Array.isArray(line?.variant?.product?.category) &&
          line.variant.product.category.some((cat) => cat.name === "Gift Card")
      );

      // let totalValid;
      // if (checkChannel() === "india-channel") {
      //   totalValid = state.total > 3000 && state.total < 30000;
      // } else {
      //   totalValid = state.total > 39 && state.total < 390;
      // }

      let totalValid = true;
      if (checkChannel() === "india-channel") {
        totalValid = state.total > 3000 && state.total < 30000;
      } else {
        totalValid = state.total > 39 && state.total < 390;
      }

      if (totalValid && !hasGiftCard) {
        // const country = state.diffAddress
        //   ? state.selectedCountry1
        //   : state.selectedCountry;
        const postalCode = state.diffAddress
          ? state.postalCode1
          : state.postalCode;
        const pincodes = await handleCheck(postalCode);
        if (pincodes) {
          isShowCOD = true;
        }
      }

      if (!isShowCOD) {
        arr = arr.filter((item) => item.name !== CASE_ON_DELIVERY);
      }
      console.log("✌️arr --->", arr);

      setState({
        paymentType: arr,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const enableGiftWrap = async () => {
    try {
      const hasGiftCard = state.orderData?.lines?.some(
        (line) =>
          Array.isArray(line?.variant?.product?.category) &&
          line.variant.product.category.some((cat) => cat.name === "Gift Card")
      );
      setState({ isGiftProduct: hasGiftCard });
      let isGiftWrap = false;
      if (!hasGiftCard) {
        if (state.diffAddress) {
          if (state.selectedCountry1 == "IN") {
            isGiftWrap = true;
          }
        } else {
          if (state.selectedCountry == "IN") {
            isGiftWrap = true;
          }
        }
      }

      setState({
        isGiftWrap,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const checkoutGiftWrapUpdate = async (isgiftwrap) => {
    try {
      const checkoutId = localStorage.getItem("checkoutId");
      const res = await updateGiftWrap({
        checkoutId,
        isgiftwrap,
      });
      const response = res?.data?.data?.checkoutGiftWrapUpdate?.checkout;

      const total = response?.totalPrice?.gross?.amount;
      const tax = response?.totalPrice?.tax?.amount;
      const shippingCost = response?.shippingPrice?.gross?.amount;
      setState({
        shippingCost,
        tax,
        total,
        giftWrapAmount: response.giftWrapAmount,
        codAmount: response.codAmount,
      });
    } catch (error) {
      // notifyError(error);
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const errors = await validateInputs();
      if (Object.keys(errors).length === 0) {
        if (state.createAccount) {
          await createAccount();
        } else {
          await commonFunction();
        }
      }
    } catch (error) {
      notifyError(error);
      setState({ orderLoading: false });
      console.error("Error:", error);
    }
  };

  const commonFunction = async () => {
    try {
      setState({ orderLoading: true });
      const sample = {
        // email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        streetAddress1: state.streetAddress1,
        city: state.city,
        streetAddress2: state.streetAddress1,
        cityArea: "",
        companyName: state.companyName,
        country: state.selectedCountry,
        countryArea: state.selectedState,
        phone: state.phone,
        postalCode: state.postalCode,
      };

      let shippingAddress = {};
      if (state.diffAddress) {
        shippingAddress = {
          // email: state.email,
          firstName: state.firstName1,
          lastName: state.lastName1,
          streetAddress1: state.streetAddress2,
          city: state.city1,
          streetAddress2: state.streetAddress2,
          cityArea: "",
          companyName: state.companyName1,
          country: state.selectedCountry1,
          countryArea: state.selectedState1,
          phone: state.phone1,
          postalCode: state.postalCode1,
        };
      } else {
        shippingAddress = sample;
      }

      const checkoutId = localStorage.getItem("checkoutId");
      if (checkoutId) {
        const res = await updateBillingAddress({
          checkoutId,
          billingAddress: sample,
        });

        if (res?.data?.data?.checkoutBillingAddressUpdate?.errors?.length > 0) {
          setState({ orderLoading: false });
          notifyError(
            res?.data?.data?.checkoutBillingAddressUpdate?.errors[0]?.message
          );
        } else {
          if (state.allLinesGiftCard) {
            updateEmail(checkoutId);
          } else {
            const response = await checkoutShippingAddressUpdate({
              checkoutId,
              shippingAddress,
              note: state.notes,
            });

            if (
              response.data?.data?.checkoutShippingAddressUpdate?.errors
                ?.length > 0
            ) {
              setState({ orderLoading: false });
              notifyError(
                response?.data?.data?.checkoutShippingAddressUpdate?.errors[0]
                  ?.message
              );
            } else {
              // ;
              updateEmail(checkoutId);

              // updateDelivertMethod(shippingAddress?.country);
            }
          }
        }
      }
    } catch (error) {
      notifyError(error);
      setState({ orderLoading: false });
      console.log("error: ", error);
    }
  };

  const updateEmail = async (checkoutId) => {
    try {
      const res = await emailUpdate({
        checkoutId,
        email: state.diffAddress ? state.email1 : state.email,
      });
      if (res?.data?.data?.checkoutEmailUpdate?.errors?.length > 0) {
        setState({ orderLoading: false });
        notifyError(res?.data?.data?.checkoutEmailUpdate?.errors[0]?.message);
      } else {
        checkoutCompletes(checkoutId);
        // handlePayment(checkoutId);
      }
    } catch (error) {
      setState({ orderLoading: false });
      console.log("error: ", error);
    }
  };

  const checkoutCompletes = async (checkoutId) => {
    try {
      const completeResponse = await checkoutComplete({ id: checkoutId });
      if (completeResponse?.data?.data?.checkoutComplete?.errors?.length > 0) {
        setState({ orderLoading: false });
        notifyError(
          completeResponse?.data?.data?.checkoutComplete?.errors[0]?.message
        );
      } else {
        const orderId =
          completeResponse?.data?.data?.checkoutComplete?.order?.id;
        const checkedOption = state.paymentType.find(
          (item) => item.checked
        )?.name;
        console.log("✌️checkedOption --->", checkedOption);

        if (checkedOption == CASE_ON_DELIVERY) {
          localStorage.removeItem("checkoutTokenUSD");
          localStorage.removeItem("checkoutTokenINR");
          dispatch(cart_list([]));
          router.push(`/order-success/${orderId}`);
        } else if (checkedOption == "Razorpay") {
          handlePayment(orderId, state.total);
        } else if (checkedOption == "CCAvenue") {
          ccAvenuePayment(orderId, state.total);
        }
        if (localStorage.getItem("token")) {
          addressRefetch();
        }
        setState({ orderLoading: false });

        localStorage.setItem(
          "orderId",
          completeResponse?.data?.data?.checkoutComplete?.order?.id
        );
        // router.push(
        //   `/payment-success/${completeResponse?.data?.data?.checkoutComplete?.order?.id}`
        // );
      }
    } catch (error) {
      setState({ orderLoading: false });

      console.log("error: ", error);
    }
  };

  const handlePayment = useCallback(
    async (orderId, total) => {
      try {
        const options = {
          key: "rzp_test_tEMCtcfElFdYts",
          key_secret: "rRfAuSd9PLwbhIwUlBpTy4Gv",
          amount: roundIndianRupee(total) * 100,
          // order_id:orderId,
          currency: checkChannel() == "india-channel" ? "INR" : "USD",
          name: state.firstName + " " + state.lastName,
          description: state.notes,
          image: pradeLogo,
          modal: {
            ondismiss: async (res) => {
              localStorage.removeItem("checkoutTokenUSD");
              localStorage.removeItem("checkoutTokenINR");
              dispatch(cart_list([]));
              router.push(`/order-failed/${orderId}`);

              // await paymentFailed(orderId);
              // paymentFaildRefetch();
            },
          },
          handler: async (res) => {
            if (res?.razorpay_payment_id) {
              notifySuccess("Payment Successful");
              const data = await successPayment({
                amountAuthorized: total,
                amountCharged: total,
                pspReference: res?.razorpay_payment_id,
              });
              localStorage.removeItem("checkoutTokenUSD");
              localStorage.removeItem("checkoutTokenINR");
              dispatch(cart_list([]));
              router.push(`/order-success/${orderId}`);
            }

            setState((prevState) => ({
              ...prevState,
              firstName: "",
              firstName1: "",
              lastName: "",
              lastName1: "",
              streetAddress1: "",
              streetAddress2: "",
              city: "",
              city1: "",
              postalCode: "",
              postalCode1: "",
              phone: "",
              email: "",
              phone1: "",
              email1: "",
              country: "",
              country1: "",
              countryArea: "",
              diffAddress: false,
              errors: {},
            }));
          },
          prefill: {
            name: state.firstName,
            email: state.email,
            contact: state.phone,
          },
          notes: {
            address: state.streetAddress1,
          },
          theme: {
            color: "#3399cc",
          },
          retry: {
            enabled: false,
            max_count: true,
          },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
      } catch (error) {
        setState({ orderLoading: false });

        console.log("error: ", error);
      }
    },
    [Razorpay]
  );

  // const ccAvenuePayment = async (orderId, amount) => {
  //   try {
  //     let paymentData = {
  //       merchant_id: MERCHANT_ID,
  //       order_id: orderId,
  //       amount: amount.toFixed(2),
  //       currency: "INR",
  //       billing_name: "Madhan",
  //       billing_email: "madhanumk@gmail.com",
  //       billing_address: "chennai",
  //       billing_city: "Coimbatore",
  //       billing_state: "Tamilnadu",
  //       billing_zip: "621703",
  //       billing_country: "India",
  //       billing_tel: "9999999999",
  //       redirect_url: `${CCAVENUE_URL}/api/ccavenue-handle1`,
  //       cancel_url: `${CCAVENUE_URL}/payment-cancelled`,
  //       merchant_param1: orderId,
  //       language: "EN",
  //     };

  //     console.log("✌️paymentData --->", paymentData);

  //     // Verify CCAvenue object exists and has the method
  //     if (typeof CCAvenue === "undefined" || !CCAvenue.getEncryptedOrder) {
  //       throw new Error("CCAvenue library not loaded properly");
  //     }

  //     let encReq = CCAvenue.getEncryptedOrder(paymentData);
  //     console.log("✌️encReq --->", encReq);

  //     let accessCode = ACCESS_CODE;
  //     let URL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${paymentData.merchant_id}&encRequest=${encReq}&access_code=${accessCode}`;

  //     console.log("✌️Final URL --->", URL);

  //     // Open in new tab
  //     window.open(URL, "_blank");
  //   } catch (error) {
  //     console.log("CCAvenue error: ", error);
  //     alert("Payment initialization failed: " + error.message);
  //   }
  // };

  const ccAvenuePayment = async (order_id, amount) => {
    try {
      const orderId = createHash("sha1")
        .update(order_id)
        .digest("hex")
        .slice(0, 20);
      let paymentData = {
        merchant_id: MERCHANT_ID,
        order_id: orderId,
        amount: amount,
        currency: "INR",
        billing_email: state.email,
        billing_name: `${state.firstName} ${state.lastName}`,
        billing_address: state.streetAddress1,
        billing_city: state.city,
        billing_state: state.selectedState,
        billing_zip: state.postalCode,
        billing_tel: state.phone?.replace("+91", ""),
        billing_country: state.selectedCountry?.name,
        redirect_url: `${CCAVENUE_URL}/api/ccavenue-handle1`,
        cancel_url: `${CCAVENUE_URL}/failed-order`,

        delivery_address: state.streetAddress2,
        delivery_city: state.city1,
        delivery_state: state.selectedState1,
        delivery_zip: state.postalCode1,
        delivery_country: state.selectedCountry?.name,
        delivery_tel: state.phone1?.replace("+91", ""),
        merchant_param1: order_id,
        merchant_param2: state.email1,
      };

      let encReq = CCAvenue.getEncryptedOrder(paymentData);
      let accessCode = ACCESS_CODE;
      let URL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${paymentData.merchant_id}6&encRequest=${encReq}&access_code=${accessCode}`;

      router.push(URL);
      localStorage.removeItem("checkoutTokenUSD");
      localStorage.removeItem("checkoutTokenINR");
      dispatch(cart_list([]));

      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.setItem("billingEmail", state.email1);
      }
      localStorage.setItem("order_id", order_id);
    } catch (error) {
      console.error("Payment init error:", error);
      alert("Payment initialization failed: " + error.message);
    } finally {
    }
  };

  const updateDelivertMethodAfterChoosePaymentMothod = async (
    country,
    paymentType
  ) => {
    try {
      const checkoutId = localStorage.getItem("checkoutId");
      if (checkoutId) {
        const response = await checkoutShippingAddressUpdate({
          checkoutId,
          shippingAddress: {
            countryArea: state.selectedState,
            country,
          },
          note: state.notes,
        });

        const res = await updateDeliveryMethod({
          checkoutid: checkoutId,
          // country,
          // paymentType,
          // deliveryMethodId: state.selectedShippingId,
          deliveryMethodId:
            paymentType == CASE_ON_DELIVERY
              ? "U2hpcHBpbmdNZXRob2Q6OTA="
              : state.selectedShippingId,
        });
        if (res?.data?.data?.checkoutDeliveryMethodUpdate?.errors?.length > 0) {
          notifyError(
            res?.data?.data?.checkoutDeliveryMethodUpdate?.errors[0]?.message
          );
        } else {
          updatePaymentMethod(paymentType);

          // const response =
          //   res?.data?.data?.checkoutDeliveryMethodUpdate?.checkout;
          //   console.log(" res?.data?.data?.checkoutDeliveryMethodUpdate: ",  res?.data?.data?.checkoutDeliveryMethodUpdate);

          // const total = response?.totalPrice?.gross?.amount;
          // const tax = response?.totalPrice?.tax?.amount;
          // const shippingCost = response?.shippingPrice?.gross?.amount;
          // setState({
          //   shippingCost,
          //   tax,
          //   total,
          //   giftWrapAmount: response?.giftWrapAmount,
          //   codAmount: response?.codAmount,
          // });
          // handlePayment(checkoutId);
        }
      }
    } catch (error) {
      notifyError(error);
      console.log("error: ", error);
    }
  };

  const updateDelivertMethod = async (
    country,
    paymentType,
    deliveryMethodId
  ) => {
    try {
      const checkoutId = localStorage.getItem("checkoutId");
      if (checkoutId) {
        const res = await updateDeliveryMethod({
          checkoutid: checkoutId,
          // country,
          // paymentType,
          deliveryMethodId,
        });
        if (res?.data?.data?.checkoutDeliveryMethodUpdate?.errors?.length > 0) {
          notifyError(
            res?.data?.data?.checkoutDeliveryMethodUpdate?.errors[0]?.message
          );
        } else {
          const response =
            res?.data?.data?.checkoutDeliveryMethodUpdate?.checkout;

          const total = response?.totalPrice?.gross?.amount;
          console.log("✌️total --->", total);
          const tax = response?.totalPrice?.tax?.amount;
          const shippingCost = response?.shippingPrice?.gross?.amount;
          setState({
            shippingCost,
            tax,
            total,
            giftWrapAmount: response?.giftWrapAmount,
            codAmount: response?.codAmount,
          });
          // handlePayment(checkoutId);
        }
      }
    } catch (error) {
      notifyError(error);
      console.log("error: ", error);
    }
  };

  const validateInputs = async () => {
    const fieldsToValidate = [
      { name: "firstName", label: "First name" },
      { name: "lastName", label: "Last name" },
      { name: "selectedCountry", label: "Country" },
      { name: "streetAddress1", label: "Street address" },
      { name: "city", label: "City" },
      { name: "postalCode", label: "PostalCode" },
      { name: "email", label: "Email" },
      { name: "selectedState", label: "State" },
    ];
    // if (state.stateList?.length > 0) {
    //   fieldsToValidate.push({ name: "selectedState", label: "State" });
    // }

    const errors = {};

    const valid = state.phone && isValidPhoneNumber(state.phone);

    if (!valid) {
      errors.phone = "Please enter a valid phone";
    }

    fieldsToValidate.forEach(({ name, label }) => {
      if (!state[name].trim()) {
        errors[name] = `${label} is required`;
      }
    });

    if (state.selectedPaymentType == "") {
      errors.paymentType = "Payment type is required";
    }
    const isAnyChecked = state.paymentType.some((method) => method.checked);
    if (!isAnyChecked) {
      errors.paymentType = "Payment type is required";
    }

    if (!state.isAgree) {
      errors.isAgree = "Terms and condition is required";
    }

    const regValidate = [
      // { name: "loginFirstName", label: "First name" },
      // { name: "loginLastName", label: "Last name" },
      // { name: "loginEmail", label: "Email" },
      { name: "password", label: "Password" },
    ];
    if (state.createAccount) {
      regValidate.forEach(({ name, label }) => {
        if (!state[name].trim()) {
          errors[name] = `${label} is required`;
        }
      });
    }
    if (state.postalCode) {
      const isValidPostalCode = await handleCheck(state.postalCode);
      if (!isValidPostalCode) {
        errors.postalCode = "Delivery is not available to this area";
      }
    }

    if (state.diffAddress) {
      const fieldsToValidate2 = [
        { name: "firstName1", label: "First name" },
        { name: "lastName1", label: "Last name" },
        { name: "selectedCountry1", label: "Country" },
        { name: "streetAddress2", label: "Street address" },
        { name: "city1", label: "City" },
        { name: "postalCode1", label: "PostalCode" },
        // { name: "phone1", label: "Phone" },
        { name: "email1", label: "Email" },
        { name: "selectedState1", label: "State" },
      ];

      // if (state.stateList1?.length > 0) {
      //   fieldsToValidate2.push({ name: "selectedState1", label: "State" });
      // }
      const valid = state.phone1 && isValidPhoneNumber(state.phone1);

      if (!valid) {
        errors.phone1 = "Please enter a valid phone";
      }
      fieldsToValidate2.forEach(({ name, label }) => {
        if (!state[name].trim()) {
          errors[name] = `${label} is required`;
        }
      });
      if (state.postalCode1) {
        const isValidPostalCode = await handleCheck(state.postalCode1);
        if (!isValidPostalCode) {
          errors.postalCode1 = "Delivery is not available to this area";
        }
      }
    }
    console.log("✌️errors --->", errors);

    setState({ errors });
    return errors;
  };

  const createAccount = async () => {
    try {
      const body = {
        // firstName: state.loginFirstName,
        // lastName: state.loginLastName,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
        redirectUrl: `${FRONTEND_URL}/email_verify`,
      };

      const res = await registerUser(body);
      if (res?.data?.data?.accountRegister?.errors?.length > 0) {
        notifyError(res?.data?.data?.accountRegister?.errors[0]?.message);
      } else {
        const user = res?.data?.data?.accountRegister?.user;
        login(user.email, state.password);
        await commonFunction();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const login = async (email, password) => {
    try {
      const body = {
        email,
        password,
      };

      const res = await loginUser(body);
      if (res?.data?.data?.tokenCreate?.errors?.length > 0) {
        notifySuccess(res?.data?.data?.tokenCreate?.errors[0]?.message);
      }
      console.log("✌️res --->", res);
      // localStorage.setItem(
      //   "userInfo",
      //   JSON.stringify(res.data?.data?.tokenCreate?.user)
      // );
      // localStorage.setItem(
      //   "token",
      //   JSON.stringify(res.data?.data?.tokenCreate?.token)
      // );
      // location.reload();
      // console.log("body: ", body);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const applyCoupen = async () => {
    try {
      setState({ coupenLoader: true });
      if (state.promoCode == "") {
        setState({
          promoCodeError: "Promo code is required",
          coupenLoader: false,
        });
      } else {
        let checkoutId = localStorage.getItem("checkoutId");

        const data = await applyCoupenCode({
          checkoutId,
          languageCode: "EN_US",
          promoCode: state.promoCode.trim(),
          // promoCode: "E87B-D067-5527",
        });

        if (data?.data?.data?.checkoutAddPromoCode?.errors?.length > 0) {
          notifyError(
            data?.data?.data?.checkoutAddPromoCode?.errors[0]?.message
          );
          setState({ coupenLoader: false });

          // setIsVerified(false);
        } else {
          const res = data?.data?.data?.checkoutAddPromoCode?.checkout;
          const exceptNullAmount = res?.giftCards?.filter(
            (item) => item?.currentBalance?.amount !== 0
          );

          setState({
            giftCard: exceptNullAmount,
            total: res.totalPrice?.gross?.amount,
            coupenLoader: false,
            promoCode: "",
            isOpen: false,
            showVoucherMessage: true,
          });
          getDetails(res?.id);

          const timer = setTimeout(() => {
            setState({ showVoucherMessage: false });
          }, 10 * 1000);

          return () => clearTimeout(timer);
        }
      }
    } catch (error) {
      setState({ coupenLoader: false });

      console.log("error: ", error);
    }
  };

  const handleCheckboxChange = (id) => {
    const updatedPaymentType = state.paymentType.map((item) =>
      item.id === id ? { ...item, checked: true } : { ...item, checked: false }
    );

    const checkedOption = updatedPaymentType.find((item) => item.checked)?.name;
    if (state.selectedCountry1 || state.selectedCountry) {
      if (state.diffAddress) {
        updateDelivertMethodAfterChoosePaymentMothod(
          state.selectedCountry1,
          checkedOption
        );
      } else {
        updateDelivertMethodAfterChoosePaymentMothod(
          state.selectedCountry,
          checkedOption
        );
      }
    }

    setState({
      paymentType: updatedPaymentType,
      selectedPaymentType: checkedOption,
    });
  };

  const updatePaymentMethod = async (option) => {
    try {
      let paymentMethod = "";
      if (option == "Razorpay") {
        paymentMethod = RAZORPAY_ID;
      } else if (option == "CCAvenue") {
        paymentMethod = CCAVENUE_ID;
      } else {
        paymentMethod = COD_ID;
      }
      const res = await paymentMethodUpdate({
        paymentMethod,
      });

      const response = res?.data?.data?.checkoutPaymentMethodUpdate?.checkout;

      const total = response?.totalPrice?.gross?.amount;

      const tax = response?.totalPrice?.tax?.amount;

      let shippingCost = 0;
      if (option == "Razorpay") {
        shippingCost = response?.shippingPrice?.gross?.amount;
      } else {
        shippingCost = response?.codAmount;
      }

      setState({
        shippingCost,
        tax,
        total,
        giftWrapAmount: response?.giftWrapAmount,
        codAmount: response?.codAmount,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleRemoveDiscount = async () => {
    try {
      const res = await removeCoupon({
        checkoutId: state.checkoutId,
        promoCode: checkoutAllData?.voucherCode,
      });

      const data = res?.data?.data?.checkoutRemovePromoCode;

      if (data?.errors && data.errors.length > 0) {
        notifyError(data.errors[0].message);
      } else {
        setState({
          total: data.checkout.totalPrice.gross.amount,
          tax: data.checkout.totalPrice.tax.amount,
        });
        getDetails(data.checkout.id);
        notifySuccess("Coupon Removed Successfully");
      }
    } catch (err) {
      console.error("Error while removing coupon:", err);
      notifyError("Error while removing coupon");
    }
  };

  const handlePhoneChange = (value) => {
    const valid = value && isValidPhoneNumber(value);
    if (valid == false) {
      setState({
        errors: { ...state.errors, phone: "Please enter a valid phone number" },
        phone: value,
      });
    } else {
      setState({
        errors: { ...state.errors, phone: "" },
        phone: value,
      });
    }
  };

  const handlePhone1Change = (value) => {
    const valid = value && isValidPhoneNumber(value);
    if (valid == false) {
      setState({
        errors: {
          ...state.errors,
          phone1: "Please enter a valid phone number",
        },
        phone1: value,
      });
    } else {
      setState({
        errors: { ...state.errors, phone1: "" },
        phone1: value,
      });
    }
  };

  const setBillingAddress = (data) => {
    const userInfo = localStorage.getItem("userInfo");
    if (!objIsEmpty(data?.country)) {
      const body = {
        target: {
          value: data?.country?.code,
        },
      };

      handleSelectChange(body);
      // handleStateChange(bodys);
    }
    setState({
      firstName: data.firstName,
      lastName: data.lastName,
      selectedCountry: data?.country?.code,
      selectedState: data.countryArea,
      streetAddress1: data.streetAddress1,
      city: data.city,
      postalCode: data.postalCode,
      phone: data.phone,
      companyName: data.companyName,
    });
    if (userInfo) {
      const user = JSON.parse(userInfo);

      setState({
        email: user?.user?.email,
      });
    }
  };

  const setShippingAddress = (data) => {
    const userInfo = localStorage.getItem("userInfo");
    if (!objIsEmpty(data?.country)) {
      const body = {
        target: {
          value: data?.country?.code,
        },
      };
      shippingCoutryChange(body);
    }

    setState({
      firstName1: data.firstName,
      lastName1: data.lastName,
      selectedCountry1: data?.country?.code,
      selectedState1: data.countryArea,
      streetAddress2: data.streetAddress1,
      city1: data.city,
      postalCode1: data.postalCode,
      phone1: data.phone,
      companyName1: data.companyName,
    });
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setState({
        email1: user?.user?.email,
      });
    }
  };

  const handleSelectChange = async (e) => {
    try {
      setState({
        selectedCountry: e.target.value,
        selectedState: "",
        phone: "",
        errors: { ...state.errors, selectedState: "", phone: "" },
      });
      stateRefetch();

      if (!state.diffAddress) {
        if (state.allLinesGiftCard) {
          setState({
            selectedState: "Tamil Nadu",
          });
        } else {
          const checkoutId = localStorage.getItem("checkoutId");
          const res = await checkoutShippingAddressUpdate({
            checkoutId,
            shippingAddress: {
              country: e.target.value,
            },
            note: state.notes,
          });

          const stateValue = {
            target: {
              value: "Tamil Nadu",
            },
          };
          if (e?.target?.value == "IN") {
            handleStateChange(stateValue, e?.target?.value);
          } else {
            const deliveryMethodIds = DELIVERY_ID_OTHER_IN;

            setState({
              selectedShippingId: deliveryMethodIds,
            });

            updateDelivertMethod(
              e.target.value,
              state.selectedPaymentType,
              deliveryMethodIds
            );
          }
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleStateChange = async (e, country) => {
    try {
      if (!state.diffAddress) {
        if (state.allLinesGiftCard) {
          setState({
            selectedState: e.target.value,
          });
        } else {
          if (country == "IN") {
            const deliveryMethodIds =
              e.target.value == "Tamil Nadu"
                ? DELIVERY_ID_TN
                : DELIVERY_ID_OTHER_TN;

            setState({
              selectedShippingId: deliveryMethodIds,
              selectedState: e.target.value,
            });
            const checkoutId = localStorage.getItem("checkoutId");
            const res = await checkoutShippingAddressUpdate({
              checkoutId,
              shippingAddress: {
                country: country,
              },
              note: state.notes,
            });
            updateDelivertMethod(
              e.target.value,
              state.selectedPaymentType,
              deliveryMethodIds
            );
          }
        }
      } else {
        setState({
          selectedState: e.target.value,
        });
      }
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const shippingCoutryChange = async (e) => {
    try {
      setState({
        selectedCountry1: e.target.value,
        selectedState1: "",
        phone1: "",
        errors: { ...state.errors, selectedState1: "", phone1: "" },
      });
      stateRefetch1();
      const checkoutId = localStorage.getItem("checkoutId");
      await checkoutShippingAddressUpdate({
        checkoutId,
        shippingAddress: {
          country: e.target.value,
        },
        note: state.notes,
      });
      const stateValue = {
        target: {
          value: "Tamil Nadu",
        },
      };

      if (e?.target?.value == "IN") {
        handleShippingStateChange(stateValue, e?.target?.value);
      } else {
        const deliveryMethodIds = DELIVERY_ID_OTHER_IN;

        setState({
          selectedShippingId: deliveryMethodIds,
        });

        updateDelivertMethod(
          e.target.value,
          state.selectedPaymentType,
          deliveryMethodIds
        );
      }
    } catch (e) {
      console.log("e: ", e);
    }
  };

  const handleShippingStateChange = async (e, country) => {
    try {
      if (country == "IN") {
        const deliveryMethodIds =
          e.target.value == "Tamil Nadu"
            ? DELIVERY_ID_TN
            : DELIVERY_ID_OTHER_TN;

        setState({
          selectedShippingId: deliveryMethodIds,
          selectedState1: e.target.value,
        });
        const checkoutId = localStorage.getItem("checkoutId");
        const res = await checkoutShippingAddressUpdate({
          checkoutId,
          shippingAddress: {
            country: country,
          },
          note: state.notes,
        });
        updateDelivertMethod(
          e.target.value,
          state.selectedPaymentType,
          deliveryMethodIds
        );
      }
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const thumbRef = useRef(null);

  console.log("✌️state.paymentType --->", state.paymentType);

  useEffect(() => {
    const el = thumbRef.current;
    const initialOffsetTop = el?.offsetTop ?? 0;

    function handleScroll() {
      if (!el) return;

      const scrollY = window?.scrollY || window?.pageYOffset;
      const stickyTop = 120;

      if (scrollY + stickyTop > initialOffsetTop) {
        el.style.position = "sticky";
        el.style.top = `${stickyTop}px`;
        el.style.zIndex = 10;
      } else {
        el.style.position = "static";
        el.style.top = "auto";
      }
    }

    if (!el) return;

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCheckDifferentAddress = async (isChecked) => {
    try {
      const isCheckbox = isChecked;
      const checkoutId = localStorage.getItem("checkoutId");

      setState({ diffAddress: isChecked });
      if (isCheckbox) {
        const shippingCountry = state.selectedCountry1;
        const shippingState = state.selectedState1;
        const shippingPincode = state.postalCode1;
        setState({ postalCode1: shippingPincode });
        if (shippingCountry == "IN") {
          const deliveryMethodIds =
            shippingState == "Tamil Nadu"
              ? DELIVERY_ID_TN
              : DELIVERY_ID_OTHER_TN;

          setState({
            selectedShippingId: deliveryMethodIds,
          });
          const res = await checkoutShippingAddressUpdate({
            checkoutId,
            shippingAddress: {
              country: shippingCountry,
            },
            note: state.notes,
          });
          updateDelivertMethod(
            shippingCountry,
            state.selectedPaymentType,
            deliveryMethodIds
          );
        } else {
          if (shippingCountry) {
            const deliveryMethodIds = DELIVERY_ID_OTHER_IN;
            const res = await checkoutShippingAddressUpdate({
              checkoutId,
              shippingAddress: {
                country: shippingCountry,
              },
              note: state.notes,
            });
            updateDelivertMethod(
              shippingCountry,
              state.selectedPaymentType,
              deliveryMethodIds
            );
          }
        }
      } else {
        const shippingCountry = state.selectedCountry;
        const shippingState = state.selectedState;
        const shippingPincode = state.postalCode;
        setState({ postalCode: shippingPincode });

        if (shippingCountry == "IN") {
          const deliveryMethodIds =
            shippingState == "Tamil Nadu"
              ? DELIVERY_ID_TN
              : DELIVERY_ID_OTHER_TN;

          setState({
            selectedShippingId: deliveryMethodIds,
          });
          const res = await checkoutShippingAddressUpdate({
            checkoutId,
            shippingAddress: {
              country: shippingCountry,
            },
            note: state.notes,
          });
          updateDelivertMethod(
            shippingCountry,
            state.selectedPaymentType,
            deliveryMethodIds
          );
        } else {
          if (shippingCountry) {
            const deliveryMethodIds = DELIVERY_ID_OTHER_IN;
            const res = await checkoutShippingAddressUpdate({
              checkoutId,
              shippingAddress: {
                country: shippingCountry,
              },
              note: state.notes,
            });
            updateDelivertMethod(
              shippingCountry,
              state.selectedPaymentType,
              deliveryMethodIds
            );
          }
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      {state.showVoucherMessage && (
        <p
          className="d-flex justify-content-center"
          style={{
            color: "rgb(207 150 38)",
            paddingTop: "10px",
            fontWeight: "500",
            fontSize: "18px",
          }}
        >
          Coupon code applied successfully
        </p>
      )}
      <section
        className="tp-checkout-area"
        style={{
          //   backgroundColor: "#EFF1F5",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          paddingTop: state.showVoucherMessage ? 0 : 40,
        }}
      >
        <div className="container ">
          {cartList?.data?.checkout?.lines?.length == 0 && (
            <div className="tp-checkout-empty pb-50">
              <h4 className="py-2">No items found in cart to checkout</h4>
              <Link href="/shop" className={`tp-btn tp-btn-border`}>
                Return to shop
              </Link>
            </div>
          )}
          {cart?.length > 0 && (
            <div className="row">
              <div className=" " style={{ zIndex: "10" }}>
                <div className="tp-checkout-verify">
                  {!state.token && (
                    <div
                      className="col-xl-7 col-lg-12 px-2"
                      style={{ borderRadius: "10px", zIndex: "10" }}
                    >
                      <CheckoutLogin />
                    </div>
                  )}
                  <div
                    className={`tp-checkout-verify-item px-2 ${
                      !state.token ? "col-xl-5 col-lg-12" : "col-12"
                    }`}
                    style={{ borderRadius: "10px", zIndex: "10" }}
                  >
                    <p className="tp-checkout-verify-reveal">
                      Have a coupon?{" "}
                      <button
                        onClick={() => setState({ isOpen: !state.isOpen })}
                        type="button"
                        className="tp-checkout-coupon-form-reveal-btn"
                      >
                        Click here to enter your code
                      </button>
                    </p>

                    {state.isOpen && (
                      <div
                        id="tpCheckoutCouponForm"
                        className="tp-return-customer"
                        style={{ borderRadius: "20px" }}
                      >
                        <div className="tp-return-customer-input">
                          <div className="d-flex justify-content-between">
                            <label>Coupon Code :</label>
                            <div
                              style={{
                                marginTop: "-20px",
                                color: "black",
                                fontSize: "18px",
                                fontWeight: "700",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                setState({ isOpen: !state.isOpen })
                              }
                            >
                              X
                            </div>
                          </div>

                          <input
                            value={state.promoCode}
                            onChange={(e) =>
                              setState({ promoCode: e.target.value })
                            }
                            type="text"
                            placeholder="Coupon"
                            style={{ borderRadius: "10px" }}
                            // disabled={isVerified}
                          />
                          {state.promoCodeError && (
                            <ErrorMsg msg={state.promoCodeError} />
                          )}
                        </div>

                        <button
                          type="button"
                          className="tp-btn tp-btn-border"
                          onClick={() => applyCoupen()}
                          style={{ padding: "6px 35px" }}
                        >
                          {state.coupenLoader ? (
                            <ButtonLoader loading={state.coupenLoader} />
                          ) : (
                            "Apply"
                          )}
                        </button>
                      </div>
                    )}
                    {/* {state.showVoucherMessage && (
                      <p
                        style={{
                          color: "green",
                          paddingTop: "10px",
                          fontWeight: "500",
                          fontSize: "18px",
                        }}
                      >
                        Coupon code applied successfully
                      </p>
                    )} */}
                  </div>
                </div>{" "}
              </div>
            </div>
          )}
        </div>
      </section>

      {cart?.length > 0 && (
        <div className="cart-container container  checkout-page pb-50">
          {/* <div className="row justify-content-center"> */}
          {/* <div className="col-12 col-lg-10"> */}
          {/* <div className="container-fluid"> */}
          <div className="row ">
            {/* Billing Details */}
            <div className="col-lg-7  " style={{ zIndex: "10" }}>
              <div className="checkoutform py-5 px-3">
                <div className="d-flex justify-content-between">
                  <h4 className="mb-4 checkout-title">Billing Details</h4>
                  {localStorage.getItem("token") &&
                    addressList &&
                    addressList?.length > 0 && (
                      <button
                        type="button"
                        style={{
                          padding: "5px 20px 5px 20px",

                          borderRadius: "20px",
                          color: "white",
                          marginBottom: 30,
                          marginLeft: 10,
                          marginTop: "-10px",
                        }}
                        className="tp-btn tp-btn-border "
                        onClick={() => setState({ isBillingOpen: true })}
                      >
                        {"Set Address"}
                      </button>
                    )}
                </div>

                <form className="billing-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>First Name *</label>
                      <input
                        name="firstName"
                        id="firstName"
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={state.firstName}
                        onChange={(e) => handleInputChange(e, "firstName")}
                      />
                      {state.errors.firstName && (
                        <ErrorMsg msg={state.errors.firstName} />
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Last Name *</label>
                      <input
                        name="lastName"
                        id="lastName"
                        type="text"
                        className="form-control"
                        value={state.lastName}
                        placeholder="Last Name"
                        onChange={(e) => handleInputChange(e, "lastName")}
                      />
                      {state.errors.lastName && (
                        <ErrorMsg msg={state.errors.lastName} />
                      )}
                    </div>
                    <div className="col-12 mb-3">
                      <label>Company Name (optional)</label>
                      <input
                        name="companyName"
                        id="companyName"
                        type="text"
                        className="form-control"
                        placeholder="Company name"
                        value={state.companyName}
                        onChange={(e) => handleInputChange(e, "companyName")}
                      />
                      {/* {state.errors.streetAddress1 && (
                      <ErrorMsg msg={state.errors.streetAddress1} />
                    )} */}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="country">Country *</label>
                      <select
                        className="form-select"
                        name="country"
                        id="country"
                        value={state.selectedCountry}
                        onChange={(e) => handleSelectChange(e)}
                      >
                        <option>Select Country</option>
                        {CountryList?.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.country}
                          </option>
                        ))}
                      </select>
                      {state.errors.selectedCountry && (
                        <ErrorMsg msg={state.errors.selectedCountry} />
                      )}
                    </div>

                    {state.stateList?.length > 0 ? (
                      <div className="col-md-6 mb-3">
                        <label htmlFor="state">
                          State {state.stateList?.length > 0 && <span>*</span>}
                        </label>
                        <select
                          disabled={state.stateList?.length == 0}
                          name="state"
                          id="state"
                          //    className="nice-select w-100"
                          className="form-select"
                          value={state.selectedState}
                          onChange={(e) => {
                            handleStateChange(e, state.selectedCountry);
                          }}
                        >
                          <option value="">Select State</option>
                          {state.stateList?.map((item) => (
                            <option key={item.raw} value={item.raw}>
                              {item.raw}
                            </option>
                          ))}
                        </select>
                        {state.errors.selectedState && (
                          <ErrorMsg msg={state.errors.selectedState} />
                        )}
                      </div>
                    ) : (
                      <div className="col-md-6 mb-3">
                        <label htmlFor="country">
                          State <span>*</span>
                        </label>
                        <input
                          name="state"
                          id="state"
                          //   className="form-select"
                          type="text"
                          required
                          placeholder="Enter state name"
                          value={state.selectedState}
                          onChange={(e) => {
                            setState({ selectedState: e.target.value });
                          }}
                          style={{ borderRadius: "5px" }}
                        />
                        {state.errors.selectedState && (
                          <ErrorMsg msg={state.errors.selectedState} />
                        )}
                      </div>
                    )}

                    <div className="col-12 mb-3">
                      <label>Street Address *</label>
                      <input
                        name="address"
                        id="address"
                        type="text"
                        className="form-control"
                        placeholder="House number and street name"
                        value={state.streetAddress1}
                        onChange={(e) => handleInputChange(e, "streetAddress1")}
                      />
                      {state.errors.streetAddress1 && (
                        <ErrorMsg msg={state.errors.streetAddress1} />
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Town / City *</label>
                      <input
                        className="form-control"
                        name="city"
                        id="city"
                        type="text"
                        placeholder="City"
                        value={state.city}
                        onChange={(e) => handleInputChange(e, "city")}
                      />
                      {state.errors.city && (
                        <ErrorMsg msg={state.errors.city} />
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Postcode ZIP *</label>
                      <input
                        className="form-control"
                        name="zipCode"
                        id="zipCode"
                        type="text"
                        placeholder="Postcode ZIP"
                        value={state.postalCode}
                        onChange={(e) => handleInputChange(e, "postalCode")}
                      />
                      {state.errors.postalCode && (
                        <ErrorMsg msg={state.errors.postalCode} />
                      )}
                    </div>
                    <div className="col-12 mb-3">
                      <label>Phone *</label>
                      <PhoneInput
                        country={state.selectedCountry}
                        defaultCountry={state.selectedCountry}
                        value={state.phone}
                        onChange={handlePhoneChange}
                        international
                      />
                      {state.errors.phone && (
                        <ErrorMsg msg={state.errors.phone} />
                      )}
                      {/* <input type="tel" className="form-control" /> */}
                    </div>
                    <div className="col-12 mb-3">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={(e) => handleInputChange(e, "email")}
                      />
                      {state.errors.email && (
                        <ErrorMsg msg={state.errors.email} />
                      )}
                    </div>

                    {!validLoginAndReg() && (
                      <>
                        <div className="col-12 mb-2">
                          <input
                            id="remeber1"
                            type="checkbox"
                            checked={state.createAccount}
                            onChange={(e) =>
                              setState({ createAccount: e.target.checked })
                            }
                          />
                          <label className="ms-2" htmlFor="remeber1">
                            Create an Account?
                          </label>
                        </div>
                        <>
                          {state.createAccount && (
                            <div className="tp-checkout-bill-form">
                              <div className="tp-checkout-bill-inner">
                                <div className="row pt-2">
                                  {/* <div className="col-md-6">
                                    <div className="tp-checkout-input">
                                      <label>
                                        First Name <span>*</span>
                                      </label>
                                      <input
                                        className="form-control"
                                        name="loginFirstName"
                                        id="loginFirstName"
                                        type="text"
                                        placeholder="First Name "
                                        value={state.loginFirstName}
                                        onChange={(e) =>
                                          handleInputChange(e, "loginFirstName")
                                        }
                                      />
                                      {state.errors.loginFirstName && (
                                        <ErrorMsg
                                          msg={state.errors.loginFirstName}
                                        />
                                      )}
                                    </div>
                                  </div> */}
                                  {/* <div className="col-md-6">
                                    <div className="tp-checkout-input">
                                      <label>
                                        Last Name <span>*</span>
                                      </label>
                                      <input
                                        className="form-control"
                                        name="loginLastName"
                                        id="loginLastName"
                                        type="text"
                                        placeholder="Last Name "
                                        value={state.loginLastName}
                                        onChange={(e) =>
                                          handleInputChange(e, "loginLastName")
                                        }
                                      />
                                      {state.errors.loginLastName && (
                                        <ErrorMsg
                                          msg={state.errors.loginLastName}
                                        />
                                      )}
                                    </div>
                                  </div> */}
                                  {/* <div className="col-md-6">
                                    <div className="tp-checkout-input">
                                      <label>
                                        Email Address <span>*</span>
                                      </label>
                                      <input
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        value={state.loginEmail}
                                        onChange={(e) =>
                                          handleInputChange(e, "loginEmail")
                                        }

                                        // defaultValue={user?.email}
                                      />
                                      {state.errors.loginEmail && (
                                        <ErrorMsg
                                          msg={state.errors.loginEmail}
                                        />
                                      )}
                                    </div>
                                  </div> */}
                                  <div className="col-md-6">
                                    <div className="tp-checkout-input">
                                      <label>
                                        Password <span>*</span>
                                      </label>
                                      <input
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        type={
                                          state.passwordChecked
                                            ? "text"
                                            : "password"
                                        }
                                        value={state.password}
                                        placeholder="Password"
                                        onChange={(e) =>
                                          handleInputChange(e, "password")
                                        }
                                      />
                                      <div
                                        className="d-flex align-items-center gap-2 rounded pt-2"
                                        style={{
                                          cursor: "pointer",
                                        }}
                                      >
                                        <input
                                          id="passwords"
                                          type="checkbox"
                                          // className="form-check-input m-0"
                                          checked={state.passwordChecked}
                                          onChange={() =>
                                            setState({
                                              passwordChecked:
                                                !state.passwordChecked,
                                            })
                                          }
                                          style={{
                                            width: "18px",
                                            height: "18px",
                                            cursor: "pointer",
                                            // marginRight: "8px",
                                          }}
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <label
                                          htmlFor="passwords"
                                          className="mb-0"
                                          style={{ cursor: "pointer" }}
                                        >
                                          Show Password
                                        </label>
                                      </div>
                                      {state.errors.password && (
                                        <ErrorMsg msg={state.errors.password} />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="tp-login-bottom">
                                      <button
                                        type="button"
                                        className="tp-login-btn w-100"
                                        onClick={() => createAccount()}
                                      >
                                        Submit
                                      </button>
                                    </div> */}
                            </div>
                          )}
                        </>
                      </>
                    )}
                    {!state.allLinesGiftCard && (
                      <div className="col-12 mb-2 d-flex justify-content-between align-items-center ">
                        <div className="d-flex align-items-center">
                          <input
                            id="remeber"
                            type="checkbox"
                            checked={state.diffAddress}
                            onChange={(e) =>
                              handleCheckDifferentAddress(e.target.checked)
                            }
                          />
                          <label
                            className="ms-2 "
                            htmlFor="shipDiffAddress"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleCheckDifferentAddress(!state.diffAddress)
                            }
                          >
                            Ship to a Different Address?
                          </label>
                        </div>
                        <div className="mt-8">
                          {localStorage.getItem("token") &&
                            addressList &&
                            addressList?.length > 0 &&
                            state.diffAddress && (
                              <button
                                type="button"
                                style={{
                                  padding: "5px 20px 5px 20px",
                                  backgroundColor: "#e09a7a",
                                  borderRadius: 20,
                                  color: "white",
                                  marginBottom: 30,
                                  marginLeft: 10,
                                  marginTop: "10px",
                                  className: "tp-btn tp-btn-border",
                                  width: "auto",
                                }}
                                onClick={() =>
                                  setState({ isShippingOpen: true })
                                }
                              >
                                {"Set Address"}
                              </button>
                            )}
                        </div>
                      </div>
                    )}
                    {state.diffAddress && (
                      <div className="tp-checkout-bill-form">
                        <div className="tp-checkout-bill-inner">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="tp-checkout-input">
                                <label>
                                  First Name <span>*</span>
                                </label>
                                <input
                                  className="form-control"
                                  name="firstName"
                                  id="firstName1"
                                  type="text"
                                  placeholder="First Name"
                                  value={state.firstName1}
                                  onChange={(e) =>
                                    handleInputChange(e, "firstName1")
                                  }

                                  // defaultValue={user?.firstName}
                                />
                                {state.errors.firstName1 && (
                                  <ErrorMsg msg={state.errors.firstName1} />
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="tp-checkout-input">
                                <label>
                                  Last Name <span>*</span>
                                </label>
                                <input
                                  className="form-control"
                                  name="lastName"
                                  id="lastName1"
                                  type="text"
                                  value={state.lastName1}
                                  placeholder="Last Name"
                                  onChange={(e) =>
                                    handleInputChange(e, "lastName1")
                                  }
                                />
                                {state.errors.lastName1 && (
                                  <ErrorMsg msg={state.errors.lastName1} />
                                )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>Company name (optional)</label>
                                <input
                                  className="form-control"
                                  name="companyName"
                                  id="companyName"
                                  type="text"
                                  placeholder="Company name"
                                  value={state.companyName1}
                                  onChange={(e) =>
                                    handleInputChange(e, "companyName1")
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="tp-checkout-input">
                                <label htmlFor="country">
                                  Country <span>*</span>
                                </label>
                                <select
                                  name="country"
                                  id="country"
                                  value={state.selectedCountry1}
                                  className="form-select"
                                  onChange={(e) => shippingCoutryChange(e)}
                                >
                                  <option value="">Select Country</option>
                                  {CountryList?.map((item) => (
                                    <option key={item.code} value={item.code}>
                                      {item.country}
                                    </option>
                                  ))}
                                </select>
                                {state.errors.selectedCountry1 && (
                                  <ErrorMsg
                                    msg={state.errors.selectedCountry1}
                                  />
                                )}
                              </div>
                            </div>
                            {state.stateList1?.length > 0 ? (
                              <div className="col-md-6">
                                <div className="tp-checkout-input">
                                  <label htmlFor="state">
                                    State{" "}
                                    {state.stateList1?.length > 0 && (
                                      <span>*</span>
                                    )}
                                  </label>
                                  <select
                                    name="state"
                                    id="state"
                                    className="form-select"
                                    value={state.selectedState1}
                                    onChange={(e) => {
                                      setState({});
                                      handleShippingStateChange(
                                        e,
                                        state.selectedCountry1
                                      );
                                    }}
                                  >
                                    <option value="">Select State</option>
                                    {state.stateList1?.map((item) => (
                                      <option key={item.raw} value={item.raw}>
                                        {item.raw}
                                      </option>
                                    ))}
                                  </select>
                                  {state.errors.selectedState1 && (
                                    <ErrorMsg
                                      msg={state.errors.selectedState1}
                                    />
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="col-md-6">
                                <div className="tp-checkout-input">
                                  <label htmlFor="country">
                                    State <span>*</span>
                                  </label>
                                  <input
                                    //    className="form-control"
                                    name="state"
                                    id="state"
                                    type="text"
                                    required
                                    placeholder="Enter state name"
                                    value={state.selectedState1}
                                    onChange={(e) =>
                                      setState({
                                        selectedState1: e.target.value,
                                      })
                                    }
                                    style={{ borderRadius: "5px" }}
                                  />
                                  {state.errors.selectedState1 && (
                                    <ErrorMsg
                                      msg={state.errors.selectedState1}
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>
                                  Street address <span>*</span>
                                </label>
                                <input
                                  className="form-control"
                                  name="address"
                                  id="address"
                                  type="text"
                                  placeholder="House number and street name"
                                  value={state.streetAddress2}
                                  onChange={(e) =>
                                    handleInputChange(e, "streetAddress2")
                                  }
                                />
                                {state.errors.streetAddress2 && (
                                  <ErrorMsg msg={state.errors.streetAddress2} />
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="tp-checkout-input">
                                <label>
                                  Town / City <span>*</span>
                                </label>
                                <input
                                  className="form-control"
                                  name="city1"
                                  id="city1"
                                  type="text"
                                  placeholder="City"
                                  value={state.city1}
                                  onChange={(e) =>
                                    handleInputChange(e, "city1")
                                  }
                                />
                                {state.errors.city1 && (
                                  <ErrorMsg msg={state.errors.city1} />
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="tp-checkout-input">
                                <label>
                                  Postcode ZIP <span>*</span>
                                </label>
                                <input
                                  className="form-control"
                                  name="zipCode"
                                  id="zipCode"
                                  type="text"
                                  placeholder="Postcode ZIP"
                                  value={state.postalCode1}
                                  onChange={(e) =>
                                    handleInputChange(e, "postalCode1")
                                  }
                                />
                                {state.errors.postalCode1 && (
                                  <ErrorMsg msg={state.errors.postalCode1} />
                                )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>
                                  Phone <span>*</span>
                                </label>
                                {/* <PhoneInput
                                              value={state.phone1}
                                              defaultCountry="in"
                                              className="form-input"
                                              onChange={(e) => setState({ phone1: e })}
                                            /> */}

                                <PhoneInput
                                  defaultCountry={state.selectedCountry1}
                                  value={state.phone1}
                                  onChange={handlePhone1Change}
                                  international
                                />
                                {state.errors.phone1 && (
                                  <ErrorMsg msg={state.errors.phone1} />
                                )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="tp-checkout-input">
                                <label>
                                  Email address <span>*</span>
                                </label>
                                <input
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  type="email"
                                  placeholder="Email"
                                  value={state.email1}
                                  onChange={(e) =>
                                    handleInputChange(e, "email1")
                                  }

                                  // defaultValue={user?.email}
                                />
                                {state.errors.email1 && (
                                  <ErrorMsg msg={state.errors.email1} />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="col-12">
                      <label>Order Notes (optional)</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="orderNote"
                        id="orderNote"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        value={state.notes}
                        onChange={(e) => handleInputChange(e, "notes")}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-5  mt-3 mt-lg-0" style={{ zIndex: "10" }}>
              <div ref={thumbRef} className="manual-sticky-thumb">
                <div className=" checkoutPrice py-5 px-3">
                  <h4 className="mb-4 checkout-title ">Your Order</h4>
                  <div className="order-summary   rounded">
                    <ul className="list-unstyled">
                      {state.orderData?.lines?.map((item) => (
                        <li
                          key={item.id}
                          className="d-flex justify-content-between border-bottom py-2"
                        >
                          <span>
                            {item?.variant?.product?.name}{" "}
                            <span> x {item?.quantity}</span>
                          </span>
                          <strong>
                            {state.channel == "india-channel" ? (
                              <>
                                <span>
                                  &#8377;
                                  {addCommasToNumber(
                                    item?.totalPrice?.gross?.amount
                                  )}
                                </span>
                              </>
                            ) : (
                              <span>
                                $
                                {addCommasToNumber(
                                  item?.totalPrice?.gross?.amount
                                )}
                              </span>
                            )}
                          </strong>
                        </li>
                      ))}

                      {checkoutAllData?.discount &&
                        checkoutAllData?.discount?.amount !== 0.0 && (
                          <li className="d-flex justify-content-between border-bottom py-2">
                            <span
                              style={{ fontSize: "14px", fontWeight: "400" }}
                            >
                              <b>Coupon:</b> {checkoutAllData?.voucherCode}
                            </span>
                            <p onClick={handleRemoveDiscount}>
                              {" "}
                              {checkoutAllData?.discount &&
                                checkoutAllData?.discount?.amount !== 0.0 && (
                                  <span style={{ color: "green" }}>
                                    -&#8377;
                                    {roundOff(checkoutAllData.discount.amount)}
                                  </span>
                                )}
                              {""}
                              <span
                                style={{
                                  color: "black",
                                  cursor: "pointer",
                                  paddingLeft: "3px",
                                  fontWeight: "300",
                                }}
                              >
                                [Remove]
                              </span>
                            </p>
                          </li>
                        )}

                      {/* total */}
                      {(state?.shippingCost || state?.codAmount > 0) && (
                        <li className="d-flex justify-content-between border-bottom py-2">
                          <span>
                            {state.selectedPaymentType == CASE_ON_DELIVERY
                              ? "COD Fee"
                              : "Shipping"}
                          </span>

                          <strong>
                            {checkChannel() == "india-channel" ? (
                              state.codAmount > 0 ? (
                                <span>
                                  &#8377;{addCommasToNumber(state?.codAmount)}
                                </span>
                              ) : (
                                <span>
                                  &#8377;
                                  {addCommasToNumber(state?.shippingCost)}
                                </span>
                              )
                            ) : state.codAmount > 0 ? (
                              <span>
                                &#8377;{addCommasToNumber(state?.codAmount)}
                              </span>
                            ) : (
                              <span>
                                <span>
                                  ${addCommasToNumber(state?.shippingCost)}
                                </span>
                              </span>
                            )}
                          </strong>
                        </li>
                      )}

                      {/* giftCards */}

                      {state?.giftCard?.length > 0 &&
                        state?.giftCard?.map((item, i) => (
                          <li
                            className="d-flex justify-content-between border-bottom py-2"
                            key={i}
                          >
                            <span className="para">Gift voucher code</span>
                            <strong>
                              {checkChannel() == "india-channel" ? (
                                <span>
                                  &#8377;
                                  {addCommasToNumber(
                                    item?.currentBalance?.amount
                                  )}
                                </span>
                              ) : (
                                <span>
                                  <span>
                                    $
                                    {addCommasToNumber(
                                      item?.currentBalance?.amount
                                    )}
                                  </span>
                                </span>
                              )}
                            </strong>
                          </li>
                        ))}

                      {state.giftWrapAmount > 0 && (
                        <li className="d-flex justify-content-between border-bottom py-2">
                          <span>Gift Wrap</span>
                          <strong>
                            {checkChannel() == "india-channel" ? (
                              <span>&#8377;{state.giftWrapAmount}</span>
                            ) : (
                              <span>
                                <span>
                                  ${addCommasToNumber(state.giftWrapAmount)}
                                </span>
                              </span>
                            )}
                          </strong>
                        </li>
                      )}

                      <li className="d-flex justify-content-between border-bottom py-2">
                        <span>Total</span>
                        <strong>
                          {checkChannel() === "india-channel" ? (
                            <>
                              <p
                                style={{
                                  color: "black",
                                  fontWeight: "700",
                                  textAlign: "right",
                                }}
                              >
                                {state?.total && (
                                  <>&#8377;{addCommasToNumber(state?.total)}</>
                                )}
                                <br />
                                <span
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "14px",
                                  }}
                                >
                                  (includes &#8377;
                                  {addCommasToNumber(state?.tax)} GST)
                                </span>
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                style={{
                                  color: "black",
                                  fontWeight: "700",
                                  textAlign: "right",
                                }}
                              >
                                {state?.total && (
                                  <>${addCommasToNumber(state?.total)}</>
                                )}

                                <br />
                                <span
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "14px",
                                  }}
                                >
                                  (includes ${addCommasToNumber(state?.tax)}{" "}
                                  GST)
                                </span>
                              </p>
                            </>
                          )}
                        </strong>
                      </li>

                      <div className="flex w-full flex-row justify-between">
                        <div>
                          <div className="mt-3 mb-2">
                            <h5>Payment Method</h5>
                          </div>
                          {state.paymentType?.length > 0 ? (
                            <div className="">
                              {state.paymentType?.map((item) => (
                                <div
                                  key={item.id}
                                  className="d-flex align-items-center gap-2  rounded"
                                  style={{
                                    cursor: "pointer",
                                    // backgroundColor: item.checked
                                    //   ? "#f0f8ff"
                                    //   : "transparent",
                                  }}
                                  onClick={() => handleCheckboxChange(item.id)} // Makes entire area clickable
                                >
                                  <input
                                    id={`payment-${item.id}`}
                                    type="checkbox"
                                    className="form-check-input m-0"
                                    checked={item.checked}
                                    onChange={() =>
                                      handleCheckboxChange(item.id)
                                    }
                                    style={{
                                      width: "18px",
                                      height: "18px",
                                      cursor: "pointer",
                                      marginRight: "8px", // Space between checkbox and logo
                                    }}
                                    onClick={(e) => e.stopPropagation()} // Prevent double trigger
                                  />
                                  <Image
                                    src={
                                      item.name === "Razorpay"
                                        ? Razorpay_logo
                                        : item?.name == "CCAvenue"
                                        ? CcAvenue
                                        : cod
                                    }
                                    alt={item.name}
                                    width={90}
                                    height={40}
                                    style={{ objectFit: "contain" }}
                                  />
                                  <label
                                    htmlFor={`payment-${item.id}`}
                                    className="mb-0"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {item.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-danger">
                              Currently no payment methods available
                            </div>
                          )}
                          {state.selectedPaymentType == CASE_ON_DELIVERY && (
                            <ol>
                              <li>
                                Cash On Delivery orders will be booked only if
                                the pin code is serviceable for COD by our
                                Logistics Partner
                              </li>
                              <li>
                                In case of Cash on Delivery, confirmation will
                                be taken from the recipient over the call.
                              </li>
                              <li>
                                Noblesets reserves the right to disable COD
                                option for the User, If COD order is rejected.
                                Only cash/UPI payments will be accepted while
                                delivering the order under the COD format.
                              </li>
                              <li>
                                Demand Draft/ Cheques will not be accepted for
                                orders booked under the COD method of payment.
                                It is strictly a cash/UPI payment method only.
                              </li>
                              <li>
                                E-Gift Vouchers or store credit cannot be used
                                for COD orders. Foreign currency cannot be used
                                to make a COD payment.
                              </li>
                              <li>
                                Cash on Delivery is not applicable on Pre-order
                                products
                              </li>
                              <li>
                                Cash on Delivery option is eligible on orders
                                between 3000 INR to 30,000 INR
                              </li>
                            </ol>
                          )}
                          {state.errors.paymentType && (
                            <ErrorMsg msg={state.errors.paymentType} />
                          )}
                          <div className=" text-grey">
                            Cash on Delivery is not available
                          </div>
                        </div>
                        {state.isGiftWrap && (
                          <div>
                            <div className="mt-3 mb-2">
                              <h5>Gift Wrap</h5>
                            </div>
                            <div className="tp-login-remeber">
                              <input
                                id={"giftWrap"}
                                type="checkbox"
                                checked={state.checkedGiftwrap}
                                onChange={(e) => {
                                  checkoutGiftWrapUpdate(e.target.checked);
                                  setState({
                                    checkedGiftwrap: e.target.checked,
                                  });
                                  // handleGiftWrapChanged(e.target.checked);
                                }}
                              />
                              <label
                                htmlFor={`giftWrap`}
                                style={{ color: "black" }}
                              >
                                {"Gift Wrap"}
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                      {state.isGiftProduct && (
                        <div>Gift wrap is not applicable on gift cart</div>
                      )}
                      {/* <li>
                        <div className="tp-login-remeber">
                          <input
                            id="agree"
                            type="checkbox"
                            checked={state.isAgree}
                            onChange={(e) =>
                              setState({
                                isAgree: e.target.checked,
                                pType: true,
                              })
                            }
                          />
                          <label htmlFor="agree">
                            I have read and agree to the website terms and
                            conditions <span> * </span>
                          </label>
                        </div>
                      </li>
                      {state.errors.isAgree && (
                        <ErrorMsg msg={state.errors.isAgree} />
                      )} */}
                    </ul>

                    <div className="payment-section mt-4">
                      {/* <div className="form-check">
                  <input
                    type="radio"
                    name="payment"
                    id="razorpay"
                    className="form-check-input"
                  />
                  <label htmlFor="razorpay" className="form-check-label">
                    Razorpay
                  </label>
                </div>
                <p className="small text-muted">
                  Cash on Delivery is not applicable on Pre-order and gift cart
                  products
                </p>

                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="form-check-input"
                  />
                  <label htmlFor="terms" className="form-check-label small">
                    I have read and agree to the website terms and conditions *
                  </label>
                </div> */}

                      <p className="small mt-3 text-black">
                        Your personal data will be used to process your order,
                        support your experience throughout this website, and for
                        other purposes described in our{" "}
                        <strong
                          className="cursor-pointer"
                          onClick={() => router.push("/legal-policies")}
                        >
                          privacy policy
                        </strong>
                        .
                      </p>
                      <div className="tp-login-remeber">
                        <input
                          id="agree"
                          type="checkbox"
                          checked={state.isAgree}
                          onChange={(e) =>
                            setState({
                              isAgree: e.target.checked,
                              pType: true,
                            })
                          }
                        />
                        <label htmlFor="agree">
                          I have read and agree to the website{" "}
                          <a
                            className="text-black cursor-pointer"
                            href="/terms-and-conditions"
                          >
                            terms and conditions
                          </a>{" "}
                          <span> * </span>
                        </label>
                      </div>
                      {state.errors.isAgree && (
                        <ErrorMsg msg={state.errors.isAgree} />
                      )}

                      <button
                        className="w-100  mt-3 place-order-btn tp-btn tp-btn-border"
                        type="submit"
                        disabled={
                          state.orderLoading || loginLoading || registerLoading
                        }
                        onClick={() => handleSubmit()}
                      >
                        {state.orderLoading ||
                        loginLoading ||
                        registerLoading ? (
                          <ButtonLoader />
                        ) : (
                          "Place Order"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      )}
      <AddressModal
        title={"Set Billing Address"}
        open={state.isBillingOpen}
        close={() => setState({ isBillingOpen: false })}
        selectedAddress={(data) => setBillingAddress(data)}
      />

      <AddressModal
        title={"Set Shipping Address"}
        open={state.isShippingOpen}
        close={() => setState({ isShippingOpen: false })}
        selectedAddress={(data) => setShippingAddress(data)}
      />
    </>
  );
};

export default CheckoutBillingArea1;
