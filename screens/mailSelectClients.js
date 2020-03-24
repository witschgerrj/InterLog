import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FB,  getClientsGroupNone, getClientsGroupBlue, 
              getClientsGroupGreen, getClientsGroupRed, 
              getClientsGroupViolet, getClientsGroupWhite, 
              getClientsGroupYellow } from '../backend/firebase';
import BackgroundScroll from '../components/bgScrollView';
import GrayedClientTab from '../components/grayedClientTab';
import backArrow from '../assets/backArrow.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-top: 3px;
`
const Next = styled.Text`
  font-size: 22px;
  color: #248AC9;
  margin-right: 20px;
`

const MailSelectItems = (props) => {

  const [clientsGroupNone, setClientsGroupNone] = useState([]);
  const [clientsGroupBlue, setClientsGroupBlue] = useState([]);
  const [clientsGroupGreen, setClientsGroupGreen] = useState([]);
  const [clientsGroupYellow, setClientsGroupYellow] = useState([]);
  const [clientsGroupRed, setClientsGroupRed] = useState([]);
  const [clientsGroupViolet, setClientsGroupViolet] = useState([]);
  const [clientsGroupWhite, setClientsGroupWhite] = useState([]);
  const [selectedClients, setSelectedClients] = useState({});

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

  const _addSelected = (clientUID, name) => {
    let items = JSON.parse(JSON.stringify(selectedClients));
    items[clientUID] = {
      name: name,
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
    props.navigation.setParams({ updateClients: _updateAllGroups});
  }, []);

  return (
    <BackgroundScroll>
      { 
        clientsGroupWhite.map((doc, index) => (
          <GrayedClientTab  key={'clientW' + index}
                            name={doc.data().name}
                            color={doc.data().color}
                            selected={selectedClients.hasOwnProperty(doc.id) ? true : false}
                            addSelected={_addSelected}
                            removeUnselected={_removeUnselected}
                            clientUID={doc.id}/>
        ))
      }
      { 
        clientsGroupBlue.map((doc, index) => (
          <GrayedClientTab  key={'clientB' + index}
                            name={doc.data().name}
                            color={doc.data().color}
                            selected={selectedClients.hasOwnProperty(doc.id) ? true : false}
                            addSelected={_addSelected}
                            removeUnselected={_removeUnselected}
                            clientUID={doc.id}/>
        ))
      }
      { 
        clientsGroupYellow.map((doc, index) => (
          <GrayedClientTab  key={'clientY' + index}
                      name={doc.data().name}
                      color={doc.data().color}
                      selected={selectedClients.hasOwnProperty(doc.id) ? true : false}
                      addSelected={_addSelected}
                      removeUnselected={_removeUnselected}
                      clientUID={doc.id}/>
        ))
      }
      { 
        clientsGroupGreen.map((doc, index) => (
          <GrayedClientTab  key={'clientG' + index}
                            name={doc.data().name}
                            color={doc.data().color}
                            selected={selectedClients.hasOwnProperty(doc.id) ? true : false}
                            addSelected={_addSelected}
                            removeUnselected={_removeUnselected}
                            clientUID={doc.id}/>
        ))
      }
      { 
        clientsGroupViolet.map((doc, index) => (
          <GrayedClientTab  key={'clientV' + index}
                            name={doc.data().name}
                            color={doc.data().color}
                            selected={selectedClients.hasOwnProperty(doc.id) ? true : false}
                            addSelected={_addSelected}
                            removeUnselected={_removeUnselected}
                            clientUID={doc.id}/>
        ))
      }
      { 
        clientsGroupRed.map((doc, index) => (
          <GrayedClientTab  key={'clientR' + index}
                            name={doc.data().name}
                            color={doc.data().color}
                            selected={selectedClients.hasOwnProperty(doc.id) ? true : false}
                            addSelected={_addSelected}
                            removeUnselected={_removeUnselected}
                            clientUID={doc.id}/>
        ))
      }
      { 
        clientsGroupNone.map((doc, index) => (
          <GrayedClientTab  key={'clientN' + index}
                            name={doc.data().name}
                            color={doc.data().color}
                            selected={selectedClients.hasOwnProperty(doc.id) ? true : false}
                            addSelected={_addSelected}
                            removeUnselected={_removeUnselected}
                            clientUID={doc.id}/>
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
      <BackButton source={backArrow}/>
    </TouchableWithoutFeedback>
  ),
})

export default MailSelectItems;