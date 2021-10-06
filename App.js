import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  const [cardText, setCardText] = React.useState([
    'Card 1',
    'Card 2',
    'Card 3',
    'Card 4',
    'Card 5',
    'Card 6',
    'Card 7',
    'Card 8',
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>React Native Card Design</Text>
      <ScrollView>
        {cardText.map((item, index) => {
          {
            return (
              <View key={index} style={styles.cardView}>
                <Text style={styles.text}>{item}</Text>
              </View>
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 20,
    color: '#05375a',
  },
  cardView: {
    height: 100,
    width: windowWidth / 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    margin: 6,
  },
});
