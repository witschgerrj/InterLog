import React, { useState, useEffect } from 'react';
import { Keyboard, View, Dimensions, ActionSheetIOS, KeyboardAvoidingView} from 'react-native';
import styled from 'styled-components';
import BgNoScroll from '../components/bgNoScroll';
import * as ImagePicker from 'expo-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { addNewItem, getCategories } from '../backend/firebase';

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

  const _updateItemCategory = (catalogItemUID, category) => {
    props.navigation.setParams({ category: category});
    setCategory(category);
  }

  const _updateLink = (text) => {
    props.navigation.setParams({ link: text});
    setLink(text);
  }

  const _updateCategoriesAfterAdding = () => {
    let categories = {}
    getCategories().then(data => {
      data.map(doc => {
        let category = doc.data().category;
        if (categories.hasOwnProperty(category)) {
          categories[category] = categories[category] + 1;
        } else {
          categories[category] = 1;
        }
      })
    })
    setAllCategories(categories);
  }
  
  const _navigateToCategory = () => {
    props.navigation.navigate('CatalogCategory', {
      category: category,
      allCategories: allCategories,
      updateItemCategory: _updateItemCategory,
      updateCategoriesAfterAdding: _updateCategoriesAfterAdding,
      catalogItemUID: props.navigation.getParam('catalogItemUID'),
      updateCatalog: props.navigation.getParam('updateCatalog'),
      getAllCategories: props.navigation.getParam('getAllCategories'),
    });
  }

  const _executeCameraSelection = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        let uri = { uri: result.uri }
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
        let uri = { uri: result.uri }
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

      }
    }))
  }

  useEffect(() => {
    _updateName('');
    _updateItemCategory('' ,'');
    _updateLink('');
    props.navigation.setParams({ imageLink: '' });
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
          <ImageBox source={imageLink}
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
        const name = props.navigation.getParam('name');
        const category = props.navigation.getParam('category');
        const link = props.navigation.getParam('link');
        const imageLink = props.navigation.getParam('imageLink');
        addNewItem(name, category, link, imageLink);
        props.navigation.goBack();
        props.navigation.getParam('updateCatalog')();
        props.navigation.getParam('getAllCategories')();
      }}>
      <Done>Done</Done>
    </TouchableWithoutFeedback>
  ),
});

export default CatalogAdd;