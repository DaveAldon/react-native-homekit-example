import HomeKit

@objc(HomeKitModule)
class HomeKitModule: RCTEventEmitter {
  var homeManager = HMHomeManager()
  var homeIndex = 1

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["findNewAccessory", "removeNewAccessory", "characteristicNotify"]
  }

  func constructHomeData(home: HMHome, completion: @escaping ([String: Any]) -> Void) {
    var homeData = [String: Any]()
    homeData["name"] = home.name
    homeData["isPrimary"] = home.isPrimary
    homeData["rooms"] = home.rooms.map { $0.name }

    var accessoriesData = [[String: Any]]()
    let accessoriesCount = home.accessories.count
    var processedCount = 0

    for accessory in home.accessories {
      var accessoryData = [String: Any]()
      accessoryData["name"] = accessory.name

      if let powerCharacteristic = accessory.services
        .flatMap({ $0.characteristics })
        .first(where: { $0.characteristicType == HMCharacteristicTypePowerState })
      {
        powerCharacteristic.readValue { error in
          if let error = error {
            accessoryData["isOn"] = "unknown"
          } else {
            accessoryData["isOn"] = powerCharacteristic.value as? Bool ?? false
          }
          accessoriesData.append(accessoryData)
          processedCount += 1

          // Check if all accessories have been processed
          if processedCount == accessoriesCount {
            homeData["accessories"] = accessoriesData
            completion(homeData)
          }
        }
      } else {
        accessoryData["isOn"] = "unknown"
        accessoriesData.append(accessoryData)
        processedCount += 1

        // Check if all accessories have been processed
        if processedCount == accessoriesCount {
          homeData["accessories"] = accessoriesData
          completion(homeData)
        }
      }
    }
  }

  @objc(getHomeData:withResolver:withRejecter:)
  func getHomeData(name: String, resolve: @escaping (RCTPromiseResolveBlock), reject: @escaping (RCTPromiseRejectBlock)) {
    let home = homeManager.homes[homeIndex]
    constructHomeData(home: home) { homeData in
      resolve(homeData)
    }
  }

  @objc(addAndSetupAccessories:withResolver:withRejecter:)
  func addAndSetupAccessories(name: String, resolve: @escaping (RCTPromiseResolveBlock), reject: @escaping (RCTPromiseRejectBlock)) {
    homeManager.homes[homeIndex].addAndSetupAccessories(completionHandler: { error in
      if let error = error {
        reject("error", error.localizedDescription, error)
      } else {
        let home = self.homeManager.homes[self.homeIndex]
        self.constructHomeData(home: home) { homeData in
          resolve(homeData)
        }
      }
    })
  }

  @objc(setDeviceState:state:withResolver:withRejecter:)
  func setDeviceState(name: String, state: NSNumber, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let home = homeManager.homes[homeIndex]

    guard let accessory = home.accessories.first(where: { $0.name == name }) else {
      reject("error", "Accessory not found", nil)
      return
    }

    guard let powerCharacteristic = accessory.services
      .flatMap({ $0.characteristics })
      .first(where: { $0.characteristicType == HMCharacteristicTypePowerState })
    else {
      reject("error", "Power characteristic not found", nil)
      return
    }

    print("Setting state to: \(state)")
    powerCharacteristic.writeValue(state) { error in
      if let error = error {
        reject("error", error.localizedDescription, error)
      } else {
        resolve("Device state updated successfully")
      }
    }
  }
}
