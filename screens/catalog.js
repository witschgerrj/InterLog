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
import { storeData, getData, debounce } from '../backend/asyncStorage';

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
const EmptyCatalog = styled.Text`
  font-size: 18px;
  color: #6A6A6A;
  text-align: center;
  padding: 20px;
  padding-top: 30px;
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

  const _updateLocal = (name, category, imageLink, link, notes, imageUUID, index, allCategories, oldCategories) => {

    let _catalog = props.navigation.getParam('catalog');
    //de-reference item from the array for when it'd deleted below
    let item = JSON.parse(JSON.stringify(_catalog[index]));

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
    //remove item before next item is added.
    _catalog.splice(index, 1);
    //inserting catalog item in the right spot on update..
    //using old categories, because allCategories is an updated version.
    //there would be an error if using newCategories because an added category would exist.
    //first check if there are any categories
    if (oldCategories.length > 0) {
      if (Object.keys(oldCategories).includes(category)) {
        //_catalog.map((itemData, ind) => {
        for (let i = 0; i < _catalog.length; i++) {
          if (_catalog[i].category === item.category) {
            //insert item at index, delete nothing
            _catalog.splice(i, 0, item);
            break;
          }
        }
      }
      else {
        //add item to the front
        _catalog.splice(0, 0, item);
      }
    }
    else {
      //add item to the front
      _catalog.splice(0, 0, item);
    }

    setCatalog(_catalog);
    storeData('catalogData', _catalog);
    props.navigation.setParams({ catalog: _catalog });
    //need to update allCategories. Has to be done after checking for if a new category was added (checked above).
    props.navigation.setParams({ allCategories: allCategories });
  }

    //also acts as a "update category"
    const _addToCategories = (oldCategory, category, allCategories) => {
      let categories = allCategories;
      if (oldCategory !== category) {
        //checking if category is present and isn't empty.
        if (categories.hasOwnProperty(category)) {
          categories[category] += 1;
        } else {
          categories[category] = 1;
        }
        //decrement value by one from previous category... check if there are any items using the category
        //checking if oldCategory is not empty from initial add.
        if (oldCategory !== '') {
          categories[oldCategory] -= 1;
          if (categories[oldCategory] === 0) {
            delete categories[oldCategory];
          }
        }
      } 
      //updates current category
      setAllCategories(categories);
      props.navigation.setParams({ allCategories: categories });
    }

  const _deleteItem = (index) => {
    let _catalog = JSON.parse(JSON.stringify(catalog));
    _catalog.splice(index, 1);
    storeData('catalogData', _catalog);
    setCatalog(_catalog);
    props.navigation.setParams({ catalog: _catalog });
  }

  const _addItem = (name, category, link, imageLink, catalog, id, imageUUID, allCategories, callback) => {
    
    //passing through existing catalog
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
    //handle inserting item in the right place in the array
    //if all categories contains category, then find where that group of categories is located in the array.
    
    if (Object.keys(allCategories).includes(category)) {
      //_catalog.map((itemData, index) => {
      for (let i = 0; i < _catalog.length; i++) {
        if (_catalog[i].category === item.category) {
          //insert item at index, delete nothing
          _catalog.splice(i, 0, item);
          break;
        }
      }
    } 
    else {
      //add item to the front
      _catalog.splice(0, 0, item);
    }

    storeData('catalogData', _catalog);
    setCatalog(_catalog);
    props.navigation.setParams({ catalog: _catalog });

    //stops activity indicator and navigates page in catalogAdd.js
    callback();
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

  const _handlePress = () => {
    let displayGrid = props.navigation.getParam('displayGrid');
    if (displayGrid) {
      props.navigation.setParams({ displayGrid: !displayGrid});
    }
  }

  useEffect(() => {
    _getCategories();
    _updateCatalog();
    props.navigation.setParams({getAllCategories: _getCategories,
                                addItem: _addItem,
                                addToCategories: _addToCategories });
  }, []);
  
  return (
    <BackgroundScroll>
      {
        catalog.length ? 
          <>
            <FlexBox justify='flex-start'>
              {
                catalog.map((item, index) => (
                    <CatalogBox rows={rows}
                                key={'catalogItem' + index}
                                name={item.name}
                                catalog={catalog}
                                updateLocalCategory={_updateLocalCategory}
                                category={item.category}
                                originalCategory={item.category}
                                imageLink={item.imageLink}
                                imageUUID={item.imageUUID}
                                link={item.link}
                                notes={item.notes}
                                originalNotes={item.notes}
                                catalogItemUID={item.id}
                                index={index}
                                allCategories={props.navigation.getParam('allCategories')}
                                oldCategories={props.navigation.getParam('allCategories')}
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
                    <TouchableWithoutFeedback onPress={() => { 
                        setRows(3);
                        _handlePress();
                      }}>
                      <GridSelection source={Three}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        setRows(4);
                        _handlePress();
                      }}>
                      <GridSelection source={Four}/>
                    </TouchableWithoutFeedback>
                  </FlexBox>
                : null
              }
            </Absolute>
          </>
        :
          <EmptyCatalog>
            No catalog items available. {'\n\n'}

            To add a new catalog item, press the plus {'\n'} icon at the top right of the screen.
          </EmptyCatalog>
      }
      </BackgroundScroll>
  );
}

const _executeNavToAdd = (props) => {
  props.navigation.navigate('CatalogAdd', {
    allCategories: props.navigation.getParam('allCategories'),
    addItem: props.navigation.getParam('addItem'),
    catalog: props.navigation.getParam('catalog'),
    addCategory: props.navigation.getParam('addCategory'),
    addToCategories: props.navigation.getParam('addToCategories'),
  });
}

Catalog.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      debounce(_executeNavToAdd(props), 500);
    }}>
      <AddButton source={Add}>
      </AddButton>
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      let displayGrid = props.navigation.getParam('displayGrid');
      props.navigation.setParams({ displayGrid: !displayGrid });
    }}>
      <Grid source={GridIcon}>
      </Grid>
    </TouchableWithoutFeedback>
  ),
})

export default Catalog;