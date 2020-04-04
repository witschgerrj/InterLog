import React, { Image } from 'react';
import styled from 'styled-components';

const Circle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${props => props.color};
`

const GroupColor = (props) => {
  return (
    <Circle color={props.color}></Circle>
  );
}

export default GroupColor;