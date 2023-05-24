import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import SignInScreen from '../screens/auth/SignIn';
import SignUpScreen from '../screens/auth/SignUp';
import HelpScreen from '../screens/common/Help';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    // Auth screens
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AuthStack;
