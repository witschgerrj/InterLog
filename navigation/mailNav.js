import { createStackNavigator } from 'react-navigation-stack';
import MailMessage from '../screens/mailMessage';
import MailSelectClients from '../screens/mailSelectClients';
import MailSelectItems from '../screens/mailSelectItems';
import MailItemDetails from '../screens/mailItemDetails';

const MailStack = createStackNavigator({
  MailSelectItems: {
    screen: MailSelectItems,
    params: {
      selectedItems: {},
    },
    navigationOptions: {
      title: 'Select Items',
    }
  },
  MailItemDetails: {
    screen: MailItemDetails,
    params: {
      selectedDetails: ['Name'],
    },
    navigationOptions: {
      title: 'Included Details',
    }
  },
  MailSelectClients: {
    screen: MailSelectClients,
    params: {
      selectedClients: {},
    },
    navigationOptions: {
      title: 'Select Contacts',
    }
  },
  MailMessage: {
    screen: MailMessage,
    navigationOptions: {
      title: 'Message',
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

export default MailStack;