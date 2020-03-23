import { createStackNavigator } from 'react-navigation-stack'
import MailFormatEmail from '../screens/mailFormatEmail'
import MailSelectClients from '../screens/mailSelectClients'
import MailSelectItems from '../screens/mailSelectItems'

const MailStack = createStackNavigator({
  MailSelectClients: {
    screen: MailSelectClients,
    navigationOptions: {
      title: 'Select Clients'
    }
  },
  MailSelectItems: {
    screen: MailSelectItems,
    navigationOptions: {
      title: 'Select Items'
    }
  },
  MailFormatEmail: {
    screen: MailFormatEmail,
    navigationOptions: {
      title: 'Formal Email'
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