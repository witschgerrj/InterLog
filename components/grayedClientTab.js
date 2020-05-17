import React from 'react';
import styled from 'styled-components';
import GroupColor from './groupColor';
import FlexBox from './flexbox'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getCurrentTime } from '../backend/firebase';

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
  color: #6A6A6A;
`

const GrayedClientTab = (props) => {

  const _getLastUpdated = (lastUpdated) => {
    //seconds
    let currentTime = getCurrentTime();

    let seconds = currentTime - lastUpdated;
    //if seconds are 0, make it 1 for visual purposes.
    if (seconds === 0) {
      seconds = 1;
    }
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let years = Math.floor(days / 365);

    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 365) {
      return `${days}d ago`;
    } else {
      return `${years}y ago`;
    }
  }

  const _toggleSelected = () => {
    if (!props.selected) {
      props.addSelected(props.clientUID, props.name, props.email);
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
        <LastUpdated>{_getLastUpdated(props.lastUpdated)}</LastUpdated>
      </ClientTab>
    </TouchableWithoutFeedback>
  );
}

export default GrayedClientTab;