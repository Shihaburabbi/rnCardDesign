// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';


messaging().setBackgroundMessageHandler(async remoteMessage => {
 console.log('Message handled in the background!', remoteMessage);
});

function HeadlessChecck({isHeadless}) {
 if (isHeadless) {
   return null;
 }
 return <App />;
}

ReactNativeForegroundService.register();

AppRegistry.registerComponent(appName, () => HeadlessChecck);