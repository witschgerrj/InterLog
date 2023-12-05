import * as Firebase from 'firebase';
import 'firebase/firestore';
import * as ImageManipulator from 'expo-image-manipulator';
import nanoid from 'nanoid/async';
import { Alert } from 'react-native';
import {encrypt} from './crypto';

var firebaseConfig = {
  apiKey: "AIzaSyBpNguIOoJUIES_y6yZDjZ6_sK2R408iTE",
  authDomain: "mycatalog-35b31.firebaseapp.com",
  databaseURL: "https://mycatalog-35b31.firebaseio.com",
  projectId: "mycatalog-35b31",
  storageBucket: "mycatalog-35b31.appspot.com",
  messagingSenderId: "880725484003",
  appId: "1:880725484003:web:7f6703bdf6ee4ae9f8c0d6",
  measurementId: "G-MS1N4V97TS",
};

export const getnanoid = async () => {
  return await nanoid();
}

export const getCurrentTime = () => {
  return Firebase.firestore.Timestamp.now().seconds;
}

export const FB = Firebase.initializeApp(firebaseConfig);
const db = Firebase.firestore();
const fbStorage = Firebase.storage().ref();

const getServerTimestamp = () => {
  return Firebase.firestore.FieldValue.serverTimestamp();
}

export async function getCatalog() {
  let snapshot = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .collection('Catalog')
                          .orderBy('category')
                          .get();
  return snapshot.docs;
}

export async function getCategories() {
  let data = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .collection('Catalog')
                          .orderBy('category')
                          .get();
  return data.docs;
}


export function addNewClient(name, email, phone, color, uid) {
  const encryptedName = encrypt(name, secretKey);
  const encryptedEmail = encrypt(email, secretKey);
  const encryptedPhone = encrypt(phone, secretKey);
  const encryptedColor = encrypt(color, secretKey);

  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Clients')
  .doc(uid)
  .set({
    name: encryptedName,
    email: encryptedEmail,
    phone: encryptedPhone,
    color: encryptedColor,
    notes: '',
    lastUpdated: Firebase.firestore.Timestamp.now().seconds,
    timestamp: getServerTimestamp(),
  })
}

export async function addNewItem(name, category, link, imageLink, id, imageUUID) {
  const encryptedName = encrypt(name, secretKey);
  const encryptedCategory = encrypt(category, secretKey);
  const encryptedLink = encrypt(link, secretKey);
  const encryptedImageLink = encrypt(imageLink, secretKey);
  const encryptedImageUUID = encrypt(imageUUID, secretKey);

  let url = '';
  if (imageLink !== '') {
    url = await saveCatalogImage(imageLink, imageUUID);
  }
  await db.collection('Users')
        .doc(FB.auth().currentUser.uid)
        .collection('Catalog')
        .doc(id)
        .set({
          name: encryptedName,
          category: encryptedCategory,
          link: encryptedLink,
          imageLink: encryptedImageLink,
          imageUUID: encryptedImageUUID,
          notes: '',
          timestamp: getServerTimestamp(),
        })
}
         
export function updateClient(name, email, phone, color, notes, clientUID) {
  const encryptedName = encrypt(name, secretKey);
  const encryptedEmail = encrypt(email, secretKey);
  const encryptedPhone = encrypt(phone, secretKey);
  const encryptedColor = encrypt(color, secretKey);

  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Clients')
  .doc(clientUID)
  .update({
    name: encryptedName,
    email: encryptedEmail,
    phone: encryptedPhone,
    color: encryptedColor,
    notes: notes,
    lastUpdated: Firebase.firestore.Timestamp.now().seconds,
  })
}
export function updateCatalogItem(name, category, url, link, imageUUID, notes, catalogItemUID) {
  const encryptedName = encrypt(name, secretKey);
  const encryptedCategory = encrypt(category, secretKey);
  const encryptedLink = encrypt(link, secretKey);
  const encryptedImageLink = encrypt(imageLisnk, secretKey);
  const encryptedImageUUID = encrypt(imageUUID, secretKey);
  const encryptedNotes = encrypt(notes, secretKey);

  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Catalog')
  .doc(catalogItemUID)
  .update({
    name: encryptedName,
    category: encryptedCategory,
    link: encryptedLink,
    imageLink: encryptedImageLink,
    imageUUID: encryptedImageUUID,
    notes: encryptedNotes,
  })
}

export function updateCatalogItemNotes(notes, catalogItemUID) {
  const encryptedNotes = encrypt(notes, secretKey);

  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Catalog')
  .doc(catalogItemUID)
  .update({
    notes: encryptedNotes,
  })
}

