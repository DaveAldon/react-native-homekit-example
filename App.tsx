import React from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import HomeKitModule, { Home } from "./src/HomeKitModule/HomeKitModule";

const App = () => {
  const [home, setHome] = React.useState<Home>();

  const addAndSetupAccessories = async () => {
    const homeData = await HomeKitModule.addAndSetupAccessories("");
    setHome(homeData);
  };

  const toggleDeviceState = async (deviceName: string) => {
    const device = home?.accessories.find(
      accessory => accessory.name === deviceName,
    );
    const newState = device?.isOn === true ? 0 : 1;
    await HomeKitModule.setDeviceState(deviceName, newState);
    const updatedHomeData = await HomeKitModule.getHomeData("");
    setHome({ ...updatedHomeData });
  };

  React.useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const initialHomeData = await HomeKitModule.getHomeData("");
        console.log(initialHomeData);
        setHome(initialHomeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={addAndSetupAccessories}
        style={{
          backgroundColor: "#007AFF",
          padding: 10,
          margin: 10,
          borderRadius: 10,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text
          style={{
            color: "white",
            fontSize: 34,
          }}>
          + Add HomeKit Device
        </Text>
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={{ paddingBottom: 300 }}
        data={home?.accessories.sort((a, b) => a.name.localeCompare(b.name))}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={async () => await toggleDeviceState(item.name)}
            style={{
              backgroundColor: item.isOn === true ? "#adbffa" : "#D6D6D6",
              padding: 10,
              margin: 10,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{
                color: "black",
                fontSize: 34,
                fontWeight: "200",
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
