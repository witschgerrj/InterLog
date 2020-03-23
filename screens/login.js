import React, { useState } from 'react';
import { Keyboard } from 'react-native'; 
import { TouchableWithoutFeedback}  from 'react-native-gesture-handler';
import styled from 'styled-components';
import BgNoScroll from '../components/bgNoScroll';
import { FB } from '../backend/firebase'

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
const Register = styled.Text`
  color: white;
  text-align: center;
  font-size: 18px;
`
const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _executeLogin = () => {
    //Firebase Auth
    //need to pass userCreds.user.uid
    FB.auth().signInWithEmailAndPassword(email, password)
      .then(() => { 
        //success
        //listener in loading will make switch to Clients screen
      })
      .catch(error => {
        console.log(error)
      })
  }

  const _navigateToRegister = () => {
    props.navigation.navigate('Register');
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
        <TouchableWithoutFeedback onPress={_executeLogin}>
          <Button>
            <ButtonText>Login</ButtonText>
          </Button>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={_navigateToRegister}>
          <Register>Register</Register>
        </TouchableWithoutFeedback>
      </BgNoScroll>
    </TouchableWithoutFeedback>
  );
}

export default Login;