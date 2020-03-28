import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { enableScreens } from 'react-native-screens';
import Loading from './screens/loading';
import DataLayer from './screens/dataLayer';
import Login from './screens/login';
import Register from './screens/register';
import ResetPassword from './screens/resetPassword';
import TabBar from './navigation/tabbar';

console.disableYellowBox = true;

enableScreens();

const LoginStack = createSwitchNavigator(
  {    
    Loading: {
      screen: Loading,
    },
    DataLayer: {
      screen: DataLayer,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    ResetPassword: {
      screen: ResetPassword,
    },
    TabBar: {
      screen: TabBar,
    }
  },
  {
    initialRouteName: 'Loading',
  }
)

const App = createAppContainer(createSwitchNavigator({
  LoginStack,
}))

export default App;

