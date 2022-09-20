package io.invertase.firebase.messaging;

import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.facebook.react.HeadlessJsTaskService;
import com.google.firebase.messaging.RemoteMessage;
import io.invertase.firebase.app.ReactNativeFirebaseApp;
import io.invertase.firebase.common.ReactNativeFirebaseEventEmitter;
import io.invertase.firebase.common.SharedUtils;
import java.util.HashMap;
import java.util.Map;

public class ReactNativeFirebaseMessagingReceiver extends BroadcastReceiver {
  private static final String TAG = "RNFirebaseMsgReceiver";
  static HashMap<String, RemoteMessage> notifications = new HashMap<>();

  @Override
  public void onReceive(Context context, Intent intent) {

    Log.e(TAG, "broadcast received for message");
    if (ReactNativeFirebaseApp.getApplicationContext() == null) {
      ReactNativeFirebaseApp.setApplicationContext(context.getApplicationContext());
    }
    RemoteMessage remoteMessage = new RemoteMessage(intent.getExtras());
    ReactNativeFirebaseEventEmitter emitter = ReactNativeFirebaseEventEmitter.getSharedInstance();

    // Add a RemoteMessage if the message contains a notification payload
    if (remoteMessage.getNotification() != null) {
      notifications.put(remoteMessage.getMessageId(), remoteMessage);
      ReactNativeFirebaseMessagingStoreHelper.getInstance()
          .getMessagingStore()
          .storeFirebaseMessage(remoteMessage);
    }
    if (remoteMessage.getData().size() > 0) {
      if (remoteMessage.getData().containsKey("Super")) {
        Intent launchIntentt = context.getPackageManager().getLaunchIntentForPackage("com.niraapod_driver");
        Map<String, String> data = remoteMessage.getData();

        String phoneNo = data.get("phone_no").toString();
        if (remoteMessage.getData().containsKey("check_out_date")) {
          String checkOutDate = data.get("check_out_date").toString();
          launchIntentt.putExtra("CHECK_OUT_DATE", checkOutDate);
        }
        if (remoteMessage.getData().containsKey("vehicle_class")) {
          String vehicle = data.get("vehicle_class").toString();
          launchIntentt.putExtra("VEHICLE", vehicle);
        }
        String checkInDate = data.get("check_in_date").toString();
        String driverRequest = data.get("driver_request").toString();
        String fullName = data.get("full_name").toString();
        String districtFrom = data.get("districtfrom").toString();
        String districtTo = data.get("districtto").toString();
        String districtFromId = data.get("district_from").toString();
        String districtToId = data.get("district_to").toString();
        String passenger = data.get("user_id").toString();
        String driverId = data.get("driver_id").toString();
        String tripType = data.get("trip_type").toString();
        String tripHotel = data.get("trip_hotel").toString();
        String totalFare = data.get("total_fare").toString();
        String discountAmount = data.get("discount_amount").toString();
        String sendingTime = data.get("sending_time").toString();

        if (remoteMessage.getData().containsKey("hotel")) {

          if (remoteMessage.getData().containsKey("tour_packages")) {
            String tourPackages = data.get("tour_packages").toString();
            launchIntentt.putExtra("TOURPACKAGES", tourPackages);
          }
          String rooms = data.get("rooms").toString();
          String childrens = data.get("childrens").toString();
          String adults = data.get("adults").toString();
          String hotel = data.get("hotel").toString();

          launchIntentt.putExtra("ROOMS", rooms);
          launchIntentt.putExtra("CHILDRENS", childrens);
          launchIntentt.putExtra("ADULTS", adults);
          launchIntentt.putExtra("HOTEL", hotel);
        }

        launchIntentt.putExtra("PHONE_NO", phoneNo);
        launchIntentt.putExtra("CHECK_IN_DATE", checkInDate);
        launchIntentt.putExtra("DRIVER_REQUEST", driverRequest);
        launchIntentt.putExtra("FULL_NAME", fullName);
        launchIntentt.putExtra("DISTRICTFROM", districtFrom);
        launchIntentt.putExtra("DISTRICTTO", districtTo);
        launchIntentt.putExtra("DISTRICT_FROM", districtFromId);
        launchIntentt.putExtra("DISTRICT_TO", districtToId);
        launchIntentt.putExtra("PASSENGER", passenger);
        launchIntentt.putExtra("DRIVERID", driverId);
        launchIntentt.putExtra("TRIPTYPE", tripType);
        launchIntentt.putExtra("TRIPHOTEL", tripHotel);
        launchIntentt.putExtra("TOTALFARE", totalFare);
        launchIntentt.putExtra("DISCOUNT_AMOUNT", discountAmount);
        launchIntentt.putExtra("SENDINGTIME", sendingTime);

        // Model model = remoteMessage.getData()
        // launchIntentt.putExtra("STRING_I_NEED", model);
        if (launchIntentt != null) {
          Log.d("Testing ", "Inside");
          context.startActivity(launchIntentt);
        }
      }
    }
    // |-> ---------------------
    // App in Foreground
    // ------------------------
    if (SharedUtils.isAppInForeground(context)) {
      emitter.sendEvent(
          ReactNativeFirebaseMessagingSerializer.remoteMessageToEvent(remoteMessage, false));
      return;
    }

    // |-> ---------------------
    // App in Background/Quit
    // ------------------------

    try {
      Intent backgroundIntent = new Intent(context, ReactNativeFirebaseMessagingHeadlessService.class);
      backgroundIntent.putExtra("message", remoteMessage);
      Log.e("Testing ", remoteMessage.getData().toString());
      ComponentName name = context.startService(backgroundIntent);
      if (name != null) {
        HeadlessJsTaskService.acquireWakeLockNow(context);
      }
    } catch (IllegalStateException ex) {
      // By default, data only messages are "default" priority and cannot trigger
      // Headless tasks
      Log.e(TAG, "Background messages only work if the message priority is set to 'high'", ex);
    }
  }
}