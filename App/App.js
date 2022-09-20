import React from 'react';
import { connect } from 'react-redux';
import { StatusBar, StyleSheet, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import Navigator from './Navigation';
import NavigationService from './NavigationService';
import { appStart } from './actionCreators';
import { colors } from './src/theme';
import config from './src/QBConfig';
import { fcmService } from './FCMNotification/FCMService';
import { localNotificationService } from './FCMNotification/LocalNotificationService';
import BackgroundTimer from './FCMNotification/BackgroundTimer';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  navigatorView: {
    flex: 1,
    width: '100%',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    props.appStart(config);
  }

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
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={styles.navigatorView}>
          <Navigator ref={NavigationService.init} />
        </View>
        <FlashMessage position="bottom" />
      </View>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = { appStart };

export default connect(mapStateToProps, mapDispatchToProps)(App);
