import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import backArrow from '../assets/backArrow.png';
import BackgroundScroll from '../components/bgScrollView';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 3px;
`
const Finish = styled.Text`
  font-size: 22px;
  color: #248AC9;
  margin-right: 20px;
`
const Message = styled.TextInput`
  height: ${Math.floor(Dimensions.get('window').height)}px;
  margin-bottom: ${Math.floor(Dimensions.get('window').height) * 0.4}px;
  width: 100%;
  padding: 20px;
  color: white;
  font-size: 18px;
  background-color: blue;
`

const MailMessage = (props) => {

  const _updateMessage = (text) => {
    props.navigation.setParams({ message: text });
  }

  return (
    <BackgroundScroll>
      <Message  multiline={true}
                onChangeText={text => _updateMessage(text)}/>
    </BackgroundScroll>
  );
}

MailMessage.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      //pull up picker for email or text
    }}>
    {
      <Finish>Finish</Finish>
    }
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.goBack();
    }}>
      <BackButton source={backArrow}/>
    </TouchableWithoutFeedback>
  ),
})

export default MailMessage;