import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { FB, getCatalog, getCategories } from '../backend/firebase';
import GridIcon from '../assets/grid.png';
import Add from '../assets/add.png'
import Three from '../assets/grid3x3.png';
import Four from '../assets/grid4x4.png';
import BackgroundScroll from '../components/bgScrollView';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FlexBox from '../components/flexbox';
import CatalogBox from '../components/catalogBox';

const Grid = styled.Image`
  margin-left: 20px;
  transform: scale(0.9);
`
const AddButton = styled.Image`
  margin-right: 20px;
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

const Catalog = (props) => {

  const [rows, setRows] = useState(3);
  const [catalog, setCatalog] = useState([]);
  const [allCategories, setAllCategories] = useState({});

  const _updateCatalog = () => {
    getCatalog().then(docs => {
      setCatalog(docs);
    });
  }

  const _getCategories = () => {
    let categories = {};
    getCategories().then(data => {
      data.map(doc => {
        let category = doc.data().category;
        //dont add a blank category to the array
        if (category !== '') {
          if (categories.hasOwnProperty(category)) {
            categories[category] = categories[category] + 1;
          } else {
            categories[category] = 1;
          }
        }
      })
      setAllCategories(categories);
      props.navigation.setParams({ allCategories: categories });
    });
  }

  useEffect(() => {
    _getCategories();
    _updateCatalog();
    props.navigation.setParams({ 
      updateCatalog: _updateCatalog,
      getAllCategories: _getCategories,
    });
  }, []);

  return (
    <BackgroundScroll>
      <FlexBox justify='flex-start'>
        {
          catalog.map((doc, index) => (
              <CatalogBox rows={rows}
                          key={'catalogItem' + index}
                          name={doc.data().name}
                          category={doc.data().category}
                          imageLink={doc.data().imageLink}
                          link={doc.data().link}
                          notes={doc.data().notes}
                          catalogItemUID={doc.id}
                          allCategories={allCategories}
                          getAllCategories={_getCategories}
                          navigation={props.navigation}
                          updateCatalog={_updateCatalog}/>
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

Catalog.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.navigate('CatalogAdd', {
        allCategories: props.navigation.getParam('allCategories'),
        getAllCategories: props.navigation.getParam('getAllCategories'),
        updateCatalog: props.navigation.getParam('updateCatalog'),
      })
    }}>
      <AddButton source={Add}>
      </AddButton>
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      let displayGrid = props.navigation.getParam('displayGrid');
      props.navigation.setParams({ displayGrid: !displayGrid});
    }}>
      <Grid source={GridIcon}>
      </Grid>
    </TouchableWithoutFeedback>
  ),
})

export default Catalog;