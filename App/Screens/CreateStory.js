/* eslint-disable no-alert */
// import React, {useRef, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Animated,
//   Image,
//   ImageBackground,
//   ActivityIndicator,
//   SafeAreaView,
//   TouchableHighlight,
// } from 'react-native';
// import Video from 'react-native-video';
// import CommonStyle from '../Theme/CommonStyle';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MImagePicker from 'react-native-image-video-picker-editor';
// import {HandleCrop} from 'react-native-image-video-picker-editor/cropper';
// import {InstagramLikePicker} from 'react-native-instagram-like-picker';
// import {RNCamera} from 'react-native-camera';
// import Camera from '../Component/Camera';

// const CreateStory = props => {
//   let camera = useRef();

//   const [img, setImg] = useState(null);

//   function onPicture({uri}) {
//     setImg(uri);
//   }

//   function onBackToCamera() {
//     setImg(null);
//   }
//   const TakePic = () => {
//     const options = {};
//     //options.location = ...
//     camera
//       .capture({metadata: options})
//       .then(data => console.log(data))
//       .catch(err => console.error(err));
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       {img ? (
//         <TouchableHighlight
//           style={{flex: 1}}
//           onPress={() => {
//             onBackToCamera();
//           }}>
//           <Image source={{uri: img}} style={{flex: 1}} />
//         </TouchableHighlight>
//       ) : (
//         <Camera onPicture={onPicture} />
//       )}
//     </SafeAreaView>
//   );
// };

// export default CreateStory;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     color: '#000',
//     padding: 10,
//     margin: 40,
//   },
// });

import React from 'react';

import {Image, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import MImagePicker from 'react-native-image-video-picker-editor';
import Video from 'react-native-video';
import {HandleCrop} from 'react-native-image-video-picker-editor/cropper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class CreateStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      showResult: false,
    };
  }

  picker = (
    <MImagePicker
      onDone={imageData =>
        this.props.navigation.navigate('StorySheare', {data: imageData})
      }
      header={{nextTitle: 'Next', cancelTitle: 'Cancel'}}
      onCancel={() => {
        alert('processing');
      }}
      onDoneTech={imageData =>
        this.props.navigation.navigate('StorySheare', {data: imageData})
      }
      onNext={async param => {
        // param.videoMaxLen = 3; // not set or 0 for unlimited
        // param.videoQuality = 'low';
        // const res = await HandleCrop(param);
        // this.setState({result: res, showResult: true});
        // console.log(JSON.stringify(param));
        alert('processing');
      }}
      cropSize={{width: 200, height: 200}}
      maxScale={100}
      max={1}
      cameraConfig={{
        camerPhotoTile: 'Photo',
        cameraVideoTitle: 'Video',
        cameraCancelTitle: 'Cancle',
        maxVideoLen: 15,
        videoQuality: '480p',
      }}
      // profile={true}
    />
  );

  renderVideo(video) {
    console.log('rendering video');
    return (
      <View style={{height: 300, width: 300}}>
        <Video
          source={{uri: video}}
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          rate={1}
          paused={false}
          volume={1}
          muted={false}
          resizeMode={'cover'}
          onError={e => console.log(e)}
          onLoad={load => console.log(load)}
          repeat={true}>
          <View></View>
        </Video>
      </View>
    );
  }

  renderImage(image) {
    console.log(image);
    return (
      <Image
        onDone={() => alert('rabbi')}
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={{uri: image}}
      />
    );
  }

  renderAsset(image) {
    if (image.type == 'photo') {
      return this.renderImage(image.assest);
    }
    return this.renderVideo(image.assest);
  }

  results = () => {
    return (
      <ScrollView>
        {this.state.result.map(i => (
          <View key={i}>{this.renderAsset(i)}</View>
        ))}
      </ScrollView>
    );
  };

  renderItem = () => {
    if (this.state.showResult) {
      return this.results();
    }
    return this.picker;
  };

  render() {
    return this.renderItem();
  }
}

export default CreateStory;
