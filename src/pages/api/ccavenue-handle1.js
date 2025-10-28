"use client";
import CCAvenue from "@/utils/CCAvenue";
import { useEffect, useState } from "react";

export default function PaymentResponsePage() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Processing payment...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encResp = params.get("encResp");

    if (!encResp) {
      setStatus("No response received");
      return;
    }

    try {
      const result = CCAvenue.redirectResponseToJson(encResp);
      setData(result);
      setStatus(`Payment ${result.order_status}`);
    } catch (err) {
      console.error(err);
      setStatus("Error decrypting payment");
    }
  }, []);

  if (!data)
    return (
      <div className="text-center p-10">
        <h1>{status}</h1>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Payment Status</h1>
      <p><b>Order ID:</b> {data.order_id}</p>
      <p><b>Status:</b> {data.order_status}</p>
      <p><b>Tracking ID:</b> {data.tracking_id}</p>
    </div>
  );
}
