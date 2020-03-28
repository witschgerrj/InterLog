import { createStackNavigator } from 'react-navigation-stack';
import Data from '../screens/dataLayer';

const DataStack = createStackNavigator({
  DataLayer: {
    screen: Data,
    navigationOptions: {
      title: 'Contacts',
      headerShown: false,
    }
  }
});

export default DataStack;