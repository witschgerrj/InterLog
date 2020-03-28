import React, { Component, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BgScrollView from '../components/bgScrollView';
import { updateClientNotes } from '../backend/firebase';
import { storeData } from '../backend/asyncStorage';

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
        //update notes in firebase
        updateClientNotes(notes, clientUID);
        props.navigation.navigate('ClientView', {
          notes: props.navigation.getParam('notes'),
        })
        //props.navigation.getParam('updateCatalog')();
      }}>
      <Done>Done</Done>
    </TouchableWithoutFeedback>
  ),
});

export default ClientNotes;