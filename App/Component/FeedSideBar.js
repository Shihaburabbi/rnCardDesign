import React, { useContext } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext } from '../Context';
import { AppImages } from '../Theme/AppImages';
import { width } from '../Utils/Constant';
import { FollowButton } from './AppButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  sideBar: {
    width: 80,
    position: 'absolute',
    zIndex: 1000,
    right: 15,
    alignItems: 'center',
  },
  iconOuter: {
    marginVertical: 8,
  },
  center: {
    alignItems: 'center',
  },
  imageOuter: {
    width,
    justifyContent: 'center',
  },
  button: {
    height: 35,
    width: 35,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 5

  }
});

// const RenderIcon = ({ obj, onPress, exStyle = {} }) => {
//   const { appTheme } = useContext(AppContext);
//   const { iconOuter, center, icon, text } = styles;
//   const { type, imageIcon, size = 20, disText } = obj;

//   return (
//     <TouchableOpacity
//       activeOpacity={0.6}
//       onPress={() => onPress(type)}
//       style={iconOuter}>
//       <View styles={center}>
//         <Image
//           source={imageIcon}
//           style={[
//             icon,
//             {
//               height: size,
//               width: size,
//               tintColor: appTheme.tint,
//             },
//             exStyle,
//           ]}
//           resizeMode={'contain'}
//         />
//         {(disText && (
//           <Text style={[text, { color: appTheme.tint }]}>{`${disText}`}</Text>
//         )) ||
//           null}
//       </View>
//     </TouchableOpacity>
//   );
// };

const FeedSideBar = ({ item, animation }) => {
  const { appTheme } = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const { sideBar, button } = styles;
  const { like, comment, likeStatus } = item;

  const makeAction = async type => {
    // Here perfom feed action based on Type
  };

  // console.log(item);
  // const onFollow = () => {
  //   // Here Perform Follow Unfollow
  // };

  return (
    <Animated.View
      style={[
        sideBar,
        {
          bottom: '21%',
        },
        animation,
      ]}>

      {/* <RenderIcon
        obj={{
          imageIcon: AppImages.heart,
          disText: like,
          size: 35,
          type: 'Like',
        }}
        exStyle={{ tintColor: (likeStatus && appTheme.red) || appTheme.tint }}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{ imageIcon: AppImages.comment, disText: comment, type: 'Comment' }}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{ imageIcon: AppImages.share, type: 'Share' }}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{ imageIcon: AppImages.more, size: 35, type: 'More' }}
        onPress={makeAction}
      /> */}
      <TouchableOpacity style={button}>
        <FontAwesome name="camera" size={18} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={button}>
        <FontAwesome name="camera" size={18} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={button}>
        <FontAwesome name="camera" size={18} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={button}>
        <FontAwesome name="camera" size={18} color="#000" />
      </TouchableOpacity>


    </Animated.View>
  );
};

export { FeedSideBar };
