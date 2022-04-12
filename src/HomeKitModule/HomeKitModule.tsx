import {NativeModules} from 'react-native';

export interface Characteristic {
  type: string;
  description: string;
  isNotificationEnabled: boolean;
  localizedDescription: string;
  metaData: any;
  properties: any;
  uuid: string;
  value: string;
}

export interface Service {
  name: string;
  type: string;
  characteristics: Array<Characteristic>;
}

export interface Accessory {
  name: string;
  bridged: boolean;
  room?: Room;
  services: Array<Service>;
}

export interface Zone {
  name: string;
  rooms: Array<Room>;
}

export interface Room {
  name: string;
  accessories: Array<Accessory>;
}

export interface Home {
  name: string;
  primary: boolean;
  rooms: Array<Room>;
  accessories: Array<Accessory>;
  zones: Array<Zone>;
}

type HomeKitType = {
  addAndSetupAccessories(name: string): Promise<Home>;
};

const {HomeKitModule} = NativeModules;

export default HomeKitModule as HomeKitType;
