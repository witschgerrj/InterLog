import { AsyncStorage } from 'react-native';

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch {
    console.error('Could not store data');
  }
}

export const getData = async (key) => {
  const result = JSON.parse(await AsyncStorage.getItem(key));
  try {
    if (result !== null) {
      return result;
    }
  } catch {
    console.error('Could not retrieve data');
  }
}
