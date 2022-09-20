/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';

import {
  ScrollView,
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Block, Icon, Text, Input} from 'galio-framework';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Avatar from './Avatar';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import RBSheet from 'react-native-raw-bottom-sheet';

const SPACING = 20;
const {width, height} = Dimensions.get('screen');

export default function BottomSheet({
  openSheet,
  data,
  Sheetheight,
  height,
  loggedIn,
  type,
  onEdit,
  onDelete,
  itemData,
}) {
  //   const theme = useSelector(state => state.app.theme);
  //   let filterdata = data.filter(item => {
  //     if (item?.id == 'Not_for_loggedIn_user') {
  //       return !loggedIn && item;
  //     }
  //     if (item?.for_loggedIn_user) {
  //       return loggedIn && item;
  //     } else {
  //       return item;
  //     }
  //   });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "red",
        position: 'absolute',
      }}>
      <RBSheet
        ref={openSheet}
        height={height}
        customStyles={{
          wrapper: {
            // ...sheetStyle,
            // backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: '#8898AA',
          },
          container:
            // sheetStyle,
            {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
        }}>
        <Block style={{...styles.main, backgroundColor: '#fff'}}>
          {data !== undefined ? (
            <ScrollView style={{paddingTop: 25}}>
              {data.map((item, ind) => {
                // console.log(title);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      openSheet.current.close();
                      if (item.title === 'Edit') {
                        onEdit(itemData);
                      } else {
                        onDelete(itemData);
                      }
                    }}
                    key={ind}>
                    <Block
                      row
                      style={{
                        width: '100%',
                        paddingHorizontal: 20,
                      }}>
                      <Block style={{marginTop: 5}}>
                        <AntDesign
                          name={item.iconName}
                          color="#000"
                          size={20}
                        />
                      </Block>
                      <Block style={{paddingHorizontal: 10, marginBottom: 15}}>
                        <Text
                          style={{
                            marginTop: item.content ? 0 : 2,
                            color: '#000',
                            fontSize: 20,
                            fontFamily: 'Roboto-Regular',
                          }}>
                          {item.title}
                        </Text>
                        {item.content ? (
                          <Text
                            style={{
                              color: '#000',
                              paddingRight: 10,
                              fontSize: 16,
                              fontFamily: 'roboto-Light',
                            }}>
                            {item.content}
                          </Text>
                        ) : null}
                      </Block>
                    </Block>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : null}
        </Block>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  close: {width: '90%', height: 40, marginTop: 18},
  ineerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    borderTopColor: '#cccc',
    borderTopWidth: 1,
    paddingTop: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: width * 0.85,
    height: 45,
    fontSize: 14,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  bottombox: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '500',
  },
});
