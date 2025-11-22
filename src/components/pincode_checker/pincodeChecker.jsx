import { useEffect, useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { usePincodeListMutation } from "@/redux/features/productApi";
import Loader from "../loader/loader";
import ButtonLoader from "../loader/button-loader";

export default function PincodeChecker() {
  const [picodeCheck, { isLoading: loading }] = usePincodeListMutation();

  const [pincode, setPincode] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);

  const handleCheck = async () => {
    try {
      const res = await picodeCheck({ code: pincode });
      if (res?.data?.data?.pincodes?.edges.length > 0) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
      }
    } catch (error) {}
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
          style={{ background: "#9b604d" ,
            border:"none"
          }}
        >
          {loading ? <ButtonLoader /> : "Check"}
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
