import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import backArrow from '../assets/backArrow.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BgNoScroll from '../components/bgNoScroll';
import GrayedCategory from '../components/grayedDetails';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-top: auto;
  margin-bottom: auto;
`
const HeaderSelectionBox = styled.View`
  width: 60px;
  height: 100%;
`
const Next = styled.Text`
  font-size: 22px;
  color: #248AC9;
  margin-right: 20px;
`

const MailItemDetails = (props) => {

  const [selectedDetails, setSelectedDetails] = useState(props.navigation.getParam('selectedDetails'));
  const details = ['Name', 'Category', 'Link', 'Notes'];

  const _toggleSelected = (detail) => {
    if (selectedDetails.includes(detail)) {
      let tempDetails = JSON.parse(JSON.stringify(selectedDetails))
      tempDetails.splice(selectedDetails.indexOf(detail), 1);
      setSelectedDetails(tempDetails);
      props.navigation.setParams({ selectedDetails: tempDetails });
    } else {
      let tempDetails = JSON.parse(JSON.stringify(selectedDetails));
      tempDetails.push(detail);
      setSelectedDetails(tempDetails);
      props.navigation.setParams({ selectedDetails: tempDetails });
    }
  }

  return (
    <BgNoScroll>
      { 
        details.map((detail, index) => (
          <GrayedCategory key={detail+index}
                          detail={detail}
                          selected={selectedDetails.includes(detail) ? true : false}
                          toggleSelected={_toggleSelected}/> 
        ))
      } 
    </BgNoScroll>
  );
}

MailItemDetails.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.navigate('MailSelectClients', {
        selectedItems: props.navigation.getParam('selectedItems'),
        selectedDetails: props.navigation.getParam('selectedDetails'),
      });
    }}>
    {
      props.navigation.getParam('selectedDetails').length !== 0 ?
        <Next>Next</Next>
      : null
    }
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.goBack();
    }}>
      <HeaderSelectionBox>
        <BackButton source={backArrow}/>
      </HeaderSelectionBox>
    </TouchableWithoutFeedback>
  ),
})

export default MailItemDetails;