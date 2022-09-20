package com.rncarddesign;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import android.content.Intent;
import android.util.Log;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import android.os.Bundle;
import com.facebook.react.bridge.ReactContext;
import android.os.Handler;


public class MainActivity extends ReactActivity {



  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RNCardDesign";
  }

  
  public boolean isOnNewIntent = false;

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    isOnNewIntent = true;
    FullScreenPropsEmitter(intent);
  }


  @Override
  protected void onStart() {
//    Log.e("onStart", "onStart");
    super.onStart();
    if(isOnNewIntent == true){
//      Log.e("onStart true", "onStart true");
    }else {
      Log.e("onStart else true", "onStart else true");
      final Handler handler = new Handler();
      new Handler().postDelayed(new Runnable() {
        @Override
        public void run() {
          Log.e("onStart run", "onStart run");
          FullScreenPropsEmitter(getIntent());  }
      }, 5000);

    }
   
  }


  public void FullScreenPropsEmitter(Intent intent){

//    Log.e("Shihab","Rabbi" );
//    Model model = (Model) getIntent().getSerializableExtra("STRING_I_NEED")
    WritableMap map = Arguments.createMap();
    String phoneNo = intent.getStringExtra("PHONE_NO");
      map.putString("phone_no",phoneNo);
      try{
        Log.e("Saad",phoneNo.toString());
        getReactInstanceManager().getCurrentReactContext()
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit("notificationHandle",map);
      }catch (Exception e){
        Log.e("SuperLog", "Caught Exception: " + e.getMessage());
      }


  }
  

  public  void  ForegroundEmitter(){
    // this method is to send back data from java to javascript so one can easily
    // know which button from notification or the notification button is clicked
    String  main = getIntent().getStringExtra("mainOnPress");
    String  btn = getIntent().getStringExtra("buttonOnPress");
    String  btn2 = getIntent().getStringExtra("button2OnPress");
    WritableMap  map = Arguments.createMap();
    if (main != null) {
        map.putString("main", main);
    }
    if (btn != null) {
        map.putString("button", btn);
    }
    if (btn2 != null) {
        map.putString("button", btn);
    }
    try {
        getReactInstanceManager().getCurrentReactContext()
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit("notificationClickHandle", map);
    } catch (Exception  e) {
    Log.e("SuperLog", "Caught Exception: " + e.getMessage());
    }
  }
}
