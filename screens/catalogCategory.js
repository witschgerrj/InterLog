import React, { useState, useEffect } from 'react';
import { Keyboard, View, Dimensions } from 'react-native';
import styled from 'styled-components';
import BgNoScroll from '../components/bgNoScroll';
import FlexBox from '../components/flexbox';
import { TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { addCategory } from '../backend/firebase';
import CategoryTab from '../components/categoryTab';

const Done = styled.Text`
  font-size: 22px;
  color: #248AC9;
  margin-right: 20px;
`
const Tab = styled.View`
  width: 100%;
  height: 60px;
  padding: 10px;
  borderBottomColor: #2B2B2B;
  borderBottomWidth: 1px;
`
const AddCategory = styled.TextInput`
  margin-top: 8px;
  font-size: 18px;
  color: #248AC9;
  width: 80%;
`

const Circle = styled.View`
  margin-top: 10px;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #FFF;
  background-color: #FFF;
`

const CatalogCategory = (props) => {

  const [allCategories, setAllCategories] = useState(props.navigation.getParam('allCategories'));
  const [selected, setSelectedCategory] = useState(props.navigation.getParam('category'));
  const [addCategorySelected, setAddCategorySelected] = useState(false);
  const [addCategoryText, setAddCategoryText] = useState('');

  const _updateSelected = (newCategory) => {
    if (selected === newCategory) {
      setSelectedCategory('');
      props.navigation.setParams({ selectedCategory: '' });
    } else {
      setSelectedCategory(newCategory);
      setAddCategoryText('');
      setAddCategorySelected(false);
      props.navigation.setParams({ selectedCategory: newCategory });
      props.navigation.setParams({ addedCategory: '' });
      Keyboard.dismiss();
    }
  }

  const _displaySelected = () => {
    setSelectedCategory('');
    setAddCategorySelected(true);
  }

  const _setAddCategoryText = (text) => {
    setAddCategoryText(text);
    props.navigation.setParams({ addedCategory: text })
    props.navigation.setParams({ selectedCategory: '' })
  }

  useEffect(() => {
    //if category isnt selected, then set to ''
    if (props.navigation.getParam('category') === '') {
      props.navigation.setParams({selectedCategory: ''});
    } else {
      props.navigation.setParams({selectedCategory: props.navigation.getParam('category')});
    }
    props.navigation.setParams({addedCategory: ''});
  }, []);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <BgNoScroll>
        {
        Object.keys(allCategories).map((category, index) => (
            <CategoryTab  key={'category' + index}
                          category={category}
                          selected={category === selected ? true : false}
                          navigation={props.navigation}
                          updateSelected={_updateSelected}/>
        ))
        }
        <TouchableWithoutFeedback onPress={() => _displaySelected()}>
          <Tab>
            <FlexBox justify='space-between'>
              <AddCategory  value={addCategoryText}
                            placeholder='Add Category'
                            placeholderTextColor='#248AC9'
                            autoCorrect={false} 
                            spellCheck={false}
                            autoCapitalize='none'
                            onFocus={() => _displaySelected()}
                            onChangeText={(text) => _setAddCategoryText(text)}
                            ></AddCategory>
              {
                addCategorySelected && selected === '' && addCategoryText !== '' ? 
                <Circle/>
                : null
              }
            </FlexBox>
          </Tab>
        </TouchableWithoutFeedback>
      </BgNoScroll>
    </TouchableWithoutFeedback>
  );
}

CatalogCategory.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
        const oldCategory = props.navigation.getParam('oldCategory');
        const addedCategory = props.navigation.getParam('addedCategory');
        const selectedCategory = props.navigation.getParam('selectedCategory');
        const catalogItemUID = props.navigation.getParam('catalogItemUID');
        const updateItemCategory = props.navigation.getParam('updateItemCategory');
        //if new category was not added... 
        //only running if / else if, if you're coming from catalogViewItem.
        if (addedCategory === '' && updateItemCategory !== false) {
          props.navigation.getParam('addToCategories')(oldCategory, selectedCategory);
          //only called through Item View since a new item wont have info or a UID
          //update in database
          updateItemCategory(catalogItemUID, selectedCategory);
          props.navigation.goBack();
        } else if (updateItemCategory !== false) {
          props.navigation.getParam('addToCategories')(oldCategory, addedCategory);
          //only called through Item View since a new item wont have info or a UID
          updateItemCategory(catalogItemUID, addedCategory);
          props.navigation.goBack();
        } else {
          //coming from addItem
          if (addedCategory === '') {
            props.navigation.getParam('addToCategories')(oldCategory, addedCategory);
            props.navigation.goBack();
          } else {
            props.navigation.getParam('addToCategories')(oldCategory, addedCategory);
            props.navigation.goBack();
          }
        }
        
      }}>
      <Done>Done</Done>
    </TouchableWithoutFeedback>
  ),
});


export default CatalogCategory;