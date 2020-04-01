import React, { Component, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BgScrollView from '../components/bgScrollView';
import { updateClientNotes } from '../backend/firebase';
import { updateLocalClientNotes } from '../backend/asyncStorage';
import backArrow from '../assets/backArrow.png';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-top: 3px;
`

const NoteArea = styled.TextInput`
  height: ${Math.floor(Dimensions.get('window').height)}px;
  margin-bottom: ${Math.floor(Dimensions.get('window').height) * 0.4}px;
  width: 100%;
  padding: 20px;
  color: white;
  font-size: 18px;
`
const Done = styled.Text`
  font-size: 22px;
  color: #248AC9;
  margin-right: 20px;
`

const ClientNotes = (props) => {

  const [notes, setNotes] = useState(props.navigation.getParam('notes'));

  const _updateNotes = (text) => {
    props.navigation.setParams({ notes: text});
    setNotes(text);
  }

  return (
    <BgScrollView>
      <NoteArea multiline={true}
                value={notes}
                onChangeText={text => _updateNotes(text)}/>
    </BgScrollView>
  );
}

ClientNotes.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
        const notes = props.navigation.getParam('notes');
        const clientUID = props.navigation.getParam('clientUID');
        const groupColor = props.navigation.getParam('groupColor');
        const index = props.navigation.getParam('index');
        //update notes in firebase
        updateClientNotes(notes, clientUID);
        //update locally
        updateLocalClientNotes(groupColor, index, notes);
        props.navigation.navigate('ClientView', {
          notes: props.navigation.getParam('notes'),
        })
      }}>
      <Done>Done</Done>
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.goBack();
    }}>
      <BackButton source={backArrow}/>
    </TouchableWithoutFeedback>
  ),
});

export default ClientNotes;