export function updateClientNotes(notes, clientUID) {
  const encryptedNotes = encrypt(notes, secretKey);

  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Clients')
  .doc(clientUID)
  .update({
    notes: encryptedNotes,
    lastUpdated: Firebase.firestore.Timestamp.now().seconds,
  })
}

export function updateCatalogNameLink(name, link, catalogItemUID) {
  const encryptedName = encrypt(name, secretKey);
  const encryptedLink = encrypt(link, secretKey);

  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Catalog')
  .doc(catalogItemUID)
  .update({
    name: encryptedName,
    link: encryptedLink,
  })
}

export function addCategory(categories) {
  const encryptedCategories = encrypt(categories, secretKey);

  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .update({
    categories: encryptedCategories,
  })
}

export function deleteCatalogItem(catalogItemUID) {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Catalog')
  .doc(catalogItemUID)
  .delete()
}

export function deleteClient(clientUID) {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Clients')
  .doc(clientUID)
  .delete()
}

export function updateItemCategory(catalogItemUID, category) {
  const encryptedCategory = encrypt(category, secretKey);

  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Catalog')
  .doc(catalogItemUID)
  .update({
    category: encryptedCategory,
  })
}

export async function updateItemImageURL(catalogItemUID, imageLink) {
  const encryptedImageLink = encrypt(imageLink, secretKey);

  await db.collection('Users')
        .doc(FB.auth().currentUser.uid)
        .collection('Catalog')
        .doc(catalogItemUID)
        .update({
          imageLink: encryptedImageLink,
        })
}

export async function getClientsGroupNone() {
  let snapshot = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .collection('Clients')
                          .where('color', '==', '#2B2B2B')
                          .get();
  return snapshot.docs;
}

export async function getClientsGroupWhite() {
  let snapshot = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .collection('Clients')
                          .where('color', '==', '#D1D1D1')
                          .get();
  return snapshot.docs;
}

export async function getClientsGroupBlue() {
  let snapshot = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .collection('Clients')
                          .where('color', '==', '#3297B5')
                          .get();
  return snapshot.docs;
}

export async function getClientsGroupYellow() {
  let snapshot = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .collection('Clients')
                          .where('color', '==', '#BABA27')
                          .get();
  return snapshot.docs;
}

export async function getClientsGroupGreen() {
  let snapshot = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .collection('Clients')
                          .where('color', '==', '#078D1C')
                          .get();
  return snapshot.docs;
}

export async function getClientsGroupRed() {
  let snapshot = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .collection('Clients')
                          .where('color', '==', '#9B2F2F')
                          .get();
  return snapshot.docs;
}

export async function getClientsGroupViolet() {
  let snapshot = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .collection('Clients')
                          .where('color', '==', '#8D0778')
                          .get();
  return snapshot.docs;
}

//---------------------------------------------------------
//--------------------Firebase Storage---------------------
//---------------------------------------------------------

const compressImage = async (imageURI) => {

  let compressed = await ImageManipulator.manipulateAsync(imageURI,
    [ 
      {resize: { width: 300}},
    ], 
    { compress: 0.5 }).catch(() => {
      Alert.alert("Network Error.");
    });

  return compressed.uri;
}


export async function saveCatalogImage(imageURI, imageUUID) {  //if no uuid is passed in, generate one.

  if (!imageUUID) {
    imageUUID = await nanoid();
  }

  let compressedImageURI = await compressImage(imageURI);
  
  let blob = await new Promise(res => {

    const request = new XMLHttpRequest();

    request.responseType = 'blob';
    request.open('GET', compressedImageURI, true);
    request.send(null);

    request.onload = () => {
      res(request.response);
    }

    request.onerror = () => {
      Alert.alert('Image save failed.');
    }
  });

  let saveItem = await fbStorage.child('catalogImages/' + `${FB.auth().currentUser.uid}/` + imageUUID).put(blob).catch(() => {
    Alert.alert('Error saving image');
  });

  blob.close();
  
  return await saveItem.ref.getDownloadURL();
}

export async function getCatalogImageURL(imageUUID) {
  let url = await fbStorage.child('catalogImages/' + `${FB.auth().currentUser.uid}/` + imageUUID).getDownloadURL();
  return url;
}

export async function deleteCatalogImage(imageUUID) {
  return await fbStorage.child('catalogImages/' + `${FB.auth().currentUser.uid}/` + imageUUID).delete();
}

// Crypto
export const saveSecretKey = (secretKey) => {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .set({
    key: secretKey,
  })
}

export const getSecretKey = async () => {
  let snapshot = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .get();
  return snapshot.docs;
}
