import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';

export default function VideoWithOverlays({
  videoComponentProps,
  text,
  imageSrc,
}) {
  const {
    video,
    overlayText,
    videoWithOverlays,
    overlayTextView,
    overlayImageView,
    overlayImage,
  } = styles;

  const [height, setHeight] = useState(0);
  const [overlayHeight, setOverlayHeight] = useState(0);

  useEffect(() => {
    // setting the overlay height to 10px starting
    // from the bottom of the video
    setOverlayHeight(height / 2 + height / 3 - 10);
  }, [height]);

  return (
    <View style={videoWithOverlays}>
      <Video
        {...videoComponentProps}
        style={video}
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          setHeight(height);
        }}
        source={{
          uri: 'https://assets.shareslate.com/files/stories/68/478917791.mp4',
        }}
      />
      <View style={{...overlayTextView, top: overlayHeight}}>
        {text && <Text style={overlayText}>{text}</Text>}
      </View>
      <View style={{...overlayImageView, top: overlayHeight}}>
        {imageSrc && (
          <Image style={overlayImage} source={imageSrc} resizeMode="contain" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayTextView: {
    position: 'relative',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    right: 5,
  },
  overlayImageView: {
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    left: 5,
  },
  overlayImage: {
    position: 'absolute',
    height: 40,
  },
  overlayText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    marginTop: '0%',
  },
  videoWithOverlays: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
