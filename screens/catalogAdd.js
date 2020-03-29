import React, { useState, useEffect } from 'react';
import { Keyboard, View, Dimensions, ActionSheetIOS, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components';
import BgNoScroll from '../components/bgNoScroll';
import * as ImagePicker from 'expo-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { addNewItem, updateItemCategory, getnanoid } from '../backend/firebase';

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
const Touched = styled.TouchableWithoutFeedback``

const CatalogAdd = (props) => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [link, setLink] = useState('');
  const [allCategories, setAllCategories] = useState(props.navigation.getParam('allCategories'));
  const [imageLink, setImageLink] = useState('');

  const _updateName = (text) => {
    props.navigation.setParams({ name: text});
    setName(text);
  }


  const _updateLink = (text) => {
    props.navigation.setParams({ link: text});
    setLink(text);
  }
  //also acts as a "update category"
  const _addToCategories = (oldCategory, category) => {
    let categories = props.navigation.getParam('allCategories');
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
    setCategory(category);
    props.navigation.setParams({ category: category });
    setAllCategories(categories);
    props.navigation.setParams({ allCategories: categories });
  }
  
  const _navigateToCategory = () => {
    props.navigation.navigate('CatalogCategory', {
      category: category,
      oldCategory: category,
      allCategories: allCategories,
      catalogItemUID: props.navigation.getParam('catalogItemUID'),
      updateItemCategory: false,
      addToCategories: _addToCategories,
    });
  }

  const _executeCameraSelection = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        let uri = result.uri;
        //setting to uri for quicker load time
        setImageLink(uri);

        props.navigation.setParams({ imageLink: uri })
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
        let uri = result.uri;
        //setting to uri for quicker load time
        setImageLink(uri);

        props.navigation.setParams({ imageLink: uri })
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
        //future use
      }
    }))
  }

  useEffect(() => {
    _updateName('');
    _updateLink('');
    //initializing imageLink and category so no error is thrown.
    props.navigation.setParams({ imageLink: '',
                                 category: ''});
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
                numberOfLines={10}
                value={link}
                onChangeText={text => _updateLink(text)}/>

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

CatalogAdd.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
        const imageLink = props.navigation.getParam('imageLink');
        const name = props.navigation.getParam('name');
        const category = props.navigation.getParam('category');
        const link = props.navigation.getParam('link');
        const catalog = props.navigation.getParam('catalog');
        const imageUUID = getnanoid();
        const uuid = getnanoid();
        //adding to database
        //getting image UID and the catalog item UID to store locally right away.
        if (name !== '' && imageLink !== '') {
          getnanoid().then(imageUUID => {
            getnanoid().then(itemID => {
              //adding in database
              addNewItem(name, category, link, imageLink, itemID, imageUUID);
              //adding locally
              props.navigation.getParam('addItem')(name, category, link, imageLink, catalog, itemID, imageUUID);
              props.navigation.goBack();
             })
          })
        } else if (name !== '') {
          //case for not generating an imageUUID. Setting imageUUID to ''
          getnanoid().then(itemID => {
            //adding in database.. imageLink and itemuUUID should be empty
            addNewItem(name, category, link, '', itemID, '');
            //adding locally
            props.navigation.getParam('addItem')(name, category, link, imageLink, catalog, itemID, '');
            props.navigation.goBack();
           })
        } else {
          Alert.alert('An item name is required.');
        }

      }}>
      <Done>Done</Done>
    </TouchableWithoutFeedback>
  ),
});

export default CatalogAdd;