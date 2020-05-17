import React, { useState, useEffect } from 'react';
import { Keyboard, View, Dimensions, ActionSheetIOS, Alert } from 'react-native';
import styled from 'styled-components';
import BgNoScroll from '../components/bgNoScroll';
import Trashcan from '../assets/trashcan.png';
import Notes from '../assets/notes.png';
import * as ImagePicker from 'expo-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { deleteCatalogItem, updateItemCategory, deleteCatalogImage, saveCatalogImage, updateCatalogItem } from '../backend/firebase';
import nanoid from 'nanoid/async';
import backArrow from '../assets/backArrow.png';
import { debounce } from '../backend/asyncStorage';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-top: auto;
  margin-bottom: auto;
`
const HeaderSelectionBox = styled.View`
  width: 60px;
  height: 100%;
`
const Name = styled.TextInput`
  font-size: 18px;
  color: white;
  margin-bottom: 45px; 
  width: ${(Dimensions.get('window').width) - 160}px;
` 
const Category = styled.Text`
  font-size: 18px;
  color: white;
  margin-bottom: 45px; 
` 
const Link = styled.TextInput`
  height: 150px;
  font-size: 18px;
  color: white;
  margin-bottom: 45px; 
` 
const Done = styled.Text`
  font-size: 22px;
  color: #248AC9;
  margin-right: 20px;
`
const ImageBox = styled.ImageBackground`
  padding: 10px; 
  height: 100px;
  width: 100px;
  background-color: #2b2b2b;
  position: absolute;
  right: 20px;
  top: 20px;
  border-radius: 3px;
`
const ImageText = styled.Text`
  margin: auto;
  font-size: 18px;
  color: white;
  text-align: center;
`

const StyledFlexBox = styled.View`
  position: absolute;
  width: 100%;
  left: 20px;
  bottom: 20px;
  display: flex;
  flexWrap: wrap;
  flexDirection: row;
  justifyContent: space-between; 
