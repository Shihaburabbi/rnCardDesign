import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { fcmService } from './App/FCMNotification/FCMService';
import { localNotificationService } from './App/FCMNotification/LocalNotificationService';
import BackgroundTimer from './App/FCMNotification/BackgroundTimer';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

export default class App extends Component {

  async componentDidMount() {

    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, this.onOpenNotification)
    localNotificationService.configure(this.onOpenNotification)


    function onRegister(token) {
      //console.log("[App] onRegister :", token)
    }
    function onNotification(notify, data) {



      const options = {
        soundName: "tone.mp3",
        playSound: true,

      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,

      )
    }

    // PushNotification.cancelAllLocalNotifications()


    // FCM Token Update Start
    let fcmToken = await messaging().getToken()
    // alert(fcmToken)
    console.log('fcmToken=>>>>' + fcmToken)


  }

  componentWillUnmount() {

    console.log("[App] unRegister ")
    fcmService.unRegister()
    localNotificationService.unregister()
  }


  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
