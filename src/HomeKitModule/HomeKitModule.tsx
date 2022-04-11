import {NativeModules} from 'react-native';

type HomeKitType = {
  addAndSetupAccessories(name: string): Promise<any>;
};

const {HomeKitModule} = NativeModules;

export default HomeKitModule as HomeKitType;
