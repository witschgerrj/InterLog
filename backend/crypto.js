import CryptoJS from 'crypto-js';
import { randomBytes } from 'react-native-randombytes';
import { saveSecretKey } from './firebase';

// Stringify and parse for storing objects.
export const encrypt = (data, secretKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decrypt = (encryptedData, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Creates and saves a 256 bit secret.
export const createSecret = () => {
  const secret = randomBytes(256);
  // Saves key to Firebase cloud storage.
  saveSecretKey(secret);
}

// Returns decrypted catalog data.$
export const decryptCatalog = (catalog) => {
  const secretKey = getData('secretKey');

  catalog.map((item) => {
    const name = decrypt(item.name);
    const category = decrypt(item.category);
    const link = decrypt(item.link);
    const imageLink = decrypt(item.imageLink);
    const imageUUID = decrypt(item.imageUUID);
    const notes = decrypt(item.notes);

    return {
      name,
      category,
      link,
      imageLink,
      imageUUID,
      notes
    }
  })
}


