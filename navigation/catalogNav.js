import { createStackNavigator } from 'react-navigation-stack';
import Catalog from '../screens/catalog';
import CatalogAdd from '../screens/catalogAdd';
import CatalogCategory from '../screens/catalogCategory';
import CatalogItemNotes from '../screens/catalogItemNotes';
import CatalogItemView from '../screens/catalogItemView';

const CatalogStack = createStackNavigator({
  Catalog: {
    screen: Catalog,
    params: {
      displayGrid: false,
    }
  },
  CatalogAdd: {
    screen: CatalogAdd,
    navigationOptions: {
      title: 'Add Item'
    }
  },
  CatalogCategory: {
    screen: CatalogCategory,
    navigationOptions: {
      title: 'Category'
    }
  },
  CatalogItemNotes: {
    screen: CatalogItemNotes,
    navigationOptions: {
      title: 'Notes'
    }
  },
  CatalogItemView: {
    screen: CatalogItemView,
    navigationOptions: {
      title: 'Item View'
    }
  },
},
{
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#2B2B2B',
    },
    headerTitleStyle: {
      fontSize: 22,
    },
  }
});

export default CatalogStack;