import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FB } from '../backend/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import InterLog from '../assets/AdobeFiles/AppLogos/InterLogFullWhite.png';

const StyledGradient = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  padding-top: 150px;
`
const Logo = styled.Image`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
`

const Loading = (props) => {
  useEffect(() => {
    FB.auth().onAuthStateChanged(user => {
      props.navigation.navigate(user ? 'DataLayer' : 'Register');
    })
  }, []);

  return (
    <StyledGradient colors={['#160068', '#820974']}>
      <Logo souce={InterLog}/>
    </StyledGradient>
  );
}

export default Loading;