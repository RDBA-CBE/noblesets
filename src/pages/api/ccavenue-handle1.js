// pages/api/ccavenue-handle.js
import CCAvenue from "@/utils/CCAvenue";

export default async function handler(req, res) {

  switch (req.method) {
    case "POST":
      let data2 = CCAvenue.redirectResponseToJson(req.body.encResp);
      console.log("✌️data2 --->", data2);
      //const htmlContent = JSON.stringify(data2);

      //data2 = {"order_id":"WTWB1057111135204","tracking_id":"313011212805","bank_ref_no":"bs713d09c5a2b5","order_status":"Success","failure_message":"","payment_mode":"Credit Card","card_name":"Visa","status_code":"null","status_message":"Transaction is Successful","currency":"INR","amount":"500.00","billing_name":"VIJAY","billing_address":"74-C New Market Street","billing_city":"TIRUPPUR","billing_state":"Tamilnadu","billing_zip":"641604","billing_country":"India","billing_tel":"8220635111","billing_email":"test@gmail.com","delivery_name":"VIJAY","delivery_address":"74-C New Market Street","delivery_city":"TIRUPPUR","delivery_state":"Tamilnadu","delivery_zip":"641604","delivery_country":"India","delivery_tel":"8220635111","merchant_param1":"69098","merchant_param2":"","merchant_param3":"","merchant_param4":"","merchant_param5":"","vault":"N","offer_type":"null","offer_code":"null","discount_value":"0.0","mer_amount":"500.00","eci_value":"null","retry":"N","response_code":"","billing_notes":"","trans_date":"23/03/2024 11:12:21","bin_country":"INDIA"}

      // Convert JSON data to a string
      const jsonDataString = JSON.stringify(data2);

     
      // res.setHeader('Content-Type', 'text/html');
      // res.status(200).end(jsonDataString);

      res.redirect(302, `/payments?data=${encodeURIComponent(jsonDataString)}`);

      // // Store data in local storage
      // localStorage.setItem('payduepaymentData', jsonDataString);

      // res.redirect(302, "chit/paydue1");

      // // Set response headers to indicate HTML content
      // res.setHeader('Content-Type', 'text/html');
      // res.status(200).end(htmlContent);
      try {
        let data2 = req.body;
        res.status(405).end(data2);
        break;

        // Decrypt the Response Data from Request Body
        let data = CCAvenue.redirectResponseToJson(req.body.encResp);
        console.log(data);

        res.status(405).end(data);
        break;
      } catch (error) {
        // Handling Errors if anything Issue/Problem while Payment
        console.error("Error processing CCAvenue request:", error);
        res.status(405).end("data");
        break;
      }
      break;

    default:
      res.status(405).end("Method Not Allowed");
      break;
  }
}
