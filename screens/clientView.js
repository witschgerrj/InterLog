import React, { useState, useEffect } from 'react';
import { Keyboard, ActionSheetIOS, KeyboardAvoidingView, Alert } from 'react-native';
import styled from 'styled-components';
import BgNoScroll from '../components/bgNoScroll';
import FlexBox from '../components/flexbox';
import Trashcan from '../assets/trashcan.png';
import Notes from '../assets/notes.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { updateClient, deleteClient } from '../backend/firebase';
import backArrow from '../assets/backArrow.png';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-top: auto;
  margin-bottom: auto;
`
const HeaderSelectionBox = styled.View`
  width: 60px;
  height: 100%;
`
const Name = styled.TextInput`
  font-size: 18px;
  color: white;
  margin-bottom: 45px; 
` 
const Email = styled.TextInput`
  font-size: 18px;
  color: white;
  height: 22px;
  margin-bottom: 45px; 
`
const Phone = styled.TextInput`
  position: absolute;
  left: 20px;
  top: 150px;
  font-size: 18px;
  color: white;
  height: 22px;
`
const Done = styled.Text`
  font-size: 22px;
  color: #248AC9;
  margin-right: 20px;
`
const Box = styled.View`
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  border-radius: 3px;
  background-color: ${props => props.groupColor};
  margin-bottom: 10px;
  border-width: 2px;
  border-color: ${props => props.borderColor};
`
const BoxContainer = styled.View`
  width: 90px;
`
const TrashcanIcon = styled.Image`
  position: relative;

`
const NotesIcon = styled.Image`
  position: relative;

`
const StyledFlexBox = styled.View`
  position: absolute;
  width: 100%;
  left: 20px;
  bottom: 20px;
  display: flex;
  flexWrap: wrap;
  flexDirection: row;
  justifyContent: space-between; 
