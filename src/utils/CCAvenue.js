// utils/CCAvenueClient.js - Client-side compatible version
class CCAvenueClient {
  constructor() {
    this.working_key = process.env.NEXT_PUBLIC_WORKING_KEY; // Note: NEXT_PUBLIC_ prefix
    this.merchant_id = process.env.NEXT_PUBLIC_MERCHANT_ID;
  }

  async encrypt(plainText) {
    if (!this.working_key || !plainText) {
      throw new Error('Working key or plain text missing');
    }

    // Use Web Crypto API for client-side encryption
    const encoder = new TextEncoder();
    const keyData = encoder.encode(this.working_key);
    
    // Simple XOR encryption (fallback - for demo purposes)
    // Note: This is not as secure as AES. For production, consider server-side encryption
    let encrypted = '';
    for (let i = 0; i < plainText.length; i++) {
      const keyChar = keyData[i % keyData.length];
      encrypted += String.fromCharCode(plainText.charCodeAt(i) ^ keyChar);
    }
    
    return btoa(encrypted); // Base64 encode
  }

  async decrypt(encText) {
    if (!this.working_key || !encText) {
      throw new Error('Working key or encrypted text missing');
    }

    try {
      // Simple XOR decryption (matching the encryption above)
      const encoder = new TextEncoder();
      const keyData = encoder.encode(this.working_key);
      const decoded = atob(encText);
      
      let decrypted = '';
      for (let i = 0; i < decoded.length; i++) {
        const keyChar = keyData[i % keyData.length];
        decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ keyChar);
      }
      
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt response');
    }
  }

  async redirectResponseToJson(encResp) {
    if (!encResp) {
      throw new Error('CCAvenue encrypted response is required');
    }

    try {
      const ccavResponse = await this.decrypt(encResp);
      console.log("✌️Decrypted response string:", ccavResponse);
      
      const responseArray = ccavResponse.split('&');
      const result = {};
      
      responseArray.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value !== undefined) {
          result[key] = value;
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error processing redirect response:', error);
      throw error;
    }
  }

  async getEncryptedOrder(orderParams) {
    if (!this.merchant_id || !orderParams) {
      throw new Error('Merchant ID or order params missing');
    }

    const data = Object.entries(orderParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    
    return await this.encrypt(data);
  }
}

// Create singleton instance
const CCAvenue = new CCAvenueClient();

export default CCAvenue;