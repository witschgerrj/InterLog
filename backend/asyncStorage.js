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

export const updateLocalClientNotes = async (key, index, notes) => {

  const result = JSON.parse(await AsyncStorage.getItem(key));

  try {
    if (result !== null) {
      //if item is the item were looking for, update the notes
      //update item notes
      result[index].notes = notes;
      //store the array back into local storage
      storeData(key, JSON.stringify(result));
    }
  } catch {
    console.error('Could not retrieve data');
  }
}

export const updateLocalCatalogNotes = async (index, notes) => {

  const result = JSON.parse(await AsyncStorage.getItem('catalogData'));

  try {
    if (result !== null) {
      //if item is the item were looking for, update the notes
      //update item notes
      result[index].notes = notes;
      //store the array back into local storage
      storeData('catalogData', JSON.stringify(result));
    }
  } catch {
    console.error('Could not retrieve data');
  }
}
