import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/Home';
import ShoppingScreen from '../screens/home/Shopping';
import ProfileScreen from '../screens/home/Profile';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CartsScreen from '../screens/home/Carts';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={ShoppingScreen}
        options={{
          title: 'Shopping',
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <Icon name="store" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartsScreen}
        options={{
          title: 'Carts',
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
