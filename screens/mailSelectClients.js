import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getData } from '../backend/asyncStorage';
import BackgroundScroll from '../components/bgScrollView';
import GrayedClientTab from '../components/grayedClientTab';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import backArrow from '../assets/backArrow.png';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-top: auto;
  margin-bottom: auto;
`
const HeaderSelectionBox = styled.View`
  width: 60px;
  height: 100%;
`
const Next = styled.Text`
  font-size: 22px;
  color: #248AC9;
  margin-right: 20px;
`

const MailSelectItems = (props) => {

  const [clientsWhite, setWhiteGroup] = useState([]);
  const [clientsBlue, setBlueGroup] = useState([]);  
  const [clientsYellow, setYellowGroup] = useState([]);
  const [clientsGreen, setGreenGroup] = useState([]);
  const [clientsViolet, setVioletGroup] = useState([]);
  const [clientsRed, setRedGroup] = useState([]);
  const [clientsNone, setNoneGroup] = useState([]);
  const [selectedClients, setSelectedClients] = useState({});

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
      setWhiteGroup(white);
      setBlueGroup(blue);
      setYellowGroup(yellow);
      setGreenGroup(green);
      setVioletGroup(violet);
      setRedGroup(red);
      setNoneGroup(none);
    })
  }

  const _addSelected = (clientUID, name, email) => {
    let items = JSON.parse(JSON.stringify(selectedClients));
    items[clientUID] = {
      name: name,
      email: email,
    } 
    setSelectedClients(items);
    props.navigation.setParams({selectedClients: items});
  }

  const _removeUnselected = (clientUID) => {
    let items = JSON.parse(JSON.stringify(selectedClients));
    delete items[clientUID];
    setSelectedClients(items);
    props.navigation.setParams({selectedClients: items});
  }

  useEffect(() => {
    _updateAllGroups();
    //props.navigation.setParams({ updateClients: _updateAllGroups});
  }, []);

  return (
    <BackgroundScroll>
      { 
        clientsWhite.map((client, index) => (
          <GrayedClientTab  key={'clientW' + index}
                            name={client.name}
                            email={client.email}
                            color={client.color}
                            selected={selectedClients.hasOwnProperty(client.id) ? true : false}
                            addSelected={_addSelected}
                            lastUpdated={client.lastUpdated}
                            removeUnselected={_removeUnselected}
                            clientUID={client.id}/>
        ))
      }
      { 
        clientsBlue.map((client, index) => (
          <GrayedClientTab  key={'clientB' + index}
                            name={client.name}
                            email={client.email}
                            color={client.color}
                            selected={selectedClients.hasOwnProperty(client.id) ? true : false}
                            addSelected={_addSelected}
                            lastUpdated={client.lastUpdated}
                            removeUnselected={_removeUnselected}
                            clientUID={client.id}/>
        ))
      }
      { 
        clientsYellow.map((client, index) => (
          <GrayedClientTab  key={'clientY' + index}
                            name={client.name}
                            email={client.email}
                            color={client.color}
                            selected={selectedClients.hasOwnProperty(client.id) ? true : false}
                            addSelected={_addSelected}
                            removeUnselected={_removeUnselected}
                            clientUID={client.id}/>
        ))
      }
      { 
        clientsGreen.map((client, index) => (
          <GrayedClientTab  key={'clientG' + index}
                            name={client.name}
                            email={client.email}
                            color={client.color}
                            selected={selectedClients.hasOwnProperty(client.id) ? true : false}
                            addSelected={_addSelected}
                            lastUpdated={client.lastUpdated}
                            removeUnselected={_removeUnselected}
                            clientUID={client.id}/>
        ))
      }
      { 
        clientsViolet.map((client, index) => (
          <GrayedClientTab  key={'clientV' + index}
                            name={client.name}
                            email={client.email}
                            color={client.color}
                            selected={selectedClients.hasOwnProperty(client.id) ? true : false}
                            addSelected={_addSelected}
                            lastUpdated={client.lastUpdated}
                            removeUnselected={_removeUnselected}
                            clientUID={client.id}/>
        ))
      }
      { 
        clientsRed.map((client, index) => (
          <GrayedClientTab  key={'clientR' + index}
                            name={client.name}
                            email={client.email}
                            color={client.color}
                            selected={selectedClients.hasOwnProperty(client.id) ? true : false}
                            addSelected={_addSelected}
                            lastUpdated={client.lastUpdated}
                            removeUnselected={_removeUnselected}
                            clientUID={client.id}/>
        ))
      }
      { 
        clientsNone.map((client, index) => (
          <GrayedClientTab  key={'clientN' + index}
                            name={client.name}
                            email={client.email}
                            color={client.color}
                            selected={selectedClients.hasOwnProperty(client.id) ? true : false}
                            addSelected={_addSelected}
                            lastUpdated={client.lastUpdated}
                            removeUnselected={_removeUnselected}
                            clientUID={client.id}/>
        ))
      }
    </BackgroundScroll>
  );
}

MailSelectItems.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.navigate('MailMessage', {
        selectedItems: props.navigation.getParam('selectedItems'),
        selectedDetails: props.navigation.getParam('selectedDetails'),
        selectedClients: props.navigation.getParam('selectedClients'),
      });
    }}>
    {
      Object.keys(props.navigation.getParam('selectedClients')).length !== 0 ?
        <Next>Next</Next>
      : null
    }
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.goBack();
    }}>
      <HeaderSelectionBox>
        <BackButton source={backArrow}/>
      </HeaderSelectionBox>
    </TouchableWithoutFeedback>
  ),
})

export default MailSelectItems;