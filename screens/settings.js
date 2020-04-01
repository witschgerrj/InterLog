import React, { useState } from 'react';
import styled from 'styled-components';
import { FB } from '../backend/firebase';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Alert, Linking } from 'react-native';
import BgNoScroll from '../components/bgNoScroll';
import backArrow from '../assets/backArrow.png';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-top: 3px;
`

const Tab = styled.View`
  width: 100%;
  height: 60px;
  padding: 10px;
  borderBottomColor: #2B2B2B;
  borderBottomWidth: 1px;
`
const SettingOption = styled.Text`
  margin-top: 8px;
  font-size: 18px;
  color: white;
  width: 80%;
`


const Settings = (props) => {

  const _signOut = () => {
    FB.auth().signOut()
    .catch(error => {
      Alert.alert('An error occurred while signing out...')
    })
  }

  return (
    <BgNoScroll>
      <TouchableWithoutFeedback onPress={() => Linking.openURL('https://witschgerrj.github.io/#/interlog/privacypolicy')}>
        <Tab>
        <SettingOption>Privacy Policy</SettingOption>
        </Tab>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => _signOut()}>
        <Tab>
          <SettingOption>Sign Out</SettingOption>
        </Tab>
      </TouchableWithoutFeedback>
    </BgNoScroll>
  );
}

Settings.navigationOptions = props => ({
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.goBack();
    }}>
      <BackButton source={backArrow}/>
    </TouchableWithoutFeedback>
  ),
})

export default Settings;