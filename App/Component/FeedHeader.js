import React, {useContext} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppContext} from '../Context';
import {AppImages} from '../Theme/AppImages';
import CommonStyle from '../Theme/CommonStyle';
import {width} from '../Utils/Constant';
import {FollowButton} from './AppButton';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 1000,
    top: '5%',
    left: 0,
    width: width - 0,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  userName: {
    fontSize: 18,
    marginHorizontal: 8,
    fontWeight: '700',
    fontFamily: 'Inter-Regular',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetail: {
    marginBottom: 5,
  },
  postDetail: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  avatar: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginRight: 5,
  },
});

const FeedHeader = ({item, animation}) => {
  const {appTheme} = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const {row, avatar, userDetail, userName, postDetail} = styles;
  // const {
  //   user: {name, isFollowing},
  //   postText,
  // } = item;

  // console.log(item);

  const onUserProfile = () => {
    // Navigate to user Profile
  };

  const onFollow = () => {
    // Here Perform Follow Unfollow
  };

  return (
    <Animated.View
      style={[
        styles.footer,
        {
          // marginBottom: insets.bottom + 20,
        },
        animation,
      ]}>
      <View style={[row, {justifyContent: 'space-between'}]}>
        <View style={row}>
          <TouchableOpacity activeOpacity={0.6} onPress={onUserProfile}>
            <View style={row}>
              <Image
                style={{height: 18, width: 11}}
                source={require('../Assets/Icons/arrow.png')}
              />
            </View>
          </TouchableOpacity>
          <Text numberOfLines={1} style={[userName, {color: appTheme.tint}]}>
            Minis
          </Text>
        </View>
        <View style={row}>
          <Feather
            name="search"
            size={22}
            color="#FFF"
            style={{paddingHorizontal: 15}}
          />
          <Image
            style={{height: 20, width: 20}}
            source={require('../Assets/Icons/setting.png')}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export {FeedHeader};
