import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import HomeKitModule from './src/HomeKitModule/HomeKitModule';

const App = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={async () => {
          await HomeKitModule.addAndSetupAccessories('');
        }}
        style={{
          backgroundColor: 'gray',
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          + Add HomeKit Device
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
