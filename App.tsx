import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import HomeKitModule from './src/HomeKitModule/HomeKitModule';

const App = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={async () => {
          await HomeKitModule.addAndSetupAccessories('');
        }}>
        <Text>Add HomeKit Device</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
