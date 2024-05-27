import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HomeKitModule, { Home } from "./src/HomeKitModule/HomeKitModule";

const App = () => {
  const [home, setHome] = React.useState<Home>();

  const addAndSetupAccessories = async () => {
    const homeData = await HomeKitModule.addAndSetupAccessories("");
    setHome(homeData);
  };

  React.useEffect(() => {
    console.log("home data", home);
  }, [home]);

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
        data={home?.accessories}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#adbffa",
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
              {item}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default App;
