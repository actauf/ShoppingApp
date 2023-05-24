/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootSiblingParent} from 'react-native-root-siblings';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {createStackNavigator} from '@react-navigation/stack';
import AuthProvider, {useAuth} from './src/providers/AuthProvider';
import AppNav from './src/navigation/AppNav';

const Stack = createStackNavigator();
const client = new QueryClient();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <RootSiblingParent>
          <AppNav />
        </RootSiblingParent>
      </QueryClientProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
