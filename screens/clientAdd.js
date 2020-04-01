import React, { useState, useEffect } from 'react';
import { Keyboard, Dimensions, Alert } from 'react-native';
import styled from 'styled-components';
import BgNoScroll from '../components/bgNoScroll';
import FlexBox from '../components/flexbox';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { addNewClient, getnanoid } from '../backend/firebase';
import backArrow from '../assets/backArrow.png';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-top: 3px;
`

const Name = styled.TextInput`
  font-size: 18px;
  color: white;
  margin-bottom: 45px; 
  width: ${(Dimensions.get('window').width) - 160}px;
` 
const Email = styled.TextInput`
  font-size: 18px;
  color: white;
  height: 22px;
  margin-bottom: 45px; 
  width: ${(Dimensions.get('window').width) - 160}px;
`
const Phone = styled.TextInput`
  position: absolute;
  left: 20px;
  top: 150px;
  font-size: 18px;
  color: white;
  height: 22px;
  width: ${(Dimensions.get('window').width) - 160}px;
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

const ClientAdd = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedGroupColor, setSelectedGroupColor] = useState('#2B2B2B');
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
    setSelectedGroupColor(text);
  }

  useEffect(() => {
    //initializing params
    props.navigation.setParams({
      phone: '',
      name: '',
      email: '',
      color: '#2B2B2B',
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => _closeKeyboardAndBoxes()}>
        <BgNoScroll pad={20}>
          <FlexBox justify='space-between'>
            <Name onChangeText={text => _updateName(text)}
                  placeholder='Name'
                  placeholderTextColor='#FFF'
                  autoCorrect={false} 
                  spellCheck={false}/>
            <TouchableWithoutFeedback onPress={()=> setSelectingBoxes(!selectingBoxes)}>
              <Box  groupColor={selectedGroupColor}
                    size={55}
                    borderColor={selectedGroupColor}/>
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
                    textContentType='emailAddress'/>
            <BoxContainer>
              {
                selectingBoxes ? 
                  <FlexBox justify='space-between'>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#D1D1D1')}>
                      <Box  groupColor='#D1D1D1'
                            size={40}
                            borderColor={selectedGroupColor === '#D1D1D1' ? '#FFF' : '#D1D1D1'}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#3297B5')}>
                      <Box  groupColor='#3297B5'
                            size={40}
                            borderColor={selectedGroupColor === '#3297B5' ? '#FFF' : '#3297B5'}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#BABA27')}>
                      <Box  groupColor='#BABA27'
                            size={40}
                            borderColor={selectedGroupColor === '#BABA27' ? '#FFF' : '#BABA27'}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#078D1C')}>
                      <Box  groupColor='#078D1C'
                            size={40}
                            borderColor={selectedGroupColor === '#078D1C' ? '#FFF' : '#078D1C'}/> 
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#9B2F2F')}>
                      <Box  groupColor='#9B2F2F'
                            size={40}
                            borderColor={selectedGroupColor === '#9B2F2F' ? '#FFF' : '#9B2F2F'}/> 
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => _updateColor('#8D0778')}>
                      <Box  groupColor='#8D0778'
                            size={40}
                            borderColor={selectedGroupColor === '#8D0778' ? '#FFF' : '#8D0778'}/> 
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
                maxLength={10}
                value={phone}/> 
        </BgNoScroll>
    </TouchableWithoutFeedback>

  );
}

ClientAdd.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
        const name = props.navigation.getParam('name');
        const email = props.navigation.getParam('email');
        const phone = props.navigation.getParam('phone');
        const color = props.navigation.getParam('color');
        const white = props.navigation.getParam('clientsWhite');
        const blue = props.navigation.getParam('clientsBlue');
        const green = props.navigation.getParam('clientsGreen');
        const yellow = props.navigation.getParam('clientsYellow');
        const red = props.navigation.getParam('clientsRed');
        const violet = props.navigation.getParam('clientsViolet');
        const none = props.navigation.getParam('clientsNone');

        //make email validation more robust
        if (email.substring(email.length-4, email.length) !== '.com') {
          Alert.alert('Invalid email format.');
        } else if (isNaN(phone) || phone.length !== 10 && phone.length !== 0) {
          Alert.alert('Invalid phone number.');
        } else if (name !== '' && email !== '') {
          getnanoid().then(uid => {
            addNewClient(name, email, phone, color, uid);
            props.navigation.getParam('addNewClient')(name, email, phone, color, uid, white, yellow, blue, green, red, violet, none);
            props.navigation.goBack();
          }).catch((error) => {
            Alert.alert('An error occurred. Please try again.')
          })
        } else {
          Alert.alert('Name and email are required.')
        }

      }}>
      <Done>Done</Done>
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.goBack();
    }}>
      <BackButton source={backArrow}/>
    </TouchableWithoutFeedback>
  ),
});

export default ClientAdd;