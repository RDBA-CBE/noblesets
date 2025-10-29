import React from "react";
import { useRouter } from "next/router";

export default function payments() {
  const Router = useRouter();

  const { data } = Router.query;
  const storedData1 = decodeURIComponent(data);
  console.log("✌️storedData1 --->", storedData1);

  return <div>payments</div>;
}
