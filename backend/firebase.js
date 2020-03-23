import * as Firebase from 'firebase';
import 'firebase/firestore';

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

export const FB = Firebase.initializeApp(firebaseConfig);
const db = Firebase.firestore();

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

export function addNewClient(name, email, phone, color) {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Clients')
  .add({
    name: name,
    email: email,
    phone: phone,
    color: color,
    notes: '',
    timestamp: getServerTimestamp(),
  })
}

export function addNewItem(name, category, link, imageLink) {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Catalog')
  .add({
    name: name,
    category: category,
    link: link,
    imageLink: imageLink,
    notes: '',
    timestamp: getServerTimestamp(),
  })
}

export function updateClient(name, email, phone, color, notes, clientUID) {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Clients')
  .doc(clientUID)
  .update({
    name: name,
    email: email,
    phone: phone,
    color: color,
    notes: notes,
  })
}

export function updateCatalogItemNotes(notes, catalogItemUID) {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Catalog')
  .doc(catalogItemUID)
  .update({
    notes: notes,
  })
}

export function updateClientNotes(notes, clientUID) {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Clients')
  .doc(clientUID)
  .update({
    notes: notes,
  })
}

export function updateCatalogNameLink(name, link, catalogItemUID) {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Catalog')
  .doc(catalogItemUID)
  .update({
    name: name,
    link: link,
  })
}

export async function getCategories() {
  let data = await  db.collection('Users')
                          .doc(FB.auth().currentUser.uid)
                          .collection('Catalog')
                          .get();
  return data.docs;
}

export function addCategory(categories) {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .update({
    categories: categories,
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
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Catalog')
  .doc(catalogItemUID)
  .update({
    category: category,
  })
}


export function updateItemImageURL(catalogItemUID, imageLink) {
  db.collection('Users')
  .doc(FB.auth().currentUser.uid)
  .collection('Catalog')
  .doc(catalogItemUID)
  .update({
    imageLink: imageLink,
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