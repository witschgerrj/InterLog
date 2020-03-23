import { createStackNavigator } from 'react-navigation-stack'
import Clients from '../screens/clients'
import ClientAdd from '../screens/clientAdd'
import ClientNotes from '../screens/clientNotes'
import ClientView from '../screens/clientView'

const ClientStack = createStackNavigator({
  Clients: {
    screen: Clients,
  },
  ClientAdd: {
    screen: ClientAdd,
    navigationOptions: {
      title: 'Add Client'
    }
  },
  ClientNotes: {
    screen: ClientNotes,
    navigationOptions: {
      title: 'Client Notes'
    }
  },
  ClientView: {
    screen: ClientView,
    navigationOptions: {
      title: 'Client View'
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