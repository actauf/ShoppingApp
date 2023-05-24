import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {Text} from '@rneui/themed';

const HelpScreen = ({navigation}: any) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>Welcome to Help</Text>
        </View>
      )}
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  appContainer: {
    width: '100%',
  },
});