`
const TrashcanIcon = styled.Image`
`
const NotesIcon = styled.Image`
`
const Touched = styled.TouchableWithoutFeedback``

const CatalogItemView = (props) => {

  const [name, setName] = useState(props.navigation.getParam('name'));
  const [category, setCategory] = useState(props.navigation.getParam('category'));
  const [link, setLink] = useState(props.navigation.getParam('link'));
  const [allCategories, setAllCategories] = useState(props.navigation.getParam('allCategories'));
  const [imageLink, setImageLink] = useState(props.navigation.getParam('imageLink'));

  const _updateName = (text) => {
    props.navigation.setParams({ name: text});
    setName(text);
  }

  const _updateLink = (text) => {
    props.navigation.setParams({ link: text});
    setLink(text);
  }

  const _updateItemCategory = (catalogItemUID, category) => {
    updateItemCategory(catalogItemUID, category);
    //don't need to set category here. It's being set in _addToCategories
    //update catalog locally since database updates here and locally it may not on < back.
    let catalog = props.navigation.getParam('catalog');
    let index = props.navigation.getParam('index');
    props.navigation.getParam('updateLocalCategory')(catalog, category, index);
  }

  const _removeFromCategories = (category) => {
    let categories = props.navigation.getParam('allCategories');

    let value = categories[category];
    if (value !== 1) {
      categories[category] -= 1;
    } else {
      //value === 0 and remove the category entirely.
      delete categories[category];
    }
    setAllCategories(categories);
    props.navigation.setParams({ allCategories: categories });
  }

  //also acts as an update
  const _addToCategories = (oldCategory, category) => {
    //navigation props keep reference
    let categories = JSON.parse(JSON.stringify(props.navigation.getParam('allCategories')));
 
    if (oldCategory !== category) {
      if (categories.hasOwnProperty(category)) {
        categories[category] += 1;
      } else {
        if (category !== '') {
          categories[category] = 1;
        }
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
    setCategory(category);
    props.navigation.setParams({ category: category });
    setAllCategories(categories);
    props.navigation.setParams({ allCategories: categories});
    //old categories saved so can check for a new category within updateLocal()
    props.navigation.setParams({ oldCategories: props.navigation.getParam('allCategories')});
  }

  const _showDeleteActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Delete'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    },
    (index => {
      if (index === 1) {
        const imageUUID = props.navigation.getParam('imageUUID');
        //delete item, go back, reload catalog
        //add a .then and make 
        //performing database removals
        deleteCatalogItem(props.navigation.getParam('catalogItemUID'));
        if (imageUUID !== '') {
          deleteCatalogImage(imageUUID);
        }
        const index = props.navigation.getParam('index');
        //update locally
        props.navigation.getParam('delete')(index);
        //need to remove 
        _removeFromCategories(category);
        props.navigation.goBack();
      }
    }))
  }
  
  const _navigateToCategory = () => {
    props.navigation.navigate('CatalogCategory', {
      category: category,
      oldCategory: category,
      allCategories: allCategories,
      updateItemCategory: _updateItemCategory,
      addToCategories: _addToCategories,
      catalogItemUID: props.navigation.getParam('catalogItemUID'),
    });
  }
  
  const _executeCameraSelection = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        //if there's an image stored, delete the image that's being replaced.
        let uri = result.uri;
        setImageLink(uri);
        props.navigation.setParams({ imageLink: uri });
        props.navigation.setParams({ newImage: true });
      }
    } else {
      alert("Permission to access camera is required!");
    }
  }

  const _executeImageSelection = async () => {
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permission.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        //if there's an image stored, delete the image that's being replaced.
        let uri = result.uri;
        setImageLink(uri);
        props.navigation.setParams({ imageLink: uri });
        props.navigation.setParams({ newImage: true });
      }
    } else {
      alert("Permission to access camera roll is required!");
    }
  }

  const _navigateToChooseImage = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Take Photo', 'Choose from Library'],
      cancelButtonIndex: 0,
    },
    (index => {
      if (index === 1) {
        //take photo
        _executeCameraSelection();
      } else if (index == 2){
        _executeImageSelection();
      } else {

      }
    }))
  }
  const _generateUUIDs = async () => {
    let imageUUID = await nanoid();
    props.navigation.setParams({ UUID: imageUUID });
  }

  const _openNotes = () => {
    props.navigation.navigate('CatalogItemNotes', {
      notes: props.navigation.getParam('notes'),
      catalogItemUID: props.navigation.getParam('catalogItemUID'),
      index: props.navigation.getParam('index'),
    })
  }

  useEffect(() => {
    _generateUUIDs();
    props.navigation.setParams({ newImage: false });
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <BgNoScroll pad={20}>
            <Name value={name}
                  placeholder='Name'
                  placeholderTextColor='#FFF'
                  onChangeText={text => _updateName(text)}/>
            <TouchableWithoutFeedback onPress={() => _navigateToCategory()}>
              <View>
                <Category>{category === '' ? 'Category' : category}</Category>
              </View>
            </TouchableWithoutFeedback>
            <Link placeholder='Link'
                  placeholderTextColor='#FFF'
                  autoCorrect={false} 
                  spellCheck={false}
                  autoCapitalize='none'
                  multiline={true}
                  value={link}
                  onChangeText={text => _updateLink(text)}/>
            <StyledFlexBox>
              <TouchableWithoutFeedback onPress={() => _showDeleteActionSheet()}>
                <TrashcanIcon source={Trashcan}/>
              </TouchableWithoutFeedback> 
              <TouchableWithoutFeedback onPress={() => _openNotes()}>
                <NotesIcon source={Notes}/>
              </TouchableWithoutFeedback> 
            </StyledFlexBox>
          </BgNoScroll>
      </TouchableWithoutFeedback>
      <Touched onPress={() => _navigateToChooseImage()}>
      {
        imageLink === '' ? 
        <ImageBox>
          <Touched onPress={() => _navigateToChooseImage()}>
            <ImageText>No{'\n'}Image</ImageText>
          </Touched>
        </ImageBox>
        :
        <ImageBox source={imageLink !== '' ? { uri: imageLink } : null}
                  imageStyle={{ borderRadius: 3}}>
        </ImageBox>
      }
    </Touched>
  </>
  );
}

const _executeSave = (props) => {
  let newImage = props.navigation.getParam('newImage');
  let name = props.navigation.getParam('name');
  let category = props.navigation.getParam('category');
  let imageLink = props.navigation.getParam('imageLink');
  let catalogItemUID = props.navigation.getParam('catalogItemUID');
  let link = props.navigation.getParam('link');
  let notes = props.navigation.getParam('notes');
  let index = props.navigation.getParam('index');
  let originalImageUUID = props.navigation.getParam('imageUUID');
  let imageUUID = props.navigation.getParam('UUID');
  let allCategories = props.navigation.getParam('allCategories');
  let oldCategories = props.navigation.getParam('oldCategories');
  //name cannot be empty
  if (name !== '') {
    //if theres a new image
    if (newImage) {
      //deletes unused image in database.
      //then saves new image.
      //then gets the url for the saved image and updates the catalog item with it
      if (originalImageUUID !== '') {
        deleteCatalogImage(originalImageUUID);
      }
      //update locally
      props.navigation.getParam('updateLocal')(name, category, imageLink, link, notes, imageUUID, index, allCategories, oldCategories);
      //save new image to storage
      saveCatalogImage(JSON.parse(JSON.stringify(imageLink)), JSON.parse(JSON.stringify(imageUUID)))
      .then((url) => {
        //need to update in DB as well.
        updateCatalogItem(name, category, url, link, imageUUID, notes, catalogItemUID);
      });
      props.navigation.goBack();
    } else {
      //need to update in db as well.
      updateCatalogItem(name, category, imageLink, link, originalImageUUID, notes, catalogItemUID);
      //update locally
      props.navigation.getParam('updateLocal')(name, category, imageLink, link, notes, originalImageUUID, index, allCategories, oldCategories);
      props.navigation.goBack();
    }
  } else {
    Alert.alert('An item name is required.');
  }
}

CatalogItemView.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      debounce(_executeSave(props), 500);
    }}>
      <Done>Done</Done>
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      let name = props.navigation.getParam('name');
      let category = props.navigation.getParam('category');
      let imageLink = props.navigation.getParam('imageLink');
      let link = props.navigation.getParam('link');
      let notes = props.navigation.getParam('notes');
      let index = props.navigation.getParam('index');
      let originalImageUUID = props.navigation.getParam('imageUUID');
      let allCategories = props.navigation.getParam('allCategories');
      let oldCategories = props.navigation.getParam('oldCategories');
      let originalNotes = props.navigation.getParam('originalNotes');
      //update on back if notes were updated
      if (originalNotes !== notes) {
        props.navigation.getParam('updateLocal')(name, category, imageLink, link, notes, originalImageUUID, index, allCategories, oldCategories);
      }
      props.navigation.goBack();
    }}>
      <HeaderSelectionBox>
        <BackButton source={backArrow}/>
      </HeaderSelectionBox>
    </TouchableWithoutFeedback>
  ),
});

export default CatalogItemView;