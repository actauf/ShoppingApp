import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import AppTabs from './AppTabs';
import HelpScreen from '../screens/common/Help';
import FindShopScreen from '../screens/home/FindShop';
import CameraScreen from '../screens/tools/Camera';
import CartDetailsScreen from '../screens/home/CartDetails';
import CartProductDetailsScreen from '../screens/home/CartProductDetails';

const Stack = createStackNavigator<any>();

const AppStack = () => {
  return (
    // Auth screens
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
          options={{
            title: 'AppTabs',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FindShop"
          component={FindShopScreen}
          options={{
            title: 'FindShop',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            title: 'Camera',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CartDetails"
          component={CartDetailsScreen}
          //options={({route}) => ({title: route.params!.title})}
          options={{
            title: '',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="CartProductDetails"
          component={CartProductDetailsScreen}
          options={{
            title: '',
            headerShown: true,
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AppStack;
