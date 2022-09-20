/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
import {FollowButton} from '../Component/AppButton';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {height} from '../Utils/Constant';
import {AppContext} from '../Context';
import axios from 'axios';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import {
  ADD_COMMENT,
  COMMENT_LIKE,
  DELETE_COMMENT,
  EDIT_COMMENT,
  REPLIES_URL,
  SHOW_COMMENT,
  TOKEN,
} from '../Conestent/api';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from '../Component/BottomSheet';
import Reply from '../Component/Reply';

const optionsSheetData = [
  {title: 'Edit', content: 'Edit this comment', iconName: 'edit'},
  {title: 'Delete', content: 'Delete this comment', iconName: 'delete'},
];

const Comments = props => {
  const storyData = props.route.params.data;
  const {displayHeight} = useContext(AppContext);
  const {row, comment_view, button} = styles;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [editText, setEditText] = useState('');
  const [editShow, setEditshow] = useState();
  const [replyFielShow, setReplyFielShow] = useState();
  const [replyText, setReplyText] = useState('');
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [selectItem, setSelectItem] = useState();

  // console.log(storyData)
  let refRBSheet = useRef();

  const [visible, setVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openMenu = item => {
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  const onReplyFielShow = item => {
    setReplyFielShow(item.commentId);
    setModalVisible(true);
    setSelectItem(item);
  };
  const sendReply = async item => {
    const formData = new FormData();
    formData.append('token', TOKEN);
    formData.append('commentId', item.commentId);
    formData.append('storyId', storyData.story_id);
    formData.append('reply', replyText);
    formData.append('action', 'send');

    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        // url: 'https://www.shareslate.com/apis/story/replies.php',
        url: REPLIES_URL,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      // alert(JSON.stringify(response));
      if (response.data.status === 'success') {
        setReplyFielShow(null);
        setReplyText('');
        getCommentsData();
        onReplyFielShow();
      }
      // setComments(response.data.data);
      getCommentsData();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async item => {
    // alert(item.commentId);
    const formData = new FormData();
    formData.append('token', TOKEN);
    formData.append('commentId', item.commentId);
    formData.append('storyId', storyData.story_id);
    // formData.append('storyId', '56');

    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: DELETE_COMMENT,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      // alert(JSON.stringify(response));
      // setComments(response.data.data);
      setVisibleIndex(-1);
      getCommentsData();
    } catch (error) {
      console.log(error);
    }
  };
  const onCommentLike = async item => {
    // alert(item.commentId);
    const formData = new FormData();
    formData.append('token', TOKEN);
    formData.append('commentId', item.commentId);
    formData.append('storyId', storyData.story_id);
    // formData.append('storyId', '56');

    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: COMMENT_LIKE,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      console.log(JSON.stringify(response));
      // setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = item => {
    // alert(item.commentId);
    setVisibleIndex(-1);
    setEditshow(item.commentId);
    setEditText(item.comment);
    setVisible(false);
  };

  const onEditSend = async item => {
    // alert(item.commentId)
    const formData = new FormData();
    formData.append('token', TOKEN);
    formData.append('commentId', item.commentId);
    formData.append('storyId', storyData.story_id);
    formData.append('comment', editText);

    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        // url: 'https://www.shareslate.com/apis/story/editComment.php',
        url: EDIT_COMMENT,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      console.log(JSON.stringify(response));
      // setComments(response.data.data);
      if (response.datatype === 'success') {
        getCommentsData();
      }
    } catch (error) {
      console.log(error);
    }
    setVisible(false);
    setEditshow(null);
  };

  const showMenu = data => {
    // alert(data.commentId);
    setVisible(data.commentId);
    // setVisible(true);
  };

  const getCommentsData = async () => {
    const formData = new FormData();
    formData.append('token', TOKEN);
    formData.append('linit', '0');
    formData.append('storyId', storyData.story_id);
    // formData.append('storyId', '56');

    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: SHOW_COMMENT,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      console.log(JSON.stringify(response.data));
      setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendComment = async () => {
    const formData = new FormData();
    formData.append('token', TOKEN);
    formData.append('action', 'send');
    formData.append('storyId', storyData.story_id);
    formData.append('comment', comment);
    // formData.append('storyId', '56');

    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: ADD_COMMENT,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      // console.log(JSON.stringify(response));
      // setComments(response.data.data)
      if (response.data.status === 'success') {
        setComment('');
        alert(response.data.msg);
        // getCommentsData()
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCommentsData();
  }, []);

  // alert(JSON.stringify(comments.length))

  const renderItem = ({item, index}) => {
    // console.log(item);
    return (
      <View style={{paddingHorizontal: 10}}>
        <View style={[row, {justifyContent: 'space-between'}]}>
          <View style={row}>
            <Image
              style={{height: 25, width: 25, top: 7}}
              source={{uri: item.profileImg}}
            />
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                fontWeight: 'bold',
                paddingHorizontal: 5,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: '#69bdd8',
                fontSize: 14,
                fontWeight: 'bold',
                paddingHorizontal: 5,
              }}>
              FOLLOW
            </Text>
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 10,
                backgroundColor: '#5f6062',
              }}
            />
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                fontWeight: '600',
                paddingHorizontal: 5,
              }}>
              {item.date}
            </Text>
          </View>

          <Entypo
            onPress={() => {
              // console.log(index)
              refRBSheet.current.open(item);
              setVisibleIndex(index);
              setSelectItem(item);
              // openMenu(item);
              // alert(item.commentId);
            }}
            name="dots-three-horizontal"
            style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}
          />
        </View>

        <View style={{width: '92%', alignSelf: 'flex-end', paddingLeft: 3}}>
          <TouchableOpacity
            onLongPress={() => {
              // refRBSheet.current.open(item);
              // setSelectItem(item);
              // setVisibleIndex(index);
            }}>
            <Text style={{lineHeight: 15, fontSize: 13, fontWeight: '600'}}>
              {item.comment}
            </Text>
          </TouchableOpacity>
          <View style={row}>
            <View>
              <View style={row}>
                <Text
                  onPress={() => onReplyFielShow(item)}
                  style={{color: '#5f6062', fontSize: 15, fontWeight: '600'}}>
                  Reply
                </Text>
                <View
                  style={{
                    height: 8,
                    width: 8,
                    borderRadius: 10,
                    backgroundColor: '#5f6062',
                    margin: 5,
                  }}
                />
                <TouchableOpacity onPress={() => onCommentLike(item)}>
                  <EvilIcons name="like" size={29} color="#000" />
                </TouchableOpacity>
                <Text
                  style={{color: '#5f6062', fontSize: 15, fontWeight: '600'}}>
                  {item.likeCount}
                </Text>
              </View>
              {item.replies !== undefined ? (
                <Text
                  style={{color: '#5f6062', fontSize: 15, fontWeight: '600'}}>
                  {item.replies.length} replies
                </Text>
              ) : null}
            </View>
            <Image
              style={{height: 30, width: 30, marginRight: 5}}
              source={require('../Assets/Icons/care.png')}
            />
          </View>

          <Reply
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            itemData={selectItem}
            replyFielShow={replyFielShow}
            replyText={replyText}
            setReplyText={setReplyText}
            sendReply={selectItemData => sendReply(selectItemData)}
            storyId={storyData.story_id}
            commentId={item.commentId}
          />
          {editShow === item.commentId ? (
            <TextInput
              placeholder="Comment here"
              placeholderTextColor="#000"
              onChangeText={value => setEditText(value)}
              // onFocus={true}
              // multiline={true}
              value={editText}
              onSubmitEditing={() => onEditSend(item)}
              // blurOnSubmit={true}
              style={{
                color: '#000',
                width: '80%',
                fontSize: 16,
                fontWeight: '600',
                height: 47,
                backgroundColor: '#F5F5F4',
              }}
            />
          ) : null}
        </View>

        <BottomSheet
          // loggedIn={data?.loggedIn_flag}
          // Sheetheight={data?.loggedIn_flag ? 90 : 100}
          height={180}
          data={optionsSheetData}
          openSheet={refRBSheet}
          itemData={selectItem}
          onDelete={selectItemData => onDelete(selectItemData)}
          onEdit={selectItemData => onEdit(selectItemData)}
        />
      </View>
    );
  };

  const keyExtractor = (item, index) => {
    return `${index}`;
  };

  return (
    <Provider>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag">
        <SafeAreaView
          style={{
            paddingTop: StatusBar.currentHeight,
            backgroundColor: '#FFF',
            height: displayHeight,
          }}>
          <View
            style={[
              row,
              {paddingHorizontal: 10, justifyContent: 'space-between'},
            ]}>
            <View style={row}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Reels')}>
                <Image
                  style={{height: 15, width: 10, marginRight: 10}}
                  source={require('../Assets/Icons/arrow_black.png')}
                />
              </TouchableOpacity>
              <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
                Comment {comments.length}{' '}
              </Text>
            </View>
            <View style={row}>
              <View>
                <Image
                  style={{height: 30, width: 30, marginRight: 5}}
                  source={require('../Assets/Icons/care.png')}
                />
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    marginRight: 10,
                    position: 'absolute',
                    right: '35%',
                  }}
                  source={require('../Assets/Icons/care_w.png')}
                />
              </View>
              <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
                {storyData.reactions} likes{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: 'gray',
              marginVertical: 10,
            }}
          />

          <View style={{height: '85%', width: '100%'}}>
            {comments.length > 1 ? (
              <FlatList
                data={comments}
                renderItem={renderItem}
                // getItemLayout={getItemLayout}
                keyExtractor={keyExtractor}
                // removeClippedSubviews={true}
              />
            ) : null}
          </View>

          <Image
            source={require('../Assets/storyImage.png')}
            style={{
              // backgroundColor: appTheme.border,
              height: '33%',
              width: '33%',
              borderRadius: 10,
              marginVertical: 10,
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: '8%',
              right: 7,
            }}
          />

          <View style={styles.comment_view}>
            <Image
              source={require('../Assets/Icons/user.png')}
              style={{
                // backgroundColor: appTheme.border,
                height: 25,
                width: 25,
                borderRadius: 25,
              }}
            />
            <TextInput
              placeholder="Comment here"
              placeholderTextColor="#000"
              onChangeText={value => setComment(value)}
              // multiline={true}
              value={comment}
              onSubmitEditing={() => sendComment()}
              // blurOnSubmit={true}
              style={{
                color: '#000',
                width: '67%',
                fontSize: 16,
                fontWeight: '600',
                height: 47,
              }}
            />
            <View style={row}>
              <Feather
                name="hash"
                size={15}
                color="gray"
                style={{paddingRight: 3}}
              />
              <FontAwesome
                name="at"
                size={15}
                color="gray"
                style={{paddingHorizontal: 3}}
              />
              <Entypo
                name="attachment"
                size={15}
                color="gray"
                style={{paddingHorizontal: 3}}
              />
              <Entypo
                name="emoji-happy"
                size={15}
                color="gray"
                style={{paddingLeft: 5}}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </Provider>
  );
};

export default Comments;

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  comment_view: {
    height: 47,
    width: '96%',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: '#FFF',
    borderRadius: 5,
    backgroundColor: '#F5F5F4',
    // backgroundColor: 'rgba(248, 240, 227, 0.37)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 5,
    justifyContent: 'space-between',
    // position: 'absolute',
    bottom: 10,
  },
  button: {
    height: 32,
    width: 32,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  headerText: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  menuContent: {
    color: '#000',
    fontWeight: 'bold',
    padding: 2,
    fontSize: 20,
  },
});
