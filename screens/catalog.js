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
import { storeData, getData } from '../backend/asyncStorage';

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

const Catalog = (props) => {

  const [rows, setRows] = useState(3);
  const [catalog, setCatalog] = useState([]);
  const [allCategories, setAllCategories] = useState(props.navigation.getParam('categories'));

  const _updateCatalog = async () => {
    let catalogData = await getData('catalogData');
    setCatalog(catalogData);
    props.navigation.setParams({ catalog: catalogData });
  }

  const _getCategories = async () => {
    let categories = await getData('categories');
    setAllCategories(categories);
    props.navigation.setParams({ allCategories: categories });
  }

  const _updateLocal = (name, category, imageLink, link, notes, imageUUID, index) => {

    let _catalog = props.navigation.getParam('catalog');
    let item = _catalog[index];

    if (item.name !== name) {
      item.name = name;
    }
    if (item.category !== category) {
      item.category = category;
    }
    if (item.imageLink !== imageLink) {
      item.imageLink = imageLink;
    }
    if (item.link !== link) {
      item.link = link;
    }
    if (item.notes !== notes) {
      item.notes = notes;
    }
    if (item.imageUUID !== imageUUID) {
      item.imageUUID = imageUUID;
    }

    _catalog[index] = item;
    setCatalog(_catalog);
    storeData('catalogData', _catalog);
    props.navigation.setParams({ catalog: _catalog });
  }

  const _deleteItem = (index) => {
    let _catalog = JSON.parse(JSON.stringify(catalog));
    _catalog.splice(index, 1);
    storeData('catalogData', _catalog);
    setCatalog(_catalog);
    props.navigation.setParams({ catalog: _catalog });
  }

  const _addItem = (name, category, link, imageLink, catalog, id, imageUUID) => {
    let _catalog = catalog;

    let item = {
      name: name,
      category: category,
      link: link,
      notes: '',
      id: id,
      imageUUID: imageUUID,
      imageLink: imageLink,
    }
    _catalog.push(item);
    storeData('catalogData', _catalog);
    setCatalog(_catalog);
    props.navigation.setParams({ catalog: _catalog });
  }
  //covers < back case
  //specifically used in catalogItemView for when a category is updated, 
  //but then user presses < back instead of done. 
  const _updateLocalCategory = (catalog, category, index) => {
    let _catalog = catalog;
    _catalog[index].category = category;
    setCatalog(_catalog);
    props.navigation.setParams({ catalog: _catalog });
  }

  useEffect(() => {
    _getCategories();
    _updateCatalog();
    props.navigation.setParams({ getAllCategories: _getCategories,
                                  addItem: _addItem});
  }, []);

  return (
    <BackgroundScroll>
      <FlexBox justify='flex-start'>
        {
          catalog.map((item, index) => (
              <CatalogBox rows={rows}
                          key={'catalogItem' + index}
                          name={item.name}
                          catalog={catalog}
                          updateLocalCategory={_updateLocalCategory}
                          category={item.category}
                          imageLink={item.imageLink}
                          imageUUID={item.imageUUID}
                          link={item.link}
                          notes={item.notes}
                          catalogItemUID={item.id}
                          index={index}
                          allCategories={props.navigation.getParam('allCategories')}
                          updateLocal={_updateLocal}
                          getAllCategories={_getCategories}
                          navigation={props.navigation}
                          delete={_deleteItem}/>
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
        addItem: props.navigation.getParam('addItem'),
        catalog: props.navigation.getParam('catalog'),
        addCategory: props.navigation.getParam('addCategory'),
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