import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Keyboard } from 'react-native';
import styled from 'styled-components';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const TestView = styled.View`
  height: 100%;
  width: 100%;
  background-color: #141414;
`
const Name = styled.TextInput`
  font-size: 18px;
  color: white;
  margin-bottom: 45px; 
` 
const MailSelectClients = (props) => {

  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView>
        <TestView>
        <Name placeholder='Name'
                  placeholderTextColor='#FFF'/>

        </TestView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default MailSelectClients;