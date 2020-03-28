//loading and login will send a user to this layer..
//get data from firebase for user
//store on device
//.then navigate to clients page
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FB, getCatalog, getCategories, getClientsGroupBlue,
         getClientsGroupGreen, getClientsGroupNone, getClientsGroupRed,
         getClientsGroupViolet, getClientsGroupWhite, getClientsGroupYellow
       } from '../backend/firebase';
import { storeData } from '../backend/asyncStorage';
import { ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InterLog from '../assets/AdobeFiles/AppLogos/InterLogFullWhite.png';

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

  const _formatClients = (firebaseData) => {
    let docs = [];
    firebaseData.map(doc => {
      let client = {}
      client.id = doc.id;
      client.color = doc.data().color;
      client.email = doc.data().email;
      client.name = doc.data().name;
      client.notes = doc.data().notes;
      client.phone = doc.data().phone;
      docs.push(client);
    })
    return docs;
  } 
  const _formatCatalog = (firebaseData) => {
    let docs = [];
    firebaseData.map(doc => {
      let item = {};
      item.id = doc.id;
      item.category = doc.data().category;
      item.imageLink = doc.data().imageLink;
      item.imageUUID = doc.data().imageUUID;
      item.link = doc.data().link;
      item.name = doc.data().name;
      item.notes = doc.data().notes;
      docs.push(item);
    })
    return docs;
  }

  const _retreiveData = async () => {
    let catalogData   = _formatCatalog(await getCatalog());
    let clientsNone   = _formatClients(await getClientsGroupNone());
    let clientsBlue   = _formatClients(await getClientsGroupBlue());
    let clientsGreen  = _formatClients(await getClientsGroupGreen());
    let clientsRed    = _formatClients(await getClientsGroupRed());
    let clientsViolet = _formatClients(await getClientsGroupViolet());
    let clientsWhite  = _formatClients(await getClientsGroupWhite());
    let clientsYellow = _formatClients(await getClientsGroupYellow());

    await storeData('catalogData', catalogData);
    await storeData('clientsWhite', clientsWhite);
    await storeData('clientsBlue', clientsBlue);
    await storeData('clientsYellow', clientsYellow);
    await storeData('clientsGreen', clientsGreen);
    await storeData('clientsViolet', clientsViolet);
    await storeData('clientsRed', clientsRed);
    await storeData('clientsNone', clientsNone);
    
  }

  useEffect(() => {
    _retreiveData().then(() => {
      props.navigation.navigate('Clients', {

      })
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