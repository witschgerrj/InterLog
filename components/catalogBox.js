import React, { useState } from 'react';
import { Dimensions, ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Box = styled.ImageBackground`
  padding: 10px;
  margin-left: 5px;
  margin-top: 5px;
  height: ${props => (Math.floor((Dimensions.get('window').width)) / props.rows)}px;
  width: ${props => (Math.floor((Dimensions.get('window').width)) / props.rows) - (5 + (5 / props.rows))}px;
  background-color: #2B2B2B;
`
const ItemName = styled.Text`
  font-size: ${props => props.rows === 3 ? 22 : 18}px;
  color: white;
  text-align: center;
  margin: auto;
`
const StyledActivityIndicator = styled(ActivityIndicator)`
  position: absolute;
  margin-left: ${props => (((Math.floor((Dimensions.get('window').width)) / props.rows) - (5 + (5 / props.rows))) / 2) - 5}px;
  margin-top: ${props => ((Math.floor((Dimensions.get('window').width)) / props.rows) / 2) - 5}px;
`

const CatalogBox = (props) => {

  //set loaded to false if there is an image that needs to be loaded
  const [loaded, setLoaded] = useState(props.imageLink ? false : true);

  const _navigateToCatalogItemView = () => {
    props.navigation.navigate('CatalogItemView', {
      name: props.name,
      category: props.category,
      imageLink: props.imageLink,
      imageUUID: props.imageUUID,
      link: props.link,
      notes: props.notes,
      index: props.index,
      catalogItemUID: props.catalogItemUID,
      allCategories: props.allCategories,
      getAllCategories: props.getAllCategories,
      oldCategories: props.oldCategories,
      updateCatalog: props.updateCatalog,
      navigation: props.navigation,
      originalNotes: props.originalNotes,
      updateLocal: props.updateLocal,
      catalog: props.catalog,
      updateLocalCategory: props.updateLocalCategory,
      delete: props.delete,
    })
  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => _navigateToCatalogItemView()}>
        <Box  rows={props.rows}
              onLoad={() => setLoaded(true)}
              source={ props.imageLink !== '' ? 
                { uri: props.imageLink } 
              : null
              }>
          {
            props.imageLink === '' ?
              <ItemName rows={props.rows}>{props.name}</ItemName>
            : null
          } 
        </Box>
      </TouchableWithoutFeedback>
      {
        loaded ? null
        : <StyledActivityIndicator  size='small' 
                                    color='#fff'
                                    rows={props.rows}/>
      }
      </View>
  );
}

CatalogBox.defaultProps = {
  pressable: true,
}

export default CatalogBox;