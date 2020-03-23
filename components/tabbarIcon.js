import React, { Image } from 'react';
import styled from 'styled-components';


const Icon = styled.Image`
  height: 35px;
`

const TabBarIcon = (props) => {
  return (
    <Icon source={props.icon}></Icon>
  );
}

export default TabBarIcon;