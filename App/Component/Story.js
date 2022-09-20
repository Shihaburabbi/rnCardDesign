/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';

import {ScrollView, View, ActivityIndicator} from 'react-native';

import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Avatar from './Avatar';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

const Container = styled.View`
  width: 100%;
  height: 192px;
  flex-direction: row;
  align-items: center;
`;
const Card = styled.TouchableOpacity`
  width: 106px;
  height: 170px;
  position: relative;
  margin-right: 8px;
`;
const CardStory = styled.Image`
  width: 100%;
  height: 170px;
  border-radius: 12px;
`;
const CardUser = styled.View`
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ffffff;
  border-radius: 20px;
  width: 39px;
  height: 39px;
  align-items: center;
  justify-content: center;
`;
const CardFooter = styled.View`
  width: 100%;
  position: absolute;
  bottom: 12px;
  left: 9px;
`;
const Text = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
`;

const BottomDivider = styled.View`
  width: 100%;
  height: 9px;
  background: #f0f2f5;
`;

const Story = ({
  onPressCreate,
  onPressShowStory,

  data,

  loading,
}) => {
  // console.log(JSON.stringify(data));
  const videoPlayer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [screenType, setScreenType] = useState('content');
  const [type, setType] = useState('');
  const onLoad = data => {
    setIsLoading(false);
  };
  const onLoadStart = data => setIsLoading(true);

  // if (data !== undefined) {
  //   if (data.stories !== undefined) {
  //     const filename = data.stories[0].story_image;
  //     const type = filename.split('.').pop();
  //     setType(type);
  //   }
  // }
  // console.log(type);
  // console.log(JSON.stringify(data));
  // console.log(data[0].stories[0].thumbnail);

  const Loader = () => (
    <View style={{alignSelf: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );

  return (
    <>
      <Container>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingLeft: 11}}>
          <Card onPress={() => onPressCreate()}>
            {data !== undefined ? (
              // <CardStory source={{uri: data[0].user_image}} />
              <FastImage
                style={{
                  width: '100%',
                  height: 170,
                  backgroundColor: '#FFF',
                  borderRadius: 12,
                }}
                source={{
                  uri: data[0].user_image,
                  headers: {Authorization: 'AuthToken'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null}

            <CardUser>
              <AntDesign name="plus" size={24} color="#1777f2" />
            </CardUser>
            <CardFooter>
              <Text>Add To Story</Text>
            </CardFooter>
          </Card>

          {data !== undefined ? (
            <>
              {data.map((item, index) => (
                <Card onPress={() => onPressShowStory()} key={index}>
                  {item.stories[0].story_type === 'video' ? (
                    <View
                      style={{
                        width: '100%',
                        height: 170,
                        borderRadius: 12,
                        // backgroundColor: '#000',
                        // borderWidth: 1,
                      }}>
                      <FastImage
                        style={{
                          width: '100%',
                          height: 170,
                          backgroundColor: '#FFF',
                          borderRadius: 12,
                        }}
                        source={{
                          uri: item.stories[0].thumbnail,
                          headers: {Authorization: 'AuthToken'},
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        width: '100%',
                        height: 170,
                        borderRadius: 12,
                        // backgroundColor: '#000',
                        // borderWidth: 1,
                      }}>
                      <FastImage
                        style={{
                          width: '100%',
                          height: 170,
                          backgroundColor: '#FFF',
                          borderRadius: 12,
                        }}
                        source={{
                          uri: item.stories[0].story_image,
                          headers: {Authorization: 'AuthToken'},
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  )}

                  <CardUser>
                    <Avatar source={{uri: item.user_image}} story={true} />
                  </CardUser>
                  <CardFooter>
                    <Text>{item.user_name}</Text>
                  </CardFooter>
                </Card>
              ))}
            </>
          ) : null}
          {/* {allData} */}
        </ScrollView>
      </Container>
      <BottomDivider />
    </>
  );
};

export default Story;
