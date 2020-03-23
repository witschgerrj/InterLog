import React, { useState } from 'react';
import styled from 'styled-components';
import GroupColor from './groupColor';
import FlexBox from './flexbox'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Tab = styled.View`
  width: 100%;
  height: 60px;
  padding: 10px;
  borderBottomColor: #2B2B2B;
  borderBottomWidth: 1;
`
const Category = styled.Text`
  margin-top: 8px;
  font-size: 18px;
  color: white;
  width: 80%;
`
const Circle = styled.View`
  margin-top: 10px;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #FFF;
  background-color: ${props => props.bgColor};
`

const CategoryTab = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => {
      props.updateSelected(props.category);
    }}>
      <Tab>
        <FlexBox justify='space-between'>
          <Category>{props.category}</Category>
          <Circle bgColor={props.selected ? '#FFF' : 'transparent'}/>
        </FlexBox>
      </Tab>
    </TouchableWithoutFeedback>
  );
}

export default CategoryTab;