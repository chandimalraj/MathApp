import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity 
} from 'react-native';
import React from 'react';
import {useFonts} from 'expo-font';

const {height, width} = Dimensions.get('window');

const Entry = ({navigation}) => {
  // const [fontsLoaded] = useFonts({
  //   'Roboto-Black': require('../../../../assets/fonts/Roboto-Black.ttf'),
  //   'Noto-Sans-Sinhala-Bold': require('../../../../assets/fonts/NotoSansSinhala-Bold.ttf'),
  // });

  const handlePress = ()=>{
    navigation.navigate('Lesson',{lesson:'pure'})
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.maincard}>
          <TouchableOpacity style={styles.tile} onPress={handlePress}>
          <View >
            <Text style={styles.h1}>වර්ගජ ශ්‍රිත හා </Text>
            <Text style={styles.h1}> වර්ගජ සමීකරණ</Text>
          </View>
          </TouchableOpacity>

          <View style={styles.tile}>
            <Text style={styles.h1}>අවකලනය</Text>
          </View>
        </View>
        <View style={styles.maincard}>
          <View style={styles.tile}>
            <Text style={styles.h1}>අවකලනය</Text>
          </View>
          <View style={styles.tile}>
            <Text style={styles.h1}>අවකලනය</Text>
          </View>
        </View>
        <View style={styles.maincard}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>
        <View style={styles.maincard}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>
        <View style={styles.maincard}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>
        <View style={styles.maincard}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>
        <View style={styles.maincard}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>
        <View style={styles.maincard}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>
        <View style={styles.maincard}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>
        <View style={styles.maincard}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>
        <View style={styles.maincard}>
          <View style={styles.tile}></View>
          <View style={styles.tile}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Entry;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  scroll: {
    width: width,
    //flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfa',
  },
  maincard: {
    ///padding: 20,
    //backgroundColor: '#f9f9f9',
    height: 80,
    marginVertical: 5,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tile: {
    backgroundColor: '#1877f2',
    width: width * 0.45,
    marginHorizontal: 5,
    //height:200,
    shadowColor: '#1877f2',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    flexDirection: 'column',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ///borderColor:'#1877f2',
    borderWidth: 1,
  },
  h1: {
    color: '#fcfcfa',
    fontSize: 13,

    fontWeight: 800,
  },
});
