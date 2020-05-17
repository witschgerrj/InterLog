import React, { useState } from 'react';
import { Keyboard, Alert, View } from 'react-native'; 
import styled from 'styled-components';
import { TouchableWithoutFeedback}  from 'react-native-gesture-handler';
import InterLog from '../assets/AdobeFiles/AppLogos/InterLogFullWhite.png';
import { LinearGradient } from 'expo-linear-gradient';
import { FB } from '../backend/firebase'
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
  margin-bottom: 175px;
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
const StyledGradient = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  padding-top: 150px;
`
const OtherText = styled.Text`
  position: absolute;
  width: 100%;
  bottom: ${props => props.bottom}px;
  color: white;
  text-align: center;
  font-size: 18px;
`
const Touched = styled.TouchableWithoutFeedback``

const Login = (props) => {

  const [email, setEmail] = useState("");

  const _executeReset = () => {
    //Firebase Auth
    //need to pass userCreds.user.uid
    FB.auth().sendPasswordResetEmail(email)
      .then(() => { 
        Alert.alert('Reset email has been sent if account exists.');
      })
      .catch(() => {
        Alert.alert('Reset email has been sent if account exists.');
      });
  }
  
  const _navigateToLogin = () => {
    props.navigation.navigate('Login');
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss()} }>
        <StyledGradient colors={['#160068', '#820974']}>
          <Logo source={InterLog}/>
          <SignInText onChangeText={text => setEmail(text)}
                      placeholder='Email'
                      placeholderTextColor='#FFF'
                      autoCorrect={false} 
                      spellCheck={false}
                      autoCapitalize='none'/>
            <TouchableWithoutFeedback onPress={() => debounce(_executeReset(), 3000)}>
            <Button>
              <ButtonText>Reset</ButtonText>
            </Button>
          </TouchableWithoutFeedback>
        </StyledGradient>        
      </TouchableWithoutFeedback>
      <Touched onPress={() =>_navigateToLogin()}>
        <OtherText bottom={45}>Login</OtherText>
      </Touched>
    </>
  );
}

export default Login;