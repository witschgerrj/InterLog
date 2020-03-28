import React, { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { FB,  getClientsGroupNone, getClientsGroupBlue, 
              getClientsGroupGreen, getClientsGroupRed, 
              getClientsGroupViolet, getClientsGroupWhite, 
              getClientsGroupYellow } from '../backend/firebase';
import { getData } from '../backend/asyncStorage';
import BackgroundScroll from '../components/bgScrollView';
import ClientTab from '../components/clientTab';
import Add from '../assets/add.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AddButton = styled.Image`
  margin-right: 20px;
`

const Clients = (props) => {

  const [clientsGroupNone, setClientsGroupNone] = useState([]);
  const [clientsGroupBlue, setClientsGroupBlue] = useState([]);
  const [clientsGroupGreen, setClientsGroupGreen] = useState([]);
  const [clientsGroupYellow, setClientsGroupYellow] = useState([]);
  const [clientsGroupRed, setClientsGroupRed] = useState([]);
  const [clientsGroupViolet, setClientsGroupViolet] = useState([]);
  const [clientsGroupWhite, setClientsGroupWhite] = useState([]);

  const _updateClientsGroupNone = () => {
    getClientsGroupNone().then(docs => {
      setClientsGroupNone(docs);
    });
  }
  const _updateClientsGroupBlue = () => {
    getClientsGroupBlue().then(docs => {
      setClientsGroupBlue(docs);
    });
  }
  const _updateClientsGroupGreen = () => {
    getClientsGroupGreen().then(docs => {
      setClientsGroupGreen(docs);
    });
  }
  const _updateClientsGroupRed = () => {
    getClientsGroupRed().then(docs => {
      setClientsGroupRed(docs);
    });
  }
  const _updateClientsGroupViolet = () => {
    getClientsGroupViolet().then(docs => {
      setClientsGroupViolet(docs);
    });
  }
  const _updateClientsGroupWhite = () => {
    getClientsGroupWhite().then(docs => {
      setClientsGroupWhite(docs);
    });
  }
  const _updateClientsGroupYellow = () => {
    getClientsGroupYellow().then(docs => {
      setClientsGroupYellow(docs);
    });
  }
  const _updateAllGroups = () => {
    _updateClientsGroupNone();
    _updateClientsGroupBlue();
    _updateClientsGroupGreen();
    _updateClientsGroupRed();
    _updateClientsGroupViolet();
    _updateClientsGroupWhite();
    _updateClientsGroupYellow();
  }

  useEffect(() => {
    _updateAllGroups();
    props.navigation.setParams({ updateClients: _updateAllGroups});
  }, []);

  return (
    <BackgroundScroll>
      { 
        clientsGroupWhite.map((doc, index) => (
          <ClientTab  key={'clientW' + index}
                      name={doc.data().name}
                      color={doc.data().color}
                      email={doc.data().email}
                      phone={doc.data().phone}
                      notes={doc.data().notes}
                      clientUID={doc.id}
                      navigation={props.navigation}
                      updateClients={_updateAllGroups}/>
        ))
      }
      { 
        clientsGroupBlue.map((doc, index) => (
          <ClientTab  key={'clientB' + index}
                      name={doc.data().name}
                      color={doc.data().color}
                      email={doc.data().email}
                      phone={doc.data().phone}
                      notes={doc.data().notes}
                      clientUID={doc.id}
                      navigation={props.navigation}
                      updateClients={_updateAllGroups}/>
        ))
      }
      { 
        clientsGroupYellow.map((doc, index) => (
          <ClientTab  key={'clientY' + index}
                      name={doc.data().name}
                      color={doc.data().color}
                      email={doc.data().email}
                      phone={doc.data().phone}
                      notes={doc.data().notes}
                      clientUID={doc.id}
                      navigation={props.navigation}
                      updateClients={_updateAllGroups}/>
        ))
      }
      { 
        clientsGroupGreen.map((doc, index) => (
          <ClientTab  key={'clientG' + index}
                      name={doc.data().name}
                      color={doc.data().color}
                      email={doc.data().email}
                      phone={doc.data().phone}
                      notes={doc.data().notes}
                      clientUID={doc.id}
                      navigation={props.navigation}
                      updateClients={_updateAllGroups}/>
        ))
      }
      { 
        clientsGroupViolet.map((doc, index) => (
          <ClientTab  key={'clientV' + index}
                      name={doc.data().name}
                      color={doc.data().color}
                      email={doc.data().email}
                      phone={doc.data().phone}
                      notes={doc.data().notes}
                      clientUID={doc.id}
                      navigation={props.navigation}
                      updateClients={_updateAllGroups}/>
        ))
      }
      { 
        clientsGroupRed.map((doc, index) => (
          <ClientTab  key={'clientR' + index}
                      name={doc.data().name}
                      color={doc.data().color}
                      email={doc.data().email}
                      phone={doc.data().phone}
                      notes={doc.data().notes}
                      clientUID={doc.id}
                      navigation={props.navigation}
                      updateClients={_updateAllGroups}/>
        ))
      }
      { 
        clientsGroupNone.map((doc, index) => (
          <ClientTab  key={'clientN' + index}
                      name={doc.data().name}
                      color={doc.data().color}
                      email={doc.data().email}
                      phone={doc.data().phone}
                      notes={doc.data().notes}
                      clientUID={doc.id}
                      navigation={props.navigation}
                      updateClients={_updateAllGroups}/>
        ))
      }
    </BackgroundScroll>
  );
}

Clients.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.navigate('ClientAdd', {
        updateClients: props.navigation.getParam('updateClients'),
      })
    }}>
      <AddButton source={Add}>
      </AddButton>
    </TouchableWithoutFeedback>
  ),
})

export default Clients;