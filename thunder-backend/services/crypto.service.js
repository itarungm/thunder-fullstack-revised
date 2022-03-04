const CryptoJS = require("crypto-js");

class CryptoService{
  encryptData(data){
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.CRYPTO_SECRET);
      return data;
    } catch (e) {
      console.log(e);
    }
}

    decryptData(data){
        try {
          const bytes = CryptoJS.AES.decrypt(data, process.env.CRYPTO_SECRET);
          if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          }
          return data;
        } catch (e) {
          console.log(e);
        }
    }

    encryptJson(data){
      try {
        return encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), process.env.CRYPTO_SECRET).toString())
        return data;
      } catch (e) {
        console.log(e);
      }
  }
}



module.exports = CryptoService;
