import { AsyncStorage } from 'react-native';

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
    console.log(`${key} data saved locally`);
  } catch {
    console.error('Could not store data');
  }
}

export const getData = async (key) => {
  const result = AsyncStorage.getItem(key);
  try {
    if (result !== null) {
      console.log(`${key} data retrieved locally`);
      return result;
    }
  } catch {
    console.error('Could not retrieve data');
  }

}
