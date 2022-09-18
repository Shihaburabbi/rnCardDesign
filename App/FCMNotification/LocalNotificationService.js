import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class LocalNotificationService {
  configure = onOpenNotification => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('[LocalNotificationService] onRegister:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('[LocalNotificationService] onNotification:', notification);

        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotification(
          Platform.OS === 'ios' ? notification.data.item : notification.data,
        );

        if (Platform.OS === 'ios') {
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      // // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      // onAction: function (notification) {
      //     console.log("ACTION:", notification.action);
      //     console.log("NOTIFICATION:", notification);

      //     // process the action
      // },

      // // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      // onRegistrationError: function (err) {
      //     console.error(err.message, err);
      // },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    console.log(options);
    PushNotification.localNotification({
      /*Android Only Properties */
      ...this.buildAndroidNotification(id, title, message, data, options),
      /* Ios and Android Only Properties */
      ...this.buildIOSNotification(id, title, message, data, options),
      title: title || '',
      message: message || '',
      //  playSound:options.playSound || false,
      //  soundName:options.soundName || 'default',
      visibility: 'private', // (optional) set notification visibility, default: private
      playSound: options.playSound || true,
      soundName: options.soundName || 'tone.mp3',
      userInteraction: true,
      actions: options.actions || '["Yes", "No"]',
    });
  };
  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id,
      largeIcon: options.largeIcon || 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      smallIcon: options.smallIcon || 'ic_launcher', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: message, // (optional) default: "message" prop
      subText: title, // (optional) default: none
      autoCancel: true, // (optional) default: true
      color: 'red',
      group: 'group', // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      tag: 'some_tag', // (optional) add tag to message
      vibrate: options.vibrate || true, // (optional) default: true
      vibration: options.vibration || 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      priority: options.priority || 'high', // (optional) set notification priority, default: high
      importance: options.importance || 'high', // (optional) set notification importance, default: high
      data: data,
      actions: options.actions || '["Yes", "No"]',
    };
  };
  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id,
      alertAction: options.alertAction || 'view',
      category: options.category || '', // (optional) default: empty string
      userInfo: {
        id: id,
        item: data,
      }, // (optional) default: {} (using null throws a JSON value '<null>' error)
    };
  };
  cancelLocalNotifications = () => {
    if (Platform.OS == 'ios') {
      PushNotificationIOS.cancelLocalNotifications();
    } else {
      PushNotification.cancelLocalNotifications();
    }
  };
  removeAllDeliveredNotifications = notificationID => {
    PushNotification.cancelLocalNotifications({id: `$notificationID`});
  };
}
export const localNotificationService = new LocalNotificationService();
