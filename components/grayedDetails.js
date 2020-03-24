import React from 'react';
import styled from 'styled-components';
import GroupColor from './groupColor';
import FlexBox from './flexbox'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Tab = styled.View`
  width: 100%;
  height: 60px;
  padding: 10px;
  borderBottomColor: #2B2B2B;
  borderBottomWidth: 1px;
`
const Detail = styled.Text`
  margin-top: 8px;
  font-size: 18px;
  color: white;
  width: 80%;
`

const GrayedDetails = (props) => {

  return (
    <TouchableWithoutFeedback onPress={() => props.toggleSelected(props.detail)}>
      <Tab opacity={props.selected ? 1 : 0.4}>
        <Detail>{props.detail}</Detail>
      </Tab>
    </TouchableWithoutFeedback>
  );
}

export default GrayedDetails;