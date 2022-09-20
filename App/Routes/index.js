import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Initial from '../Screens/Initial';
import Reels from '../Screens/Reels';
import Home from '../Screens/Home';
import CreateStory from '../Screens/CreateStory';
import Test from '../Screens/Test';
import StorySheare from '../Screens/StorySheare';
import Comments from '../Screens/Comments';
import UserList from '../Screens/UserList';
import Login from '../containers/Auth/Login';
import CheckAuth from '../containers/CheckAuth'

import CheckConnection from '../containers/CheckConnection'
import Users from '../containers/Users'
import CallScreen from '../containers/CallScreen'
import Info from '../containers/Info'

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'CheckAuth'}
          component={CheckAuth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />
         
         <Stack.Screen
          name={'CheckConnection'}
          component={CheckConnection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Users'}
          component={Users}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name={'Info'}
          component={Info}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Inital'}
          component={Initial}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'Reels'}
          component={Reels}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'CreateStory'}
          component={CreateStory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Test'}
          component={Test}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'StorySheare'}
          component={StorySheare}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Comments'}
          component={Comments}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'UserList'}
          component={UserList}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name={'CallScreen'}
          component={CallScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        /> */}
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
