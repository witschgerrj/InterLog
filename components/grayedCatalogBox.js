import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Box = styled.ImageBackground`
  padding: 10px;
  margin-left: 5px;
  margin-top: 5px;
  height: ${props => (Math.floor((Dimensions.get('window').width)) / props.rows)}px;
  width: ${props => (Math.floor((Dimensions.get('window').width)) / props.rows) - (5 + (5 / props.rows))}px;
  background-color: #2B2B2B;
  opacity: ${props => props.opacity};
`

const ItemName = styled.Text`
  font-size: ${props => props.rows === 3 ? 22 : 18}px;
  color: white;
  text-align: center;
  margin: auto;
`

const GrayedCatalogBox = (props) => {

  const _toggleSelected = () => {
    if (!props.selected) {
      props.addSelected(props.catalogItemUID, props.name, props.category, props.link, props.notes);
    } else {
      props.removeUnselected(props.catalogItemUID);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => _toggleSelected()}>
      <Box  opacity={props.selected ? 1 : 0.4}
            rows={props.rows}
            source={props.imageLink}>
        {
          props.imageLink === '' ?
          <ItemName rows={props.rows}>{props.name}</ItemName>
          : null
        } 
      </Box>
    </TouchableWithoutFeedback>
  );
}

export default GrayedCatalogBox;