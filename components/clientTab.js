import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GroupColor from './groupColor';
import FlexBox from './flexbox'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getCurrentTime } from '../backend/firebase';

const Tab = styled.View`
  width: 100%;
  height: 60px;
  padding: 10px;
  borderBottomColor: #2B2B2B;
  borderBottomWidth: 1px;
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

const ClientTab = (props) => {


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

  const _navigateToViewClient = () => {
    props.navigation.navigate('ClientView', {
      name: props.name,
      email: props.email,
      phone: props.phone,
      untouchedColor: props.untouchedColor,
      color: props.color,
      notes: props.notes,
      clientUID: props.clientUID,
      arrayIndex: props.arrayIndex,
      array: props.array,
      originalNotes: props.originalNotes,
      updateLocal: props.updateLocal,
      delete: props.delete,
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      _navigateToViewClient();
    }}>
      <Tab>
        <FlexBox justify='space-between'>
          <ClientName>{props.name}</ClientName>
          <GroupColor color={props.color}/>
        </FlexBox>
      <LastUpdated>{_getLastUpdated(props.lastUpdated)}</LastUpdated>
      </Tab>
    </TouchableWithoutFeedback>
  );
}

export default ClientTab;