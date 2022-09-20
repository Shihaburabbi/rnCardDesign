/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import {height, width} from '../Utils/Constant';
import {AppContext} from '../Context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Input from './input';
import BottomSheet from './BottomSheet';
import axios from 'axios';
import {DELETE_REPLY, EDIT_REPLY, TOKEN} from '../Conestent/api';

const optionsSheetData = [
  {title: 'Edit', content: 'Edit this comment', iconName: 'edit'},
  {title: 'Delete', content: 'Delete this comment', iconName: 'delete'},
];

const Reply = ({
  modalVisible,
  setModalVisible,
  itemData,
  replyText,
  setReplyText,
  sendReply,
  storyId,
  commentId,
}) => {
  const {displayHeight} = useContext(AppContext);
  const {row, comment_view, image_sty, comment_text, comment_view1, input_sty} =
    styles;
  // console.log(itemData);
  let refReplyBSheet = useRef();
  const [selectReplyItem, setSelectReplyItem] = useState();
  const [editReply, setEditReply] = useState();
  const [editReplyText, setEditReplyText] = useState('');

  const onDeleteReply = async selectItem => {
    const formData = new FormData();
    formData.append('token', TOKEN);
    formData.append('commentId', commentId);
    formData.append('storyId', storyId);
    formData.append('replyId', selectItem.reply_id);
    // formData.append('storyId', '56');

    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: DELETE_REPLY,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      // alert(JSON.stringify(response));
      // setComments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onShowEditReply = selectItem => {
    setEditReply(selectItem.reply_id);
    setEditReplyText(selectItem.comment);
  };
  const onEditReplySend = async () => {
    const formData = new FormData();
    formData.append('token', TOKEN);
    formData.append('commentId', commentId);
    formData.append('storyId', storyId);
    formData.append('replyId', selectReplyItem.reply_id);
    formData.append('reply', editReplyText);

    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        // url: 'https://www.shareslate.com/apis/story/editComment.php',
        url: EDIT_REPLY,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });

      alert(JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
    setEditReplyText('');
    setEditReply(null);
  };

  const renderItem = ({item, index}) => {
    // console.log(item);
    return (
      <View style={{paddingHorizontal: 10, marginTop: -5}}>
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
              refReplyBSheet.current.open();
              setSelectReplyItem(item);
            }}
            name="dots-three-horizontal"
            style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}
          />
        </View>

        <View
          style={{
            width: '92%',
            alignSelf: 'flex-end',
            paddingLeft: 3,
            marginBottom: 3,
          }}>
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
                <EvilIcons name="like" size={29} color="#000" />
                <Text
                  style={{color: '#5f6062', fontSize: 15, fontWeight: '600'}}>
                  {item.likeCount}
                </Text>
              </View>
            </View>
            <Image
              style={{height: 30, width: 30, marginRight: 5}}
              source={require('../Assets/Icons/care.png')}
            />
          </View>
          {editReply === item.reply_id ? (
            <TextInput
              placeholder="edit reply"
              placeholderTextColor="#000"
              onChangeText={value => setEditReplyText(value)}
              // onFocus={true}
              // multiline={true}
              value={editReplyText}
              onSubmitEditing={() => onEditReplySend(item)}
              blurOnSubmit={true}
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
      </View>
    );
  };

  const keyExtractor = (item, index) => {
    return `${index}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={[styles.modalView, {flex: 1}]}>
        <View
          style={[
            row,
            {paddingHorizontal: 10, justifyContent: 'space-between'},
          ]}>
          <View style={row}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Image
                style={{height: 15, width: 10, marginRight: 10}}
                source={require('../Assets/Icons/arrow_black.png')}
              />
            </TouchableOpacity>
            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
              Replies
            </Text>
          </View>
        </View>

        {itemData !== undefined ? (
          <View style={{padding: 10}}>
            <View
              style={[
                row,
                {
                  width: '96%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <View style={row}>
                <Image source={{uri: itemData.profileImg}} style={image_sty} />
                <View style={{paddingHorizontal: 5}}>
                  <Text style={comment_text}>{itemData.name}</Text>
                  <Text style={{color: '#5f6062', fontSize: 13}}>
                    {itemData.date}
                  </Text>
                </View>
              </View>
              <Entypo
                onPress={() => {}}
                name="dots-three-horizontal"
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#000',
                  top: -5,
                }}
              />
            </View>
            <View style={comment_view}>
              <Text style={[comment_text, {fontWeight: '400'}]}>
                {itemData.comment}
              </Text>
            </View>
            <View
              style={{
                height: 0.3,
                width: '100%',
                backgroundColor: 'gray',
                marginTop: 12,
                opacity: 0.4,
              }}
            />
          </View>
        ) : null}
        {/* <View style={{height: '73%'}}> */}
        {itemData !== undefined ? (
          <FlatList
            data={itemData.replies}
            renderItem={renderItem}
            // getItemLayout={getItemLayout}
            keyExtractor={keyExtractor}
          />
        ) : null}
        {/* </View> */}

        <Input
          value={replyText}
          onChangeText={value => setReplyText(value)}
          onSubmit={() => sendReply(itemData)}
          placeholder="Reply here"
        />
        <BottomSheet
          height={180}
          data={optionsSheetData}
          openSheet={refReplyBSheet}
          itemData={selectReplyItem}
          onDelete={selectItemData => onDeleteReply(selectItemData)}
          onEdit={selectItemData => onShowEditReply(selectItemData)}
        />
      </View>
    </Modal>
  );
};

export default Reply;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: 'white',
    height: height,
    width: '100%',
  },

  row: {flexDirection: 'row', alignItems: 'center'},
  comment_view1: {
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
  comment_view: {
    backgroundColor: '#F5F5F4',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 2,
  },
  image_sty: {
    height: 25,
    width: 25,
    borderRadius: 25,
  },
  comment_text: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  input_sty: {
    color: '#000',
    width: '85%',
    fontSize: 16,
    fontWeight: '600',
    height: 47,
    backgroundColor: '#F5F5F4',
    marginRight: 10,
    borderRadius: 5,
  },
});
