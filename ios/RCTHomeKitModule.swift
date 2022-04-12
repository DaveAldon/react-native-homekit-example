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
  func addAndSetupAccessories(name: String, resolve: @escaping(RCTPromiseResolveBlock), reject: @escaping(RCTPromiseRejectBlock)) -> Void {
    
    homeManager.homes[0].addAndSetupAccessories(completionHandler: { error in
      if let error = error {
        reject("error", error.localizedDescription, error);
      } else {
        resolve("")
      }
    })
  }
}
