import React, { Image } from 'react';
import styled from 'styled-components';

const Background = styled.ScrollView`
  height: 100%;
  width: 100%;
  background-color: #141414;
  padding-top: ${props => props.pt}px;
`

const BgScrollView = (props) => {
  return (
    <Background pt={props.pt}>
      {props.children}
    </Background>
  );
}

BgScrollView.defaultProps = {
  pt: 0,
}

export default BgScrollView;