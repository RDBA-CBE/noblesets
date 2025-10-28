import CryptoJS from "crypto-js";
import { WORKING_KEY,ACCESS_CODE,MERCHANT_ID } from "./constant";



class CCAvenueClient {
  encrypt(plainText) {
    const key = CryptoJS.enc.Utf8.parse(WORKING_KEY);
    const iv = CryptoJS.enc.Utf8.parse(WORKING_KEY.substring(0, 16));
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  }

  decrypt(encText) {
    const key = CryptoJS.enc.Utf8.parse(WORKING_KEY);
    const iv = CryptoJS.enc.Utf8.parse(WORKING_KEY.substring(0, 16));
    const encryptedHexStr = CryptoJS.enc.Hex.parse(encText);
    const base64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypted = CryptoJS.AES.decrypt(base64Str, key, {
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

export default new CCAvenueClient();
export { MERCHANT_ID, ACCESS_CODE };
