//loading and login will send a user to this layer..
//get data from firebase for user
//store on device
//.then navigate to clients page
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FB, getCatalog, getCategories, getClientsGroupBlue,
         getClientsGroupGreen, getClientsGroupNone, getClientsGroupRed,
         getClientsGroupViolet, getClientsGroupWhite, getClientsGroupYellow, 
         getSecretKey,
       } from '../backend/firebase';
import { storeData } from '../backend/asyncStorage';
import { ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InterLog from '../assets/AdobeFiles/AppLogos/InterLogFullWhite.png';
import { decrypt } from '../backend/crypto';

const StyledGradient = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  padding-top: 150px;
`
const Logo = styled.Image`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
`
const LoadingIndicator = styled(ActivityIndicator)`
  margin-top: 135px;
`
const DataLayer = (props) => {
  //get the promise data with uids
  //map through, get the UIDS
  //add UIDs to each doc and save object

  const _formatClients = (firebaseData, secretKey) => {
    let docs = [];
    firebaseData.map(doc => {
      let client = {}
      client.id = doc.id;
      client.color = decrypt(doc.data().color);
      client.email = decrypt(doc.data().email);
      client.name = decrypt(doc.data().name);
      client.notes = decrypt(doc.data().notes);
      client.phone = decrypt(doc.data().phone);
      client.lastUpdated = decrypt(doc.data().lastUpdated);
      docs.push(client);
    })
    return docs;
  } 
  const _formatCatalog = (firebaseData, secretKey) => {
    let docs = [];
    firebaseData.map(doc => {
      let item = {};
      item.id = doc.id;
      item.category = decrypt(doc.data().category);
      item.imageLink = decrypt(doc.data().imageLink);
      item.imageUUID = decrypt(doc.data().imageUUID);
      item.link = decrypt(doc.data().link);
      item.name = decrypt(doc.data().name);
      item.notes = decrypt(doc.data().notes);
      docs.push(item);
    })
    return docs;
  }
  
  const getCategories = (catalog) => {
    let categories = {};

    catalog.map(item => {
      let category = decrypt(item.category);
      if (category !== '') {
        if (categories.hasOwnProperty(category)) {
          categories[category] += 1;
        } else {
          categories[category] = 1;
        }
      }
    });
    return categories;
  }

  const _retreiveData = async () => {
    const secretKey   = getSecretKey();
    let catalogData   = _formatCatalog(await getCatalog(), secretKey);
    let clientsNone   = _formatClients(await getClientsGroupNone(), secretKey);
    let clientsBlue   = _formatClients(await getClientsGroupBlue(), secretKey);
    let clientsGreen  = _formatClients(await getClientsGroupGreen(), secretKey);
    let clientsRed    = _formatClients(await getClientsGroupRed(), secretKey);
    let clientsViolet = _formatClients(await getClientsGroupViolet(), secretKey);
    let clientsWhite  = _formatClients(await getClientsGroupWhite(), secretKey);
    let clientsYellow = _formatClients(await getClientsGroupYellow(), secretKey);

    await storeData('catalogData', catalogData);
    await storeData('clientsWhite', clientsWhite);
    await storeData('clientsBlue', clientsBlue);
    await storeData('clientsYellow', clientsYellow);
    await storeData('clientsGreen', clientsGreen);
    await storeData('clientsViolet', clientsViolet);
    await storeData('clientsRed', clientsRed);
    await storeData('clientsNone', clientsNone);
    await storeData('categories', getCategories(catalogData));
    await storeData('secretKey', secretKey);
  }

  useEffect(() => {
    _retreiveData()
    .then(() => {
      props.navigation.navigate('Clients', {})
    })
    .catch(() => {
      Alert.alert("An error ocurred. Please reload Interlog.");
    });
  }, []);

  return (
    <StyledGradient colors={['#160068', '#820974']}>
      <Logo source={InterLog}/>
      <LoadingIndicator size='large'/>
    </StyledGradient>
  );
}

export default DataLayer;