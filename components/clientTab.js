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
  borderBottomWidth: 1;
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

const TabBarIcon = (props) => {

  const _navigateToViewClient = () => {
    props.navigation.navigate('ClientView', {
      name: props.name,
      email: props.email,
      phone: props.phone,
      color: props.color,
      notes: props.notes,
      clientUID: props.clientUID,
      updateClients: props.updateClients,
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      _navigateToViewClient();
    }}>
      <ClientTab>
        <FlexBox justify='space-between'>
          <ClientName>{props.name}</ClientName>
          <GroupColor color={props.color}/>
        </FlexBox>
        <LastUpdated>TBD</LastUpdated>
      </ClientTab>
    </TouchableWithoutFeedback>
  );
}

export default TabBarIcon;