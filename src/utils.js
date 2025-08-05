import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'A7f9X2mV4Qe8LtCp'; // same key as your backend

export function decryptData(encryptedBase64) {
  try {
    // Decode Base64
    const encryptedHexStr = CryptoJS.enc.Base64.parse(encryptedBase64);
    // Convert to WordArray for CryptoJS AES decrypt
    const encryptedData = CryptoJS.enc.Hex.parse(encryptedHexStr.toString(CryptoJS.enc.Hex));
    const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedData);

    // Decrypt with AES ECB mode, PKCS7 padding (default in CryptoJS)
    const decrypted = CryptoJS.AES.decrypt(
      encryptedBase64,
      CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedText);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}
