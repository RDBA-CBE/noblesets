import { useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import ButtonLoader from "../loader/button-loader";
import axios from "axios";
import { BLUE_DART_LIVE } from "@/utils/constant";

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [btnLoading, setLoading] = useState(false);
  const [deliveryData, setDeliveryData] = useState(null); // { pin, city, state, transitDays }
  const [isAvailable, setIsAvailable] = useState(null);

  const handleCheck = async () => {
    if (!pincode || pincode.length < 6) return;
    try {
      setLoading(true);
      const jwtToken = await axios.get(BLUE_DART_LIVE.TokenUrl);
      const profile = {
        Api_type: "S",
        LicenceKey: BLUE_DART_LIVE.LicenceKey,
        LoginID: BLUE_DART_LIVE.LoginID,
      };
      const headers = {
        "Content-Type": "application/json",
        accept: "application/json",
        JWTToken: jwtToken?.data?.JWTToken,
      };

      const res = await axios.post(
        `${BLUE_DART_LIVE.BaseUrl}/finder/v1/GetServicesforPincode`,
        { pinCode: pincode, profile },
        { headers },
      );

      const pincodeResult = res?.data?.GetServicesforPincodeResult;

      if (pincodeResult?.eTailPrePaidAirInbound === "Yes") {
        const transitRes = await axios.post(
          `${BLUE_DART_LIVE.BaseUrl}/transit/v1/GetDomesticTransitTimeForPinCodeandProduct`,
          {
            pPinCodeFrom: "641604",
            pPinCodeTo: pincode,
            pProductCode: "A",
            pSubProductCode: "P",
            pPudate: `/Date(${Date.now()})/`,
            pPickupTime: new Date().toTimeString().slice(0, 5),
            profile,
          },
          { headers },
        );

        const transitResult =
          transitRes?.data?.GetDomesticTransitTimeForPinCodeandProductResult;

        console.log("transitResult", transitResult);
        console.log("pincodeResult", pincodeResult);

        setDeliveryData({
          pin: pincode,
          city: pincodeResult?.CityDescription || "",
          state: pincodeResult?.State || "",
          expectedDate: transitResult?.ExpectedDateDelivery || null,
        });
        setIsAvailable(true);
      } else {
        setDeliveryData(null);
        setIsAvailable(false);
      }
    } catch (error) {
      setDeliveryData(null);
      setIsAvailable(false);
      console.log("✌️error --->", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePin = () => {
    setPincode("");
    setDeliveryData(null);
    setIsAvailable(null);
  };

  const formatDeliveryDate = () => {
    if (!deliveryData?.expectedDate) return null;
    const date = new Date(deliveryData.expectedDate);
    if (isNaN(date)) return deliveryData.expectedDate;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  if (deliveryData) {
    return (
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "16px 20px",
          background: "#f9f9f9",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "4px",
              }}
            >
              <span
                style={{ borderLeft: "3px solid #555", paddingLeft: "8px" }}
              >
                📍
              </span>
              <span style={{ fontWeight: "700", fontSize: "16px" }}>
                {deliveryData.pin}
              </span>
            </div>
            {deliveryData.city && (
              <p
                style={{
                  color: "#666",
                  fontSize: "13px",
                  margin: "0 0 0 24px",
                  paddingLeft:"10px"
                }}
              >
                {deliveryData.city}
                {deliveryData.state ? `, ${deliveryData.state}` : ""}
              </p>
            )}
          </div>
          <span
            onClick={handleChangePin}
            style={{
              color: "#9b604d",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "14px",
              whiteSpace: "nowrap",
            }}
          >
            Change PIN
          </span>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px dashed #ccc",
            margin: "12px 0",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>🚚</span>
          <span style={{ fontWeight: "700", fontSize: "15px" }}>
            Expected Delivery by {formatDeliveryDate() ?? "--"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="pincode-check">
      <p className="text-dark">Use pincode to check delivery info</p>

      <div className="input-group rounded shadow-sm">
        <span className="input-group-text bg-light border-0">
          <EnvironmentOutlined className="fs-5 text-dark" />
        </span>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Enter pincode"
          className="form-control border-0"
          maxLength={6}
          style={{ outline: "none", boxShadow: "none" }}
        />
        <button
          onClick={handleCheck}
          className="btn text-white"
          style={{ background: "#9b604d", border: "none" }}
        >
          {btnLoading ? <ButtonLoader /> : "Check"}
        </button>
      </div>

      {isAvailable === false && (
        <p className="mt-1 text-danger">
          Delivery is not available to this area
        </p>
      )}
    </div>
  );
}
