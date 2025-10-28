// utils/ccavenue.js
import CryptoJS from 'crypto-js';
import { MERCHANT_ID, WORKING_KEY } from "./constant";

class CCAvenueClient {
  constructor() {
    this.working_key = WORKING_KEY;
    this.merchant_id = MERCHANT_ID;
  }

  // CCAvenue uses AES encryption with ECB mode
  encrypt(plainText) {
    if (!this.working_key || !plainText) {
      throw new Error('Working key or plain text missing');
    }

    try {
      const key = CryptoJS.enc.Utf8.parse(this.working_key);
      const iv = CryptoJS.enc.Utf8.parse(this.working_key); // ECB mode uses key as IV
      
      const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      
      return encrypted.toString();
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  decrypt(encText) {
    if (!this.working_key || !encText) {
      throw new Error('Working key or encrypted text missing');
    }

    try {
      const key = CryptoJS.enc.Utf8.parse(this.working_key);
      const iv = CryptoJS.enc.Utf8.parse(this.working_key);
      
      const decrypted = CryptoJS.AES.decrypt(encText, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt response');
    }
  }

  redirectResponseToJson(encResp) {
    if (!encResp) {
      throw new Error('CCAvenue encrypted response is required');
    }

    try {
      const ccavResponse = this.decrypt(encResp);
      console.log("✌️Decrypted response string:", ccavResponse);
      
      const responseArray = ccavResponse.split('&');
      const result = {};
      
      responseArray.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value !== undefined) {
          result[key] = decodeURIComponent(value);
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error processing redirect response:', error);
      throw error;
    }
  }

  getEncryptedOrder(orderParams) {
    if (!this.merchant_id || !orderParams) {
      throw new Error('Merchant ID or order params missing');
    }

    const data = Object.entries(orderParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    return this.encrypt(data);
  }
}

const CCAvenue = new CCAvenueClient();
export default CCAvenue;