import React, { useState } from 'react';
import { Keyboard, Alert, KeyboardAvoidingView } from 'react-native'; 
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
const Touched = styled.TouchableWithoutFeedback``
const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const gradient = 'linear-gradient(180deg, rgba(22,0,104,1) 0%, rgba(130,9,116,1) 100%)';

  const _executeLogin = () => {
    //Firebase Auth
    //need to pass userCreds.user.uid
    FB.auth().signInWithEmailAndPassword(email, password)
      .then(() => { 
        //success
        //listener in loading will make switch to Clients screen
      })
      .catch(() => {
        Alert.alert('Incorrect email or password');
      });
  }
  const _navigateToResetPassword = () => {
    props.navigation.navigate('ResetPassword');
  }

  const _navigateToRegister = () => {
    props.navigation.navigate('Register');
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
            <TouchableWithoutFeedback onPress={() => debounce(_executeLogin(), 500)}>
            <Button>
              <ButtonText>Login</ButtonText>
            </Button>
          </TouchableWithoutFeedback>

        </StyledGradient>        
      </TouchableWithoutFeedback>
      <Touched onPress={() => debounce(_navigateToRegister(), 500)}>
        <OtherText bottom={45}>Register</OtherText>
      </Touched>
      <Touched onPress={() => debounce(_navigateToResetPassword(), 500)}>
        <OtherText bottom={90}>Forgot Password?</OtherText>
      </Touched>
    </KeyboardAvoidingView>
  );
}

export default Login;