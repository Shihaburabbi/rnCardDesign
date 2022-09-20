/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';

const StorySheare = props => {
  const photoData = props.route.params.data;
  // console.log('ZZZZ', photoData);

  const [value, onChangeText] = useState('');
  const [selectedPrivacy, setSelectedPrivacy] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const shearPost = async () => {
    setLoading(true);
    const data = new FormData();
    if (photoData.type == 'video/mp4') {
      data.append('type', 'video');
      data.append('file', {
        uri: photoData.path,
        type: 'video/mp4',
        name: 'video.mp4',
      });
    } else {
      data.append('type', 'image');
      data.append('file', {
        uri: photoData.path,
        name: 'image.jpg',
        type: photoData.type,
      });
    }
    data.append('privacy', selectedPrivacy);
    data.append('hashtags[]', 'black');
    data.append('token', 'bf4d4a6c471b2d4787be2e4f549a4e15');
    // data.append('file', photoData.path);

    // console.log(data);
    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: 'https://www.shareslate.com/apis/story/addStory.php',
        data: data,
        headers: {'Content-Type': 'multipart/form-data'},
      });

      console.log(response);
      if (response.data.status === 'success') {
        setLoading(false);
        props.navigation.navigate('Home');
      }
      setLoading(false);

      console.log(JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  };

  const Loader = () => (
    <View style={{alignSelf: 'center'}}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {!loading ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CreateStory')}>
              <Feather name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={{}}>New reel</Text>
            <Text style={{}} />
          </View>

          <View style={{padding: 10, flexDirection: 'row'}}>
            <View>
              <Image
                style={{height: 100, width: 100, borderRadius: 5}}
                source={{uri: photoData.path}}
              />
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Home')}
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  margin: 5,
                }}>
                <Entypo name="cross" size={15} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 10, width: '70%'}}>
              <TextInput
                onChangeText={onChangeText}
                value={value}
                placeholder="Type some #hashtags or @mentions to get started."
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          <View style={styles.privicyLay} />

          <View style={{marginHorizontal: 15}}>
            <Text style={{fontSize: 15, fontWeight: '700'}}>
              Who can see this?
            </Text>
            <Text style={{fontSize: 14, fontWeight: '400'}}>
              Reels can appear in Feed, watch and other plasces across Share
              Slate.
            </Text>
          </View>
          {selectedPrivacy === 1 ? (
            <TouchableOpacity
              style={styles.privicyBtn}
              onPress={() => setModalVisible(true)}>
              <MaterialIcons name="public" size={30} color="#000" />
              <View style={{paddingHorizontal: 5, width: '75%'}}>
                <Text style={{fontSize: 15, fontWeight: '700'}}>Public</Text>
                <Text style={{fontSize: 14, fontWeight: '400'}}>
                  Anyone on of off Share Slate. This lets anyone create reels
                  with your photo.
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#000"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.privicyBtn}
              onPress={() => setModalVisible(true)}>
              <MaterialIcons name="person" size={30} color="#000" />
              <View style={{paddingHorizontal: 5, width: '75%'}}>
                <Text style={{fontSize: 15, fontWeight: '700'}}>Private</Text>
                <Text style={{fontSize: 14, fontWeight: '400'}}>
                  Anyone on of off Share Slate. This lets anyone create reels
                  with your photo.
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#000"
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.btn} onPress={() => shearPost()}>
            <Text style={{color: '#FFF', fontSize: 20, fontWeight: '700'}}>
              Share
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('privacy been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Feather name="arrow-left" size={20} color="#000" />
                  </TouchableOpacity>
                  <Text style={{fontSize: 17, fontWeight: '700'}}>
                    Post audience
                  </Text>
                  <Text style={{}} />
                </View>

                <View style={{marginHorizontal: 15}}>
                  <Text style={{fontSize: 15, fontWeight: '700'}}>
                    Who can see your post?
                  </Text>
                  <Text style={{fontSize: 14, fontWeight: '400'}}>
                    Reels can appear in Feed, watch and other plasces across
                    Share Slate.
                  </Text>
                </View>
                <Text style={{fontSize: 18, fontWeight: '700'}}>
                  Choose audience
                </Text>

                <TouchableOpacity
                  style={styles.privicyBtn}
                  onPress={() => {
                    setSelectedPrivacy(1);
                  }}>
                  <MaterialIcons name="public" size={30} color="#000" />
                  <View style={{paddingHorizontal: 5, width: '75%'}}>
                    <Text style={{fontSize: 15, fontWeight: '700'}}>
                      Public
                    </Text>
                    <Text style={{fontSize: 14, fontWeight: '400'}}>
                      Anyone on of off Share Slate. This lets anyone create
                      reels with your photo.
                    </Text>
                  </View>
                  {selectedPrivacy === 1 ? (
                    <Fontisto name="radio-btn-active" size={30} color="#000" />
                  ) : (
                    <Fontisto name="radio-btn-passive" size={30} color="#000" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.privicyBtn}
                  onPress={() => {
                    setSelectedPrivacy(0);
                  }}>
                  <MaterialIcons name="person" size={30} color="#000" />
                  <View style={{paddingHorizontal: 5, width: '75%'}}>
                    <Text style={{fontSize: 15, fontWeight: '700'}}>
                      Private
                    </Text>
                    <Text style={{fontSize: 14, fontWeight: '400'}}>
                      Anyone on of off Share Slate. This lets anyone create
                      reels with your photo.
                    </Text>
                  </View>
                  {selectedPrivacy === 0 ? (
                    <Fontisto name="radio-btn-active" size={30} color="#000" />
                  ) : (
                    <Fontisto name="radio-btn-passive" size={30} color="#000" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default StorySheare;

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  btn: {
    height: 45,
    width: '90%',
    backgroundColor: '#2a9dF4',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  privicyLay: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
    marginVertical: 10,
    alignSelf: 'center',
  },
  privicyBtn: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centeredView: {
    // flex: 1,
    // backgroundColor: 'white',
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    // borderRadius: 20,
    padding: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
