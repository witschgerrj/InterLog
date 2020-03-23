import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { enableScreens } from 'react-native-screens'
import Loading from './screens/loading'
import Login from './screens/login'
import Register from './screens/register'
import TabBar from './navigation/tabbar'

console.disableYellowBox = true;

enableScreens();

const LoginStack = createSwitchNavigator(
  {    
    Loading: {
      screen: Loading,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
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

