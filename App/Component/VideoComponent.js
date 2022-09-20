import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {AppContext} from '../Context';
import CommonStyle from '../Theme/CommonStyle';
import {width} from '../Utils/Constant';
import {VolumeButton} from './AppButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import convertToProxyURL from 'react-native-video-cache';

const styles = StyleSheet.create({
  videoView: {
    width,
    opacity: 1,
  },
  videoOuter: {
    width,
    ...CommonStyle.center,
  },
  activityIndicator: {
    position: 'absolute',
    top: '45%',
    left: 70,
    right: 70,
    height: 50,
  },
});

const VideoComponent = ({post, isVisible, isNext}) => {
  const {displayHeight} = useContext(AppContext);
  const {isMute} = useContext(AppContext);
  const videoRef = useRef(null);
  const {url} = post;
  const {videoOuter, videoView} = styles;
  const [opacity, setOpacity] = useState(0);

  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      // videoRef.current.seek(0);
    }
  }, [isVisible, isNext]);

  const videoError = e => {
    // Manage error here
    console.log(e);
  };

  const onLoadStart = () => {
    setOpacity(1);
  };

  const onLoad = () => {
    setOpacity(0);
  };

  const onBuffer = ({isBuffering}) => {
    setOpacity(isBuffering ? 1 : 0);
  };

  const filename = post.media;
  const type = filename.split('.').pop();
  // console.log('sdad', post);
  return (
    <View style={[videoOuter, {height: displayHeight}]}>
      {type === 'mp4' ? (
        <View>
          <Video
            ref={videoRef}
            // fullscreenAutorotate={true}
            source={{
              uri: convertToProxyURL(post.media),
            }}
            autoPlay={true}
            repeat={true}
            onError={e => videoError(e)}
            resizeMode={'cover'}
            muted={(!isVisible && true) || isMute}
            style={[videoView, {height: displayHeight}]}
            playInBackground={false}
            paused={!isVisible}
            controls={false}
            poster={post.thumbnail}
            posterResizeMode={'cover'}
            hideShutterView={true}
            minLoadRetryCount={5}
            onBuffer={onBuffer}
            onLoadStart={onLoadStart}
            onLoad={onLoad}
            cache={true}

            // maxBitRate={2000000}
            // bufferConfig={{
            //   minBufferMs: 15000,
            //   maxBufferMs: 50000,
            //   bufferForPlaybackMs: 2500,
            //   bufferForPlaybackAfterRebufferMs: 5000,
            // }}
          />
          <ActivityIndicator
            animating
            size="large"
            color={'red'}
            style={[styles.activityIndicator, {opacity: opacity}]}
          />
          <VolumeButton />
        </View>
      ) : (
        // <Image
        //   style={[videoView, {height: displayHeight}]}
        //   source={{
        //     uri: post.media,
        //   }}
        // />
        <FastImage
          style={[videoView, {height: displayHeight}]}
          source={{
            uri: post.media,
            headers: {Authorization: 'AuthToken'},
            priority: FastImage.priority.normal,
          }}
          // resizeMode={FastImage.resizeMode.contain}
        />
      )}
    </View>
  );
};

export {VideoComponent};
