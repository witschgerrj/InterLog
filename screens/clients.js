import React, { useEffect, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { getData, storeData } from '../backend/asyncStorage';
import BackgroundScroll from '../components/bgScrollView';
import ClientTab from '../components/clientTab';
import Add from '../assets/add.png';
import Settings from '../assets/settings.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getCurrentTime } from '../backend/firebase';

const AddButton = styled.Image`
  margin-right: 20px;
`

const SettingsButton = styled.Image`
  margin-left: 20px;
`

const Clients = (props) => {
  
  const [clientsWhite,  setWhiteGroup]  = useState(props.navigation.getParam('clientsWhite'));
  const [clientsBlue,   setBlueGroup]   = useState(props.navigation.getParam('clientsBlue'));
  const [clientsGreen,  setGreenGroup]  = useState(props.navigation.getParam('clientsGreen'));
  const [clientsYellow, setYellowGroup] = useState(props.navigation.getParam('clientsYellow'));
  const [clientsRed,    setRedGroup]    = useState(props.navigation.getParam('clientsRed'));
  const [clientsViolet, setVioletGroup] = useState(props.navigation.getParam('clientsViolet'));
  const [clientsNone,   setNoneGroup]   = useState(props.navigation.getParam('clientsNone'));

  const _updateAllGroups = () => {

    let none, blue, green, red, violet, white, yellow;

    const gather = async () => {
      none    = await getData('clientsNone');
      blue    = await getData('clientsBlue');
      green   = await getData('clientsGreen');
      red     = await getData('clientsRed');
      violet  = await getData('clientsViolet');
      white   = await getData('clientsWhite');
      yellow  = await getData('clientsYellow');
    }
    //execute gather and then update states
    gather()
    .then(() => {
      setNoneGroup(none);
      setBlueGroup(blue);
      setGreenGroup(green);
      setYellowGroup(yellow);
      setRedGroup(red);
      setVioletGroup(violet);
      setWhiteGroup(white);
    }).then(() => {
      props.navigation.setParams({  addNewClient: _addNewClient,
                                    clientsWhite: white,
                                    clientsBlue: blue,
                                    clientsGreen: green,
                                    clientsYellow: yellow,
                                    clientsRed: red,
                                    clientsViolet: violet,
                                    clientsNone: none,});
    })
  }

  const _identifyNewGroup = (client, color) => {
    if (color === '#D1D1D1') { //white
      let _clientsWhite = JSON.parse(JSON.stringify(clientsWhite));
      client.color = '#D1D1D1';
      //updating lastUpdated with current time
      client.lastUpdated = getCurrentTime();
      _clientsWhite.push(client);
      setWhiteGroup(_clientsWhite);
      //save param in navigation for use during add client
      props.navigation.setParams({ clientsWhite: _clientsWhite});
      //save data locally
      storeData('clientsWhite', _clientsWhite);
      return;
    }
    if (color === '#BABA27') { //yellow
      let _clientsYellow = JSON.parse(JSON.stringify(clientsYellow));      
      client.color = '#BABA27';
      //updating lastUpdated with current time
      client.lastUpdated = getCurrentTime();
      _clientsYellow.push(client);
      setYellowGroup(_clientsYellow);
      props.navigation.setParams({ clientsYellow: _clientsYellow});
      //save data locally
      storeData('clientsYellow', _clientsYellow);
      return;
    }
    if (color === '#3297B5') { //blue
      let _clientsBlue = JSON.parse(JSON.stringify(clientsBlue));
      client.color = '#3297B5';
      //updating lastUpdated with current time
      client.lastUpdated = getCurrentTime();
      _clientsBlue.push(client);
      setBlueGroup(_clientsBlue);
      props.navigation.setParams({ clientsBlue: _clientsBlue});
      //save data locally
      storeData('clientsBlue', _clientsBlue);
      return;
    }
    if (color === '#078D1C') { //green
      let _clientsGreen = JSON.parse(JSON.stringify(clientsGreen));
      client.color = '#078D1C';
      //updating lastUpdated with current time
      client.lastUpdated = getCurrentTime();
      _clientsGreen.push(client);
      setGreenGroup(_clientsGreen);
      props.navigation.setParams({ clientsGreen: _clientsGreen});
      //save data locally
      storeData('clientsGreen', _clientsGreen);
      return;
    }
    if (color === '#9B2F2F') { //red
      let _clientsRed = JSON.parse(JSON.stringify(clientsRed));
      client.color = '#9B2F2F';
      //updating lastUpdated with current time
      client.lastUpdated = getCurrentTime();
      _clientsRed.push(client);
      setRedGroup(_clientsRed);
      props.navigation.setParams({ clientsRed: _clientsRed});
      //save data locally
      storeData('clientsRed', _clientsRed);
      return;
    }
    if (color === '#8D0778') { //violet
      let _clientsViolet = JSON.parse(JSON.stringify(clientsViolet));
      client.color = '#8D0778';
      //updating lastUpdated with current time
      client.lastUpdated = getCurrentTime();
      _clientsViolet.push(client);
      setVioletGroup(_clientsViolet);
      props.navigation.setParams({ clientsViolet: _clientsViolet});
      //save data locally
      storeData('clientsViolet', _clientsViolet);
      return;
    } 
    if (color === '#2B2B2B') { //none
      let _clientsNone = JSON.parse(JSON.stringify(clientsNone));
      client.color = '#2B2B2B';
      //updating lastUpdated with current time
      client.lastUpdated = getCurrentTime();
      _clientsNone.push(client);
      setWhiteGroup(_clientsNone);
      props.navigation.setParams({ clientsNone: _clientsNone});
      //save data locally
      storeData('clientsNone', _clientsNone);
      return;
    }
  }

  const _updateWhite = async (name, color, email, phone, notes, uid, index, untouchedColor) => {
    //if color stays the same
    let _clientsWhite = JSON.parse(JSON.stringify(clientsWhite));
    let client = _clientsWhite[index];
    //update client data first
    if (client.name !== name) {
      client.name = name;
    }
    if (client.email !== email) {
      client.email = email;
    }
    if (client.phone !== phone) {
      client.phone = phone;
    }
    if (client.notes !== notes) {
      client.notes = notes;
    }
    //updating lastUpdated with current time
    client.lastUpdated = getCurrentTime();
    //check if color is the same... if so, update current array
    if (untouchedColor === color) {
      //setting index in array to be the updated data.
      _clientsWhite[index] = client;
      setWhiteGroup(_clientsWhite);
      props.navigation.setParams({ clientsWhite: _clientsWhite });
      //save data locally
      storeData('clientsWhite', _clientsWhite);
    } 
    // color has been changed...
    else {
      //remove from current array
      _clientsWhite.splice(index, 1);
      setWhiteGroup(_clientsWhite);
      props.navigation.setParams({ clientsWhite: _clientsWhite });
      //save data locally
      storeData('clientsWhite', _clientsWhite);
      //figure out what array it needs to be added to
      _identifyNewGroup(client, color);
    }
  }

  const _updateYellow = async (name, color, email, phone, notes, uid, index, untouchedColor) => {
    //if color stays the same
    let _clientsYellow = JSON.parse(JSON.stringify(clientsYellow));
    let client = _clientsYellow[index];
    //update client data first
    if (client.name !== name) {
      client.name = name;
    }
    if (client.email !== email) {
      client.email = email;
    }
    if (client.phone !== phone) {
      client.phone = phone;
    }
    if (client.notes !== notes) {
      client.notes = notes;
    }
    //updating lastUpdated with current time
    client.lastUpdated = getCurrentTime();
    //check if color is the same... if so, update current array
    if (untouchedColor === color) {
      //setting index in array to be the updated data.
      _clientsYellow[index] = client;
      setYellowGroup(_clientsYellow);
      props.navigation.setParams({ clientsYellow: _clientsYellow });
      //save data locally
      storeData('clientsYellow', _clientsYellow);
    } 
    // color has been changed...
    else {
      //remove from current array
      _clientsYellow.splice(index, 1);
      setYellowGroup(_clientsYellow);
      props.navigation.setParams({ clientsYellow: _clientsYellow });
      //save data locally
      storeData('clientsYellow', _clientsYellow);
      //figure out what array it needs to be added to
      _identifyNewGroup(client, color);
    }
  }

  const _updateBlue = async (name, color, email, phone, notes, uid, index, untouchedColor) => {
    let _clientsBlue = JSON.parse(JSON.stringify(clientsBlue));
    let client = _clientsBlue[index];
    //update client data first
    if (client.name !== name) {
      client.name = name;
    }
    if (client.email !== email) {
      client.email = email;
    }
    if (client.phone !== phone) {
      client.phone = phone;
    }
    if (client.notes !== notes) {
      client.notes = notes;
    }
    //updating lastUpdated with current time
    client.lastUpdated = getCurrentTime();
    //check if color is the same... if so, update current array
    if (untouchedColor === color) {
      //setting index in array to be the updated data.
      _clientsBlue[index] = client;
      setBlueGroup(_clientsBlue);
      props.navigation.setParams({ clientsBlue: _clientsBlue });
      //save data locally
      storeData('clientsBlue', _clientsBlue);
    } 
    // color has been changed...
    else {
      //remove from current array
      _clientsBlue.splice(index, 1);
      setBlueGroup(_clientsBlue);
      props.navigation.setParams({ clientsBlue: _clientsBlue });
      //save data locally
      storeData('clientsBlue', _clientsBlue);
      //figure out what array it needs to be added to
      _identifyNewGroup(client, color);
    }
  }

  const _updateGreen = async (name, color, email, phone, notes, uid, index, untouchedColor) => {
    //if color stays the same
    let _clientsGreen = JSON.parse(JSON.stringify(clientsGreen));
    let client = _clientsGreen[index];
    //update client data first
    if (client.name !== name) {
      client.name = name;
    }
    if (client.email !== email) {
      client.email = email;
    }
    if (client.phone !== phone) {
      client.phone = phone;
    }
    if (client.notes !== notes) {
      client.notes = notes;
    }
    //updating lastUpdated with current time
    client.lastUpdated = getCurrentTime();
    //check if color is the same... if so, update current array
    if (untouchedColor === color) {
      //setting index in array to be the updated data.
      _clientsGreen[index] = client;
      setGreenGroup(_clientsGreen);
      //save data locally
      storeData('clientsGreen', _clientsGreen);
      props.navigation.setParams({ clientsGreen: _clientsGreen });
    } 
    // color has been changed...
    else {
      //remove from current array
      _clientsGreen.splice(index, 1);
      setGreenGroup(_clientsGreen);
      props.navigation.setParams({ clientsGreen: _clientsGreen });
      //save data locally
      storeData('clientsGreen', _clientsGreen);
      //figure out what array it needs to be added to
      _identifyNewGroup(client, color);
    }
  }

  const _updateRed = async (name, color, email, phone, notes, uid, index, untouchedColor) => {
    //if color stays the same
    let _clientsRed = JSON.parse(JSON.stringify(clientsRed));
    let client = _clientsRed[index];
    //update client data first
    if (client.name !== name) {
      client.name = name;
    }
    if (client.email !== email) {
      client.email = email;
    }
    if (client.phone !== phone) {
      client.phone = phone;
    }
    if (client.notes !== notes) {
      client.notes = notes;
    }
    //updating lastUpdated with current time
    client.lastUpdated = getCurrentTime();
    //check if color is the same... if so, update current array
    if (untouchedColor === color) {
      //setting index in array to be the updated data.
      _clientsRed[index] = client;
      setRedGroup(_clientsRed);
      props.navigation.setParams({ clientsRed: _clientsRed });
      //save data locally
      storeData('clientsRed', _clientsRed);
    } 
    // color has been changed...
    else {
      //remove from current array
      _clientsRed.splice(index, 1);
      setRedGroup(_clientsRed);
      props.navigation.setParams({ clientsRed: _clientsRed });
      //save data locally
      storeData('clientsRed', _clientsRed);
      //figure out what array it needs to be added to
      _identifyNewGroup(client, color);
    }
  }

  const _updateViolet = async (name, color, email, phone, notes, uid, index, untouchedColor) => {
    //if color stays the same
    let _clientsViolet = JSON.parse(JSON.stringify(clientsViolet));
    let client = _clientsViolet[index];
    //update client data first
    if (client.name !== name) {
      client.name = name;
    }
    if (client.email !== email) {
      client.email = email;
    }
    if (client.phone !== phone) {
      client.phone = phone;
    }
    if (client.notes !== notes) {
      client.notes = notes;
    }
    //updating lastUpdated with current time
    client.lastUpdated = getCurrentTime();
    //check if color is the same... if so, update current array
    if (untouchedColor === color) {
      //setting index in array to be the updated data.
      _clientsViolet[index] = client;
      setVioletGroup(_clientsViolet);
      props.navigation.setParams({ clientsViolet: _clientsViolet });
      //save data locally
      storeData('clientsViolet', _clientsViolet);
    } 
    // color has been changed...
    else {
      //remove from current array
      _clientsViolet.splice(index, 1);
      setVioletGroup(_clientsViolet);
      props.navigation.setParams({ clientsViolet: _clientsViolet });
      //save data locally
      storeData('clientsViolet', _clientsViolet);
      //figure out what array it needs to be added to
      _identifyNewGroup(client, color);
    }
  }

  const _updateNone = async (name, color, email, phone, notes, uid, index, untouchedColor) => {
    //if color stays the same
    let _clientsNone = JSON.parse(JSON.stringify(clientsNone));
    let client = _clientsNone[index];
    //update client data first
    if (client.name !== name) {
      client.name = name;
    }
    if (client.email !== email) {
      client.email = email;
    }
    if (client.phone !== phone) {
      client.phone = phone;
    }
    if (client.notes !== notes) {
      client.notes = notes;
    }
    //updating lastUpdated with current time
    client.lastUpdated = getCurrentTime();
    //check if color is the same... if so, update current array
    if (untouchedColor === color) {
      //setting index in array to be the updated data.
      _clientsNone[index] = client;
      setNoneGroup(_clientsNone);
      props.navigation.setParams({ clientsNone: _clientsNone });
      //save data locally
      storeData('clientsNone', _clientsNone);
    } 
    // color has been changed...
    else {
      //remove from current array
      _clientsNone.splice(index, 1);
      setNoneGroup(_clientsNone);
      props.navigation.setParams({ clientsNone: _clientsNone });
      //save data locally
      storeData('clientsNone', _clientsNone);
      //figure out what array it needs to be added to
      _identifyNewGroup(client, color);
    }
  }

  const _deleteWhite = (index) => {
    let _clientsWhite = JSON.parse(JSON.stringify(clientsWhite));
    _clientsWhite.splice(index, 1);
    setWhiteGroup(_clientsWhite);
    props.navigation.setParams({ clientsWhite: _clientsWhite });
    //save data locally
    storeData('clientsWhite', _clientsWhite);
  }
  const _deleteBlue = (index) => {
    let _clientsBlue = JSON.parse(JSON.stringify(clientsBlue));
    _clientsBlue.splice(index, 1);
    setBlueGroup(_clientsBlue);
    props.navigation.setParams({ clientsBlue: _clientsBlue });
    //save data locally
    storeData('clientsBlue', _clientsBlue);
  }
  const _deleteYellow = (index) => {
    let _clientsYellow = JSON.parse(JSON.stringify(clientsYellow));
    _clientsYellow.splice(index, 1);
    setYellowGroup(_clientsYellow);
    props.navigation.setParams({ clientsYellow: _clientsYellow });
    //save data locally
    storeData('clientsYellow', _clientsYellow);
  }
  const _deleteGreen = (index) => {
    let _clientsGreen = JSON.parse(JSON.stringify(clientsGreen));
    _clientsGreen.splice(index, 1);
    setGreenGroup(_clientsGreen);
    props.navigation.setParams({ clientsGreen: _clientsGreen });
    //save data locally
    storeData('clientsGreen', _clientsGreen);
  }
  const _deleteViolet = (index) => {
    let _clientsViolet = JSON.parse(JSON.stringify(clientsViolet));
    _clientsViolet.splice(index, 1);
    setVioletGroup(_clientsViolet);
    props.navigation.setParams({ clientsViolet: _clientsViolet });
    //save data locally
    storeData('clientsViolet', _clientsViolet);
  }
  const _deleteRed = (index) => {
    let _clientsRed = JSON.parse(JSON.stringify(clientsRed));
    _clientsRed.splice(index, 1);
    setRedGroup(_clientsRed);
    props.navigation.setParams({ clientsRed: _clientsRed });
    //save data locally
    storeData('clientsRed', _clientsRed);
  }
  const _deleteNone = (index) => {
    let _clientsNone = JSON.parse(JSON.stringify(clientsNone));
    _clientsNone.splice(index, 1);
    setNoneGroup(_clientsNone);
    props.navigation.setParams({ clientsNone: _clientsNone });
    //save data locally
    storeData('clientsNone', _clientsNone);
  }
  const _addNewClient = (name, email, phone, color, uid, white, yellow, blue, green, red, violet, none) => {
    let client = {
      name: name,
      email: email,
      phone: phone,
      color: color,
      notes: '',
      id: uid,
      lastUpdated: getCurrentTime(),
    }

    if (color === '#D1D1D1') { //white
      let _clientsWhite = white;
      _clientsWhite.push(client);
      setWhiteGroup(_clientsWhite);
      props.navigation.setParams({ clientsWhite: _clientsWhite });
      //save data locally
      storeData('clientsWhite', _clientsWhite);
      return;
    }
    if (color === '#BABA27') { //yellow
      let _clientsYellow = yellow;   
      _clientsYellow.push(client);
      setYellowGroup(_clientsYellow);
      props.navigation.setParams({ clientsYellow: _clientsYellow });
      //save data locally
      storeData('clientsYellow', _clientsYellow);
      return;
    }
    if (color === '#3297B5') { //blue
      let _clientsBlue = blue; 
      _clientsBlue.push(client);
      setBlueGroup(_clientsBlue);
      props.navigation.setParams({ clientsBlue: _clientsBlue });
      //save data locally
      storeData('clientsBlue', _clientsBlue);
      return;
    }
    if (color === '#078D1C') { //green
      let _clientsGreen = green; 
      _clientsGreen.push(client);
      setGreenGroup(_clientsGreen);
      props.navigation.setParams({ clientsGreen: _clientsGreen });
      //save data locally
      storeData('clientsGreen', _clientsGreen);
      return;
    }
    if (color === '#9B2F2F') { //red
      let _clientsRed = red; 
      _clientsRed.push(client);
      setRedGroup(_clientsRed);
      props.navigation.setParams({ clientsRed: _clientsRed });
      //save data locally
      storeData('clientsRed', _clientsRed);
      return;
    }
    if (color === '#8D0778') { //violet
      let _clientsViolet = violet; 
      _clientsViolet.push(client);
      setVioletGroup(_clientsViolet);
      props.navigation.setParams({ clientsViolet: _clientsViolet });
      //save data locally
      storeData('clientsViolet', _clientsViolet);
      return;
    } 
    if (color === '#2B2B2B') { //none
      let _clientsNone = none; 
      _clientsNone.push(client);
      setNoneGroup(_clientsNone);
      props.navigation.setParams({ clientsNone: _clientsNone });
      //save data locally
      storeData('clientsNone', _clientsNone);
      return;
    }
  }

  useEffect(() => {
    _updateAllGroups();
  }, []);

  return (
    <BackgroundScroll>
      { 
        clientsWhite.map((client, index) => (
          <ClientTab  key={'clientW' + index}
                      name={client.name}
                      untouchedColor = {client.color}
                      color={client.color}
                      email={client.email}
                      phone={client.phone}
                      notes={client.notes}
                      originalNotes={client.notes}
                      clientUID={client.id}
                      lastUpdated={client.lastUpdated}
                      arrayIndex={index}
                      navigation={props.navigation}
                      updateLocal={_updateWhite}
                      delete={_deleteWhite}/>
        ))
      }
      { 
        clientsBlue.map((client, index) => (
          <ClientTab  key={'clientB' + index}
                      name={client.name}
                      untouchedColor = {client.color}
                      color={client.color}
                      email={client.email}
                      phone={client.phone}
                      notes={client.notes}
                      clientUID={client.id}
                      originalNotes={client.notes}
                      lastUpdated={client.lastUpdated}
                      arrayIndex={index}
                      navigation={props.navigation}
                      updateLocal={_updateBlue}
                      delete={_deleteBlue}/>
        ))
      }
      { 
        clientsYellow.map((client, index) => (
          <ClientTab  key={'clientY' + index}
                      name={client.name}
                      untouchedColor = {client.color}
                      color={client.color}
                      email={client.email}
                      phone={client.phone}
                      notes={client.notes}
                      clientUID={client.id}
                      originalNotes={client.notes}
                      lastUpdated={client.lastUpdated}
                      arrayIndex={index}
                      navigation={props.navigation}
                      updateLocal={_updateYellow}
                      delete={_deleteYellow}/>
        ))
      }
      { 
        clientsGreen.map((client, index) => (
          <ClientTab  key={'clientG' + index}
                      name={client.name}
                      untouchedColor = {client.color}
                      color={client.color}
                      email={client.email}
                      phone={client.phone}
                      notes={client.notes}
                      clientUID={client.id}
                      originalNotes={client.notes}
                      lastUpdated={client.lastUpdated}
                      arrayIndex={index}
                      navigation={props.navigation}
                      updateLocal={_updateGreen}
                      delete={_deleteGreen}/>
        ))
      }
      { 
        clientsViolet.map((client, index) => (
          <ClientTab  key={'clientV' + index}
                      name={client.name}
                      untouchedColor = {client.color}
                      color={client.color}
                      email={client.email}
                      phone={client.phone}
                      notes={client.notes}
                      clientUID={client.id}
                      originalNotes={client.notes}
                      lastUpdated={client.lastUpdated}
                      arrayIndex={index}
                      navigation={props.navigation}
                      updateLocal={_updateViolet}
                      delete={_deleteViolet}/>
        ))
      }
      { 
        clientsRed.map((client, index) => (
          <ClientTab  key={'clientR' + index}
                      name={client.name}
                      untouchedColor = {client.color}
                      color={client.color}
                      email={client.email}
                      phone={client.phone}
                      notes={client.notes}
                      originalNotes={client.notes}
                      lastUpdated={client.lastUpdated}
                      clientUID={client.id}
                      arrayIndex={index}
                      navigation={props.navigation}
                      updateLocal={_updateRed}
                      delete={_deleteRed}/>
        ))
      }
      { 
        clientsNone.map((client, index) => (
          <ClientTab  key={'clientN' + index}
                      name={client.name}
                      untouchedColor = {client.color}
                      color={client.color}
                      email={client.email}
                      phone={client.phone}
                      notes={client.notes}
                      clientUID={client.id}
                      originalNotes={client.notes}
                      lastUpdated={client.lastUpdated}
                      arrayIndex={index}
                      navigation={props.navigation}
                      updateLocal={_updateNone}
                      delete={_deleteNone}/>
        ))
      }
    </BackgroundScroll>
  );
}

Clients.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.navigate('ClientAdd', {
        addNewClient: props.navigation.getParam('addNewClient'),
        clientsWhite: props.navigation.getParam('clientsWhite'),
        clientsBlue: props.navigation.getParam('clientsBlue'),
        clientsGreen: props.navigation.getParam('clientsGreen'),
        clientsYellow: props.navigation.getParam('clientsYellow'),
        clientsRed: props.navigation.getParam('clientsRed'),
        clientsViolet: props.navigation.getParam('clientsViolet'),
        clientsNone: props.navigation.getParam('clientsNone'),
      })  
    }}>
      <AddButton source={Add}/>
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Settings')}>
      <SettingsButton source={Settings}/>
    </TouchableWithoutFeedback>
  )
})

export default Clients;