`

const ClientView = (props) => {

  const [name, setName] = useState(props.navigation.getParam('name'));
  const [email, setEmail] = useState(props.navigation.getParam('email'));
  const [phone, setPhone] = useState(props.navigation.getParam('phone'));
  const [color, setColor] = useState(props.navigation.getParam('color'));
  const [selectingBoxes, setSelectingBoxes] = useState(false);

  const _closeKeyboardAndBoxes = () => {
    Keyboard.dismiss();
    setSelectingBoxes(false);
  }

  const _updateName = (text) => {
    props.navigation.setParams({ name: text});
    setName(text);
  }

  const _updateEmail = (text) => {
    props.navigation.setParams({ email: text});
    setEmail(text);
  }

  const _updatePhone = (text) => {
    props.navigation.setParams({ phone: text});
    setPhone(text);
  }

  const _updateColor = (text) => {
    props.navigation.setParams({ color: text});
    setColor(text);
  }


  const _showDeleteActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Delete'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    },
    (index => {
      if (index === 1) {
        //delete item, go back, reload catalog
        deleteClient(props.navigation.getParam('clientUID'));
        //delete local delete
        props.navigation.getParam('delete')(props.navigation.getParam('arrayIndex'));
        props.navigation.goBack();
      }
    }))
  }

  const _openNotes = () => {

    let groupColor = 'clientsNone';   //none
    let _color = props.navigation.getParam('color');

    if (_color === '#D1D1D1') {        //white
      groupColor = 'clientsWhite';
    } else if (_color === '#3297B5') { //blue
      groupColor = 'clientsBlue';
    } else if (_color === '#BABA27') { //yellow
      groupColor = 'clientsYellow';
    } else if (_color === '#078D1C') { //green
      groupColor = 'clientsGreen';
    } else if (_color === '#9B2F2F') { //red
      groupColor = 'clientsRed';
    } else {                          //violet
      groupColor = 'clientsViolet';
    } 

    props.navigation.navigate('ClientNotes', {
      notes: props.navigation.getParam('notes'),
      clientUID: props.navigation.getParam('clientUID'),
      index: props.navigation.getParam('arrayIndex'),
      groupColor: groupColor,
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => _closeKeyboardAndBoxes()}>
        <BgNoScroll pad={20}>
          <FlexBox justify='space-between'>
            <Name onChangeText={text => _updateName(text)}
                  placeholder='Name'
                  placeholderTextColor='#FFF'
                  autoCorrect={false} 
                  spellCheck={false}
                  autoCapitalize='none'
                  value={name}/>
            <TouchableWithoutFeedback onPress={()=> setSelectingBoxes(!selectingBoxes)}>
              <Box  groupColor={color}
                    size={55}
                    borderColor={color}/>
            </TouchableWithoutFeedback>
          </FlexBox>
          <FlexBox justify='space-between'>
            <Email  onChangeText={text => _updateEmail(text)}
                    placeholder='Email'
                    placeholderTextColor='#FFF'
                    autoCorrect={false} 
                    spellCheck={false}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    value={email}/>
            <BoxContainer>
              {
                selectingBoxes ? 
                  <FlexBox justify='space-between'>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#D1D1D1')}>
                      <Box  groupColor='#D1D1D1'
                            size={40}
                            borderColor={color === '#D1D1D1' ? '#FFF' : '#D1D1D1'}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#3297B5')}>
                      <Box  groupColor='#3297B5'
                            size={40}
                            borderColor={color === '#3297B5' ? '#FFF' : '#3297B5'}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#BABA27')}>
                      <Box  groupColor='#BABA27'
                            size={40}
                            borderColor={color === '#BABA27' ? '#FFF' : '#BABA27'}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#078D1C')}>
                      <Box  groupColor='#078D1C'
                            size={40}
                            borderColor={color === '#078D1C' ? '#FFF' : '#078D1C'}/> 
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#9B2F2F')}>
                      <Box  groupColor='#9B2F2F'
                            size={40}
                            borderColor={color === '#9B2F2F' ? '#FFF' : '#9B2F2F'}/> 
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#8D0778')}>
                      <Box  groupColor='#8D0778'
                            size={40}
                            borderColor={color === '#8D0778' ? '#FFF' : '#8D0778'}/> 
                    </TouchableWithoutFeedback>
                    
                  </FlexBox>
                : null
            }
            </BoxContainer>
          </FlexBox>
        <Phone  onChangeText={text => _updatePhone(text)}
                placeholder='Phone'
                placeholderTextColor='#FFF'
                autoCorrect={false} 
                spellCheck={false}
                autoCapitalize='none'
                keyboardType='phone-pad'
                textContentType='telephoneNumber'
                value={phone}
                maxLength={10}/>
          <StyledFlexBox>
            <TouchableWithoutFeedback onPress={() => _showDeleteActionSheet()}>
              <TrashcanIcon source={Trashcan}/>
            </TouchableWithoutFeedback> 
            <TouchableWithoutFeedback onPress={()=> _openNotes()}>
              <NotesIcon source={Notes}/>
            </TouchableWithoutFeedback> 
          </StyledFlexBox>
        </BgNoScroll>
    </TouchableWithoutFeedback>
  );
}

ClientView.navigationOptions = (props) => ({
  
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
        const name = props.navigation.getParam('name');
        const email = props.navigation.getParam('email');
        const phone = props.navigation.getParam('phone');
        const untouchedColor = props.navigation.getParam('untouchedColor');
        const color = props.navigation.getParam('color');
        const notes = props.navigation.getParam('notes');
        const clientUID = props.navigation.getParam('clientUID');
        const index = props.navigation.getParam('arrayIndex');
        //validating phone number
        //make email validation more robust
        if (email.substring(email.length-4, email.length) !== '.com') {
          Alert.alert('Invalid email format.');
        } else if (isNaN(phone) || phone.length !== 10 && phone.length !== 0) {
          Alert.alert('Invalid phone number.')
        } else if (name !== '' && email !== '') {
          updateClient(name, email, phone, color, notes, clientUID);
          //locally update name, email, phone, color, notes
          props.navigation.getParam('updateLocal')(name, color, email, phone, notes, clientUID, index, untouchedColor);
          props.navigation.goBack();
        } else {
          Alert.alert('Name and email are required.');
        }
      }}>
      <Done>Done</Done>
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      const name = props.navigation.getParam('name');
      const email = props.navigation.getParam('email');
      const phone = props.navigation.getParam('phone');
      const untouchedColor = props.navigation.getParam('untouchedColor');
      const color = props.navigation.getParam('color');
      const notes = props.navigation.getParam('notes');
      const clientUID = props.navigation.getParam('clientUID');
      const index = props.navigation.getParam('arrayIndex');
      const originalNotes = props.navigation.getParam('originalNotes');
      //update on back if notes were updated
      if (notes !== originalNotes) {
        props.navigation.getParam('updateLocal')(name, color, email, phone, notes, clientUID, index, untouchedColor);
      }
      props.navigation.goBack();
    }}>
      <HeaderSelectionBox>
        <BackButton source={backArrow}/>
      </HeaderSelectionBox>
    </TouchableWithoutFeedback>
  ),
});

export default ClientView;