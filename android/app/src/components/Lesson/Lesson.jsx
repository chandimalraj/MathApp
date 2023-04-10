import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {React, useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {database, firebase} from '@react-native-firebase/database';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
  
} from 'react-native-google-mobile-ads';

const PRE_FONT_SIZE = 14;

const {height, width} = Dimensions.get('window');
const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-9262239337077945/7084873787'

export default function Lesson({navigation}) {

  const route = useRoute();
  const {lesson,path} = route.params;

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [sections, setSections] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [imgs, setImgs] = useState([]);

  useEffect(() => {

    const reference = firebase
      .app()
      .database(
        'https://math-app-1a402-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/math/${path}/${lesson}`);

    reference
      .once('value', snapshot => {
        let a = [];
        snapshot.forEach(childSnapshot => {
          console.log(childSnapshot.toJSON());
          const x = childSnapshot.toJSON();
          a.push(x);
        });
        setSections(a);
        return 'done';
      })
      .then(r => {
        setLoaded(true);
      });
    // showImage();
  }, []);

  const handlePress = section => {
    //const path = `https://math-app-1a402-default-rtdb.asia-southeast1.firebasedatabase.app//math/${path}/${lesson}`
    navigation.navigate('Section', {section: section , path:path , lesson:lesson});
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.hviewPure}>
        <Text style={styles.h1}>{lesson}</Text>
      </View>

      {loaded == false && (
        <View style={{justifyContent: 'center', height: height}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {loaded == true && (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{alignItems: 'center'}}>
          {sections.map(section => (
            <TouchableOpacity
            key={section}
              style={styles.card}
              onPress={() =>{ 
               handlePress(section)
               //console.log(section)
              }}>
              <Image
                source={require('../../assets/icons/Document.png')}
                style={{width: 30, height: 30}}
              />
              <Text style={styles.h2}>{section}</Text>
            </TouchableOpacity>
          ))}

        </ScrollView>
      )}
      <View style={styles.banner}>
        <GAMBannerAd
          unitId={adUnitId}
          sizes={[BannerAdSize.BANNER]}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 5,
    alignItems: 'center',
    paddingBottom:50
  },
  hviewPure: {
    height: 60,
    zIndex: 1,
    backgroundColor: '#42b72a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%'
  },
  hviewApplied: {
    height: 60,
    zIndex: 1,
     backgroundColor: '#1877f2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%'
  },
  h1: {
    fontFamily: 'Roboto-Black',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    //marginBottom: 30,
    textShadowColor: '#1877f2',
    //marginTop: 10,
  },
 

  sech1: {
    fontFamily: 'Roboto-Black',
    fontSize: 17,
    color: '#1877f2',
    marginVertical: 8,
  },
  sech2: {
    fontFamily: 'Roboto-Black',
    fontSize: 15,
    color: '#42b72a',
    marginVertical: 5,
  },
  sech3: {
    // fontFamily: 'Roboto-Black',
    fontFamily: 'monospace',
    fontSize: PRE_FONT_SIZE,
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: 13,
    color: '#6a6f73',
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    marginBottom: 20,
    width: width * 0.9,
  },
  scroll: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fcfcfa',
    paddingTop: 20,
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
  },
  h2:{
    marginLeft:15,
    fontWeight:800
  }
});
