import React from 'react';
import styled from 'styled-components';
import GroupColor from './groupColor';
import FlexBox from './flexbox'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ClientTab = styled.View`
  width: 100%;
  height: 60px;
  padding: 10px;
  borderBottomColor: #2B2B2B;
  borderBottomWidth: 1px;
  opacity: ${props => props.opacity};
`

const ClientName = styled.Text`
  font-size: 18px;
  color: white;
  width: 80%;
`

const LastUpdated = styled.Text`
  font-size: 18px;
  color: #2B2B2B;
`

const GrayedClientTab = (props) => {

  const _toggleSelected = () => {
    if (!props.selected) {
      props.addSelected(props.clientUID, props.name);
    } else {
      props.removeUnselected(props.clientUID);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => _toggleSelected()}>
      <ClientTab opacity={props.selected ? 1 : 0.4}>
        <FlexBox justify='space-between'>
          <ClientName>{props.name}</ClientName>
          <GroupColor color={props.color}/>
        </FlexBox>
        <LastUpdated>TBD</LastUpdated>
      </ClientTab>
    </TouchableWithoutFeedback>
  );
}

export default GrayedClientTab;