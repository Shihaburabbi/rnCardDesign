/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef, useState} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppContext} from '../Context';
import {AppImages} from '../Theme/AppImages';
import CommonStyle from '../Theme/CommonStyle';
import {width} from '../Utils/Constant';
import {FollowButton} from './AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 10,
    position: 'absolute',
    zIndex: 1000,
    bottom: -9,
    left: 0,
    width: width - 0,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    color: '#FFF',
  },
  userName: {
    fontSize: 17,
    marginHorizontal: 7,
    fontWeight: '700',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
    color: '#FFF',
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
    // marginLeft: 8,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 22,
    // marginRight: 5,
  },
  comment_view: {
    height: 47,
    width: '100%',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: '#FFF',
    borderRadius: 5,
    backgroundColor: 'rgba(245, 245, 245, 0.37)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  button: {
    height: 32,
    width: 32,
    borderRadius: 32,
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'flex-end',
    // marginBottom: 25,
  },
});

const FeedFooter = ({
  item,
  animation,
  onComment,
  onReaction,
  animationLike,
}) => {
  const {appTheme} = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const [commentBosShow, setCommentBoxShow] = useState(false);
  const {row, avatar, userDetail, userName, postDetail, button} = styles;

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

  // alert(JSON.stringify(animationLike))

  const handleViewRef = useRef(null);
  return (
    <Animated.View
      style={[
        styles.footer,
        {
          marginBottom: insets.bottom + 20,
        },
        animation,
      ]}>
      <View
        style={{marginBottom: 15, alignSelf: 'flex-end', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => onReaction()}
          style={[
            button,
            {
              backgroundColor: item.reactions_flag
                ? '#00bfff'
                : 'rgba(245, 245, 245, 0.5)',
            },
          ]}>
          <Animatable.View
            animation={animationLike}
            easing="linear"
            iterationCount={5}>
            <AntDesign name={'like1'} size={18} color={'#FFF'} />
          </Animatable.View>
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            textAlign: 'right',
            marginBottom: 20,
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          {item.reactions}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setCommentBoxShow(true);
          }}
          style={button}>
          <MaterialCommunityIcons
            name="comment-outline"
            size={17}
            color="#000"
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fff',
            textAlign: 'right',
            marginBottom: 20,
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          {item.count_comments}
        </Text>
        <TouchableOpacity style={button}>
          <Feather name="repeat" size={17} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={[row, userDetail, {justifyContent: 'space-between'}]}>
        <TouchableOpacity activeOpacity={0.6} onPress={onUserProfile}>
          <View style={[row, {alignItems: 'center'}]}>
            <Image
              source={{uri: item.profile_img}}
              style={[
                avatar,
                {
                  backgroundColor: appTheme.border,
                },
              ]}
            />
            <Text numberOfLines={1} style={[userName, {color: appTheme.tint}]}>
              {item.name}
            </Text>
            <Ionicons name="checkmark-circle" color="#66c9ef" size={18} />
          </View>
        </TouchableOpacity>
        <FollowButton text="Follow" onPress={onFollow} />
      </View>
      <View style={postDetail}>
        {item.hashtags !== undefined &&
        item.hashtags !== null &&
        item.hashtags !== '' ? (
          <>
            {item.hashtags.map((post, i) => (
              <Text
                key={i}
                style={[
                  CommonStyle.flexContainer,
                  {
                    color: appTheme.tint,
                    fontSize: 12,
                    fontWeight: '600',
                    marginVertical: 5,
                    paddingLeft: 0,
                  },
                ]}
                numberOfLines={2}>
                {/* {post.name} */}Beautiful emaige showing the beach and name
                of the beach and name of the beach
              </Text>
            ))}
          </>
        ) : null}
      </View>

      <View style={styles.comment_view}>
        <Image
          source={{uri: item.profile_img}}
          style={{
            backgroundColor: appTheme.border,
            height: 25,
            width: 25,
            borderRadius: 25,
          }}
        />
        <TouchableOpacity
          onPress={() => onComment()}
          style={{
            width: '67%',
            height: 47,
            justifyContent: 'center',
            paddingLeft: 5,
          }}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Comment here
          </Text>
        </TouchableOpacity>
        {/* <TextInput
            // onPress={() => onComment()}
            onFocus={() => {
              onComment();
              setCommentBoxShow(false);
            }}
            placeholder="Comment here"
            placeholderTextColor="#FFF"
            style={{
              color: '#FFF',
              width: '67%',
              fontSize: 16,
              fontWeight: '600',
            }}
            // editable={false}
          /> */}
        <View style={row}>
          <Feather
            name="hash"
            size={15}
            color="#FFF"
            style={{paddingRight: 3}}
          />
          <FontAwesome
            name="at"
            size={15}
            color="#FFF"
            style={{paddingHorizontal: 3}}
          />
          <Entypo
            name="attachment"
            size={15}
            color="#FFF"
            style={{paddingHorizontal: 3}}
          />
          <Entypo
            name="emoji-happy"
            size={15}
            color="#FFF"
            style={{paddingLeft: 5}}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export {FeedFooter};
