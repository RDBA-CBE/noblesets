import { createHash, createCipheriv, createDecipheriv } from 'crypto';

let initOptions = {};

class Configure {
    constructor(options) {
        initOptions = options || {};
    }

    validate(key) {
return initOptions && initOptions[key]? true : false;
    }

    throwError(requirement) {
        throw new Error(`${requirement} is required to perform this action`);
    }

    encrypt(plainText) {
        if (this.validate('working_key') && plainText) {
            const { working_key } = initOptions;
            const m = createHash('md5');
            m.update(working_key);
            const key = m.digest();
            // const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
            const iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
                0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
            const cipher = createCipheriv('aes-128-cbc', key, iv);
            let encoded = cipher.update(plainText, 'utf8', 'hex');
            encoded += cipher.final('hex');
            return encoded;
        } else if (!plainText) {
            this.throwError('Plain text');
            return false;
        } else {
            this.throwError('Working Key');
            return false;
        }
    }

    decrypt(encText) {
        if (this.validate('working_key') && encText) {
            const { working_key } = initOptions;
            const m = createHash('md5');
            m.update(working_key);
            const key = m.digest();
            // const iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';
            const iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
                0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
            const decipher = createDecipheriv('aes-128-cbc', key, iv);
            let decoded = decipher.update(encText, 'hex', 'utf8');
            decoded += decipher.final('utf8');
            return decoded;
        } else if (!encText) {
            this.throwError('Encrypted text');
            return false;
        } else {
            this.throwError('Working Key');
            return false;
        }
    }

    redirectResponseToJson(response) {
        if (response) {
            let ccavResponse = this.decrypt(response);
            const responseArray = ccavResponse.split('&');
            const stringify = JSON.stringify(responseArray);
            const removeQ = stringify.replace(/['"]+/g, '');
            const removeS = removeQ.replace(/[[\]]/g, '');
            return removeS.split(',').reduce((o, pair) => {
                pair = pair.split('=');
                return o[pair[0]] = pair[1], o;
            }, {});
        } else {
            this.throwError('CCAvenue encrypted response');
        }
    }

    getEncryptedOrder(orderParams) {
        if (this.validate('merchant_id') && orderParams) {
            // let data = `merchant_id=${initOptions.merchant_id}`;
            // data += Object.entries(orderParams).map(([key, value]) => `&${key}=${value}`).join('');
            // return this.encrypt(data);
            let data = Object.entries(orderParams).map(([key, value]) => `${key}=${value}`).join('&');
            return this.encrypt(data);

        } else if (!orderParams) {
            this.throwError('Order Params');
        } else {
            this.throwError('Merchant ID');
        }
    }

}


const CCAvenue = new Configure({
    working_key: "D58719F6B1A4057EA02DE130AFCB12D2",
    merchant_id: "315511" // <- Correct this to match working URL
});

export default CCAvenue;
