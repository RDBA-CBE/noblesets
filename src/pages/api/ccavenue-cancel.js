// pages/api/ccavenue-handle.js
import CCAvenue from "@/utils/CCAvenue";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      let data2 = CCAvenue.redirectResponseToJson(req.body.encResp);
      console.log("✌️data2 --->", data2);


      const jsonDataString = JSON.stringify(data2);

  
      res.redirect(302, `/failed-order?data=${encodeURIComponent(jsonDataString)}`);
   
      try {
        let data2 = req.body;
        res.status(405).end(data2);
        break;

      } catch (error) {
        // Handling Errors if anything Issue/Problem while Payment
        console.error("Error processing CCAvenue request:", error);
        res.status(405).end("data");
        break;
      }

    default:
      res.status(405).end("Method Not Allowed");
      break;
  }
}
