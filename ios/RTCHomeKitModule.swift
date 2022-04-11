import HomeKit

@objc(HomeKitModule)
class HomeKitModule: RCTEventEmitter, HMHomeManagerDelegate, HMAccessoryBrowserDelegate, HMAccessoryDelegate {
  var homeManager = HMHomeManager()
  let accessoryBrowser = HMAccessoryBrowser()
  
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
