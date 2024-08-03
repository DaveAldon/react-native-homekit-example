import { NativeModules } from "react-native";

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
  isOn: string | boolean;
}

export interface Zone {
  name: string;
  rooms: Array<Room>;
}

export interface Room {
  name: string;
  accessories: Accessory[];
}

export interface Home {
  name: string;
  primary: boolean;
  rooms: Array<Room>;
  accessories: Accessory[];
  zones: Array<Zone>;
}

type HomeKitType = {
  addAndSetupAccessories(name: string): Promise<Home>;
  getHomeData(name: string): Promise<Home>;
  setDeviceState(deviceName: string, state: number): Promise<void>;
};

const { HomeKitModule } = NativeModules;

export default HomeKitModule as HomeKitType;
