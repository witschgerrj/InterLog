import React, { Component, useState } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BgNoScroll from '../components/bgNoScroll';
import { updateCatalogItemNotes } from '../backend/firebase';

const NoteArea = styled.TextInput`
  height: 100%;
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

  return (
    <BgNoScroll>
      <NoteArea multiline={true}
                value={notes}
                onChangeText={text => _updateNotes(text)}/>
    </BgNoScroll>
  );
}

CatalogItemNotes.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
        const notes = props.navigation.getParam('notes');
        const catalogItemUID = props.navigation.getParam('catalogItemUID');
        updateCatalogItemNotes(notes, catalogItemUID);
        props.navigation.navigate('CatalogItemView', {
          notes: props.navigation.getParam('notes'),
        })
        props.navigation.getParam('updateCatalog')();
      }}>
      <Done>Done</Done>
    </TouchableWithoutFeedback>
  ),
});

export default CatalogItemNotes;