import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { getCatalog } from '../backend/firebase';
import GridIcon from '../assets/grid.png';
import Three from '../assets/grid3x3.png';
import Four from '../assets/grid4x4.png';
import backArrow from '../assets/backArrow.png';
import BackgroundScroll from '../components/bgScrollView';
import { NavigationActions, StackActions } from 'react-navigation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FlexBox from '../components/flexbox';
import GrayedCatalogBox from '../components/grayedCatalogBox';

const Grid = styled.Image`
  margin-left: 30px;
  transform: scale(0.9);
`
const GridSelection = styled.Image`
  margin-top: 10px;
  margin-left: 10px;
`
const Absolute = styled.View`
  position: absolute;
  top: 0;
  left: 0;
`
const Highlight = styled.View`
  background-color: white;
`
const BackButton = styled.Image`
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 3px;
`
const Next = styled.Text`
  font-size: 22px;
  color: #248AC9;
  margin-right: 20px;
`

const MailSelectItems = (props) => {

  const [rows, setRows] = useState(3);
  const [catalog, setCatalog] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  const _updateCatalog = () => {
    getCatalog().then(docs => {
      setCatalog(docs);
    });
  }

  const _addSelected = (catalogItemUID, name, category, link, notes) => {
    let items = JSON.parse(JSON.stringify(selectedItems));
    items[catalogItemUID] = {
      name: name,
      category: category,
      link: link,
      notes, notes,
    } 
    setSelectedItems(items);
    props.navigation.setParams({selectedItems: items});
  }

  const _removeUnselected = (catalogItemUID) => {
    let items = JSON.parse(JSON.stringify(selectedItems));
    delete items[catalogItemUID];
    setSelectedItems(items);
    props.navigation.setParams({selectedItems: items});
  }

  useEffect(() => {
    _updateCatalog();
  }, []);

  return (
    <BackgroundScroll>
      <FlexBox justify='flex-start'>
        {
          catalog.map((doc, index) => (
              <GrayedCatalogBox rows={rows}
                                key={'grayedCatalogItem' + index}
                                name={doc.data().name}
                                category={doc.data().category}
                                imageLink={doc.data().imageLink}
                                link={doc.data().link}
                                notes={doc.data().notes}
                                catalogItemUID={doc.id}
                                selected={selectedItems.hasOwnProperty(doc.id) ? true : false}
                                addSelected={_addSelected}
                                removeUnselected={_removeUnselected}/>
          ))
        }
      </FlexBox>       
      <Absolute>
        {
          props.navigation.getParam('displayGrid') ?
            <FlexBox justify='space-evenly'
                    flexDirection='column'>
              <TouchableWithoutFeedback onPress={()=>setRows(3)}>
                <GridSelection source={Three}/>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>setRows(4)}>
                <GridSelection source={Four}/>
              </TouchableWithoutFeedback>
            </FlexBox>
          : null
        }
      </Absolute>

    </BackgroundScroll>
  );
}

MailSelectItems.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.navigate('MailItemDetails', {
        selectedItems: props.navigation.getParam('selectedItems'),
      });
    }}>
    {
      Object.keys(props.navigation.getParam('selectedItems')).length !== 0 ?
        <Next>Next</Next>
      : null
    }
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <FlexBox justify='flex-start'>
      <TouchableWithoutFeedback onPress={() => {
        //reset mailing stack
        props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'MailSelectItems'})],
        }))
        props.navigation.navigate('Clients');
      }}>
        <BackButton source={backArrow}/>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
        let displayGrid = props.navigation.getParam('displayGrid');
        props.navigation.setParams({ displayGrid: !displayGrid});
      }}>
        <Grid source={GridIcon}/>
      </TouchableWithoutFeedback>
    </FlexBox>
  ),
})

export default MailSelectItems;