

import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'
import QB from 'quickblox-react-native-sdk'
import WebRTCView from 'quickblox-react-native-sdk/RTCView'
import InCallManager from 'react-native-incall-manager'



const UserList =  (props) => {
 
  const data=[
    // { 
    //       'id':1,
    //       'login':'ziauddinsc',
    //       'username':'Zia'
    // },
    {
      'id':2,
      'login':'saad',
      'username':'Saad Ifran',
      'opponentsId':'135690928'
    }
  ]

  const navigateCallingList=(item)=>{
    props.navigation.navigate('CallScreen',{data:item})
  }


    return (
      <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigateCallingList(item)}>
         <View style={styles.item}>
          <Text style={styles.title}>{item.username}</Text>
        </View>
        </TouchableOpacity> 
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  }
})  