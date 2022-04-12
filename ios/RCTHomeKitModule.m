#import <React/RTCBridgeModule.h>
#import <HomeKit/HomeKit.h>
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(HomeKitModule, RCTEventEmitter)

RCT_EXTERN_METHOD(addAndSetupAccessories: (NSString *)name withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

@end
