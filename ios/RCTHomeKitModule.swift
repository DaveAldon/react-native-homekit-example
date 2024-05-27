import HomeKit

@objc(HomeKitModule)
class HomeKitModule: RCTEventEmitter {
  var homeManager = HMHomeManager()

  @objc override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["findNewAccessory", "removeNewAccessory", "characteristicNotify"]
  }

  @objc(addAndSetupAccessories:withResolver:withRejecter:)
  func addAndSetupAccessories(name: String, resolve: @escaping (RCTPromiseResolveBlock), reject: @escaping (RCTPromiseRejectBlock)) {
    homeManager.homes[0].addAndSetupAccessories(completionHandler: { error in
      if let error = error {
        reject("error", error.localizedDescription, error)
      } else {
        let home = self.homeManager.homes[0]
        var homeData = [String: Any]()
        homeData["name"] = home.name
        homeData["isPrimary"] = home.isPrimary
        homeData["rooms"] = home.rooms.map { $0.name }
        homeData["accessories"] = home.accessories.map { $0.name }
        resolve(homeData)
      }
    })
  }
}
