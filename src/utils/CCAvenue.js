import CryptoJS from "crypto-js";
import { WORKING_KEY, MERCHANT_ID } from "./constants";

class CCAvenueClient {
  constructor() {
    this.working_key = WORKING_KEY;
    this.merchant_id = MERCHANT_ID;
  }

  encrypt(plainText) {
    if (!this.working_key || !plainText)
      throw new Error("Missing working key or data");

    const key = CryptoJS.enc.Utf8.parse(this.working_key);
    const iv = CryptoJS.enc.Utf8.parse(this.working_key.substring(0, 16));
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  decrypt(encText) {
    if (!this.working_key || !encText)
      throw new Error("Missing working key or encrypted text");

    const key = CryptoJS.enc.Utf8.parse(this.working_key);
    const iv = CryptoJS.enc.Utf8.parse(this.working_key.substring(0, 16));

    const decrypted = CryptoJS.AES.decrypt(encText, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  getEncryptedOrder(params) {
    const data = Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");
    return this.encrypt(data);
  }

  redirectResponseToJson(encResp) {
    const decrypted = this.decrypt(encResp);
    const pairs = decrypted.split("&");
    const result = {};
    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      if (key) result[key] = decodeURIComponent(value || "");
    }
    return result;
  }
}

const CCAvenue = new CCAvenueClient();
export default CCAvenue;
