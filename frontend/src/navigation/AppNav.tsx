import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {useAuth} from '../providers/AuthProvider';

const AppNav = () => {
  const {userToken, isLoading} = useAuth();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken != null ? (
        // Screens for logged in users
        <AppStack />
      ) : (
        // Auth screens
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default AppNav;
