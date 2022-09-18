import messaging, {firebase} from '@react-native-firebase/messaging';
import {Platform, Alert} from 'react-native';
class FCMService {
  // we use this method to register notification service in our app.
  // we call this method in componetDidMount() so, we app load we get permission to
  // display notification.
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    // when register function call that time we create notification listener
    this.createNoitificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };
  registerAppWithFCM = async () => {
    if (Platform.OS == 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          //user has permission
          this.getToken(onRegister);
        } else {
          //user don't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log('Permission rejected', error);
      });
  };

  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('User does not have a device token');
        }
      })
      .catch(error => {
        console.log('getToken rejected ', error);
      });
  };
  getFCMToken = async () => {
    var token = await messaging().getToken();
    //alert(token)
    if (token != undefined && token != '' && token != null) {
      token = token;
    } else {
      token = '';
    }
    return token;
    //alert("qqeq",token)
  };
  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log('Requested permission rejected ', error);
      });
  };

  deletedToken = () => {
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('Delected token error ', error);
      });
  };

  createNoitificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // This listener triggered when notification has been received in foreground
    // messaging().onNotificationOpenedApp(async remoteMessage => {
    //   console.log("ZIa Forground")
    //     if(remoteMessage){
    //       console.log('A new 2!', JSON.stringify(remoteMessage));
    //         const notification = remoteMessage.notification
    //        const data = remoteMessage.data
    //       console.log('A new 1!', JSON.stringify(data));
    //       onOpenNotification(notification, data)

    //     }
    // });

    // This listener triggered when app is in background and we click, tapped and opened notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          const data = remoteMessage.data;
          console.log('A new 2!', JSON.stringify(data));

          onOpenNotification(remoteMessage);
          // removeonOpenNotification()
        }
      });

    // Triggered for data only payload  in foreground
    //     this.messageListener = messaging().onMessage(async remoteMessage => {

    //         if(remoteMessage){
    //             let notification =null
    //             if(Platform.OS=='ios'){
    //                 notification=remoteMessage.data.notification
    //                 data = remoteMessage.data.data
    //             }else{
    //               console.log('A new FCM message arrived!', remoteMessage.data);
    //                 notification=remoteMessage.notification
    //               data = remoteMessage.data
    //             }
    //           onNotification(notification, data)

    // // alert(JSON.stringify(data))
    //         }

    //       });

    // This listener triggered when new token
    messaging().onTokenRefresh(fcmToken => {
      console.log('FCM new token: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  //   buildChannel = (obj) => {
  //     return new firebase.notifications.Android.Channel(
  //       obj.channelId, obj.channelName,
  //       firebase.notifications.Android.Importance.High)
  //       .setDescription(obj.channelDes)
  //   }

  //   buildNotification = (obj) => {
  //     console.log(obj)
  //     firebase.notifications().android.createChannel(obj.channel)

  //     const notification = new firebase.notifications.Notification()
  //       .setSound(obj.sound)
  //       .setNotificationId(obj.dataId)
  //       .setTitle(obj.title)
  //       .setBody(obj.content)
  //       .setData(obj.data)
  //       .android.setChannelId(obj.channel.channelId)
  //       .android.setLargeIcon(obj.largeIcon)
  //       .android.setSmallIcon(obj.smallIcon)
  //       .android.setColor(obj.colorBgIcon)
  //       .android.setPriority(firebase.notifications.Android.Priority.High)
  //       .android.setVibrate(obj.vibrate)
  //       .android.setAutoCancel(true)

  //     return notification
  //   }

  //   scheduleNotification = (notification, datetime) => {
  //     const date = new Date(datetime)
  //     firebase.notifications()
  //       .scheduleNotification(notification, { fireDate: date.getTime() })
  //   }

  //   displayNotification = (notification) => {
  //     firebase.notifications().displayNotification(notification)
  //       .catch(error => { console.log("Display Notification error", error) })
  //   }

  //   removeDelieveredNotification = (notification) => {
  //     firebase.notifications()
  //       .removeDeliveredNotification(notification.notificationId)
  //   }
  unRegister = () => {
    // this.messageListener()
  };
}
export const fcmService = new FCMService();
