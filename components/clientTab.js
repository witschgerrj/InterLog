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
        <LastUpdated>TBD</LastUpdated>
      </Tab>
    </TouchableWithoutFeedback>
  );
}

export default ClientTab;