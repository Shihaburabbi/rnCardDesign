/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Input = ({value, onChangeText, onSubmit, placeholder}) => {
  const {row, comment_view, button} = styles;
  return (
    // This moves children view with input field and submit button
    // up above the keyboard when it's active
    <KeyboardAvoidingView behavior="height">
      <View style={comment_view}>
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
          placeholder={placeholder}
          placeholderTextColor="#000"
          onChangeText={onChangeText}
          // multiline={true}
          value={value}
          onSubmitEditing={() => onSubmit()}
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
    </KeyboardAvoidingView>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
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
});
