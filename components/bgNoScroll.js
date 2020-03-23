import React, { Image } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Background = styled.View`
  height: 100%;
  width: 100%;
  background-color: #141414;
  padding: ${props => props.pad}px;
`

const BgNoScroll = (props) => {
  return (
    <Background pad={props.pad}>
      {props.children}
    </Background>
  );
}

BgNoScroll.defaultProps = {
  pad: 0,
}

export default BgNoScroll;