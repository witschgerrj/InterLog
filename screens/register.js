import React, { useState } from 'react';
import { Keyboard } from 'react-native'; 
import { FB } from '../backend/firebase';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styled from 'styled-components';
import BgNoScroll from '../components/bgNoScroll';


const Email = styled.TextInput`
  margin-top: 300px;
  width: 100%;
  height: 45px;
  color: white;
  text-align: center;
  font-size: 18px;
`
const Password = styled.TextInput`
  width: 100%;
  height: 45px;
  color: white;
  text-align: center;
  font-size: 18px;
`
const Button = styled.View`
  width: 200px;
  height: 55px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  background-color: #2B2B2B;
  border-radius: 3px;
  margin-bottom: 370px;
`
const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 22px;
  top: 12px;
`
const Login = styled.Text`
  color: white;
  text-align: center;
  font-size: 18px;
`

const Register = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _executeRegistration = () => {
    //Firebase Auth
    //need to pass userCreds.user.uid
    FB.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { 
        //success
        //listener in loading will make switch to Clients screen
        console.log('Account Created')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const _navigateToLogin = () => {
    props.navigation.navigate('Login');
    _initializeUser();
  }

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss()} }>
      <BgNoScroll>
        <Email  onChangeText={text => setEmail(text)}
                placeholder='Email'
                placeholderTextColor='#FFF'
                autoCorrect={false} 
                spellCheck={false}
                autoCapitalize='none'/>
        <Password onChangeText={text => setPassword(text)}
                  placeholder='Password'
                  placeholderTextColor='#FFF'
                  autoCorrect={false} 
                  spellCheck={false}
                  autoCapitalize='none'
                  secureTextEntry={true}/>
        <TouchableWithoutFeedback onPress={_executeRegistration}>
          <Button>
            <ButtonText>Register</ButtonText>
          </Button>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={_navigateToLogin}>
          <Login>Login</Login>
        </TouchableWithoutFeedback>
      </BgNoScroll>
    </TouchableWithoutFeedback>
  );
}

export default Register;