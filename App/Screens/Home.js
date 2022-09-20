/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
  ImageBackground,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux'
import CommonStyle from '../Theme/CommonStyle';
import Story from '../Component/Story';
import InstaStory from 'react-native-insta-story';
import axios from 'axios';
import Video from 'react-native-video';
import Loader from 'react-native-easy-content-loader';
import QB from "quickblox-react-native-sdk"
import {appStart} from '../../App/actionCreators';
import {colors} from '../../App/theme';
import config from '../../App/src/QBConfig';

const appSettings = {
  appId: '98091',
  authKey: 'dCXJgXjzTkqGjXv',
  authSecret: 'ZuTOmWFWzAcqmRt',
  accountKey: 'Ww14kxscFpqyUz5EzJbz',
  apiEndpoint: '', // optional
  chatEndpoint: '' // optional
};

QB.settings
  .init(appSettings)
  .then(function () {
    // SDK initialized successfully
  })
  .catch(function (e) {
    // Some error occured
    // look at the exception message for more details
  });
const Home = props => {
  const [storyData, setStoryData] = useState();
  const [storyReelData, setStoryReelData] = useState();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState();
  const [username, setUsername] = useState();
  
  const loginUser=()=>{
      QB.auth
      .login({
        login: "ziauddinsc",
        password: "password"
      })
      .then(function (info) {
        if(info.user!=='' & info.session!==''){
          props.navigation.navigate('UserList')
        }else{
          alert("Invalid Authentication")
        } 
   
      })
      .catch(function (e) {
        // handle error
      });
  }

  useEffect(() => {
    //getStoryData();
    props.appStart(config)
  }, []);

  const videoPlayer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [screenType, setScreenType] = useState('content');
  const onLoad = data => {
    setIsLoading(false);
  };
  const onLoadStart = data => setIsLoading(true);

  const StoryLoader = () => {};

  return (
    <View style={CommonStyle.flexContainer}>
      <View>
      
         <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Login"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {(value)=>setLogin(value)}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {(value)=>setUsername(value)}
               />
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => loginUser()
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        style={{
          backgroundColor: 'dark',
          alignSelf: 'center',
          borderRadius: 10,
          borderWidth: 1,
          padding: 5,
        }}
        onPress={() => props.navigation.navigate('Test')}>
        <Text>View Reels Video</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// export default Home;
const mapStateToProps = null

const mapDispatchToProps = { appStart }

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
     height: 40,
  },
  submitButtonText:{
     color: 'white'
  }
})