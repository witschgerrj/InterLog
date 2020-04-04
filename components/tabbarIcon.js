import React, { Image } from 'react';
import styled from 'styled-components';


const Icon = styled.Image`
  height: 35px;
  left: ${props => props.left}px;
`

const TabBarIcon = (props) => {
  return (
    <Icon source={props.icon}
          left={props.left}></Icon>
  );
}

TabBarIcon.defaultProps = {
  left: 0,
}

export default TabBarIcon;