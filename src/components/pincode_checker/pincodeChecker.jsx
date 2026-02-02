import { useEffect, useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { usePincodeListMutation } from "@/redux/features/productApi";
import Loader from "../loader/loader";
import ButtonLoader from "../loader/button-loader";
import axios from "axios";
import { BLUE_DART, BLUE_DART_LIVE } from "@/utils/constant";

export default function PincodeChecker() {
  const [picodeCheck, { isLoading: loading }] = usePincodeListMutation();

  const [pincode, setPincode] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [btnLoading, setLoading] = useState(false);

  // const handleCheck = async () => {
  //   try {

  //     const res = await picodeCheck({ code: pincode });
  //     if (res?.data?.data?.pincodes?.edges.length > 0) {
  //       setIsAvailable(true);
  //     } else {
  //       setIsAvailable(false);
  //     }
  //   } catch (error) {}
  // };

  const handleCheck = async () => {
    try {
      setLoading(true);

      const jwtToken = await axios.get(BLUE_DART_LIVE.TokenUrl);
      console.log("first", jwtToken);
      const res = await axios.post(
        `${BLUE_DART_LIVE.BaseUrl}/finder/v1/GetServicesforPincode`,
        {
          pinCode: pincode,
          profile: {
            Api_type: "S",
            LicenceKey: BLUE_DART_LIVE.LicenceKey,
            LoginID: BLUE_DART_LIVE.LoginID,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            JWTToken: jwtToken?.data?.JWTToken,
          },
        }
      );

      console.log("✌️res --->", res);
      if (res?.data) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
      }
      setLoading(false);
    } catch (error) {
      setIsAvailable(false);
      setLoading(false);

      console.log("✌️error --->", error);
    }
  };

  useEffect(() => {
    if (pincode?.length === 0) {
      setIsAvailable(null);
    }
  }, [pincode]);

  return (
    <div className="pincode-check">
      <p className=" text-dark ">Use pincode to check delivery info</p>

      <div className="input-group rounded shadow-sm">
        <span className="input-group-text bg-light border-0">
          <EnvironmentOutlined className="fs-5 text-dark" />
        </span>

        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter pincode"
          className="form-control border-0"
          style={{
            outline: "none",
            boxShadow: "none",
          }}
        />

        <button
          onClick={handleCheck}
          className="btn text-white"
          style={{ background: "#9b604d", border: "none" }}
        >
          {btnLoading ? <ButtonLoader /> : "Check"}
        </button>
      </div>

      {isAvailable !== null && (
        <p
          className={`mt-1  ${isAvailable ? "text-success" : "text-danger"}`}
          style={{ color: isAvailable ? "#c18a3d" : "" }}
        >
          {isAvailable
            ? "Delivery is available to this area"
            : "Delivery is not available to this area"}
        </p>
      )}
    </div>
  );
}
