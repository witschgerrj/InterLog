import { createStackNavigator } from 'react-navigation-stack';
import Clients from '../screens/clients';
import ClientAdd from '../screens/clientAdd';
import ClientNotes from '../screens/clientNotes';
import ClientView from '../screens/clientView';

const ClientStack = createStackNavigator({
  Clients: {
    screen: Clients,
    params: {
      clientsWhite: [],
      clientsBlue: [],
      clientsGreen: [],
      clientsYellow: [],
      clientsRed: [],
      clientsViolet: [],
      clientsNone: [],
    },
    navigationOptions: {
      title: 'Contacts'
    }
  },
  ClientAdd: {
    screen: ClientAdd,
    navigationOptions: {
      title: 'Add Contact'
    }
  },
  ClientNotes: {
    screen: ClientNotes,
    navigationOptions: {
      title: 'Contact Notes'
    }
  },
  ClientView: {
    screen: ClientView,
    navigationOptions: {
      title: 'Contact View'
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

export default ClientStack;