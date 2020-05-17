import React, { Component, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BgScrollView from '../components/bgScrollView';
import { updateCatalogItemNotes } from '../backend/firebase';
import { updateLocalCatalogNotes, debounce } from '../backend/asyncStorage';
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

const CatalogItemNotes = (props) => {

  const [notes, setNotes] = useState(props.navigation.getParam('notes'));

  const _updateNotes = (text) => {
    props.navigation.setParams({ notes: text});
    setNotes(text);
  }

  useEffect(() => {
    this.notearea.focus();
  }, []);

  return (
    <BgScrollView>
      <NoteArea multiline={true}
                value={notes}
                onChangeText={text => _updateNotes(text)}
                ref={(notearea) => { this.notearea = notearea }}/>
    </BgScrollView>
  );
}

const _executeSave = (props) => {
  const notes = props.navigation.getParam('notes');
  const catalogItemUID = props.navigation.getParam('catalogItemUID');
  const index = props.navigation.getParam('index');
  console.log('index: ' + index);
  console.log('notes: ' + notes);
  //update notes backend
  updateCatalogItemNotes(notes, catalogItemUID);
  //update locally
  updateLocalCatalogNotes(index, notes);
  props.navigation.navigate('CatalogItemView', {
    notes: props.navigation.getParam('notes'),
  })
}

CatalogItemNotes.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      debounce(_executeSave(props), 500);
    }}>
      <Done>Done</Done>
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
});

export default CatalogItemNotes;