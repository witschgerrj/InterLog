import React, { useState, useEffect } from 'react';
import { Keyboard, View, Dimensions, ActionSheetIOS } from 'react-native';
import styled from 'styled-components';
import BgNoScroll from '../components/bgNoScroll';
import Trashcan from '../assets/trashcan.png';
import Notes from '../assets/notes.png';
import * as ImagePicker from 'expo-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { deleteCatalogItem, updateItemCategory, getnanoid, updateItemImageURL, deleteCatalogImage, saveCatalogImage, updateCatalogItem } from '../backend/firebase';

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
    let categories = props.navigation.getParam('allCategories');
    if (oldCategory !== category) {
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
    setCategory(category);
    props.navigation.setParams({ category: category });
    setAllCategories(categories);
    props.navigation.setParams({ allCategories: categories });
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
        if (imageLink !== '') {
          //NEED TO SWITCH OUT TO uuid
          let uuid = props.navigation.getParam('imageUUID');
          deleteCatalogImage(uuid);
        }
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

  const _openNotes = () => {
    props.navigation.navigate('CatalogItemNotes', {
      notes: props.navigation.getParam('notes'),
      catalogItemUID: props.navigation.getParam('catalogItemUID'),
      //updateCatalog: props.navigation.getParam('updateCatalog'),
    })
  }

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
        <ImageBox source={{ uri: imageLink }}
                  imageStyle={{ borderRadius: 3}}>
        </ImageBox>
        
      }
    </Touched>
  </>
  );
}

CatalogItemView.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
        let newImage = props.navigation.getParam('newImage');
        let name = props.navigation.getParam('name');
        let category = props.navigation.getParam('category');
        let imageLink = props.navigation.getParam('imageLink');
        let catalogItemUID = props.navigation.getParam('catalogItemUID');
        let link = props.navigation.getParam('link');
        let notes = props.navigation.getParam('notes');
        let index = props.navigation.getParam('index');
        let originalImageUUID = props.navigation.getParam('imageUUID');

        //if theres a new image
        if (newImage) {
          //deletes unused image in database.
          //then saves new image.
          //then gets the url for the saved image and updates the catalog item with it
          //if there previously was no image. AKA no image to delete
          if (imageLink !== '') {
            deleteCatalogImage(props.navigation.getParam('imageUUID'));
          }
          getnanoid()
          .then(imageUUID => {
            saveCatalogImage(imageLink, imageUUID)
            .then((url) => {
              updateItemImageURL(catalogItemUID, url)
              .then(() => {
                //need to update in DB as well.
                updateCatalogItem(name, category, url, link, imageUUID, notes);
                props.navigation.getParam('updateLocal')(name, category, imageLink, link, notes, imageUUID, index);
                props.navigation.goBack();
              });
            })
          })
          
        } else {
          //need to update in db as well.
          updateCatalogItem(name, category, url, link, originalImageUUID, notes);
          props.navigation.getParam('updateLocal')(name, category, imageLink, link, notes, originalImageUUID, index);
          props.navigation.goBack();
        }
      }}>
      <Done>Done</Done>
    </TouchableWithoutFeedback>
  ),
});

export default CatalogItemView;