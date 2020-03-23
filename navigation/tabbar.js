import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ClientsStack from './clientsNav';
import CatalogStack from './catalogNav';
import MailStack from './mailNav';
import TabBarIcon from '../components/tabbarIcon';
import CatalogUnselected from '../assets/catalogUnselected.png';
import CatalogSelected from '../assets/catalogSelected.png';
import Mail from '../assets/mail.png';
import ClientUnselected from '../assets/clientUnselected.png';
import ClientSelected from '../assets/clientSelected.png';


export default TabBar = createBottomTabNavigator({
  Clients: {
    screen: ClientsStack,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        if (focused) {
          return <TabBarIcon icon={ClientSelected}/>;
        } else {
          return <TabBarIcon icon={ClientUnselected}/>;
        }
      }
    }
  },
  Mail: {
    screen: MailStack,
    navigationOptions: {
      tabBarIcon: () => {
        return <TabBarIcon icon={Mail}/>;
      }
    }
  },
  Catalog: {
    screen: CatalogStack,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        if (focused) {
          return <TabBarIcon icon={CatalogSelected}/>;
        } else {
          return <TabBarIcon icon={CatalogUnselected}/>;
        }
      }
    }
  }
},
{
  initialRouteName: 'Clients',
  tabBarOptions:{
    showLabel: false,
    showIcon: true,
    activeTintColor: '#FFF',
    keyboardHidesTabBar: false,
    style: {
      backgroundColor: '#2B2B2B',//color you want to change
    }
}});