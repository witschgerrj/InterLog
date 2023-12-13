import React, { useState } from 'react';
import { Keyboard, Alert, KeyboardAvoidingView } from 'react-native'; 
import { FB } from '../backend/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styled from 'styled-components';
import InterLog from '../assets/AdobeFiles/AppLogos/InterLogFullWhite.png';
import { debounce } from '../backend/asyncStorage';

const SignInText = styled.TextInput`
  width: 100%;
  height: 45px;
  color: white;
  text-align: center;
  font-size: 18px;
`
const Logo = styled.Image`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 130px;
`
const Button = styled.View`
  width: 200px;
  height: 55px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  border: 2px white solid;
  border-radius: 3px;
`
const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 22px;
  top: 10px;
`
const OtherText = styled.Text`
  position: absolute;
  width: 100%;
  bottom: ${props => props.bottom}px;
  color: white;
  text-align: center;
  font-size: 18px;
`

const StyledGradient = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  padding-top: 150px;
`
const Touched = styled.TouchableWithoutFeedback``;

const Register = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _executeRegistration = () => {
    //Firebase Auth
    //need to pass userCreds.user.uid
    FB.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { 
        //success
        //listener in loading will make switch to DataLayer
      })
      .catch(error => {
        Alert.alert('Please enter a valid email and password.');
      })
  }

  const _navigateToLogin = () => {
    props.navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss()} }>
        <StyledGradient colors={['#160068', '#820974']}>
          <Logo source={InterLog}/>
          <SignInText onChangeText={text => setEmail(text)}
                      placeholder='Email'
                      placeholderTextColor='#FFF'
                      autoCorrect={false} 
                      spellCheck={false}
                      autoCapitalize='none'/>
          <SignInText onChangeText={text => setPassword(text)}
                      placeholder='Password'
                      placeholderTextColor='#FFF'
                      autoCorrect={false} 
                      spellCheck={false}
                      autoCapitalize='none'
                      secureTextEntry={true}/>
          <TouchableWithoutFeedback onPress={() => debounce(_executeRegistration(), 1500)}>
            <Button>
              <ButtonText>Register</ButtonText>
            </Button>
          </TouchableWithoutFeedback>
        </StyledGradient>
      </TouchableWithoutFeedback>
      <Touched onPress={() =>_navigateToLogin()}>
        <OtherText bottom={45}>Login</OtherText>
      </Touched>
    </KeyboardAvoidingView>
  );
}

export default Register;