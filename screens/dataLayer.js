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

  const serialize = () => {
    const objects = new WeakSet();
    return (key, value) => {
      if (value !== null && typeof value === "object") {
        if (!objects.has(value)) {
          objects.add(value);
        } else {
          return;
        }
      }
      return value;
    };
  };

  const _retreiveData = async () => {
    let catalogData   = await getCatalog();
    let clientsNone   = await getClientsGroupNone();
    let clientsBlue   = await getClientsGroupBlue();
    let clientsGreen  = await getClientsGroupGreen();
    let clientsRed    = await getClientsGroupRed();
    let clientsViolet = await getClientsGroupViolet();
    let clientsWhite  = await getClientsGroupWhite();
    let clientsYellow = await getClientsGroupYellow();

    await storeData('catalogData'   , JSON.stringify(catalogData, serialize()));
    await storeData('clientsNone'   , JSON.stringify(clientsNone, serialize()));
    await storeData('clientsBlue'   , JSON.stringify(clientsBlue, serialize()));
    await storeData('clientsGreen'  , JSON.stringify(clientsGreen, serialize()));
    await storeData('clientsRed'    , JSON.stringify(clientsRed, serialize()));
    await storeData('clientsViolet' , JSON.stringify(clientsViolet, serialize()));
    await storeData('clientsWhite'  , JSON.stringify(clientsWhite, serialize()));
    await storeData('clientsYellow' , JSON.stringify(clientsYellow, serialize()))
    .then(() => {
      props.navigation.navigate('Clients', {

      })
    })
  }

  useEffect(() => {
    _retreiveData();
  }, []);


  return (
    <StyledGradient colors={['#160068', '#820974']}>
      <Logo source={InterLog}/>
      <LoadingIndicator size='large'/>
    </StyledGradient>
  );
}


export default DataLayer;