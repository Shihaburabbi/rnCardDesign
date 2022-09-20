import React, { useRef } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";

const Test = (props) => {
  let refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <Text>jkhjkhy</Text>
        <Text>jkhjkhy</Text>
        <Text>jkhjkhy</Text>
        <Text>jkhjkhy</Text>
      </RBSheet>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})