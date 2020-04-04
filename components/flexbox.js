import React from 'react';
import styled from 'styled-components';
import GroupColor from './groupColor';

const Flex = styled.View`
  display: flex;
  flexWrap: wrap;
  flexDirection: ${props => props.flexDirection};
  justifyContent: ${props => props.justify}; 
`

const FlexBox = (props) => {
  return (
    <Flex justify={props.justify}
          flexDirection={props.flexDirection}>
      {props.children}
    </Flex>
  );
}

FlexBox.defaultProps = {
  flexDirection: 'row',
}


export default FlexBox;